import React from "react"
import { AppProvider } from "@shopify/polaris"
import { connect } from "react-redux"
import Router from "next/router"
import { RootState } from "../../../../redux/rootReducer"

import Link from "../../../components/Backend/Link"
import Loading from "../Loading"

// Styling
import "@shopify/polaris/build/esm/styles.css"
import styled from "./Auth.style"

interface Props {
  children: React.ReactNode
  loading: boolean
  isAuthenticated: boolean
}

const AuthContainer: React.FC<Props> = ({
  children,
  loading,
  isAuthenticated,
}) => {
  if (isAuthenticated) {
    Router.push(Router.query.next?.toString() || "/admin/")
  }

  if (loading) return <Loading />

  return (
    <AppProvider i18n={{}} linkComponent={Link}>
      <styled.Wrapper>
        <styled.FormContainer>{children}</styled.FormContainer>
      </styled.Wrapper>
    </AppProvider>
  )
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.get("isAuthenticated"),
  loading: state.auth.get("loading"),
})

export default connect(mapStateToProps)(AuthContainer)
