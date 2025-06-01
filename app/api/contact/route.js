import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a function to get the transporter to ensure credentials are loaded
const getTransporter = () => {
  // Log email configuration status (without exposing actual credentials)
  console.log('Email config status:', {
    hasEmailAddress: !!process.env.EMAIL_ADDRESS,
    hasPasskey: !!process.env.GMAIL_PASSKEY,
    emailAddressPrefix: process.env.EMAIL_ADDRESS ? process.env.EMAIL_ADDRESS.substring(0, 3) + '...' : 'undefined'
  });
  
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSKEY,
    },
    debug: true, // Enable debug output
  });  
};

const generateEmailTemplate = (name, email, message) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message From Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${message}
      </blockquote>
    </div>
  </div>
`;

export async function POST(request) {
  try {
    console.log('Contact form API called');
    const payload = await request.json();
    const { name, email, message } = payload;
    console.log('Received form data:', { name, email: email.substring(0, 3) + '...' });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({
        success: false,
        message: 'All fields are required',
      }, { status: 400 });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
      console.error('Missing email configuration. Please set EMAIL_ADDRESS and GMAIL_PASSKEY in .env.local');
      return NextResponse.json({
        success: false,
        message: 'Server email configuration error. Please contact the administrator.',
      }, { status: 500 });
    }

    // Get the transporter with current environment variables
    const transporter = getTransporter();

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_ADDRESS}>`,
      to: process.env.EMAIL_ADDRESS,
      subject: `New Portfolio Message from ${name}`,
      html: generateEmailTemplate(name, email, message),
      replyTo: email,
    };

    console.log('Attempting to send email to:', process.env.EMAIL_ADDRESS);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please contact the administrator.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection timed out. Please try again later.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. Please try again later.';
    }
    
    return NextResponse.json({
      success: false,
      message: errorMessage,
      error: error.message
    }, { status: 500 });
  }
};