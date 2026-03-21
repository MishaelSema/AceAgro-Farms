import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GalleryItem from '@/models/GalleryItem';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }
    
    const items = await GalleryItem.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const item = new GalleryItem(body);
    await item.save();
    
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    const item = await GalleryItem.findByIdAndUpdate(id, body, { new: true });
    
    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await GalleryItem.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
