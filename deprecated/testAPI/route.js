import { request } from 'https';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log(request.url);
  return NextResponse.json({ status: 'OK' });
}
