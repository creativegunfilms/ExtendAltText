'use client';
import { useState } from 'react';
import { CopyBlock, dracula } from "react-code-blocks";
import Styles from '../styles/page.module.css';

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
  //------------------------------input comp---------------------------------//
  let [urlData, setUrlData] = useState('type...');
  let [internalState, setInternalState] = useState('No Data yet...');

  //INPUT FORM HANDLER
  const formHandler = (e) => {
    e.preventDefault();
    let url = e.target.urlInput.value;
    if(url){
    setUrlData(url);
    callTheDatabase(url);
    }
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
  //------------------------------input comp---------------------------------//
  return (
    <>
      <form className={Styles.form} onSubmit={formHandler}>
        <input placeholder='Paste your Image URL to get the data' className={Styles.input} type="text" id="urlInput"></input>
        <input className={Styles.button} type="submit" ></input>
      </form>
      {/* {urlData && <p>URL typed: {urlData}</p>} */}
      <CopyBlock
              text={`URL: ${urlData}\nDescription:\n${internalState}`}
              language='html'
              codeBlock
              showLineNumbers={false}
              theme={dracula}
              wrapLines={true}
        />
    </>
  );
};

export default InputComp;
