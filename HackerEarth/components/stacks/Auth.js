import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../../App'

import { createStackNavigator } from '@react-navigation/stack'
import GoogleLogin from '../google-signin/GoogleSignin';

import { getBiometric, getGoogleToken, openBiometricAuthentication } from '../../utils/Authentication'

const Stack = createStackNavigator();

const Auth = () => {

    const setIsAuthenticated = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const token = await getGoogleToken();
            if (token) {
                const isBiometric = await getBiometric();
                if (isBiometric) {
                    openBiometricAuthentication().then(() => {
                        setIsAuthenticated(true)
                    });
                }
            }
        })()
    }, [])

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={GoogleLogin} />
        </Stack.Navigator>
    )
}

export default Auth
