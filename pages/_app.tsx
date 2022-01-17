import type { AppProps } from "next/app"
import React from "react"
import { useRouter } from "next/router"

// State
import { useDispatch } from "react-redux"
import { initialize } from "../store/app/action"

// Intl
import { IntlProvider } from "react-intl"
import AppLocale from "../intl"

// Graphql
import { ApolloProvider } from "@apollo/client"
import graphql from "../lib/graphql"

// Store
import { wrapper } from "../store"

export interface AppProviderProps {
  children: JSX.Element | JSX.Element[]
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentAppLocale = AppLocale["en"]
  const isAdmin = !!router.pathname.match(/^\/admin\/?/)

  if (!isAdmin) {
    require("../styles/globals.css")
  }

  React.useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    <React.Fragment>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        {children}
      </IntlProvider>
    </React.Fragment>
  )
}

const AppProviderComponent = wrapper.withRedux(AppProvider)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={graphql}>
      <AppProviderComponent>
        <Component {...pageProps} />
      </AppProviderComponent>
    </ApolloProvider>
  )
}

export default MyApp
