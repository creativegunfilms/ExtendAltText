'use client';

import { use, useState } from 'react';
import { CopyBlock, dracula } from "react-code-blocks";

//DATA BEING FETCHED FROM THE NEXT BACKEND
const fetchFromBackend = async (url) => {
  console.log(url);
  const dataFromBackend = await fetch(`/api?${url}`, { mode: 'no-cors' });
  if (dataFromBackend.ok) {
    const internal = dataFromBackend.json();
    return internal;
  }
};

const InputComp = () => {
  let [urlData, setUrlData] = useState('type...');
  let [internalState, setInternalState] = useState('No Data yet...');

  //INPUT FORM HANDLER
  const formHandler = (e) => {
    e.preventDefault();
    let url = e.target.urlInput.value;
    setUrlData(url);
    callTheDatabase(url);
  };

  //CALLING THE BACKEND FUNCTION
  const callTheDatabase = async (url) => {
    const getData = await fetchFromBackend(url);
    if (getData) {
      const useDta = getData.data;
      setInternalState(useDta);
    } else {
      setInternalState('Problem with backend server...');
    }
  };
  return (
    <>
      <h3>Paste URL of a Single Image to get the data</h3>
      <p>Paste you Image URL to get the data</p>
      <form onSubmit={formHandler}>
        <label htmlFor="urlInput">Paste Your URL</label>
        <br></br>
        <input type="text" id="urlInput"></input>
        <input type="submit"></input>
      </form>
      {urlData && <p>URL typed: {urlData}</p>}
      <CopyBlock
              text={internalState}
              language='text'
              codeBlock
              showLineNumbers={false}
              theme={dracula}
              wrapLines={true}
        />
    </>
  );
};

export default InputComp;
