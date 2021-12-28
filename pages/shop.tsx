import type { NextPage, GetServerSideProps } from 'next'

// Components
import FontendLayout from '@flcn-ecomm/container/Frontend/Layout'

const Shop: NextPage = () => {
  return (
    <FontendLayout>
      <span>Shop</span>
    </FontendLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products = {};

  return {
    props: products
  }
}

export default Shop
