import "./App.css";
import { useState } from "react";
// import google from 'googleapis'
// import google from 'react-google-login';
// import { Storage } from '@google-cloud/storage'
import { GoogleLogin } from "@react-oauth/google";
// import * as google from 'google-auth-library'

function App() {

//   const { getStorage, ref } = require("firebase/storage");

// const storage = getStorage();

// const bucket = ref(storage, 'my-bucket');

// const endpoint = bucket.location.concat('.appspot.com');

// console.log(endpoint);

  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [uploadStatus, setUploadStatus] = useState(null); // State to track upload status

  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Get the selected file
    setUploadStatus(null); // Reset upload status on file change
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    // Implement file validation (e.g., size, type) here if needed
    if (selectedFile.size > 1024 * 1024 * 5) { // Example: Max file size 5MB
      alert("File size exceeds limit (5MB). Please select a smaller file.");
      return;
    }

    if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
      alert("Invalid file type. Only PNG and JPG files are supported.");
      return;
    }

    const file = document.getElementById('image-file').files[0];
        if (!file) {
            alert('Please select an image file.');
            return;
        }

        // Authenticate with Google Cloud
        // const credentials = await google.auth.getClient({
        //     scopes: ['https://www.googleapis.com/auth/cloud-platform']
        // });

        // try {
        //     // Upload the image to GCS
        //     const storage = new Storage(credentials);
        //     const bucket = storage.bucket('my-colab-images');
        //     const blob = bucket.file(file.name);
        //     await blob.upload(file);

            // Share the image URL with Colab
            // ... (implementation based on your Colab interaction method)

        //     alert('Image uploaded successfully!');
        // } catch (error) {
        //     console.error('Upload error:', error);
        //     alert('Failed to upload image. Please try again.');
        // }

        
    try {
      // Send the file to your backend using fetch or a library like Axios
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/i-need-an-endpoint", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadStatus("Upload successful!"); // Update upload status
      console.log("Upload response:", data);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again. Check console to know the reason causing the error.");
    }
  };

  return (
    <>
      <div className="App">
        <div className="heading">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          <h1>Result Validator</h1>
        </div>
        <h2>Click on the following button to upload your answer as a screenshot!</h2>
        <h2>It supports .png & .jpg files</h2>
        <input type="file" id="image-file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
    </>
  );
}

export default App;
