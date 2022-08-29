import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, CardBody, Container, Form, FormFeedback, Input, Label } from 'reactstrap'
import { getCategories } from '../services/category-service'
import JoditEditor from "jodit-react";
import { createPost } from '../services/post-service';
import { getCurrentUser } from '../auth';
import { toast } from 'react-toastify';

const AddPost = () => {
  const [categories, setCategories] = useState([]);
  const editor = useRef(null)
  const [user, setUser] = useState(undefined)
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "0"
  })
  const [error, setError] = useState({
    errors: {},
    isError: false
  });

  const handleChange = (e) => {
    let postData =  e.target ? { ...post, [e.target.name]: e.target.value } : { ...post, "content": e }
    setPost(postData);
  }

  const reset = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "0"
    })
    setError({ errors: {}, isError: false});
  }

  useEffect(() => {
    setUser(getCurrentUser());
    getCategories().then(data => {
      setCategories(data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  const addPost = (event) => {
    event.preventDefault();
    let errorObject = {
      errors: {},
      isError: false
    }
    if(post.title.trim() === ''){
      errorObject.isError = true;
      errorObject.errors.title = "Post title is required.";
    }
    if(post.content.trim() === ''){
      errorObject.isError = true;
      errorObject.errors.content = "Post content is required.";
    }
    if(post.categoryId.trim() === '0'){
      errorObject.isError = true;
      errorObject.errors.category = "Post category is required.";
    }
    setError(errorObject);
    if(!errorObject.isError){
      post["userId"] = user.id;
      createPost(post).then(data => {
        toast.success("Post created successfully.");
        reset();
      })
      .catch(error => {
        console.log(error)
        toast.error("Post creation failed.");
      })
    }
  }

  return (
    <div className='wrapper'>
      <Card className='shadow-sm'>
        <CardBody>
          <h3>What's going in your mind?</h3>
          <Form onSubmit={addPost}>
            <div className='my-3'>
              <Label for="title">Post Title</Label>
              <Input type="text" id="title" name="title" placeholder='Enter here...' onChange={(e) => handleChange(e)} value={post.title} invalid={error.errors.title ? true : false}/>
              <FormFeedback>{error.errors.title}</FormFeedback>
            </div>
            <div className='my-3'>
              <Label for="content">Post Content</Label>
              <div className={ error.errors.content ? "is-invalid form-control" : ""}>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  tabIndex={1}
                  onBlur={newContent => handleChange(newContent)}
                />
              </div>
              <FormFeedback>{error.errors.content}</FormFeedback>
            </div>
            <div className='my-3'>
              <Label for="category">Post Category</Label>
              <Input type="select" id="category" name="categoryId" onChange={(e) => handleChange(e)} value={post.categoryId} invalid={error.errors.category ? true : false}>
                <option disabled value={0} key={0}>--Select Category--</option>
                {
                  categories.map(category => (
                    <option value={category.categoryId} key={category.categoryId}>{category.categoryTitle}</option>
                  ))
                }
              </Input>
              <FormFeedback>{error.errors.category}</FormFeedback>
            </div>
            <Container className='text-center'>
              <Button type='submit' color='primary'>Add Post</Button>
              <Button className='ms-2' color='secondary' onClick={reset}>Clear</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AddPost