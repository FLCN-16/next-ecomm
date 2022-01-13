import type { NextPage } from "next"
import React from "react"
import { withRouter, NextRouter } from "next/router"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Form, FormLayout, TextField, Checkbox, Button, Card } from "@shopify/polaris"

// Store
import { useDispatch, useSelector } from "react-redux"
import { authAccount } from "../../../store/auth/action"
import { AuthForm } from "../../../store/auth/types"

import type { RootState } from "../../../store/rootReducer"

// Containers
import BackendHead from "../../../containers/Backend/Layout/Head"
import AuthContainer from "../../../containers/Backend/Auth"

interface Props {
  router: NextRouter
}

const AdminLogin: NextPage<Props> = ({ router }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      remember: false,
    },
  })

  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.get("loading"))

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    data.redirectTo = router.query.next?.toString() || "/admin/"

    dispatch(authAccount(data))
  }

  return (
    <div>
      <BackendHead />
      <AuthContainer>
        <Card title="Store Login" sectioned>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
              <Controller
                control={control}
                rules={{ required: true }}
                name="login"
                render={({ field: { ...field_props } }) => (
                  <TextField
                    id="login"
                    label="Login"
                    placeholder="Username or Email"
                    autoComplete="email"
                    requiredIndicator={true}
                    disabled={loading}
                    error={errors.login?.type === "required" && "Login is required"}
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
                    error={errors.password?.type === "required" && "Password is required"}
                    {...field_props}
                  />
                )}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Controller
                  control={control}
                  name="remember"
                  render={({ field: { value, ref, ...field_props } }) => (
                    <Checkbox id="remember" label="Remember Me" checked={value} disabled={loading} {...field_props} />
                  )}
                />

                <Button size="slim" primary submit loading={loading}>
                  Sign In
                </Button>
              </div>

              <div style={{ textAlign: "center" }}>
                Forgot your account password?{" "}
                <Button url="/admin/auth/forgot" disabled={loading} plain monochrome>
                  Click here
                </Button>
              </div>
            </FormLayout>
          </Form>
        </Card>
      </AuthContainer>
    </div>
  )
}

export default withRouter(AdminLogin)
