import React, { FormEvent } from 'react'
import Link from 'next/link'

import {
  Form, FormLayout, TextField,
  Checkbox, Button, Card
} from '@shopify/polaris'

import AuthContainer from '..'

import styled from './Login.style'


const LoginContainer = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState({ login: '', password: '' });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Reset errors
    setErrors({ login: '', password: '' });

    if (! login || ! password) {
      setErrors({
        login: ! login ? 'Login is required' : '',
        password: ! password ? 'Password is required' : ''
      });

      return;
    }
  }

  return (
    <AuthContainer>
      <Card sectioned>
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <TextField
              type="text"
              label="Login"
              name="login"
              value={login}
              placeholder="Username or Email"
              onChange={setLogin}
              autoComplete="email"
              requiredIndicator={true}
              error={errors.login}
            />

            <TextField
              type="password"
              label="Password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={setPassword}
              autoComplete="off"
              requiredIndicator={true}
              error={errors.password}
            />

            <styled.ActionWrapper>
              <Checkbox
                label="Remember Me"
                checked={remember}
                onChange={setRemember}
              />

              <Button
                size="slim"
                primary
                submit
                loading={false}
              >Sign In</Button>
            </styled.ActionWrapper>

            <div style={{textAlign: 'center'}}>
              Forgot your account password? {' '}
              <Link href="/admin/auth/forgot-password">
                <Button
                  plain
                  monochrome
                >Click here</Button>
              </Link>
            </div>
          </FormLayout>
        </Form>
      </Card>
    </AuthContainer>
  )
}

export default LoginContainer