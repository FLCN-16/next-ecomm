import React from "react"
import BackendHead from "../Head"

// State
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../../redux/rootReducer"
import { logoutAccount } from "../../../../../redux/auth/action"

import { TopBar, Icon } from "@shopify/polaris"
import {
  ArrowLeftMinor,
  NotificationMajor,
  LogOutMinor,
} from "@shopify/polaris-icons"

const ActionsMenu = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] =
    React.useState(false)

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
            items: [{ content: "Community forums" }],
          },
        ]}
      />
    </React.Fragment>
  )
}

const UserMenuMarkup = () => {
  const dispatch = useDispatch()
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)
  const account: any = useSelector((state: RootState) =>
    state.auth.get("account")
  )

  // Return null if account is not loaded
  if (!account) return null

  return (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Profile", icon: ArrowLeftMinor }],
        },
        {
          items: [
            {
              content: "Sign out",
              icon: LogOutMinor,
              onAction: () => dispatch(logoutAccount()),
            },
          ],
        },
      ]}
      name={`${account.firstName} ${account.lastName}`}
      detail={account.username}
      initials={account.firstName.charAt(0) + account.lastName.charAt(0)}
      open={isUserMenuOpen}
      onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
    />
  )
}

export interface Props {
  isNavOpen?: boolean
  toggleNav: () => void
}

const Header: React.FC<Props> = ({ toggleNav }) => {
  return (
    <React.Fragment>
      <BackendHead />
      <TopBar
        showNavigationToggle
        userMenu={<UserMenuMarkup />}
        secondaryMenu={<ActionsMenu />}
        onNavigationToggle={toggleNav}
      />
    </React.Fragment>
  )
}

export default Header
