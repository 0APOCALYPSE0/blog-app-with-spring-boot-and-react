import React, { useState } from 'react'
import { useEffect } from 'react'
import { getPosts } from '../services/post-service'
import {Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

const NewsFeed = () => {
  const [posts, setPosts] = useState({ content: [], pageNumber: '', totalPages: '', totalElements: '', pageSize: '', lastPage: false });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage,5);
  },[currentPage])

  const changePage = (page=0, size=5) => {
    if(page < 0 || (posts.totalPages !== '' && page >= posts.totalPages)){
      return;
    }
    getPosts(page, size).then(data => {
      // setPosts(data);
      // window.scroll(0,0);
      setPosts({ content: [...posts.content, ...data.content], pageNumber: data.pageNumber, totalPages: data.totalPages, totalElements: data.totalElements, pageSize: data.pageSize, lastPage: data.lastPage})
    })
    .catch(error => {
      console.log(error);
      toast.error("Post fetching operation failed.")
    })
  }

  const changePageInfinite = () => {
    setCurrentPage(currentPage+1);
  }

  return (
    <div className='container-fluid'>
      <Row>
        <Col md={{ size:10, offset: 1 }}>
          <InfiniteScroll
          dataLength={posts.content.length}
          next={changePageInfinite}
          hasMore={!posts.lastPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
            {
              posts.content.map(post => (
                <Post post={post} key={post.postId} />
              ))
            }
          </InfiniteScroll>
        </Col>
        {/* <Col md={{ size:10, offset: 1 }}>
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
      </Col> */}
      </Row>
    </div>
  )
}

export default NewsFeed