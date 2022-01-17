import type { NextPage } from "next"
import React from "react"
import { Page, Card } from "@shopify/polaris"

// Components
import BackendLayout from "../../../common/containers/Backend/Layout"

// HOCs
import withAuth from "../../../common/hocs/withAuth"

const SettingsPage: NextPage = () => {
  return (
    <BackendLayout>
      <Page title="Settings" subtitle="List of all settings" compactTitle fullWidth>
        <Card>App Settings</Card>
      </Page>
    </BackendLayout>
  )
}

export default withAuth(SettingsPage, "manage_settings")
