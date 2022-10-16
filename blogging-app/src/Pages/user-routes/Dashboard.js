import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'reactstrap'
import { getCurrentUser } from '../../auth'
import AddPost from '../../components/AddPost'
import Layout from '../../components/Layout'
import { getPostsByUser } from '../../services/post-service';
import Post from '../../components/Post';

const Dashboard = () => {
  const [posts, setPosts] = useState(undefined);
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    getPostsByUser(getCurrentUser().id).then(posts => {
      setPosts(posts);
    })
    .catch(error => console.log(error))
  }

  const postDeleted = (postId) => {
    let updatedPosts = posts.filter(post => post.postId !== postId);
    setPosts(updatedPosts);
  }

  return (
    <Layout>
      <h1>Welcome to dashboard</h1>
      <Container>
        <AddPost />
        {
          posts && posts.length > 0 ?
          posts.map(post => (
            <Post post={post} key={post.postId} postDeleted={postDeleted} />
          )):
          <h1 className='text-danger'>No Post found</h1>
        }
      </Container>
    </Layout>
  )
}

export default Dashboard