import 'server-only';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/dbConnect';
import Social from '@/models/Social';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aceagrofarms.com';
const siteEmail = process.env.SMTP_USER || 'hello@aceagrofarms.com';
const siteName = 'ACE AGRO FARMS';
const primaryColor = '#2D5016';
const secondaryColor = '#F97316';

const socialIcons: Record<string, string> = {
  facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>`,
  youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/></svg>`,
  whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>`,
  tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.18 8.18 0 0 0 4.77 1.52V6.84a4.85 4.85 0 0 1-1-.15z"/></svg>`,
};

function getSocialUrl(platform: string, value: string): string {
  switch (platform) {
    case 'facebook': return value.startsWith('http') ? value : `https://facebook.com/${value}`;
    case 'instagram': return value.startsWith('http') ? value : `https://instagram.com/${value}`;
    case 'twitter': return value.startsWith('http') ? value : `https://twitter.com/${value}`;
    case 'youtube': return value.startsWith('http') ? value : `https://youtube.com/@${value}`;
    case 'whatsapp': return value.startsWith('http') ? value : `https://wa.me/${value.replace(/\D/g, '')}`;
    case 'tiktok': return value.startsWith('http') ? value : `https://tiktok.com/@${value}`;
    default: return value;
  }
}

function buildSocialsHtml(socials: any[]): string {
  if (!socials || socials.length === 0) return '';
  const socialLinks = socials
    .filter((s: any) => s.enabled)
    .map((s: any) => {
      const url = getSocialUrl(s.platform, s.value);
      const icon = socialIcons[s.platform] || '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${primaryColor}; border-radius: 50%; color: white; text-decoration: none; margin: 0 4px; transition: background 0.2s;">${icon}</a>`;
    })
    .join('');
  return `
    <div style="margin-top: 15px;">
      <p style="font-size: 12px; font-weight: 600; color: #666; margin-bottom: 8px;">Follow Us</p>
      <div style="display: flex; justify-content: center; gap: 8px;">
        ${socialLinks}
      </div>
    </div>
  `;
}

