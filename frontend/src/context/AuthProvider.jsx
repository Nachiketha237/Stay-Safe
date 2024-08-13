import React, { createContext, useState } from 'react';

// Create the context with initial values
export const AuthContext = createContext({
  username: '',
  setUsername: () => {},
});

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
