import React from "react"

import styled from "./Loading.style"

const LoadingComponent = () => {
  return (
    <styled.Wrapper>
      <styled.Container>
        <styled.Icon>Icon</styled.Icon>
        <styled.Text>Loading...</styled.Text>
      </styled.Container>
    </styled.Wrapper>
  )
}

export default LoadingComponent
