import type { NextPage } from 'next'
import { Page, Card } from '@shopify/polaris'

// Components
import BackendLayout from '../../../containers/Backend/Layout'

// HOCs
import withAuth from '../../../hoc/withAuth'


const SettingsPage = () => {
    return (
        <BackendLayout>
            <Page
                title="Settings"
                subtitle="List of all settings"
                compactTitle
                fullWidth
            >
                <Card>
                    App Settings
                </Card>
            </Page>
        </BackendLayout>
    );
}

export default withAuth(SettingsPage, 'manage_settings')