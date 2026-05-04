import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { isBusinessHours, getLocalHour } from '@/lib/businessHours';

const resend = new Resend(process.env.RESEND_API_KEY);

// Handle GET requests with proper 405 response
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { name, email, phone, message, source, referrer, utm_source, utm_medium, utm_campaign, project_type, unit_type, zip_code } = await req.json();

    // Save to database — attempt schema migration inline (safe: ALTER TABLE IF NOT EXISTS not supported by SQLite, use try/catch)
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN source TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN referrer TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN utm_source TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN utm_medium TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN utm_campaign TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN project_type TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN unit_type TEXT', args: [] })
    } catch { /* column may already exist */ }
    try {
      await db.execute({ sql: 'ALTER TABLE leads ADD COLUMN zip_code TEXT', args: [] })
    } catch { /* column may already exist */ }

    await db.execute({
      sql: `
        INSERT INTO leads (name, email, phone, message, source, referrer, utm_source, utm_medium, utm_campaign, project_type, unit_type, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        name || '',
        email || '',
        phone || '',
        message || '',
        source || '',
        referrer || '',
        utm_source || '',
        utm_medium || '',
        utm_campaign || '',
        project_type || '',
        unit_type || '',
        zip_code || '',
      ],
    });

    // Check business hours for this lead
    const afterHours = phone ? !isBusinessHours(phone) : false;

    const emailSubject = afterHours
      ? `🌙 AFTER HOURS LEAD: ${name || 'Website Visitor'} - ${zip_code || 'Unknown'} - CALL AT 9AM`
      : `📞 AUTO-CALLBACK TRIGGERED: ${name || 'Website Visitor'} - ${zip_code || 'Unknown'}`;

    const emailBanner = afterHours
      ? `<p style="background: #fff3e0; padding: 12px; border-radius: 4px; font-weight: bold;">
          🌙 After-hours lead — Retell callback skipped (outside 9am-9pm local time). Please call this lead first thing in the morning.
        </p>`
      : `<p style="background: #e8f5e9; padding: 12px; border-radius: 4px; font-weight: bold;">
          ✅ Retell AI is calling this lead right now. Do NOT call manually - buyer will receive via Retreaver.
        </p>`;

    const emailHeading = afterHours ? '🌙 After-Hours Lead Received' : '🤖 Lead Received - Auto-Callback Triggered';

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Portable Toilets Champ <info@portabletoiletschamp.com>',
      to: ['info@portabletoiletschamp.com', 'garrett@primedumpster.com'],
      bcc: ['leads@primedumpster.com'],
      replyTo: email || 'info@portabletoiletschamp.com',
      subject: emailSubject,
      html: `
        <h2>${emailHeading}</h2>
        ${emailBanner}
        <p><strong>Name:</strong> ${name || ''}</p>
        <p><strong>Email:</strong> ${email || ''}</p>
        <p><strong>Phone:</strong> ${phone || ''}</p>
        <p><strong>Zip Code:</strong> ${zip_code || ''}</p>
        <p><strong>Project Type:</strong> ${project_type || ''}</p>
        <p><strong>Unit Type:</strong> ${unit_type || ''}</p>
        <p><strong>Message:</strong><br>${message || ''}</p>
        <hr/>
        <h3>Attribution</h3>
        <p><strong>Source Page:</strong> ${source || ''}</p>
        <p><strong>Referrer:</strong> ${referrer || ''}</p>
        <p><strong>UTM Source:</strong> ${utm_source || ''}</p>
        <p><strong>UTM Medium:</strong> ${utm_medium || ''}</p>
        <p><strong>UTM Campaign:</strong> ${utm_campaign || ''}</p>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: 'Lead saved, but email failed to send' },
        { status: 500 }
      );
    }

    // Trigger Retell AI auto-callback directly (only during business hours)
    if (phone && !afterHours) {
      try {
        // Clean phone number to E.164 format
        let cleanPhone = phone.replace(/[^0-9+]/g, '');
        if (!cleanPhone.startsWith('+')) {
          if (cleanPhone.startsWith('1') && cleanPhone.length === 11) cleanPhone = '+' + cleanPhone;
          else if (cleanPhone.length === 10) cleanPhone = '+1' + cleanPhone;
        }

        if (cleanPhone.length >= 11) {
          // 5 second buffer before calling
          await new Promise(resolve => setTimeout(resolve, 5000));

          const retellResponse = await fetch('https://api.retellai.com/v2/create-phone-call', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer key_6ef3d7fd02d31572ed6c569095a5',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from_number: '+13312811097',
              to_number: cleanPhone,
              override_agent_id: 'agent_5c8956552ec7250e9526fe07c2',
              retell_llm_dynamic_variables: {
                customer_name: (name || '').split(' ')[0] || 'there'
              },
              metadata: {
                source: 'portabletoiletschamp.com',
                lead_name: name || '',
                lead_phone: cleanPhone,
                lead_email: email || '',
                lead_zip: zip_code || '',
                unit_type: unit_type || 'Not specified',
                timestamp: new Date().toISOString()
              }
            }),
          });

          const retellData = await retellResponse.json();
          console.log('Retell callback:', retellResponse.status, retellData.call_id || retellData.message);
        }
      } catch (retellError) {
        console.error('Failed to trigger Retell callback:', retellError);
      }
    } else if (phone && afterHours) {
      const localHr = getLocalHour(phone);
      console.log(`Retell callback SKIPPED: outside business hours (local hour: ${localHr}) for ${phone}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
