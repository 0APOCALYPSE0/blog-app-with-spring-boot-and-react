import React from 'react'
import { Card, CardBody, CardHeader, CardText } from 'reactstrap'
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  return (
    <Card className='mt-3'>
      <CardHeader>
        <h6>{post.title}</h6>
      </CardHeader>
      <CardBody>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 120)+"..." }}>
        </CardText>
        <div>
          <Link className="btn btn-sm btn-secondary" to={"/post/"+post.postId}>Read More</Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default Post