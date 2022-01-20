import type { NextPage } from "next"
import React from "react"
import { Page, Card, EmptyState, IndexTable, useIndexResourceState } from "@shopify/polaris"

// Components
import BackendLayout from "../../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../../common/hocs/withAuth"

const CategoryEmptyState = () => (
  <EmptyState
    heading="Manage your shop categories"
    action={{ content: "Add category", url: "/admin/categories/new" }}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Add categories to your E-Commerce store.</p>
  </EmptyState>
)

const CategoriesComponent: NextPage = () => {
  let categories = [
    {
      ID: "1",
      name: "Category 1",
      price: "$10.00",
      thumbnail: "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg",
      status: "Active",
      haveStock: true,
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
    },
  ]
  categories = []

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(categories)

  return (
    <BackendLayout>
      <Page title="Categories" subtitle="List of all categories" compactTitle fullWidth>
        <Card>
          <IndexTable
            resourceName={{ singular: "category", plural: "categories" }}
            itemCount={categories.length}
            selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
            onSelectionChange={handleSelectionChange}
            emptyState={<CategoryEmptyState />}
            headings={[
              { title: "ID" },
              { title: "Name" },
              { title: "Status" },
              { title: "Price" },
              { title: "Stock Status" },
              { title: "Created" },
              { title: "Updated" },
              { title: "Actions" },
            ]}
          >
            {categories.map((category, index) => (
              <IndexTable.Row id={category.ID} key={category.ID} selected={selectedResources.includes(category.ID)} position={index}>
                <IndexTable.Cell>{category.ID}</IndexTable.Cell>
                <IndexTable.Cell>{category.name}</IndexTable.Cell>
                <IndexTable.Cell>{category.status}</IndexTable.Cell>
                <IndexTable.Cell>{category.price}</IndexTable.Cell>
                <IndexTable.Cell>{category.haveStock ? "Yes" : "No"}</IndexTable.Cell>
                <IndexTable.Cell>{category.createdAt}</IndexTable.Cell>
                <IndexTable.Cell>{category.updatedAt}</IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(CategoriesComponent, ["manage_categories"])
