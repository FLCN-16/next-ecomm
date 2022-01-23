import type { NextPage } from "next"
import React from "react"
import { gql, useMutation } from "@apollo/client"
import {
  Page,
  Card,
  Form,
  FormLayout,
  TextField,
  Checkbox,
  Button,
} from "@shopify/polaris"
import { useForm, Controller, SubmitHandler } from "react-hook-form"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hocs/withAuth"

interface UserForm {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  role: string
  verified: boolean
}

const CreateUserComponent: NextPage = () => {
  const [loading, setLoading] = React.useState(false)

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm()

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    console.log(data)
  }

  return (
    <BackendLayout>
      <Page
        title="Create User"
        subtitle="Create a new user"
        breadcrumbs={[{ content: "Users", url: "/admin/users" }]}
        primaryAction={{
          content: "Create User",
          disabled: !isDirty || loading,
          onAction: () => {
            console.log(getValues())
          },
        }}
        compactTitle
        fullWidth
      >
        <Card sectioned>
          <FormLayout>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { ...field_props } }) => (
                <TextField
                  id="firstName"
                  label="First Name"
                  placeholder="Username or Email"
                  autoComplete="email"
                  disabled={loading}
                  error={
                    errors.login?.type === "required" &&
                    "First Name is required"
                  }
                  {...field_props}
                />
              )}
            />
          </FormLayout>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(CreateUserComponent, ["create_user"])
