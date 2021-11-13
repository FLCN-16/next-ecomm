import React from 'react'
import { AppProvider } from '@shopify/polaris';

import theme from '../theme'

// Styling
import '@shopify/polaris/build/esm/styles.css';
import styled from './Auth.style'


interface Props {
  children: React.ReactNode
}


const AuthContainer: React.FC<Props> = ({children}) => {
  return (
    <AppProvider i18n={{}} theme={theme}>
      <styled.Wrapper>
        <styled.FormContainer>
          {children}
        </styled.FormContainer>
      </styled.Wrapper>
    </AppProvider>
  )
}

export default AuthContainer