import type { NextPage, GetServerSideProps } from "next"
import React from "react"

// Components
import FrontendLayout from "../containers/Frontend/Layout"

const Shop: NextPage = () => {
  return (
    <FrontendLayout>
      <span>Shop</span>
    </FrontendLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = {}

  return {
    props: products,
  }
}

export default Shop
