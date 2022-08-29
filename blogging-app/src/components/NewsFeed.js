import React, { useState } from 'react'
import { useEffect } from 'react'
import { getPosts } from '../services/post-service'
import {Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'

const NewsFeed = () => {
  const [posts, setPosts] = useState({ content: [], pageNumber: '', totalPages: '', totalElements: '', pageSize: '', lastPage: false });

  useEffect(() => {
    changePage(0,5);
  },[])

  const changePage = (page=0, size=5) => {
    if(page < 0 || (posts.totalPages !== '' && page >= posts.totalPages)){
      return;
    }
    getPosts(page, size).then(data => {
      setPosts(data);
      window.scroll(0,0);
    })
    .catch(error => {
      console.log(error);
      toast.error("Post fetching operation failed.")
    })
  }

  return (
    <div className='container-fluid'>
      <Row>
        <Col md={{ size:10, offset: 1 }}>
          {
            posts.content.map(post => (
              <Post post={post} key={post.postId} />
            ))
          }
        </Col>
      </Row>
      <Col md={{ size:10, offset: 1 }}>
        <Pagination className='mt-3'>
          <PaginationItem disabled={posts.pageNumber === 0} onClick={() => changePage(posts.pageNumber-1)}>
            <PaginationLink previous>

            </PaginationLink>
          </PaginationItem>
          {
            [...Array(posts.totalPages)].map((item, index) => (
              <PaginationItem key={index} active={posts.pageNumber === index} onClick={() => changePage(index)}>
                <PaginationLink>
                  {index+1}
                </PaginationLink>
              </PaginationItem>
            ))
          }
          <PaginationItem disabled={posts.lastPage} onClick={() => changePage(posts.pageNumber+1)}>
            <PaginationLink next>

            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Col>
    </div>
  )
}

export default NewsFeed