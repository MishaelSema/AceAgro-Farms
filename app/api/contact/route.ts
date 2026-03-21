import { NextRequest, NextResponse } from 'next/server';
import { sendContactForm } from '@/lib/email';
import dbConnect from '@/lib/dbConnect';
import Inquiry from '@/models/Inquiry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = new Inquiry({
      name,
      email,
      phone: phone || '',
      message,
      status: 'new',
    });

    await inquiry.save();

    try {
      await sendContactForm(name, email, message);
    } catch (emailError) {
      console.error('Email error (inquiry saved):', emailError);
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
