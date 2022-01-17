import type { NextPage } from "next"
import React from "react"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hoc/withAuth"

const OrdersComponent: NextPage = () => {
  return (
    <BackendLayout>
      <span>Orders Content</span>
    </BackendLayout>
  )
}

export default withAuth(OrdersComponent, "manage_orders")
