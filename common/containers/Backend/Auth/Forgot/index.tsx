import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { Form, FormLayout, TextField, Button, Card } from "@shopify/polaris"

import AuthContainer from ".."

import styled from "./Forgot.style"

interface IFormInput {
  email: string
}

const ForgotContainer = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <AuthContainer>
      <Card title="Forgot Password" sectioned>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              name="email"
              render={({ field: { ref, ...field_props } }) => (
                <TextField
                  id="email"
                  label="Email"
                  placeholder="Email"
                  autoComplete="email"
                  requiredIndicator={true}
                  helpText="We'll send you a link to reset your password."
                  error={
                    (errors.email?.type === "required" && "Email is required") ||
                    (errors.email?.type === "pattern" && "Invalid Email Address")
                  }
                  {...field_props}
                />
              )}
            />

            <styled.ActionWrapper>
              <Button url="/admin/auth" size="slim" outline>
                Back to Login
              </Button>

              <Button size="slim" primary submit loading={false}>
                Send instructions
              </Button>
            </styled.ActionWrapper>
          </FormLayout>
        </Form>
      </Card>
    </AuthContainer>
  )
}

export default ForgotContainer
