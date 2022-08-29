import React from 'react'
import { Container } from 'reactstrap'
import AddPost from '../../components/AddPost'
import Layout from '../../components/Layout'

const Dashboard = () => {
  return (
    <Layout>
      <h1>Welcome to dashboard</h1>
      <Container>
        <AddPost />
      </Container>
    </Layout>
  )
}

export default Dashboard