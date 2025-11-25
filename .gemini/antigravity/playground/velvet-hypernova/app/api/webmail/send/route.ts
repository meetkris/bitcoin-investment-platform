import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, subject, message, cc, bcc } = body;

        if (!to || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            cc,
            bcc,
            subject,
            text: message,
            html: message.replace(/\n/g, '<br>'),
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('SMTP Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
