import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';

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

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Portable Toilets Champ <info@portabletoiletschamp.com>',
      to: ['info@portabletoiletschamp.com', 'garrett@primedumpster.com'],
      bcc: ['leads@primedumpster.com'],
      replyTo: email || 'info@portabletoiletschamp.com',
      subject: `📞 AUTO-CALLBACK TRIGGERED: ${name || 'Website Visitor'} - ${zip_code || 'Unknown'}`,
      html: `
        <h2>🤖 Lead Received - Auto-Callback Triggered</h2>
        <p style="background: #e8f5e9; padding: 12px; border-radius: 4px; font-weight: bold;">
          ✅ Retell AI is calling this lead right now. Do NOT call manually - buyer will receive via Retreaver.
        </p>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
