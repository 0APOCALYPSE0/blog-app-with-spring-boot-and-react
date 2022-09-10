import React, { useState } from 'react';
import userContext from './userContext';

const UserProvider = ({children}) => {
  const [user, setUser] = useState({});
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider