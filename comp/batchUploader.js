'use client';
import imageCompression from 'browser-image-compression';
import { CopyBlock, dracula } from 'react-code-blocks';
import { useState } from 'react';
import Styles from '../styles/page.module.css';

var urlSet = [];
var filenameSet = [];

//DATA BEING FETCHED FROM THE NEXT BACKEND
const fetchFromBackend = async (url) => {
  //console.log(url);
  const dataFromBackend = await fetch(`/api?${url}`, { mode: 'no-cors' });
  if (dataFromBackend.ok) {
    const internal = dataFromBackend.json();
    return internal;
  }
};

const Multiple = () => {
  let [incomingAlt, setIncomingAlt] = useState(null);
  let [loading, setLoading] = useState('Your data will be here...\n\n\n');
  let [buttonHide, setButtonHide] = useState(false);
  //------------------------------input comp---------------------------------//
  let [urlData, setUrlData] = useState('');
  let [internalState, setInternalState] = useState('');

  //INPUT FORM HANDLER
  const formHandler = (e) => {
    e.preventDefault();
    let url = e.target.urlInput.value;
    sateBlockstate(1);
    if (url && !buttonHide) {
      urlSet = [];
      filenameSet = [];
      setIncomingAlt(null);
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

  const [blockState, sateBlockstate] = useState(1);
  const toggleButton = () => {
    if (blockState === 0) {
      sateBlockstate(1);
    }
    if (blockState === 1) {
      sateBlockstate(0);
    }
  };
  //CALL FUNCTION FOR EACH
  let x = 0;
  //HANDLE CLICK
  const buttonHandler = async () => {
    let arrD = [];
    for (let i = 0; i < urlSet.length; i++) {
      // console.log(x++, urlSet[i]);
      const getData = await pullTheData(urlSet[i]);
      if (getData) {
        const useData = getData.data;
        arrD.push({ data: useData, fileName: filenameSet[i] });
        setLoading(
          `Got Data for File No. ${i + 1} of ${urlSet.length} file(s).`,
        );
      }
    }
    setIncomingAlt(arrD);
    setLoading('');
    urlSet = [];
    filenameSet = [];
    setButtonHide(false);
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
    setUrlData('');
    setLoading('converting files...');
    setButtonHide(true);
    setIncomingAlt(null);

    var filesData = e.target.files;
    var maxImageSizeMB = 0.5;

    for (let x = 0; x < filesData.length; x++) {
      setLoading(
        `File No. ${x + 1} of ${filesData.length} file(s) being converted...`,
      );

      //RESIZE THE FILES

      const imageFile = filesData[x];
      const imageFileSize = imageFile.size / 1024 / 1024;
      //console.log(`originalFile size ${imageFileSize} MB`); // before file compression

      const formData = new FormData();

      const options = {
        maxSizeMB: maxImageSizeMB,
        maxWidthOrHeight: 500,
        useWebWorker: false,
      };

      try {
        if (imageFileSize > maxImageSizeMB) {
          const compressedFile = await imageCompression(imageFile, options); // file compression
          //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`,); // after file compression
          formData.append('file', compressedFile, filesData[x].name);
        } else {
          //console.log(`compress করার প্রয়োজন নেই `);
          formData.append('file', imageFile, filesData[x].name);
        }
      } catch (error) {
        console.error(error);
      }

      // AMIT, PLACE YOUR CODE HERE _________________________

      await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          //console.log('Success:', result.link);
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
      <form className={Styles.form} onSubmit={formHandler}>
        <input
          placeholder="Paste your Image URL to get the data"
          className={Styles.input}
          type="text"
          id="urlInput"
        ></input>
        <input
          className={buttonHide ? Styles.hiddenbutton : Styles.button}
          type="submit"
        ></input>
        <input
          className={Styles.inputFile}
          accept="image/*"
          type={'file'}
          onChange={fileUploader}
          multiple
        ></input>
      </form>

      {incomingAlt && (
        <input
          className={Styles.check}
          id="toggleSwitch"
          onChange={toggleButton}
          type="checkbox"
        />
      )}
      {incomingAlt && <label htmlFor="toggleSwitch">Only Text</label>}
      <br />
      {blockState === 1 && (
        <CopyBlock
          text={
            incomingAlt == null
              ? urlData == ''
                ? loading
                : `URL: ${urlData}\nDescription:\n${internalState}`
              : incomingAlt
                  .map((units) => {
                    return `<img src="${units.fileName}" alt="${units.data}">\n`;
                  })
                  .join('')
          }
          language="html"
          showLineNumbers={incomingAlt == null ? false : true}
          theme={dracula}
          wrapLines={true}
          codeBlock
        />
      )}
      {incomingAlt && blockState === 0 && (
        <CopyBlock
          text={
            incomingAlt == null
              ? urlData == ''
                ? loading
                : `URL: ${urlData}\nDescription:\n${internalState}`
              : incomingAlt
                  .map((units) => {
                    return `File Name: ${units.fileName} \n${units.data}\n\n`;
                  })
                  .join('')
          }
          language="text"
          codeBlock
          showLineNumbers={false}
          theme={dracula}
          wrapLines={true}
        />
      )}
    </>
  );
};

export default Multiple;
