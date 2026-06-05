import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { customer, items, total } = await req.json();
    await dbConnect();

    // Generate human-friendly Order ID
    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ACE-${orderNumber}`;

    const newOrder = await Order.create({
      orderId,
      customer,
      items,
      total,
      status: 'Pending'
    });

    // Send Confirmation Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
      </tr>
    `).join('');

    await transporter.sendMail({
      from: `"ACE AGRO FARMS" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h1 style="color: #2A5A2B;">ACE AGRO FARMS</h1>
          <h2>Thank you for your order, ${customer.name}!</h2>
          <p>Your order <strong>${orderId}</strong> has been received and is currently being processed.</p>
          
          <h3>Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8f8f8; text-align: left;">
                <th style="padding: 10px;">Item</th>
                <th style="padding: 10px;">Qty</th>
                <th style="padding: 10px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; border-top: 2px solid #2A5A2B; padding-top: 10px; text-align: right;">
            <strong>Total: $${total.toFixed(2)}</strong>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; color: #666;">
            <p>You can track your order at: <a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/track?id=${orderId}&email=${customer.email}">Track Order</a></p>
            <p>Payment Method: Cash on Delivery / Bank Transfer</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, orderId: newOrder.orderId });
  } catch (error: any) {
    console.error('Order Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
