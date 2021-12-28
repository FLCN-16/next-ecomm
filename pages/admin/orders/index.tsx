import type { NextPage } from 'next'

// Components
import BackendLayout from '@flcn-ecomm/container/Backend/Layout'

// HOCs
import withAuth from '../../../hoc/withAuth'


const OrdersComponent: NextPage = () => {
  return (
    <BackendLayout>
      <span>Orders Content</span>
    </BackendLayout>
  )
}

export default withAuth(OrdersComponent)
