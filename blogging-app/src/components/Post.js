import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardText } from 'reactstrap'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getCurrentUser } from '../auth';
import { toast } from 'react-toastify';
import { deletePostById } from '../services/post-service';
import userContext from '../context/userContext';

const Post = ({post, postDeleted}) => {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(getCurrentUser());
  },[]);

  const deletePost = (postId) => {
    deletePostById(postId).then(res => {
      console.log(res);
      toast.success("Post deleted successfully.");
      postDeleted(postId);
     })
    .catch(error => {
      console.log(error);
      toast.error("Post delete operation failed.");
    });
  }

  return (
    <Card className='mt-3'>
      <CardHeader>
        <h6>{post.title}</h6>
      </CardHeader>
      <CardBody>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 120)+"..." }}>
        </CardText>
        <div>
          <Link className="btn btn-sm btn-secondary me-2" to={"/post/"+post.postId}>Read More</Link>
          {
            userContextData.user.login && user && user.id === post.user.id ?
            <><Button color='primary' className='btn btn-sm me-2' tag={Link} to={"/user/update/"+post.postId}>Update</Button>
            <Button color='danger' className='btn btn-sm' onClick={() => deletePost(post.postId)}>Delete</Button></> : ""
          }

        </div>
      </CardBody>
    </Card>
  )
}

export default Post