import { NextResponse } from 'next/server';
import { getFooterData } from '@/lib/footerData';

export async function GET() {
  const data = await getFooterData();
  return NextResponse.json(data);
}
