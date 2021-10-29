import React, { useState } from 'react'

import {
  MdPushPin, MdOutlinePushPin, MdSpaceDashboard
} from "react-icons/md";

import MenuLink from './MenuLink'
import styled from './Sidebar.style'


const Sidebar: React.FC = () => {
  const [ pinned, setPinned ] = useState(true)

  return (
    <styled.Wrapper
      className="min-h-screen"
      pinned={pinned}
    >
      <styled.Header>
        <div className="brand">
          <span className="logo">B</span>
          <span className="name">Brand</span>
        </div>

        <styled.MenuToggler
          onClick={() => setPinned(!pinned)}
        >
          {pinned ? <MdPushPin /> : <MdOutlinePushPin />}
        </styled.MenuToggler>
      </styled.Header>

      {/* Sidebar Menu */}
      <styled.Menu>
        <styled.MenuItem>
          <MenuLink
            href="/"
            Icon={<MdSpaceDashboard />}
          >Dashboard</MenuLink>
        </styled.MenuItem>
      </styled.Menu>
    </styled.Wrapper>
  )
}

export default Sidebar