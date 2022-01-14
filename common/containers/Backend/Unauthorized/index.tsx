import React from "react"
import { EmptyState } from "@shopify/polaris"

import Layout from "../Layout"

const UnauthorizedContainer: React.FC = () => {
  return (
    <Layout>
      <EmptyState heading="Un-Authorized Access." image="/assets/images/admin/403.png">
        <div>You don&apos;t have permissions to access this page.</div>
      </EmptyState>
    </Layout>
  )
}

export default UnauthorizedContainer
