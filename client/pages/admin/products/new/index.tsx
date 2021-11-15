import React, { FormEvent } from 'react'
import type { NextPage } from 'next'
import {
  Page, Card, Layout, Form, TextField,
  ContextualSaveBar, Button,
} from '@shopify/polaris'

// Components
import BackendLayout from '@flcn-ecomm/container/Backend/Layout'

// HOCs
import withAuth from '../../../../hoc/withAuth'



const ProductsComponent: NextPage = () => {
  const [name, setName] = React.useState('')

  const handleSubmit = (event: FormEvent) => {

  }

  return (
    <BackendLayout>
      <Page
        title="Add Product"
        subtitle="Add a new product for your shop."
        compactTitle
        fullWidth
      >
        <ContextualSaveBar
          message="Your changes have been saved."
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
          fullWidth
        />

        <Layout>
          <Layout.Section>
            <Card
              title={(
                <TextField
                  type="text"
                  label="Product Name"
                  name="name"
                  value={name}
                  onChange={setName}
                  placeholder="Enter product name"
                  autoComplete="off"
                  labelHidden
                  showCharacterCount
                  maxLength={180}
                />
              )}
              sectioned
            >
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card title="Product Actions" sectioned>
              <p>Add tags to your order.</p>
            </Card>

            <Card title="Product Meta" sectioned>
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </BackendLayout>
  )
}


export default withAuth(ProductsComponent, ['create_product'])