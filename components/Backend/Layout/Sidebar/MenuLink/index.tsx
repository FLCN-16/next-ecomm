import React from 'react'
import Link, { LinkProps } from 'next/link'

import styled from './MenuLink.style'


export interface Props extends LinkProps {
  Icon: JSX.Element
}

const MenuLink: React.FC<Props> = ({href, Icon, children}) => {
  return (
    <Link href={`/admin${href}`}>
      <styled.Wrapper className="menu-link">
        <styled.IconWrapper className="menu-icon">{Icon}</styled.IconWrapper>
        <styled.Label className="menu-label">{children}</styled.Label>
      </styled.Wrapper>
    </Link>
  )
}

export default MenuLink