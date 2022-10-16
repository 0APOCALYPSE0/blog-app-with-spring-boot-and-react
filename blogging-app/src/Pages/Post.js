import React from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardText, Col, Container, Input, Row } from 'reactstrap'
import { useEffect } from 'react'
import { createComment, getPost } from '../services/post-service'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { BASE_URL } from '../services/Helper'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../auth'

const Post = () => {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPost(id).then(data => {
      setPost(data)
    })
    .catch(error => {
      console.log(error);
      toast.error("Post fetch operation failed.")
    })
  },[])

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  }

  const addComment = () => {
    if(!isLoggedIn()){
      toast.error("You need to login first.");
      return;
    }
    if(comment.trim() === ''){
      return;
    }
    createComment(comment, post.postId, post.user.id).then(data => {
      setPost({ ...post, comments: [...post.comments, data]});
      setComment("");
    })
    .catch(error => console.log(error));
  }

  return (
    <Layout>
      <Container className='mt-3'>
        <Row>
          <Col md={{ size:12 }}>
            {
              post &&
              <>
              <Link to={"/"}>Home</Link> / <Link to={"/post/"+id}>{post.title}</Link>
              <Card className='mt-3'>
                <CardHeader>
                  <h4>{post.title}</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="6">
                      <CardText>
                        Posted By: <b>{post.user.name}</b> on <b>{ printDate(post.addDate)}</b>
                      </CardText>
                    </Col>
                    <Col sm="6" className='text-end'>
                      <b>Tags:</b> {post.category.categoryTitle}
                    </Col>
                  </Row>
                  <div className="image-container mt-3" style={{ maxWidth: "80%"}}>
                    <img className='img-fluid' src={BASE_URL+"/image/"+post.imageName} alt={post.title} />
                  </div>
                  <CardText className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }}>
                  </CardText>
                </CardBody>
              </Card>
              </>
            }
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col md={{ size:12 }}>
            <h3>Comments ({ post ? post.comments.length : 0 })</h3>
            {
              post && post.comments.map((comment, index) => (
                <Card key={index} className="mt-2 border-0">
                  <CardBody>
                    <CardText>
                      {comment.content}
                    </CardText>
                  </CardBody>
                </Card>
              ))
            }
            <Card className="mt-2 border-0">
              <CardBody>
                <Input type='textarea' placeholder='Enter comment here...' onChange={(e) => setComment(e.target.value)} value={comment}/>
                <Button onClick={addComment} className='mt-2' color='primary'>Add</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Post