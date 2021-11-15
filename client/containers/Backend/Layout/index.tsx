import React from 'react'
import { AppProvider, Frame } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

// Components
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Link from '../../../components/Backend/Link'

// Theme
import theme from '../theme'

// Styling
import '@shopify/polaris/build/esm/styles.css';


export interface Props {
  children: JSX.Element[] | JSX.Element
}

const LayoutComponent: React.FC<Props> = ({children}) => {
  return (
    <AppProvider i18n={translations} linkComponent={Link} theme={theme}>
      <Frame
        topBar={<Header />}
        navigation={<Sidebar />}
      >
        {children}
      </Frame>
    </AppProvider>
  )
}

export default LayoutComponent