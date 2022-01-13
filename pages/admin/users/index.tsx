import type { NextPage } from "next"
import React from "react"
import { gql, useQuery } from "@apollo/client"
import { Page, Card, Filters, ChoiceList, Badge, Link, IndexTable, useIndexResourceState } from "@shopify/polaris"
import type { AppliedFilterInterface } from "@shopify/polaris"

// Components
import BackendLayout from "../../../containers/Backend/Layout"

// HOCs
import withAuth from "../../../hoc/withAuth"

const gqlquery = gql`
  query Users {
    users {
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

function disambiguateLabel(key: string, value: string[]) {
  switch (key) {
    case "roles":
      return value.join(", ")
  }

  return value
}

const UsersComponent: NextPage = () => {
  const [query, setQuery] = React.useState("")
  const [roles, setRoles] = React.useState([])

  const handleRolesChange = React.useCallback((value) => setRoles(value), [])
  const handleResetRoles = React.useCallback(() => setRoles([]), [])
  const handleQueryChange = React.useCallback((value) => setQuery(value), [])
  const handleResetQuery = React.useCallback(() => setQuery(""), [])

  const handleFiltersClearAll = React.useCallback(() => {
    handleResetRoles()
    handleResetQuery()
  }, [handleResetRoles, handleResetQuery])

  // Filters
  const filters = [
    {
      key: "roles",
      label: "Roles",
      filter: (
        <ChoiceList
          title="Availability"
          titleHidden
          choices={[
            { label: "Online Store", value: "Online Store" },
            { label: "Point of Sale", value: "Point of Sale" },
            { label: "Buy Button", value: "Buy Button" },
          ]}
          selected={roles || []}
          onChange={handleRolesChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ]

  // Applied Filters
  const appliedFilters: AppliedFilterInterface[] = []
  if (roles.length) {
    appliedFilters.push({
      key: "roles",
      label: disambiguateLabel("roles", roles).toString(),
      onRemove: handleResetRoles,
    })
  }

  // Fetch Data
  const { data, loading } = useQuery(gqlquery)

  const users = loading ? [] : data.users

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(users)

  return (
    <BackendLayout>
      <Page title="Users" subtitle="List of all users" compactTitle fullWidth>
        <Card>
          <Card.Section>
            <Filters
              queryValue={query}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleQueryChange}
              onQueryClear={handleResetQuery}
              onClearAll={handleFiltersClearAll}
            />
          </Card.Section>

          <IndexTable
            resourceName={{ singular: "user", plural: "users" }}
            itemCount={users.length}
            selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Username" },
              { title: "Name" },
              { title: "Email" },
              { title: "Role" },
              { title: "Verified" },
              { title: "Created" },
              { title: "Updated" },
              { title: "Actions" },
            ]}
            loading={loading}
          >
            {users.map((user: any, index: number) => (
              <IndexTable.Row id={user.ID} key={user.ID} selected={selectedResources.includes(user.ID)} position={index}>
                <IndexTable.Cell>
                  <Link key={user.ID} url={`/admin/users/${user.ID}`} removeUnderline>
                    {user.username}
                  </Link>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {user.firstName} {user.lastName}
                </IndexTable.Cell>
                <IndexTable.Cell>{user.email}</IndexTable.Cell>
                <IndexTable.Cell>
                  <Badge status="info">{user.role.toUpperCase()}</Badge>
                </IndexTable.Cell>
                <IndexTable.Cell>{user.verified ? "YES" : "NO"}</IndexTable.Cell>
                <IndexTable.Cell>{user.createdAt}</IndexTable.Cell>
                <IndexTable.Cell>{user.updatedAt}</IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(UsersComponent, ["create_user"])
// export default withAuth(UsersComponent, [ 'manage_users' ])
