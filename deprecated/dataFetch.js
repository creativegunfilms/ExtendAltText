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
