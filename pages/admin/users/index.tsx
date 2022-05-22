import React from "react"
import type { NextPage } from "next"
import {
  ActionList,
  AppliedFilterInterface,
  Popover,
  Button,
  Page,
  Card,
  Filters,
  ChoiceList,
  Badge,
  Link,
  IndexTable,
  useIndexResourceState,
  Pagination,
} from "@shopify/polaris"
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import Moment from "react-moment"
import useLazyEffect from "../../../common/hooks/useLazyHook"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hocs/withAuth"

const USERS_QUERY = gql`
  query Users(
    $roles: [String]
    $search: String!
    $verified: Boolean
    $page: Int
    $limit: Int
  ) {
    users(
      roles: $roles
      search: $search
      verified: $verified
      page: $page
      limit: $limit
    ) {
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
function disambiguateLabel(key: string, value: string | string[]) {
  switch (key) {
    case "roles":
      return "Have Roles: " + (value as string[]).join(", ")
    case "verified":
      return "Is Verified: " + (value === "yes" ? "Yes" : "No")
  }

  return value
}

interface RoleOption {
  label: string
  value: string
}

const UsersComponent: NextPage = () => {
  const [limit, setLimit] = React.useState(25)
  const [page, setPage] = React.useState(1)

  const [query, setQuery] = React.useState("")
  const [roles, setRoles] = React.useState<string[]>([])
  const [verified, setVerified] = React.useState("both")
  const [activeActionUser, setActiveActionUser] = React.useState<string | null>(
    null
  )

  const handleRolesChange = React.useCallback(
    (value: string[]) => setRoles(value),
    []
  )
  const handleResetRoles = React.useCallback(() => setRoles([]), [])
  const handleQueryChange = React.useCallback(
    (value: string) => setQuery(value),
    []
  )
  const handleResetQuery = React.useCallback(() => setQuery(""), [])
  const handleVerifiedChange = React.useCallback(
    (value: string[]) => setVerified(value[0]),
    []
  )
  const handleResetVerified = React.useCallback(() => setVerified("both"), [])

  const handleFiltersClearAll = React.useCallback(() => {
    handleResetRoles()
    handleResetQuery()
    handleResetVerified()
  }, [handleResetRoles, handleResetQuery, handleResetVerified])

  // Filters
  const { data: rolesData } = useQuery(ROLES_QUERY, { pollInterval: 60 * 1000 })
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
    {
      key: "verified",
      label: "Verified",
      filter: (
        <ChoiceList
          title="Verified"
          titleHidden
          choices={[
            { label: "Both", value: "both" },
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          selected={[verified]}
          onChange={handleVerifiedChange}
        />
      ),
      shortcut: true,
    },
  ]

  // Applied Filters
  const appliedFilters: AppliedFilterInterface[] = []
  if (roles.length) {
    const selectedRoles = rolesOptions?.filter((role: RoleOption) =>
      roles.includes(role.value)
    )

    appliedFilters.push({
      key: "roles",
      label: disambiguateLabel(
        "roles",
        selectedRoles.map((role: RoleOption) => role.label)
      ).toString(),
      onRemove: handleResetRoles,
    })
  }
  if (verified !== "both") {
    appliedFilters.push({
      key: "verified",
      label: disambiguateLabel("verified", verified).toString(),
      onRemove: handleResetVerified,
    })
  }

  // Fetch Data
  const [fetchUsers, { loading, error, data }] = useLazyQuery(USERS_QUERY)
  const users = data?.users || []
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(users)

  useLazyEffect(() => {
    let isVerified: boolean | null = verified === "yes" ? true : false
    if (verified === "both") {
      isVerified = null
    }

    fetchUsers({
      variables: { roles, verified: isVerified, search: query, limit, page },
    })
  }, [query, roles, verified, page, limit])

  return (
    <BackendLayout>
      <Page
        title="Users"
        primaryAction={{
          content: "Add User",
          url: "/admin/users/create",
        }}
        fullWidth
      >
        <Card>
          <Card.Section>
            <Filters
              queryValue={query}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleQueryChange}
              onQueryClear={handleResetQuery}
              onClearAll={handleFiltersClearAll}
              disabled={loading}
            />
          </Card.Section>

          <IndexTable
            resourceName={{ singular: "User", plural: "Users" }}
            itemCount={users.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
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
              <IndexTable.Row
                id={user.ID}
                key={user.ID}
                selected={selectedResources.includes(user.ID)}
                position={index}
              >
                <IndexTable.Cell>
                  <Link
                    key={user.ID}
                    url={`/admin/users/${user.ID}`}
                    removeUnderline
                  >
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
                <IndexTable.Cell>
                  {user.verified ? "YES" : "NO"}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Moment
                    date={user.createdAt}
                    titleFormat="YYYY-MM-DD h:mm:ss a"
                    fromNow
                    withTitle
                  />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Moment
                    date={user.updatedAt}
                    titleFormat="YYYY-MM-DD h:mm:ss a"
                    fromNow
                    withTitle
                  />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Popover
                    active={activeActionUser === user.ID}
                    activator={
                      <Button
                        onClick={() => setActiveActionUser(user.ID)}
                        disclosure
                      >
                        More actions
                      </Button>
                    }
                    onClose={() => setActiveActionUser(null)}
                  >
                    <ActionList
                      actionRole="menuitem"
                      items={[
                        {
                          content: "Edit",
                          url: `/admin/users/${user.ID}`,
                        },
                        {
                          content: "Delete",
                        },
                      ]}
                    />
                  </Popover>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>

          <Card.Section>
            {users.length === limit && (
              <Pagination
                hasPrevious={page > 1}
                hasNext={users.length === limit}
                onPrevious={() => setPage(page - 1)}
                onNext={() => setPage(page + 1)}
              />
            )}
          </Card.Section>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(UsersComponent, ["create_user", "manage_users"])
