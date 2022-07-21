import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { API_HOST } from '../config'
import { bytesToSize } from '../utils';

const bucketName = 'digital-bucket-prod'

function UploadObject() {
  const [file, setFile] = useState('')
  const [actionHistory, setActionHistory] = useState([])
  const inputFileRef = useRef()

  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    console.log(actionHistory)
  }, [actionHistory])

  const formHandle = async e => {
    e.preventDefault()

    if (!file)
      return

    try {
      setIsloading(true)
      console.log(file);
      const formData = new FormData();
      formData.append('file', file)

      const res = await axios.post(API_HOST + bucketName, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setActionHistory(state => [...state, { isSuccess: true, fileName: file.name,...res.data }])
    } catch (error) {
      console.error(error)
      setActionHistory(state => [...state, {isSuccess: false, fileName: file.name, ...error.response.data}])
    }

    inputFileRef.current.value = ''
    setFile(null)

    setIsloading(false)
  }

  return (
    <div className='App container'>
      <h1 className='text-center mt-5'>Upload MinIO</h1>
      <form onSubmit={formHandle}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">File:</label>
          <input type='file' name='file' className='form-control' id='file' onChange={e => setFile(e.target.files[0])} ref={inputFileRef}/>
        </div>
        {file && 
          <div className="mb-3">
            <span>File Size: {bytesToSize(file.size)}</span>
          </div>
        }
        {!isLoading ? <button className='btn btn-primary'>Upload</button> : <button className='btn btn-secondary' disabled>Loading...</button>}
        
      </form>

      <ul className='action-history mt-5'>
        {actionHistory.map((value, index) => (
          <li key={value.etag}>
            <div className={`alert ${value.isSuccess ? 'alert-success' : 'alert-danger'}`}>
              {index + 1}. {value.message}: {value.fileName}
            </div> 
          </li>))}
      </ul>
    </div>
  );
}

export default UploadObject;
