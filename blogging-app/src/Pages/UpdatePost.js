import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, FormFeedback, Input, Label } from 'reactstrap';
import JoditEditor from "jodit-react";
import Layout from '../components/Layout'
import userContext from '../context/userContext';
import { getCategories } from '../services/category-service';
import { getPost, updatePost as updatePostById, uploadPostImage } from '../services/post-service';

const UpdatePost = () => {
  const [categories, setCategories] = useState([]);
  const editor = useRef(null)
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "0"
  });
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState({
    errors: {},
    isError: false
  });
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data);
    })
    .catch(error => {
      console.log(error);
    })

    getPost(postId).then(post => {
      setPost({ ...post, categoryId: post.category.categoryId });
      setOldImage(post.imageName);
      if(post.user.id !== userContextData.user.data.id){
        toast.error("You are not allowed to update this post");
        navigate("/");
      }
    })
    .catch(error => {
      console.log(error);
      toast.error("Post fetch operation failed.");
    })
  }, []);

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

  const handleImageChange = (e) => {
    if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png'){
      setImage(e.target.files[0]);
    }else{
      toast.error("Please choose a valid image.");
    }
  }

  const updatePost = (event) => {
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
    if(post.categoryId === 0){
      errorObject.isError = true;
      errorObject.errors.category = "Post category is required.";
    }
    setError(errorObject);
    if(!errorObject.isError){
      let category = categories.find(category => category.categoryId === +post.categoryId);
      delete post.categoryId;
      let newImageName = image ? image.name : post.imageName;
      updatePostById({ ...post, 'category': category, imageName: newImageName }).then(res => {
        toast.success("Post updated successfully.");
        if(oldImage !== newImageName){
          uploadPostImage(image, res.postId).then(data => {
            toast.success("Image uploaded successfully.");
          })
          .catch(error => {
            console.log(error);
            toast.error("Image upload failed.");
          });
        }
      }).catch(error => {
        console.log(error);
        toast.error("Update post operation failed.");
      })
    }
  }

  const updateHTML = () => {
    return (
      <div className='wrapper'>
        <Card className='shadow-sm'>
          <CardBody>
            <h3>Update Post</h3>
            <Form onSubmit={updatePost}>
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
              <div className="my-3">
                <Label for='image'>Post Image</Label>
                <Input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*" />
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
                <Button type='submit' color='primary'>Update Post</Button>
                <Button className='ms-2' color='secondary' onClick={reset}>Clear</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <Layout>
      <Container>
      {post && updateHTML()}
      </Container>
    </Layout>
  )
}

export default UpdatePost