import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';

import AuthContainer from '..'

import { ActionContainer, FieldContainer, Label, Input } from '../Auth.style'

import styled from './Login.style'


interface LoginInput {
  login: string,
  password: string,
  remember: boolean
}


const LoginContainer = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<LoginInput> = data => {
    console.log(data)
  }

  return (
    <AuthContainer>
      <styled.Form onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="Email or Username"
            autoComplete="username"
            {...register('login')}
          />
        </FieldContainer>

        <FieldContainer>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </FieldContainer>

        <ActionContainer>
          <Label className="cursor-pointer">
            <styled.Checkbox type="checkbox" {...register('remember')} />
            <span>Remember</span>
          </Label>

          <styled.LoginButton
            type="submit"
          >Login</styled.LoginButton>
        </ActionContainer>
      </styled.Form>
    </AuthContainer>
  )
}

export default LoginContainer