import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StockChart from '../stock-chart/StockChart';
import Biometric from '../biometric/Biometric';
import { clearTokens, getBiometric } from '../../utils/Authentication';
import { AuthContext } from '../../App';

const Stack = createStackNavigator();
const Root = () => {

    const authDispatch = useContext(AuthContext);

    const [initialRoute, setinitialRoute] = useState({
        isLoading: true,
        route: 'StockChart'
    })

    useEffect(() => {
        (async () => {
            getBiometric().then(isEnabled => {
                console.log({ isEnabled })
                if (isEnabled == null) setinitialRoute({
                    isLoading: false,
                    route: 'Biometric'
                })
                else if (isEnabled == '1') setinitialRoute({
                    isLoading: false,
                    route: 'StockChart'
                })
                else if (isEnabled == '0') {
                    clearTokens().then(() => {
                        authDispatch('LOGOUT')
                    })
                }
            })
        })();
    }, [])

    const { isLoading, route } = initialRoute;

    return (
        <>
            {!isLoading &&
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={route}
                >
                    <Stack.Screen name="Biometric" component={Biometric} />
                    <Stack.Screen name="StockChart" component={StockChart} />
                </Stack.Navigator>
            }
        </>
    )
}

export default Root
