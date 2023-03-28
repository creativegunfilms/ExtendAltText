![ogimage](https://extend-alt-text.vercel.app/ogimage)
# Extend Alt Text

This Next-Alt-Text-Generator is a extended version of the [Alt Text Generator](https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator) built with NextJs  v13, but extends its fuctionality by introducing options like user input to generate alt text and upload multiple files to generate alt texts.

## Running Locally

1. Install dependencies: `npm i`
2. Start the dev server: `npm run dev`
3. Start the dev server with turbopack: `npm run dev2`

It is recommended not to use turbopack in this particular project.  

**Note:** This project uses [File.io](https://file.io) and [Next Alt Text Generator](https://alt-text-generator.vercel.app/).

# How to upload your file to 'File.io'?
Create ```<input type='file'>```

Images are reduced in size before uploading to file.io to reduce bandwith usage

```js
import imageCompression from 'browser-image-compression';
```
If the files are already smaller in size, then the files are not converted.

```js
if (imageFileSize > maxImageSizeMB) {
  const compressedFile = await imageCompression(imageFile, options);
  console.log( `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,);
  formData.append('file', compressedFile, filesData[x].name);
} else {
  formData.append('file', imageFile, filesData[x].name);
}
```
 
After handling each files request is made to the file.io

``` js
file = e.target.files[0];

formData = new FormData();
formData.append('file', file, file.name);

await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result.link);
        });
    }
```


# How to use route.js to fetch data as API?
Set Mode to ``'no-cors'`` as the response being returned is opaque. Use a for loop to send the url responses recieved from the file.io to the api end point (route.js).



``` js
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

```
# You can also fetch data in the server component using React RFC
Set Mode to ``'no-cors'`` as the response being returned is opaque.

``` js
const fetchData = async (url) => {
  const response = await fetch(
    `https://alt-text-generator.vercel.app/api/generate?imageUrl=${url}`,
    { mode: 'no-cors' },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data...');
  }
  const data = response.json();
  if (data) {
    return data;
  }
};
const DataFetch = async (props) => {
  const data = await fetchData(props.url);
  return (
    <div>
      <p>Server Component</p>
      {data}
    </div>
  );
};

export default DataFetch;


```
The fetched data can also be handled with ``Suspense``

To do that first import Suspense:
```js
import { Suspense } from "react";
```
And wrap the data within Suspense boundaries with fallback ui if needed:
```html
<Suspense fallback={<p>Loading....</p>}>
    {data}
</Suspense>
```
Alternatively the whole data feching can also be done on the client side:
```js
'use client';
import { use } from 'react';
const fetchData = async (url) => {
  const response = await fetch(
    `https://alt-text-generator.vercel.app/api/generate?imageUrl=${url}`,
    {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  if (!response.ok) {
    return 'No response came to the backend...';
  }
  if (response) {
    const data = response.json();
    return data;
  } else {
    return 'Failed to fetch Data...';
  }
};
const DataFetchClient = (props) => {
  const data = use(fetchData(props.url));
  return (
    <div>
      <p>Client Component</p>
      {data && data}
    </div>
  );
};

export default DataFetchClient;

```
But for this particular project it is suitable to fetch the data through route.js. From client side first a fetch request is made to the route.js, which handles the request server side and fetches the data first and then sends the response to the client side which is then mapped and represented.

```js
'use client';

  const pullTheData = async (individualURL) => {
    const dataFromBackend = await fetch(`/api?${individualURL}`, {
      mode: 'no-cors',
    });
    if (dataFromBackend.ok) {
      const internal = dataFromBackend.json();
      return internal;
    }
  };
  ```

One small thing you need to keep in mind while dealing with next server and client components, server components can not be nested inside a client component, but the reverse can be done. 
Please follow the documentation:
https://beta.nextjs.org/docs/rendering/server-and-client-components

It is recomended to leave the client components in the leaf nodes.

# Generate Vercel OG Images with new APP structure
Now when there is no `Pages/Api` directory, it was little difficult to find out how to implement OG Image generation by vercel with new NextJs App structure.
The way it works is like the following:
```js
import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};
 


export async function GET(request) {
   return  new ImageResponse(
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
          Hello world!
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    );
    // return new Response(imageG);
}
```
This must be made inside `App/directoryName/route.js`. And the statically generated image will be available at ``http://localhost:3000/directoryName`` or ``https://domainname.vercel.app/directoryName``
use the following code in the main ``layout.js``
```html
<head>
  <title>Hello world</title>
  <meta
    property="og:image"
    content="https://domainname.vercel.app/directoryName"
  />
</head>
```
## Generating random image and its's description as OG image using @vercel/og inside NextJs App directory and route.js (route handler / Api replacement)


Before returning the ImageResponse in the GET request mentioned above, one fetch request is made.
First [Picsum.photos](https://picsum.photos/) is used to get an Url for a random image:
```js
let randomdid = Math.floor(Math.random() * 1083);
```
They provides 1084 images based on ids, the idea is to generate the id in ranodm. Then the actual Url is set and fetch request is made to the Alt Text generator with that particular Url:
```js
//Setting the image url
    var URL = `https://picsum.photos/id/${randomdid}/300`;

    //Fetch the Alt Text Generator
    let fetchDesc;
    try {
     const res = await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${URL}`,
        { mode: 'no-cors', next: { revalidate: 10 } },
      );
      fetchDesc = await res.json();
    } catch (error) {
      //Using Fallback to narrow error boundary
      URL = '/fallbackog.jpg'
      fetchDesc = 'Extend Alt Text Can Generate Descriptions';
    }
```
As the whole thing is performed inside the get function hich inturn returns the image response, we can customize the image returned in the imageResponse.
```js
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export async function GET(request) {
    // URL is set and Description is fetched
    }
    
    return new ImageResponse(
    // The SVG template is used to generate the image
}
```
You can use the [og-playground](https://og-playground.vercel.app/) to design your SVG sturcture.
It is then returned in the imageReponse.
```html
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
```

You can see the generated image in this project in ``http://localhost:3000/ogimage``, or can check [https://extend-alt-text.vercel.app/ogimage](https://extend-alt-text.vercel.app/ogimage).

This OG image is generated in every ``unique``requests. The revalidation time is set to 10s to control the cache behaviour.
```js
await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${URL}`,
        { mode: 'no-cors', next: { revalidate: 10 } },
      );
```
As the `route.js` here is not handelling the incoming request you can send random request parameter to genarate og images in the hosted environment.

Refreshing ``http://localhost:3000/ogimage`` will generate new og image each time.

**But refreshing ``https://extend-alt-text.vercel.app/ogimage`` will not generate new og image each time, as it is remaining as cache in the edge, refreshing is not an `unique` request.**

Passing a request param like ``https://extend-alt-text.vercel.app/ogimage``**``?=[anything_Random_here]``** will be treated as `unique` request and will generate new og image. Now this newly generated image can be cached for 10 second. Sending same parameter again will prompt the cached version of the og image.
Frequently changing og image can influence the SEO, but it is absolutely okay to create Og images dynamically or for dynamic routes. 
Handelling ``request`` and ``request.param`` to get the passed value can be used to dynamically add text in the og image by using ``{request.param}`` while structuring SVG in the returned imageResponse.


See this question prompted by us on the [stackoverflow](https://stackoverflow.com/questions/75858925/how-to-use-vercel-og-image-in-next-js-app-folder).


## Documentation

https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator

## Website

https://extend-alt-text.vercel.app/

## Developed by
[Titas Mallick](https://github.com/titasmallick) & [Amit Sen](https://github.com/amit-sen) as open source project.
thank you!