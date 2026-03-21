import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Social from '@/models/Social';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const enabledOnly = searchParams.get('enabled') === 'true';
    
    const query = enabledOnly ? { enabled: true } : {};
    const socials = await Social.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, socials });
  } catch (error) {
    console.error('Error fetching socials:', error);
    return NextResponse.json({ error: 'Failed to fetch socials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const existing = await Social.findOne({ platform: body.platform });
    if (existing) {
      return NextResponse.json({ error: 'This social platform already exists' }, { status: 400 });
    }
    
    const social = new Social(body);
    await social.save();
    
    return NextResponse.json({ success: true, social }, { status: 201 });
  } catch (error) {
    console.error('Error creating social:', error);
    return NextResponse.json({ error: 'Failed to create social' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    const social = await Social.findByIdAndUpdate(id, body, { new: true });
    
    if (!social) {
      return NextResponse.json({ error: 'Social not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, social });
  } catch (error) {
    console.error('Error updating social:', error);
    return NextResponse.json({ error: 'Failed to update social' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await Social.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Social deleted' });
  } catch (error) {
    console.error('Error deleting social:', error);
    return NextResponse.json({ error: 'Failed to delete social' }, { status: 500 });
  }
}
