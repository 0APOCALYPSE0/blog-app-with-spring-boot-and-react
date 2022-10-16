import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../components/CategorySideMenu';
import Layout from '../components/Layout'
import { getPostsByCategory } from '../services/post-service';
import Post from '../components/Post';

const Categories = () => {
  const {categoryId} = useParams();
  const [posts, setPosts] = useState(undefined);
  useEffect(() => {
    getPostsByCategory(categoryId).then(posts => {
      setPosts(posts);
    })
    .catch(error => console.log(error))
  }, [categoryId])
  return (
    <Layout>
      <Container className='mt-3'>
        <Row>
          <Col md={{ size:2 }} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={{ size:10 }}>
            {
              posts && posts.length > 0 ? (
              posts.map(post => (
                <Post post={post} key={post.postId}/>
              ))):
              (
                <h1 className='text-danger'>No Post found in this category!</h1>
              )
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Categories