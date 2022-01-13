import type { NextPage, GetServerSideProps } from "next"
import React from "react"

// Components
import FontendLayout from "../../containers/Frontend/Layout"

const Product: NextPage = () => {
  return (
    <FontendLayout>
      <span>Frontend Content</span>
    </FontendLayout>
  )
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const product = {}

  return {
    props: product,
  }
}

export default Product
