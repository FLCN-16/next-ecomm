import React from 'react'
import BackendHead from '../Head'

import { TopBar, Icon } from '@shopify/polaris';
import { ArrowLeftMinor, NotificationMajor, LogOutMinor } from '@shopify/polaris-icons'


const ActionsMenu = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon source={NotificationMajor} />
          </span>
        }
        open={isNotificationMenuOpen}
        onOpen={() => setIsNotificationMenuOpen(true)}
        onClose={() => setIsNotificationMenuOpen(false)}
        actions={[
          {
            items: [{content: 'Community forums'}],
          },
        ]}
      />
    </React.Fragment>
  )
}

const UserMenuMarkup = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

    return (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
          },
          {
            items: [{content: 'Sign out', icon: LogOutMinor, onAction: () => {}}],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={isUserMenuOpen}
        onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
      />
    )
  };

const Header: React.FC = () => {
  const handleNavigationToggle = () => {

  }

  return (
    <React.Fragment>
      <BackendHead />
      <TopBar
        showNavigationToggle
        userMenu={<UserMenuMarkup />}
        secondaryMenu={<ActionsMenu />}
        onNavigationToggle={handleNavigationToggle}
      />
    </React.Fragment>
  )
}

export default Header