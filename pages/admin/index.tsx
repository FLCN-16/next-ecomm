import type { NextPage } from "next"
import React from "react"

// Components
import BackendLayout from "../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../common/hoc/withAuth"

const Dashboard: NextPage = () => {
  return (
    <BackendLayout>
      <span>Backend Content</span>
    </BackendLayout>
  )
}

export default withAuth(Dashboard)
