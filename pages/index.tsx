import type { NextPage, GetServerSideProps } from 'next'

// Components
import FrontendLayout from '../containers/Frontend/Layout'

const Home: NextPage = () => {
  return (
    <FrontendLayout>
      <span>Frontend Content</span>
    </FrontendLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products = {};

  return {
    props: products
  }
}

export default Home
