import type { NextPage } from 'next'

// Components
import BackendLayout from '../../containers/Backend/Layout'

// HOCs
import withAuth from '../../hoc/withAuth'


const Dashboard: NextPage = () => {
  return (
    <BackendLayout>
      <span>Backend Content</span>
    </BackendLayout>
  )
}

export default withAuth(Dashboard)
