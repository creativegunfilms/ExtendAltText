'use client';

import { useState } from 'react';
import FileUploader from '../../comp/fileUpload';

const urlSet = [
  'https://blog.hootsuite.com/wp-content/uploads/2021/07/free-stock-photos-01-scaled.jpg',
  'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
const Multiple = () => {
  //CALL FUNCTION FOR EACH
  let x = 0;
  //HANDLE CLICK
  let [incomingAlt, setIncomingAlt] = useState([]);
  const buttonHandler = async () => {
    let arrD = [];
    for (let i = 0; i < urlSet.length; i++) {
      // console.log(x++, urlSet[i]);
      const getData = await pullTheData(urlSet[i]);
      if (getData) {
        const useData = getData.data;
        arrD.push({ data: useData });
      }
    }
    setIncomingAlt(arrD);
  };

  //Function for pulling the data
  const pullTheData = async (individualURL) => {
    const dataFromBackend = await fetch(`/api?${individualURL}`, {
      mode: 'no-cors',
    });
    if (dataFromBackend.ok) {
      const internal = dataFromBackend.json();
      return internal;
    }
  };

  return (
    <>
      <p>Multiple upload Test</p>
      {incomingAlt &&
        incomingAlt.map((units) => <li key={Math.random()}>{units.data}</li>)}
      <button onClick={buttonHandler}>Call Function for dataset</button>
      <p>{urlSet.length}</p>
      <FileUploader />
    </>
  );
};

export default Multiple;
