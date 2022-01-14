import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 480px;
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
  background: rgba(0, 0, 0, 0.15);
  padding: 6px 12px;
  border-radius: 4px;
  color: #000000;
  outline: none;

  &::placeholder {
    color: #333333;
  }

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.25);
  }
`

export const ActionContainer = styled.div`
  display: flex;
`

const Styles = {
  Wrapper,
  FormContainer,
}

export default Styles
