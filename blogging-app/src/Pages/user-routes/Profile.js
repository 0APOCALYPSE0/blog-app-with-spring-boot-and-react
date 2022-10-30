import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Layout from '../../components/Layout'
import ViewUserProfile from '../../components/ViewUserProfile';
import { getUser } from '../../services/user-service';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userId).then(user => {
      setUser({ ...user })
    })
    .catch(error => console.log(error))
  }, [userId]);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    )
  }

  return (
    <Layout>
      {user ? userView() : 'loading user data...'}
    </Layout>
  )
}

export default Profile