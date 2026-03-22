import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { name, email, phone, address, paymentMethod, items, totalAmount, notes } = body;
    
    if (!name || !email || !phone || !items || items.length === 0 || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const order = new Order({
      orderId: `AAF-${Date.now().toString(36).toUpperCase()}`,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: address,
      paymentMethod: paymentMethod || 'cash',
      items,
      totalAmount,
      notes,
      status: 'pending',
    });
    
    await order.save();
    
    try {
      await sendOrderConfirmation(email, order);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderId: order.orderId || order._id?.toString(),
    }, { status: 201 });
    
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = {};
    if (status) {
      query = { status };
    }
    
    const orders = await Order.find(query).populate('items.product').sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    if (body.status) {
      try {
        const { sendOrderStatusUpdate } = await import('@/lib/email');
        await sendOrderStatusUpdate(order.customerEmail, order);
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }
    }
    
    if (body.notes) {
      try {
        const { sendAdminOrderReply } = await import('@/lib/email');
        await sendAdminOrderReply(order.customerEmail, order, body.notes, 'ACE AGRO FARMS Admin');
      } catch (emailError) {
        console.error('Failed to send admin reply email:', emailError);
      }
    }
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await Order.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
