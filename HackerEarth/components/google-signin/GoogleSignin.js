import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { signInGoogle } from '../../utils/Authentication';
import { AuthContext } from '../../App';

const GoogleLogin = () => {

    const authDispatch = useContext(AuthContext);

    const onGoogleButtonPress = () => {
        signInGoogle().then((isAuth) => {
            authDispatch('LOGIN')
        })
    }

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={() => onGoogleButtonPress()}>
                <View style={styles.button}>
                    <Text style={styles.text}>Sign In with Google</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default GoogleLogin

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#423175',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255, 0.25)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255, 0.3)',
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
