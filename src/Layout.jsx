import React from 'react'

function Layout({ children }) {
  return (
    <React.Fragment>
      <div className="layout-container">
        <div className="body-container d-flex flex-row">
          <div className="navbar-container">
            <a href="/">Upload Files</a>
            <a href="/get-all-files">View all Files</a>
          </div>

          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout
