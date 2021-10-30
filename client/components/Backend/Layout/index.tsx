import React from 'react'

// Components
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div id="page" className="bg-gray-800">
      <Header />
      <div id="content-wrapper" className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Container */}
        <div className="flex-1 p-2">
          <div className="content">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout