import type { NextPage } from 'next'

// Components
import BackendHead from '@flcn-ecomm/container/Backend/Layout/Head'
import ForgotComponent from '@flcn-ecomm/container/Backend/Auth/Forgot'

const AdminForgot: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <ForgotComponent />
    </div>
  )
}

export default AdminForgot
