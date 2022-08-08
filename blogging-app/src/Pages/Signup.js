import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { signup } from '../services/user-service';
import { toast } from 'react-toastify';

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    about: ""
  });
  const [error, setError] = useState({
    errors: {},
    isError: false
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const reset = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      about: ""
    })
    setError({ errors: {}, isError: false});
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(form);
    signup(form)
    .then(response => {
      console.log(response);
      toast.success("User registered successfully.");
      reset();
    })
    .catch(error => {
      console.log(error);
      setError({
        errors:error.response.data,
        isError: true
      })
      if(error.response.status !== 400){
        toast.error("Something went wrong!");
      }
    });
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3>Fill Information to Register</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => submit(e)}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type='text' placeholder='Enter name....' name='name' id='name' onChange={(e) => handleChange(e)} value={form.name} invalid={error.errors.name ? true : false } />
                    <FormFeedback>{error.errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type='text' placeholder='Enter email....' name='email' id='email' onChange={(e) => handleChange(e)} value={form.email} invalid={error.errors.email ? true : false } />
                    <FormFeedback>{error.errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type='password' placeholder='Enter password....' name='password' id='password' onChange={(e) => handleChange(e)} value={form.password} invalid={error.errors.password ? true : false } />
                    <FormFeedback>{error.errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input type='textarea' placeholder='Enter about....' name='about' id='about' rows="5" style={{ resize: "none" }} onChange={(e) => handleChange(e)} value={form.about} invalid={error.errors.about ? true : false } />
                    <FormFeedback>{error.errors.about}</FormFeedback>
                  </FormGroup>
                  <Container className='text-center'>
                    <Button color='dark'>Register</Button>
                    <Button color='secondary' className='ms-2' type='reset' onClick={reset}>Reset</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signup