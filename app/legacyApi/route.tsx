import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const  OgImageHandler = async (req: NextRequest)=> {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')||'Mate'
    // const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // const jsonData = await data.json()
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello there! {title}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}

export default OgImageHandler;