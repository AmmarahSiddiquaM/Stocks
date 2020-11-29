import React from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { openBiometricAuthentication, setBiometric } from '../../utils/Authentication';

const Biometric = ({ navigation }) => {

    const Auth = async (biometricVal) => {
        setBiometric(biometricVal).then(() => navigation.navigate('StockChart'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image style={styles.icon} source={{ uri: "https://static.thenounproject.com/png/1259438-200.png" }} />
            </View>
            <View style={styles.middleView}>
                <Text style={styles.middleViewText1}>Log in with Face ID</Text>
                <Text style={styles.middleViewText2}>Use your Face ID for faster, easier access to sign in</Text>
            </View>
            <View style={styles.bottomView}>
                <TouchableWithoutFeedback onPress={() => Auth('1')}>
                    <View style={styles.yesButton}>
                        <Text style={styles.yesText}>Use Face ID</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Auth('0')}>
                    <View style={styles.noButton}>
                        <Text style={styles.noText}>Not Now</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View >
    )
}

export default Biometric

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    topView: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        paddingBottom: 70
    },
    middleViewText1: {
        color: 'grey'
    },
    middleViewText2: {
        color: '#9f9f9f',
        fontSize: 13
    },
    yesButton: {
        backgroundColor: '#44327c',
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5
    },
    noButton: {
        borderColor: '#44327c',
        borderWidth: 1,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 5
    },
    yesText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    noText: {
        color: '#44327c'
    },
    icon: {
        width: 70,
        height: 70,
        tintColor: '#44327c'
    },
})
