import type { NextPage } from "next"
import React from "react"
import { useRouter } from "next/router"
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import { Page, Card } from "@shopify/polaris"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hocs/withAuth"

const USER_QUERY = gql`
  query User($ID: String!) {
    user(ID: $ID) {
      ID
      firstName
      lastName
      username
      email
      role
      verified
      createdAt
      updatedAt
    }
  }
`

const UserComponent: NextPage = () => {
  const router = useRouter()
  const { ID } = router.query

  const [fetchUser, { loading, error, data }] = useLazyQuery(USER_QUERY)

  React.useEffect(() => {
    if (ID) {
      fetchUser({ variables: { ID } })
    }
  }, [fetchUser, ID])

  return (
    <BackendLayout>
      <Page title="User" subtitle={data ? `Edit ${data.user.username}` : ""} compactTitle fullWidth>
        <Card></Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(UserComponent)
