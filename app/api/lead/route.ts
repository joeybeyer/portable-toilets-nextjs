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
    const { name, email, phone, message } = await req.json();

    // Save to database
    await db.execute({
      sql: `
        INSERT INTO leads (name, email, phone, message)
        VALUES (?, ?, ?, ?)
      `,
      args: [name || '', email || '', phone || '', message || ''],
    });

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Portable Toilets Champ <info@portabletoiletschamp.com>',
      to: ['info@portabletoiletschamp.com'],
      replyTo: email || 'info@portabletoiletschamp.com',
      subject: `New lead from ${name || 'Website Visitor'}`,
      html: `
        <h2>New Portable Toilets Champ Lead</h2>
        <p><strong>Name:</strong> ${name || ''}</p>
        <p><strong>Email:</strong> ${email || ''}</p>
        <p><strong>Phone:</strong> ${phone || ''}</p>
        <p><strong>Message:</strong><br>${message || ''}</p>
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