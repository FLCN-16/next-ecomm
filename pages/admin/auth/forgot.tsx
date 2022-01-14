import type { NextPage } from "next"
import React from "react"

// Components
import BackendHead from "../../../common/containers/Backend/Layout/Head"
import ForgotComponent from "../../../common/containers/Backend/Auth/Forgot"

const AdminForgot: NextPage = () => {
  return (
    <div>
      <BackendHead />
      <ForgotComponent />
    </div>
  )
}

export default AdminForgot
