import React from "react"

// Components
import Header from "./Header"
import Footer from "./Footer"

export interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div id="page">
      <Header />
      <div id="content">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
