import React, { useReducer, createContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from './components/stacks/Root'

import { GoogleSignin } from '@react-native-community/google-signin';
import AuthStack from './components/stacks/Auth';
import { getGoogleToken } from './utils/Authentication';

export const AuthContext = createContext();

GoogleSignin.configure({
  webClientId: '1073688746557-0qp4g15cm8eocepq3sa1bh0u1u7us3d7.apps.googleusercontent.com',
});

const initialState = {
  isLoading: true,
  isAuthenticated: false
}

const reducer = (state, action) => {
  switch (action) {
    case 'REQUEST': return {
      ...state,
      isLoading: true
    }
    case 'LOGIN': return {
      isLoading: false,
      isAuthenticated: true
    }
    case 'LOGOUT': return {
      isLoading: false,
      isAuthenticated: false
    }
  }
}

const App = () => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      dispatch('REQUEST');
      getGoogleToken().then(token => {
        if (token) dispatch('LOGIN');
        else dispatch('LOGOUT')
      })
    })();
  }, []);

  console.log(authState)

  return (
    <AuthContext.Provider value={dispatch}>
      {authState && !authState.isLoading &&
        <NavigationContainer>
          {authState.isAuthenticated ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
      }
    </AuthContext.Provider>
  )
}

export default App