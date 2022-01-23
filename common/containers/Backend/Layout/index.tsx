import React from "react"
import { AppProvider, Frame } from "@shopify/polaris"
import translations from "@shopify/polaris/locales/en.json"

// Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Link from "../../../components/Backend/Link"

// Theme
import theme from "../theme"

// Styling
import "@shopify/polaris/build/esm/styles.css"

export interface Props {
  children: JSX.Element[] | JSX.Element
}

const LayoutComponent: React.FC<Props> = ({ children }) => {
  const [isNavigationOpen, setNavigationToggle] = React.useState(false)

  return (
    <AppProvider i18n={translations} linkComponent={Link} theme={theme}>
      <Frame
        showMobileNavigation={isNavigationOpen}
        topBar={
          <Header toggleNav={() => setNavigationToggle(!isNavigationOpen)} />
        }
        navigation={<Sidebar />}
        onNavigationDismiss={() => setNavigationToggle(false)}
      >
        {children}
      </Frame>
    </AppProvider>
  )
}

export default LayoutComponent