function baseTemplate(content: string, socials: any[] = []) {
  const socialsHtml = buildSocialsHtml(socials);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, ${primaryColor} 0%, #4A7C23 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">${siteName}</h1>
      <p style="color: #f0f0f0; margin: 10px 0 0; font-size: 14px;">From Farm to Wellness – Pure, Natural, and Sustainable Living</p>
    </div>
    <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      ${content}
    </div>
    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
      <p>${siteName} | Yaounde, Cameroon</p>
      ${socialsHtml}
      <p style="margin-top: 10px;">This email was sent from <a href="${siteUrl}" style="color: ${primaryColor};">${siteUrl}</a></p>
    </div>
  </div>
</body>
</html>
`;
}

async function getSocials() {
  try {
    await dbConnect();
    const socials = await Social.find({ enabled: true });
    return JSON.parse(JSON.stringify(socials));
  } catch {
    return [];
  }
}

export async function sendOrderConfirmation(email: string, order: any) {
  const socials = await getSocials();
  const itemsList = order.items?.map((item: any) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">FCFA ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('') || '';

  const html = baseTemplate(`
    <h2 style="color: ${primaryColor}; margin-top: 0;">Order Confirmed! 🎉</h2>
    <p>Thank you for your order! We've received your order and will begin processing it shortly.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #333; margin-top: 0;">Order Details</h3>
      <p><strong>Order ID:</strong> <span style="font-family: monospace;">${order.orderId || order._id?.slice(-8).toUpperCase()}</span></p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p><strong>Status:</strong> <span style="background: ${secondaryColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">Pending</span></p>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: ${primaryColor}; color: white;">
          <th style="padding: 12px; text-align: left;">Product</th>
          <th style="padding: 12px; text-align: center;">Qty</th>
          <th style="padding: 12px; text-align: right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding: 12px; font-weight: bold; text-align: right;">Total:</td>
          <td style="padding: 12px; font-weight: bold; text-align: right; font-size: 18px; color: ${primaryColor};">FCFA ${(order.totalAmount || 0).toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
    
    ${order.deliveryAddress ? `
    <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Delivery Address:</strong></p>
      <p style="margin: 5px 0 0;">${order.deliveryAddress}</p>
    </div>
    ` : ''}
    
    <div style="background: #e8f5e9; padding: 12px 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid ${primaryColor};">
      <p style="margin: 0; font-size: 14px; color: #333;"><strong>Delivery Information:</strong> Delivery costs are calculated separately based on your location. Our team will contact you to confirm the delivery fee before your order is processed.</p>
    </div>
    
    <p style="color: #666; font-size: 14px;">We'll notify you when your order status changes. You can also track your order using your Order ID.</p>
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/track-order" style="display: inline-block; background: ${primaryColor}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Track Your Order</a>
    </div>
  `, socials);

  const mailOptions = {
    from: `"${siteName}" <${siteEmail}>`,
    to: email,
    subject: `Order Confirmed - ${siteName}`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendOrderStatusUpdate(email: string, order: any) {
  const socials = await getSocials();
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    confirmed: { title: 'Order Confirmed! ✓', message: 'Your order has been confirmed and will be processed soon.', color: '#22c55e' },
    processing: { title: 'Order Processing 🔄', message: 'Your order is being prepared and will ship soon.', color: '#3b82f6' },
    shipped: { title: 'Order Shipped! 📦', message: 'Your order is on its way!', color: '#8b5cf6' },
    delivered: { title: 'Order Delivered! 🎉', message: 'Your order has been delivered. Enjoy your products!', color: '#22c55e' },
    cancelled: { title: 'Order Cancelled', message: 'Your order has been cancelled. Contact us if you have any questions.', color: '#ef4444' },
  };

  const status = order.status || 'pending';
  const statusInfo = statusMessages[status] || statusMessages.pending;

  const itemsList = order.items?.map((item: any) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
    </tr>
  `).join('') || '';

  const html = baseTemplate(`
    <div style="text-align: center; padding: 20px; background: ${statusInfo.color}10; border-radius: 12px; margin-bottom: 20px;">
      <h2 style="color: ${statusInfo.color}; margin: 0;">${statusInfo.title}</h2>
    </div>
    
    <p>${statusInfo.message}</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Order #${order._id?.slice(-8).toUpperCase()}</h3>
      <p><strong>Total:</strong> FCFA ${(order.totalAmount || 0).toLocaleString()}</p>
      <p><strong>Items:</strong></p>
      <table style="width: 100%;">
        <tbody>
          ${itemsList}
        </tbody>
      </table>
    </div>
    
    ${order.notes ? `
    <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Note from ACE AGRO:</strong></p>
      <p style="margin: 5px 0 0;">${order.notes}</p>
    </div>
    ` : ''}
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/track-order" style="display: inline-block; background: ${primaryColor}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">View Order Details</a>
    </div>
  `, socials);

  const mailOptions = {
    from: `"${siteName}" <${siteEmail}>`,
    to: email,
    subject: `Order Update - ${statusInfo.title}`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendAdminOrderReply(email: string, order: any, replyMessage: string, adminName: string) {
  const socials = await getSocials();
  const html = baseTemplate(`
    <div style="background: linear-gradient(135deg, ${secondaryColor} 0%, #ea580c 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px; color: white;">
      <h2 style="margin: 0;">📬 Message from ${siteName}</h2>
    </div>
    
    <p>Hello ${order.customerName || 'Customer'},</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${secondaryColor};">
      <p style="margin: 0; white-space: pre-wrap;">${replyMessage}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #666; font-size: 12px;">
        <strong>Reply from:</strong> ${adminName}<br>
        <strong>Regarding Order:</strong> #${order._id?.slice(-8).toUpperCase()}
      </p>
    </div>
    
    <p>If you have any further questions, please don't hesitate to contact us.</p>
    
    <p>Best regards,<br><strong>${siteName} Team</strong></p>
  `, socials);

  const mailOptions = {
    from: `"${siteName}" <${siteEmail}>`,
    to: email,
    subject: `Regarding Your Order #${order._id?.slice(-8).toUpperCase()}`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendContactForm(name: string, email: string, message: string, phone?: string) {
  const socials = await getSocials();
  const html = baseTemplate(`
    <div style="background: ${secondaryColor}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: white; margin: 0;">📬 New Contact Inquiry</h2>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
      <p><strong style="display: inline-block; width: 80px;">Name:</strong> ${name}</p>
      <p><strong style="display: inline-block; width: 80px;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong style="display: inline-block; width: 80px;">Phone:</strong> ${phone}</p>` : ''}
    </div>
    
    <div style="background: white; border: 1px solid #eee; padding: 20px; border-radius: 8px; margin-top: 20px;">
      <p style="font-weight: bold; margin-top: 0;">Message:</p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
    
    <div style="margin-top: 20px; text-align: center;">
      <a href="mailto:${email}" style="display: inline-block; background: ${primaryColor}; color: white; padding: 10px 25px; text-decoration: none; border-radius: 20px;">Reply to ${name}</a>
    </div>
  `, socials);

  const mailOptions = {
    from: `"${siteName} Website" <${siteEmail}>`,
    to: siteEmail,
    subject: `New Contact: ${name}`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendInquiryReply(inquiryEmail: string, inquiry: any, replyMessage: string, adminName: string) {
  const socials = await getSocials();
  const html = baseTemplate(`
    <div style="background: linear-gradient(135deg, ${secondaryColor} 0%, #ea580c 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px; color: white;">
      <h2 style="margin: 0;">📬 Response to Your Inquiry</h2>
    </div>
    
    <p>Hello ${inquiry.name},</p>
    
    <p>Thank you for reaching out to us! Here is our response:</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid ${secondaryColor}; margin: 20px 0;">
      <p style="margin: 0; white-space: pre-wrap;">${replyMessage}</p>
    </div>
    
    ${inquiry.message ? `
    <details style="margin: 20px 0;">
      <summary style="cursor: pointer; color: #666; font-size: 14px;">Your original message</summary>
      <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 10px;">
        <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${inquiry.message}</p>
      </div>
    </details>
    ` : ''}
    
    <p>If you have any other questions, please don't hesitate to contact us again.</p>
    
    <p>Best regards,<br><strong>${adminName}</strong><br>${siteName} Team</p>
  `, socials);

  const mailOptions = {
    from: `"${siteName}" <${siteEmail}>`,
    to: inquiryEmail,
    subject: `Re: Your Inquiry - ${siteName}`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendNewsletterSubscription(email: string) {
  const socials = await getSocials();
  const html = baseTemplate(`
    <h2 style="color: ${primaryColor}; text-align: center;">Welcome to ${siteName}! 🌿</h2>
    
    <p>Thank you for subscribing! You're now part of our wellness community.</p>
    
    <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0;">What You'll Get:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Exclusive offers and promotions</li>
        <li>Health tips and wellness advice</li>
        <li>Updates on new organic products</li>
        <li>Farm news and behind-the-scenes content</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/products" style="display: inline-block; background: ${primaryColor}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Explore Our Products</a>
    </div>
  `, socials);

  const mailOptions = {
    from: `"${siteName}" <${siteEmail}>`,
    to: email,
    subject: `Welcome to ${siteName}!`,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export default transporter;
