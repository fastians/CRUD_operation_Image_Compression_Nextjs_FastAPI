import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useApiHelper from '../../api';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const ShowPickyimage = () => {
    const api = useApiHelper();
    const router = useRouter();
    const { id } = router.query
    // console.log(id);
    const [pickyimage, setPickyimage] = useState({});

    useEffect(() => {
        api.pickyimageDetails(id).then(res => {
            const data = {
                'name': res.name,
            }
            setPickyimage(data)
        }).catch(error => {
            console.log(error)
        })
    }, [id])
    return (
        <div className='row'>
            <div className="col-lg-8 mx-auto">
                <h4 className='text-center'>Pickyimage {id}</h4>
                <hr />
                    <img src={pickyimage.name} />
                    <div className="form-group mb-3">
                        <Link href="/">Home</Link>
                    </div>
            </div>
        </div>
    )
}

export default ShowPickyimage