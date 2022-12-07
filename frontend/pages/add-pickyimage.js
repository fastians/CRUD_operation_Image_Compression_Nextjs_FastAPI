import React, {  useState } from 'react';
import useApiHelper from '../api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const AddPickyimage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const api = useApiHelper();
    const router = useRouter();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const handleSubmit = event => {
      event.preventDefault();
      const formData2 = new FormData();
      formData2.append(
        "file",
        selectedFile,
        selectedFile.name
      );
      api.addPickyimage(formData2).then(res => {
        router.push('/')
        addToast("Pickyimage added successfully!", { appearance: 'success' })
      }).catch(error => {
          console.log(error)
      })
    }
    return (  
    
     <div className='row'>
     <div className="col-lg-8 mx-auto">
         <h4 className='text-center'>Add Pickyimage</h4>
         <hr />
         <form onSubmit={handleSubmit} action="">
             <div className="form-group mb-3">
                 <label className='form-label' htmlFor="image"></label>
                 <input type="file" onChange={changeHandler} name="image" className='form-control' accept=".jpeg, .png, .jpg" />
             </div>
             <div className="form-group mb-3">
                 <button type="submit" className='btn btn-primary w-100 my-3'>Add</button>
                 <Link href="/">Cancel</Link>
             </div>
         </form>
     </div>
 </div>
    
  );
}

export default AddPickyimage