import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { doLogin } from '../auth';
import Layout from '../components/Layout'
import { login } from '../services/user-service';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
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
      username: "",
      password: ""
    })
    setError({ errors: {}, isError: false});
  }

  const submit = (e) => {
    e.preventDefault();
    login(form)
    .then(response => {
      // console.log(response);
      doLogin(response, () => {
        navigate("/user/dashboard");
      });
      toast.success("User logged in successfully.");
      reset();
    })
    .catch(error => {
      setError({
        errors:error.response.data,
        isError: true
      })
      if(error.response.status !== 400 || error.response.data.message === "Invalid Credentials!"){
        toast.error("Something went wrong!");
      }
    })
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3>Log In</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => submit(e)}>
                  <FormGroup>
                    <Label for="username">username</Label>
                    <Input type='text' placeholder='Enter username....' name='username' id='username' onChange={(e) => handleChange(e)} value={form.username} invalid={error.errors.username ? true : false} />
                    <FormFeedback>{error.errors.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type='password' placeholder='Enter password....' name='password' id='password' onChange={(e) => handleChange(e)} value={form.password} invalid={error.errors.password ? true : false} />
                    <FormFeedback>{error.errors.password}</FormFeedback>
                  </FormGroup>
                  <Container className='text-center'>
                    <Button color='dark'>Login</Button>
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

export default Login