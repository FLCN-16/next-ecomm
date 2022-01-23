import React from "react"
import { withRouter, NextRouter } from "next/router"

import { Navigation } from "@shopify/polaris"
import {
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
  DiscountsMajor,
  SettingsMajor,
  MarketingMajor,
} from "@shopify/polaris-icons"

interface Props {
  router: NextRouter
}

const Sidebar: React.FC<Props> = ({ router }) => {
  const handleClick = () => {
    console.log()
  }

  return (
    <React.Fragment>
      {/* Sidebar Menu */}
      <Navigation location={router.route}>
        <Navigation.Section
          items={[
            {
              url: "/admin",
              label: "Dashboard",
              exactMatch: true,
              icon: HomeMajor,
            },
          ]}
        />

        <Navigation.Section
          items={[
            {
              url: "/admin/orders",
              label: "Orders",
              icon: OrdersMajor,
              subNavigationItems: [
                {
                  url: "/admin/orders",
                  disabled: false,
                  label: "All Orders",
                },
                {
                  url: "/admin/orders/inventory",
                  disabled: false,
                  label: "Inventory",
                },
              ],
            },
            {
              url: "/admin/products",
              label: "Products",
              icon: ProductsMajor,
              subNavigationItems: [
                {
                  url: "/admin/products",
                  disabled: false,
                  label: "All Products",
                },
                {
                  url: "/admin/products/new",
                  disabled: false,
                  label: "Add Product",
                },
                {
                  url: "/admin/category/list",
                  disabled: false,
                  label: "Categories",
                },
              ],
            },
            {
              url: "/admin/marketing",
              label: "Marketing",
              icon: MarketingMajor,
              subNavigationItems: [
                {
                  url: "/admin/marketing",
                  disabled: false,
                  label: "Analatics",
                },
                {
                  url: "/admin/marketing/coupons",
                  disabled: false,
                  label: "Coupons",
                },
              ],
            },
          ]}
          separator
        />

        <Navigation.Section
          items={[
            {
              url: "/admin/users",
              label: "Users",
              icon: CustomersMajor,
            },
          ]}
          separator
          fill
        />

        <Navigation.Section
          items={[
            {
              url: "/admin/settings",
              label: "Settings",
              icon: SettingsMajor,
            },
          ]}
        />
      </Navigation>
    </React.Fragment>
  )
}

export default withRouter(Sidebar)
