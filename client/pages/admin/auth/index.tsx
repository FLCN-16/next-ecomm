import type { NextPage } from 'next'

// Components
import BackendHead from '../../../containers/Backend/Layout/Head'
import LoginComponent from '../../../containers/Backend/Auth/Login'

const AdminLogin: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <LoginComponent />
    </div>
  )
}

export default AdminLogin
