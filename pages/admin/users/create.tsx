import type { NextPage } from "next"
import React from "react"
import { useRouter } from "next/router"
import { gql, useMutation } from "@apollo/client"
import client from "../../../lib/graphql"
import { Page, Card, FormLayout, TextField, Select } from "@shopify/polaris"
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

interface UserRole {
  name: string
  slug: string
}

interface IProps {
  userRoles?: UserRole[]
}

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ID
      firstName
      lastName
      username
      email
      role
      verified
    }
  }
`

const CreateUserComponent: NextPage<IProps> = ({ userRoles }) => {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [createUser, { loading }] = useMutation(CREATE_USER)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "",
      verified: false,
    },
  })

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    setError(null)

    createUser({
      variables: {
        input: data,
      },
    })
      .then(({ data: { createUser } }) => {
        reset()

        // Redirect to edit user page
        router.replace("/admin/users/" + createUser.ID)
      })
      .catch((e) => {
        setError(e.message)
      })
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
          onAction: handleSubmit(onSubmit),
        }}
        compactTitle
        fullWidth
      >
        <Card>
          <Card.Section title="Basic">
            <FormLayout>
              <FormLayout.Group>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { ...field_props } }) => (
                    <TextField
                      id="firstName"
                      label="First Name"
                      placeholder="First Name"
                      autoComplete="firstName"
                      requiredIndicator={true}
                      disabled={loading}
                      error={
                        errors.firstName?.type === "required" &&
                        "First Name is required"
                      }
                      {...field_props}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { ...field_props } }) => (
                    <TextField
                      id="lastName"
                      label="Last Name"
                      placeholder="Last Name"
                      autoComplete="lastName"
                      requiredIndicator={true}
                      disabled={loading}
                      error={
                        errors.lastName?.type === "required" &&
                        "First Name is required"
                      }
                      {...field_props}
                    />
                  )}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { ...field_props } }) => (
                    <TextField
                      id="username"
                      label="Username"
                      placeholder="Username"
                      autoComplete="username"
                      requiredIndicator={true}
                      disabled={loading}
                      error={
                        errors.username?.type === "required" &&
                        "Username is required"
                      }
                      {...field_props}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { ...field_props } }) => (
                    <TextField
                      id="email"
                      label="Email"
                      placeholder="Email"
                      autoComplete="email"
                      requiredIndicator={true}
                      disabled={loading}
                      error={
                        errors.email?.type === "required" && "Email is required"
                      }
                      {...field_props}
                    />
                  )}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { ...field_props } }) => (
                    <Select
                      id="role"
                      label="Role"
                      options={(userRoles || []).map((role: UserRole) => ({
                        label: role.name,
                        value: role.slug,
                      }))}
                      disabled={loading}
                      error={
                        errors.role?.type === "required" && "Role is required"
                      }
                      {...field_props}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { ...field_props } }) => (
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      autoComplete="off"
                      requiredIndicator={true}
                      disabled={loading}
                      error={
                        errors.password?.type === "required" &&
                        "Password is required"
                      }
                      {...field_props}
                    />
                  )}
                />
              </FormLayout.Group>
            </FormLayout>
          </Card.Section>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query RequiredData {
        roles {
          name
          slug
        }
      }
    `,
  })

  return {
    props: {
      userRoles: data.roles,
    },
  }
}

export default withAuth(CreateUserComponent, ["create_user"])
