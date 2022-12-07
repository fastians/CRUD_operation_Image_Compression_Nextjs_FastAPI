import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';
import Link from 'next/link';
import { FcDownload } from 'react-icons/fc';
import { FaTrash } from 'react-icons/fa';
import { useToasts } from 'react-toast-notifications';

const PickyimageList = () => {
    const api = useApiHelper();
    const { addToast } = useToasts();
    const [pickyimages, setPickyimages] = useState([]);

    const pickyimageList = () => {
        api.pickyimageList().then(res => {
            setPickyimages(res)
        })
    }

    const deletePickyimage = id => {
        api.deletePickyimage(id).then(res => {
            pickyimageList();
            addToast("Pickyimage deleted successfully!", { appearance: 'warning' })
        }).catch(error => {
            console.log(error)
        })
    }
    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "image.png"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    useEffect(() => {
        pickyimageList();
    }, [])
    return (<>
        <div className='row'>
            <div className="col-lg-8 mx-auto">
                <Link href="/add-pickyimage">
                    <a className='btn btn-outline-primary my-3' href="">Add Pickyimage</a>
                </Link>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickyimages.map(pickyimage => (
                            <React.Fragment key={pickyimage.id}>
                                <tr>
                                    <td>{pickyimage.id}</td>
                                    <td><Link href={`/pickyimage/${pickyimage.id}`}><img src={pickyimage.name} width="20" height="20"/></Link></td>
                                    <td className='d-flex justify-content-around'>
                                    <a href={pickyimage.name} download onClick={e => download(e)}><div
                                                style={{ 'color': 'blue', 'cursor': 'pointer' }}
                                            >
                                                <FcDownload />
                                            </div> </a>
                                        <div
                                            style={{ 'color': 'red', 'cursor': 'pointer' }}
                                            onClick={() => deletePickyimage(pickyimage.id)}
                                        >
                                            <FaTrash />
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default PickyimageList