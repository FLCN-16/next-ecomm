import React from 'react'
import BackendHead from '../Head'

// State
import type { RootState } from '@flcn-ecomm/store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAccount } from '@flcn-ecomm/store/auth/action'

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
  const dispatch = useDispatch()
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const account: any = useSelector((state: RootState) => state.auth.get('account') || {});

  return (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'Profile', icon: ArrowLeftMinor}],
        },
        {
          items: [{ content: 'Sign out', icon: LogOutMinor, onAction: () => dispatch(logoutAccount())}],
        },
      ]}
      name={`${account.firstName} ${account.lastName}`}
      detail={account.username}
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