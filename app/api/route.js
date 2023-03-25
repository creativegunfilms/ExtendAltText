import { NextResponse } from 'next/server';

export async function GET(request) {
  let str = request.url;
  let jsFunct = str.slice(str.indexOf('?') + 1);
  try {
    const res = await fetch(
      `https://alt-text-generator.vercel.app/api/generate?imageUrl=${jsFunct}`,
      { mode: 'no-cors' },
    );
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.send(error);
  }
}
