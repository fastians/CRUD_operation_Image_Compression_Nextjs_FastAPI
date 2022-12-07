import React, {  useState } from 'react';
import useApiHelper from '../api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const uploadfile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
  
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const api = useApiHelper();
    const handleSubmit = event => {
      event.preventDefault();
      const formData2 = new FormData();
      formData2.append(
        "file",
        selectedFile,
        selectedFile.name
      );
      

    const requestOptions = {
        method: 'POST',
        // mode : 'no-cors',
        //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
        body: formData2
    };
      fetch('http://127.0.0.1:8000/api/v1/compressimage/', requestOptions)
      .then((response) => console.log(response.json()))
      .then(function(response) {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    return (  <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
              <input name="image" type="file" onChange={changeHandler} accept=".jpeg, .png, .jpg"/>
          </fieldset>
          <button type="submit">Save</button>
        </form>
    </div>
  );
}

export default uploadfile