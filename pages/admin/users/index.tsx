import type { NextPage } from "next"
import React from "react"
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import { Page, Card, Filters, ChoiceList, Badge, Link, IndexTable, useIndexResourceState } from "@shopify/polaris"
import type { AppliedFilterInterface } from "@shopify/polaris"
import Moment from "react-moment"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hocs/withAuth"

const USERS_QUERY = gql`
  query Users($roles: [String], $search: String!, $page: Int, $limit: Int) {
    users(roles: $roles, search: $search, page: $page, limit: $limit) {
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

const ROLES_QUERY = gql`
  query Roles {
    roles {
      name
      slug
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
  const [page, setPage] = React.useState(1)

  const handleRolesChange = React.useCallback((value) => setRoles(value), [])
  const handleResetRoles = React.useCallback(() => setRoles([]), [])
  const handleQueryChange = React.useCallback((value) => setQuery(value), [])
  const handleResetQuery = React.useCallback(() => setQuery(""), [])

  const handleFiltersClearAll = React.useCallback(() => {
    handleResetRoles()
    handleResetQuery()
  }, [handleResetRoles, handleResetQuery])

  // Filters
  const { data: rolesData } = useQuery(ROLES_QUERY)
  const rolesOptions = rolesData?.roles?.map((role: any) => ({
    label: role.name,
    value: role.slug,
  }))

  const filters = [
    {
      key: "roles",
      label: "Roles",
      filter: (
        <ChoiceList
          title="Availability"
          titleHidden
          choices={rolesOptions}
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
  const [fetchUsers, { loading, error, data }] = useLazyQuery(USERS_QUERY)
  const users = data?.users || []
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(users)

  React.useEffect(() => {
    fetchUsers({ variables: { roles, page, search: query, limit: 25 } })
  }, [query, roles])

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
                <IndexTable.Cell>
                  <Moment date={user.createdAt} titleFormat="YYYY-MM-DD h:mm:ss a" fromNow withTitle />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Moment date={user.updatedAt} titleFormat="YYYY-MM-DD h:mm:ss a" fromNow withTitle />
                </IndexTable.Cell>
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
