import type { NextPage } from 'next'
import { Page, Card, Filters, EmptyState, IndexTable, useIndexResourceState } from '@shopify/polaris'

// Components
import BackendLayout from '@flcn-ecomm/container/Backend/Layout'

// HOCs
import withAuth from '../../../hoc/withAuth'


const UsersComponent: NextPage = () => {
  let users = [{
    ID: '1',
    name: 'User 1',
    username: 'admin',
    email: 'email@gmail.com',
    roles: [],
    status: 'ACTIVE',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  }]
  users = []

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(users);

  return (
    <BackendLayout>
      <Page
        title="Users"
        subtitle="List of all users"
        compactTitle
        fullWidth
      >
        <Card>
          <IndexTable
            resourceName={{singular: 'user', plural: 'users'}}
            itemCount={users.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              {title: 'ID'},
              {title: 'Name'},
              {title: 'Username'},
              {title: 'Email'},
              {title: 'Roles'},
              {title: 'Status'},
              {title: 'Created'},
              {title: 'Updated'},
              {title: 'Actions'},
            ]}
          >
            {users.map((user, index) => (
              <IndexTable.Row
                id={user.ID}
                key={user.ID}
                selected={selectedResources.includes(user.ID)}
                position={index}
              >
                <IndexTable.Cell>{user.ID}</IndexTable.Cell>
                <IndexTable.Cell>{user.name}</IndexTable.Cell>
                <IndexTable.Cell>{user.username}</IndexTable.Cell>
                <IndexTable.Cell>{user.email}</IndexTable.Cell>
                <IndexTable.Cell>{user.roles.join(', ')}</IndexTable.Cell>
                <IndexTable.Cell>{user.status}</IndexTable.Cell>
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

export default withAuth(UsersComponent, [ 'manage_users' ])
