import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GoogleStorageFileUploader from './GoogleStorageFileUploader'
import ShowAllFiles from './ShowAllFiles'
function Pathroutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<GoogleStorageFileUploader />} />
        <Route path={`/get-all-files`} element={<ShowAllFiles />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pathroutes
