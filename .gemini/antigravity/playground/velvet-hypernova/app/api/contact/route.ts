import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Save to Supabase Database
        const { error: dbError } = await supabase
            .from('contact_submissions')
            .insert([{ name, email, message }]);

        if (dbError) {
            console.error('Database Error:', dbError);
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        // Send email notification using Resend
        if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
            try {
                await resend.emails.send({
                    from: 'Velvet Hypernova <onboarding@resend.dev>',
                    replyTo: email,
                    to: process.env.CONTACT_EMAIL_TO,
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #1e3a8a 0%, #b45309 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Velvet<span style="color: #fbbf24;">Hypernova</span></h1>
                <p style="color: #e0e7ff; margin: 10px 0 0 0;">New Contact Form Submission</p>
              </div>
              <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">FROM</p>
                  <p style="margin: 0; color: #1e293b; font-size: 18px; font-weight: bold;">${name}</p>
                  <p style="margin: 5px 0 0 0; color: #3b82f6;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">MESSAGE</p>
                  <p style="margin: 0; color: #1e293b; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <div style="background: #1e293b; padding: 20px; text-align: center;">
                <p style="color: #94a3b8; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Velvet Hypernova. All rights reserved.</p>
              </div>
            </div>
          `,
                });
            } catch (emailError) {
                console.error('Email Error:', emailError);
                // Don't fail the request if email fails, submission is already saved
            }
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
