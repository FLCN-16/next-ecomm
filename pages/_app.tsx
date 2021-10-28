import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

// Intl
import { IntlProvider } from 'react-intl'
import AppLocale from '../intl'

// Store
import {wrapper} from '../store';


export interface AppProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const currentAppLocale = AppLocale['en'];

  return (
    <>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        {children}
      </IntlProvider>
    </>
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
