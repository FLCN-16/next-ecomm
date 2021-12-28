import React from 'react'

import { ImSpinner2 } from "react-icons/im";
import styled from './Loading.style'


const LoadingComponent = () => {
  return (
    <styled.Wrapper>
      <styled.Container>
        <styled.Icon>
          <ImSpinner2 />
        </styled.Icon>
        <styled.Text>Loading...</styled.Text>
      </styled.Container>
    </styled.Wrapper>
  )
}

export default LoadingComponent