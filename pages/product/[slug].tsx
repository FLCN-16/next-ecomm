import type { NextPage, GetServerSideProps } from 'next'

// Components
import FontendLayout from '@flcn-ecomm/container/Frontend/Layout'

const Product: NextPage = () => {
  return (
    <FontendLayout>
      <span>Frontend Content</span>
    </FontendLayout>
  )
}

const getServerSideProps: GetServerSideProps = async (context) => {
  let product = {};
  
  return {
    props: product
  }
}

export default Product
