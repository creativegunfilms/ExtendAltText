import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export async function GET(request) {
    // Generating random id between 0 - 1083 to get the image
    let randomdid = Math.floor(Math.random() * 1083);

    //Setting the image url
    var URL = `https://picsum.photos/id/${randomdid}/300`;

    //Fetch the Alt Text Generator
    let fetchDesc;
    try {
     const res = await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${URL}`,
        { mode: 'no-cors', next: { revalidate: 0 } },
      );
      fetchDesc = await res.json();
    } catch (error) {
      //Using Fallback to narrow error boundary
      URL = '/fallbackog.jpg'
      fetchDesc = 'Extend Alt Text Can Generate Descriptions';
    }
    
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    fontSize: 32,
                    fontWeight: 600,
                }}
            >
                <div
                    style={{
                        left: 42,
                        top: 42,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            width: 24,
                            height: 24,
                            background: 'black',
                        }}
                    />
                    <span
                        style={{
                            marginLeft: 8,
                            fontSize: 20,
                        }}
                    >
                        Extend Alt Text
                    </span>
                </div>
                <img height={300} width={300} src={URL} />
                <div style={{
                    fontSize: '20px',
                    marginTop: 40,
                    background: 'black',
                    color: 'white',
                    padding: '25px',
                    width: '300px'
                }}>{fetchDesc}</div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
    // return new Response(imageG);
}