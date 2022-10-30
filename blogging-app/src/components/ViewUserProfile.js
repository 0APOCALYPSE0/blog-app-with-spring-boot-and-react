import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap'
import profile from '../assets/images/profile.jpg';
import { getCurrentUser, isLoggedIn } from '../auth';

const ViewUserProfile = ({ user }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    setLoggedInUser(getCurrentUser());
    setLogIn(isLoggedIn());
  }, []);

  return (
    <Card>
      <CardBody>
        <h3 className='text-uppercase'>User Information</h3>
        <Container className='text-center'>
          <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={ user.image ? user.image : profile} alt="user profile pic" className="img-fluid rounded-circle" />
        </Container>
        <Table responsive className='mt-5 text-center'>
          <thead>
            <tr>
              <td>
                ID
              </td>
              <td>
                {user.id}
              </td>
            </tr>
            <tr>
              <td>
                Username
              </td>
              <td>
                {user.name}
              </td>
            </tr>
            <tr>
              <td>
                Email
              </td>
              <td>
                {user.email}
              </td>
            </tr>
            <tr>
              <td>
                About
              </td>
              <td>
                {user.about}
              </td>
            </tr>
            <tr>
              <td>
                Role
              </td>
              <td>
                {user.roles.map(role => (
                  <span key={role.roleId}>{role.role}</span>
                ))}
              </td>
            </tr>
          </thead>
        </Table>
      </CardBody>
      {
        logIn && loggedInUser && loggedInUser.id === user.id ? (
          <CardFooter className='text-center'>
            <Button color='primary'>Update Profile</Button>
          </CardFooter>
        ) : ''
      }
    </Card>
  )
}

export default ViewUserProfile