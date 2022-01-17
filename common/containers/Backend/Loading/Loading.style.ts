import styled, { keyframes } from "styled-components"

const spinAnim = keyframes`
  0% { transform: rotate(0deg); opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0.75; }
`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Icon = styled.span`
  font-size: 32px;
  animation ${spinAnim} 1s linear infinite;
`

const Text = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-wight: 700;
  font-size: 18px;
`

export default {
  Wrapper,
  Container,
  Icon,
  Text,
}
