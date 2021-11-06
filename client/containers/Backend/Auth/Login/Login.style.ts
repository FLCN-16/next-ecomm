import styled from 'styled-components'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 75px 50px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const LoginButton = styled.button`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 3px;
  background-color: #4285f4;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: auto;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3a7bd5;
  }
`

const Checkbox = styled.input`
  display: inline-block;
  margin-right: 10px;
  background-color: transparent;
`


export default {
  Wrapper,
  Form,
  LoginButton,
  Checkbox
}