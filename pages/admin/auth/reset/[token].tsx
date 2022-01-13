import type { NextPage, GetServerSideProps } from "next"
import React from "react"

// Components
import BackendHead from "../../../../containers/Backend/Layout/Head"
import ForgotComponent from "../../../../containers/Backend/Auth/Forgot"

const AdminResetPassword: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <ForgotComponent />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = {}

  return { props: product }
}

export default AdminResetPassword
