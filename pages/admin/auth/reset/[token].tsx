import type { NextPage } from 'next'

// Components
import BackendHead from '@flcn-ecomm/container/Backend/Layout/Head'
import ForgotComponent from '@flcn-ecomm/container/Backend/Auth/Forgot'

const AdminResetPassword: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <ForgotComponent />
    </div>
  )
}

export function getServerSideProps(context) {
  let product = {};

  return { props: product }
}

export default AdminResetPassword
