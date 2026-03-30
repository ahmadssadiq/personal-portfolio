import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message, name, email } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const senderName  = name?.trim()  || 'Anonymous';
    const senderEmail = email?.trim() || null;

    const safeMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeName    = senderName.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeEmail   = senderEmail
      ? senderEmail.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      : null;

    const subject = senderEmail
      ? `Portfolio message from ${senderName} <${senderEmail}>`
      : `Portfolio message from ${senderName}`;

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_TO || 'asadiq456@outlook.com',
      replyTo: senderEmail ? `${senderName} <${senderEmail}>` : undefined,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #000; margin-bottom: 20px; font-size: 18px;">New message from your portfolio</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px; width: 80px;">From</td>
              <td style="padding: 8px 0; color: #000; font-size: 13px; font-weight: 600;">${safeName}</td>
            </tr>
            ${safeEmail ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 13px;">
                <a href="mailto:${safeEmail}" style="color: #000;">${safeEmail}</a>
              </td>
            </tr>` : ''}
          </table>

          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 14px;">${safeMessage}</p>
          </div>

          <p style="color: #999; font-size: 11px; margin-top: 16px;">
            Sent via ahmadsadiq.com${senderEmail ? ` · Reply to <a href="mailto:${safeEmail}" style="color:#999;">${safeEmail}</a>` : ''}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
