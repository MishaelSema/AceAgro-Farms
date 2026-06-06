import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const email = searchParams.get('email');
    
    if (!orderId || !email) {
      return NextResponse.json(
        { error: 'Order ID and email are required' },
        { status: 400 }
      );
    }
    
    const order = await Order.findOne({
      $and: [
        {
          $or: [
            { _id: orderId },
            { orderId: orderId }
          ]
        },
        { customerEmail: email }
      ]
    }).populate('items.product');
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your Order ID and email address.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      order: {
        _id: order._id,
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        notes: order.notes,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }
    });
    
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    );
  }
}
