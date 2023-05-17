import React, { useState, useLayoutEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Layout'
import axios from 'axios'

function ShowAllFiles() {
  const [dataloaded, setDataloaded] = useState(false)
  const [files, setFiles] = useState(null)
  const fetchAllImages = async () => {
    const response = await axios('http://localhost:5000/get-files-list', {
      method: 'GET',
    })
    setDataloaded(true)
    return response?.data?.files
  }
  useLayoutEffect(() => {
    fetchAllImages().then((a) => {
      //  console.log(a)
      setFiles(a)
    })
  }, [])
  return (
    <React.Fragment>
      <Layout>
        <div className="all-files-wrapper">
          <h1>List of Files in GCS</h1>
          {files && <h3>Total files - {files.length}</h3>}
          {files && (
            <div className="all-files-container">
              <ol type="1">
                {files.map((item, index) => (
                  <li
                    className="single-file-container"
                    key={JSON.stringify(item)}
                  >
                    <a
                      href={`${process.env.REACT_APP_IMAGE_URL_PREFIX}${item.name}`}
                      target="_blank"
                    >
                      {' '}
                      <div className="single-file-link">
                        <div className="single-file-name">{item.name}</div>
                        <div className="list-preview-image-container">
                          <img
                            className="list-preview-image-container"
                            src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}${item.name}`}
                            alt={item.name}
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        {dataloaded && <Loader />}
      </Layout>
    </React.Fragment>
  )
}

export default ShowAllFiles
