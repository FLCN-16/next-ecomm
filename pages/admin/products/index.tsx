import type { NextPage } from 'next'
import { Page, Card, Filters, EmptyState, IndexTable, useIndexResourceState } from '@shopify/polaris'

// Components
import BackendLayout from '@flcn-ecomm/container/Backend/Layout'

// HOCs
import withAuth from '@flcn-ecomm/hoc/withAuth'


const ProductEmptyState = () => (
  <EmptyState
    heading="Manage your shop products"
    action={{content: 'Add product', url: '/admin/products/new'}}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Add products to your E-Commerce store.</p>
  </EmptyState>
)


const ProductsComponent: NextPage = () => {
  let products = [{
    ID: '1',
    name: 'Product 1',
    price: '$10.00',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
    status: 'Active',
    haveStock: true,
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  }]
  products = []

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(products);

  return (
    <BackendLayout>
      <Page
        title="Products"
        subtitle="List of all products"
        compactTitle
        fullWidth
      >
        <Card>
          <IndexTable
            resourceName={{singular: 'product', plural: 'products'}}
            itemCount={products.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            emptyState={<ProductEmptyState />}
            headings={[
              {title: 'ID'},
              {title: 'Name'},
              {title: 'Status'},
              {title: 'Price'},
              {title: 'Stock Status'},
              {title: 'Created'},
              {title: 'Updated'},
              {title: 'Actions'},
            ]}
          >
            {products.map((product, index) => (
              <IndexTable.Row
                id={product.ID}
                key={product.ID}
                selected={selectedResources.includes(product.ID)}
                position={index}
              >
                <IndexTable.Cell>{product.ID}</IndexTable.Cell>
                <IndexTable.Cell>{product.name}</IndexTable.Cell>
                <IndexTable.Cell>{product.status}</IndexTable.Cell>
                <IndexTable.Cell>{product.price}</IndexTable.Cell>
                <IndexTable.Cell>{product.haveStock ? 'Yes' : 'No'}</IndexTable.Cell>
                <IndexTable.Cell>{product.createdAt}</IndexTable.Cell>
                <IndexTable.Cell>{product.updatedAt}</IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(ProductsComponent, [ 'manage_products' ])
