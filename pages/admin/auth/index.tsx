import type { NextPage } from 'next'
import { useForm, Controller, SubmitHandler  } from "react-hook-form";
import {
  Form, FormLayout, TextField,
  Checkbox, Button, Card
} from '@shopify/polaris'

// Store
import { useDispatch, useSelector } from 'react-redux'
import { authAccount } from '@flcn-ecomm/store/auth/action'
import { AuthForm } from '@flcn-ecomm/store/auth/types'

import type { RootState } from '@flcn-ecomm/store/rootReducer'

// Containers
import BackendHead from '@flcn-ecomm/container/Backend/Layout/Head'
import AuthContainer from '@flcn-ecomm/container/Backend/Auth'


const AdminLogin: NextPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: '',
      remember: false
    }
  });

  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.get('loading'))

  const onSubmit: SubmitHandler<AuthForm> = data => {
    dispatch(authAccount(data))
  }

  return (
    <div>
      <BackendHead />
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
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
              </div>

              <div style={{textAlign: 'center'}}>
                Forgot your account password? {' '}
                <Button url="/admin/auth/forgot" disabled={loading} plain monochrome>Click here</Button>
              </div>
            </FormLayout>
          </Form>
        </Card>
      </AuthContainer>
    </div>
  )
}

export default AdminLogin
