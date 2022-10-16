import React, { useState } from 'react';
import { getCurrentUser, isLoggedIn } from '../auth';
import userContext from './userContext';

const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    data: getCurrentUser(),
    login: isLoggedIn()
  });
  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider