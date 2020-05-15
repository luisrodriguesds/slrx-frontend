import React, { createContext, useState, useContext, useEffect } from 'react';

import * as auth from '../services/auth'

const AuthContext = createContext({signed:true})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(){
      const storeUser = auth.getUser()
      const storeToken = auth.getToken()
      if (storeUser && storeToken) {
        setUser(storeUser)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function signIn(data){
    const response = await auth.signInAPI(data)
    if (response.error) {
      return response
    }
    
    setUser(response.user)
    auth.setUser(response.user)
    auth.setToken(response.token)
  }

  function signOut(){
    auth.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{signed:!!user, signIn, user, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth(){
  const context = useContext(AuthContext)
  return context
}