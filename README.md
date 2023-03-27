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


## Documentation

https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator

## Website

https://extend-alt-text.vercel.app/

## Developed by
[Titas Mallick](https://github.com/titasmallick) & [Amit Sen](https://github.com/amit-sen) as open source project.