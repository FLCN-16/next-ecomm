import React from 'react'

import styled from './Auth.style'


interface Props {
  children: React.ReactNode
}


const AuthComponent: React.FC<Props> = ({children}) => {
  return (
    <styled.Wrapper>
      <styled.ContentContainer>
        <styled.backgroundImage
          src="/assets/images/login-bg2.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="cover"
        />

        <styled.FormContainer>
          {children}
        </styled.FormContainer>
      </styled.ContentContainer>
    </styled.Wrapper>
  )
}

export default AuthComponent