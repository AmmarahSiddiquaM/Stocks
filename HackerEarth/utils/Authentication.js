import AsyncStorage from '@react-native-async-storage/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { set } from 'react-native-reanimated';

//Get if the biometric is set in the storage
export const getBiometric = async () => {
    try {
        const value = await AsyncStorage.getItem('@Biometric')
        return value
    } catch (e) {
        console.log(e)
    }
}

export const setBiometric = async (isEnabled) => {
    try {
        await AsyncStorage.setItem('@Biometric', isEnabled)
    } catch (e) {
        console.log(e)
    }
}

export const clearTokens = async () => {
    try {
        await AsyncStorage.removeItem('@Biometric');
        await AsyncStorage.removeItem('@SecurityToken');
        return true
    } catch (e) {

    }
}

export const setGoogleToken = async (token) => {
    try {
        await AsyncStorage.setItem('@SecurityToken', token)
    } catch (e) {
        console.log(e)
    }
}

//Get if the token is stored in the storage
export const getGoogleToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@SecurityToken')
        return token
    } catch (e) {
        console.log(e)
    }
}

//start biometric authentication
export const openBiometricAuthentication = async () => {
    try {
        return FingerprintScanner.authenticate({ description: 'Scan your fingerprint on the device scanner to continue' });
    } catch (e) {
        console.log(e)
    }
}

export const signInGoogle = async () => {
    try {
        const res = await GoogleSignin.signIn();
        if (res) {
            await setGoogleToken(res.idToken)
            return true
        }
        return false
    }
    catch (e) {
        console.log("Error in google login")
    }
}