import React from 'react'
import { Container } from 'reactstrap'
import Layout from '../components/Layout'
import NewsFeed from '../components/NewsFeed'

const Home = () => {
  return (
    <Layout>
      <Container className='mt-3'>
        <NewsFeed />
      </Container>
    </Layout>
  )
}

export default Home