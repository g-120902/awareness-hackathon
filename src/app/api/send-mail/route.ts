import { NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Access environment variables
    const EMAIL_USER = process.env.EMAIL_USER || '';
    const EMAIL_PASS = process.env.EMAIL_PASS || '';

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Email credentials are not set in environment variables.' },
        { status: 500 }
      );
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email data
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'gregoryalbert1209@gmail.com',
      subject: 'New Contact Form Submission',
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ submitted: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
