import styled from 'styled-components'
import Image from 'next/image'


export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #fafafa;
`

export const backgroundImage = styled(Image)`
  z-index: 0;
  filter: grayscale(40%);
`

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`

export const FormContainer = styled.div`
  flex: 0 0 460px;
  backdrop-filter: blur(16px) saturate(171%);
  -webkit-backdrop-filter: blur(16px) saturate(171%);
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  z-index: 1;
`

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 18px;
  }
`

export const Label = styled.label`
  display: inline-block;
  color: #333333;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  background: rgba(0, 0, 0, 0.075);
  padding: 6px 12px;
  border-radius: 4px;
  color: #000000;
  outline: none;
`

export const ActionContainer = styled.div`
  display: flex;
`


export default {
  Wrapper,
  ContentContainer,
  FormContainer,
  backgroundImage
}