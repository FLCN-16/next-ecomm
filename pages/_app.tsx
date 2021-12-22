import type { AppProps } from 'next/app'
import React from 'react'
import { useRouter } from 'next/router'

// Intl
import { IntlProvider } from 'react-intl'
import AppLocale from '../intl'

// Store
import {wrapper} from '../store';


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


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default wrapper.withRedux(MyApp)
