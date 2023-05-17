import React, { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Layout'

function GoogleStorageFileUploader() {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [dataloaded, setDataloaded] = useState(true)
  const successNotify = (message) =>
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  const errorNotify = (message) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  const handleSubmit = async (e) => {
    setDataloaded(false)

    e.preventDefault()
    let formData = new FormData()
    formData.append('file', file.data)
    const response = await fetch(
      'http://localhost:5000/upload-file-to-cloud-storage',
      {
        method: 'POST',
        body: formData,
      },
    )
    const responseWithBody = await response.json()
    console.log(responseWithBody)
    setDataloaded(true)
    if (response.status === 200) {
      successNotify(responseWithBody.message)
      setUrl(responseWithBody.url)
    } else {
      errorNotify(responseWithBody.message)
    }
  }
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setFile(img)
  }
  return (
    <React.Fragment>
      <Layout>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="image-preview-container">
              {file ? (
                <img src={file.preview} alt="File to upload" />
              ) : (
                <img
                  src="https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
                  alt="Fallback"
                />
              )}
            </div>
            <div className="file-name">
              {file && file.data.name}
              {url && (
                <a href={url} target="_blank" rel="noreferrer">
                  <FiExternalLink />
                </a>
              )}
            </div>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="custom-file-input"
            ></input>
            <button className="submit-button" type="submit" disabled={!file}>
              Submit
            </button>
          </form>
          <ToastContainer />
          {!dataloaded && <Loader />}
        </div>
      </Layout>
    </React.Fragment>
  )
}
export default GoogleStorageFileUploader
