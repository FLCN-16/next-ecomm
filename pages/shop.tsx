import type { NextPage, GetServerSideProps } from 'next'

// Components
import FrontendLayout from '@flcn-ecomm/container/Frontend/Layout'

const Shop: NextPage = () => {
  return (
    <FrontendLayout>
      <span>Shop</span>
    </FrontendLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products = {};

  return {
    props: products
  }
}

export default Shop
