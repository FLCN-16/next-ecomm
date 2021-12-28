import type { AppProps } from 'next/app'
import React from 'react'
import { useRouter } from 'next/router'

// Intl
import { IntlProvider } from 'react-intl'
import AppLocale from '../intl'

// Graphql
import { ApolloProvider } from "@apollo/client";
import graphql from '@flcn-ecomm/lib/graphql';

// Store
import { wrapper } from '../store';


export interface AppProviderProps {
  children: JSX.Element | JSX.Element[]
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const router = useRouter()
  const currentAppLocale = AppLocale['en'];
  const isAdmin = !! router.pathname.match(/^\/admin\/?/)

  if ( ! isAdmin ) {
    require('../styles/globals.css')
  }

  return (
    <React.Fragment>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        {children}
      </IntlProvider>
    </React.Fragment>
  )
}

const AppProviderComponent = wrapper.withRedux(AppProvider);

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
