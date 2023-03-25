'use client';
import imageCompression from 'browser-image-compression';
import { CopyBlock, dracula } from "react-code-blocks";
import { useState } from 'react';
import styles from '../styles/globals.css'

var urlSet = [];
var filenameSet = [];

const Multiple = () => {
  const [blockState, sateBlockstate] = useState(1);
  const toggleButton = () => {
    if (blockState === 0) {
      sateBlockstate(1);
    }
    if (blockState === 1) {
      sateBlockstate(0);
    }
  }
  //CALL FUNCTION FOR EACH
  let x = 0;
  //HANDLE CLICK
  let [incomingAlt, setIncomingAlt] = useState(null);
  let [loading, setLoading] = useState('Your data will be here...');
  let [buttonHide, setButtonHide] = useState(0);
  

  const buttonHandler = async () => {
    let arrD = [];
    for (let i = 0; i < urlSet.length; i++) {
      // console.log(x++, urlSet[i]);
      const getData = await pullTheData(urlSet[i]);
      if (getData) {
        const useData = getData.data;
        arrD.push({ data: useData, fileName: filenameSet[i] });
        setLoading(`Got Data for File No. ${i + 1}`);
      }
    }
    setIncomingAlt(arrD);
    setLoading('');
    urlSet = [];
    filenameSet = [];
    setButtonHide(1);
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

  //FILE RESIZER

  // AMIT, PLACE YOUR CODE HERE _________________________

  const fileUploader = async (e) => {

    setLoading('converting files...');

    var filesData = e.target.files;
    var maxImageSizeMB = 0.5;

    for (let x = 0; x < filesData.length; x++) {
      setLoading(`File No. ${x + 1} being converted...`);

      //RESIZE THE FILES

      const imageFile = filesData[x];
      const imageFileSize = imageFile.size / 1024 / 1024;
      console.log(`originalFile size ${imageFileSize} MB`); // before file compression

      const formData = new FormData();

      const options = {
        maxSizeMB: maxImageSizeMB,
        maxWidthOrHeight: 500,
        useWebWorker: false,
      };

      try {
        if (imageFileSize > maxImageSizeMB) {
          const compressedFile = await imageCompression(imageFile, options); // file compression
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
          ); // after file compression
          formData.append('file', compressedFile, filesData[x].name);
        } else {
          console.log(`compress করার প্রয়োজন নেই `);
          formData.append('file', imageFile, filesData[x].name);
        }
      } catch (error) {
        console.log(error);
      }

      // AMIT, PLACE YOUR CODE HERE _________________________

      await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result.link);
          urlSet.push(result.link);
          filenameSet.push(filesData[x].name);
          setLoading('Sending Data to File.io...');
        });
    }
    if (filesData.length === urlSet.length && urlSet.length !== 0) {
      buttonHandler();
      setLoading('Requested Backend to generate text...');
    }
  };

  return (
    <>
      <h3>Upload Multiple Images, It will show you the Texts</h3>
      {/* {!buttonHide && <input
        accept="image/*"
        type={'file'}
        onChange={fileUploader}
        multiple
      ></input>} */}

      <input
        accept="image/*"
        type={'file'}
        onChange={fileUploader}
        multiple
      ></input>

      <p>{loading}</p>
      {loading && <span className={styles.loader}></span>}
      {/* {incomingAlt &&
        incomingAlt.map((units) => <li key={Math.random()}>{units.data}</li>)} */}
      <br />
      <label htmlFor='toggleSwitch'>HTML or Text</label>
      <input id='toggleSwitch' onChange={toggleButton} type='checkbox' />
      {incomingAlt && blockState === 1 &&
        <CopyBlock
          text={incomingAlt && incomingAlt.map((units) => { return (`<img src="${units.fileName}" alt="${units.data}">\n`) }).join("")}
          language='html'
          showLineNumbers={true}
          theme={dracula}
          wrapLines={true}
          codeBlock
        />
      }
      {incomingAlt && blockState === 0 &&
        <CopyBlock
          text={incomingAlt && incomingAlt.map((units) => { return (`File Name: ${units.fileName} \n Description: ${units.data}\n\n`) }).join("")}
          language='text'
          codeBlock
          showLineNumbers={false}
          theme={dracula}
          wrapLines={true}
        />
      }
    </>
  );
};

export default Multiple;
