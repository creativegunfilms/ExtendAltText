'use client';
export default function FileUploader() {
  //FILE RESIZER

  // AMIT, PLACE YOUR CODE HERE _________________________

  const fileUploader = async (e) => {
    var filesData = e.target.files;

    for (let x = 0; x < filesData.length; x++) {
      //RESIZE THE FILES

      // AMIT, PLACE YOUR CODE HERE _________________________

      const formData = new FormData();
      formData.append('file', filesData[x], filesData[x].name);

      await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result.link);
        });
    }
  };

  return (
    <div>
      {/* FILE UPLOADER */}
      <input type={'file'} onChange={fileUploader} multiple></input>
    </div>
  );
}
