import type { NextPage, GetServerSideProps } from 'next'

// Components
import FontendLayout from '../containers/Frontend/Layout'

const Home: NextPage = () => {
  return (
    <FontendLayout>
      <span>Frontend Content</span>
    </FontendLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products = {};

  return {
    props: products
  }
}

export default Home
