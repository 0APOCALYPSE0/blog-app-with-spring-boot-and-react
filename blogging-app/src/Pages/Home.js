import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import Layout from '../components/Layout'
import NewsFeed from '../components/NewsFeed'

const Home = () => {
  return (
    <Layout>
      <Container className='mt-3'>
        <Row>
          <Col md={{ size:2 }} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={{ size:10 }}>
            <NewsFeed />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home