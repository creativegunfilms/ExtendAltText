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
