import React from 'react'
import { useForm, Controller, SubmitHandler  } from "react-hook-form";
import {
  Form, FormLayout, TextField,
  Checkbox, Button, Card, Banner
} from '@shopify/polaris'

import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from '@flcn-ecomm/store/auth/action'

import AuthContainer from '..'

import styled from './Login.style'


interface IFormInput {
  login: string
  password: string
  remember: boolean
}


const LoginContainer = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: '',
      remember: false
    }
  });

  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.get('loading'))

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(startLoading())

    setTimeout(() => {
      dispatch(stopLoading())
    }, 2000)
  }

  return (
    <AuthContainer>
      <Card
        title="Store Login"
        sectioned
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            <Controller
              control={control}
              rules={{ required: true }}
              name="login"
              render={({ field: { ref, ...field_props } }) => (
                <TextField
                  id="login"
                  label="Login"
                  placeholder="Username or Email"
                  autoComplete="email"
                  requiredIndicator={true}
                  disabled={loading}
                  error={errors.login?.type === 'required' && 'Login is required'}
                  {...field_props}
                />
              )}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              name="password"
              render={({ field: { ref, ...field_props } }) => (
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  autoComplete="off"
                  requiredIndicator={true}
                  disabled={loading}
                  error={errors.password?.type === 'required' && 'Password is required'}
                  {...field_props}
                />
              )}
            />

            <styled.ActionWrapper>
              <Controller
                control={control}
                name="remember"
                render={({ field: { value, ref, ...field_props } }) => (
                  <Checkbox
                    id="remember"
                    label="Remember Me"
                    checked={value}
                    disabled={loading}
                    {...field_props}
                  />
                )}
              />

              <Button size="slim" primary submit loading={loading}>Sign In</Button>
            </styled.ActionWrapper>

            <div style={{textAlign: 'center'}}>
              Forgot your account password? {' '}
              <Button url="/admin/auth/forgot" disabled={loading} plain monochrome>Click here</Button>
            </div>
          </FormLayout>
        </Form>
      </Card>
    </AuthContainer>
  )
}

export default LoginContainer