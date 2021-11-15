import type { NextPage } from 'next'

// Components
import BackendHead from '@flcn-ecomm/container/Backend/Layout/Head'
import LoginComponent from '@flcn-ecomm/container/Backend/Auth/Login'

const AdminLogin: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <LoginComponent />
    </div>
  )
}

export default AdminLogin
