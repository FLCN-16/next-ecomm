import styled from 'styled-components'


const Wrapper = styled.a`
  display: flex;
  align-items: center;
  width: 220px;
  color: #ffffff;
  cursor: pointer;
`

const IconWrapper = styled.span`
  display: inline-block;
  font-size: 28px;
  width: 50px;
  padding: 5px 10px;
`

const Label = styled.span`
  opacity: 1;
  transition: all 0.5s;
`


export default {
  Wrapper,
  IconWrapper,
  Label
}