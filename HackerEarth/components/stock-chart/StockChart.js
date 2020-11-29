import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, Modal, View, ActivityIndicator } from 'react-native'
import ChartView from './highcharts/HighCharts'

import { fetchStockData, fetchData, transformData, fetchDemo } from '../../utils/Stock'
import { TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AuthContext } from '../../App'
import { clearTokens, getBiometric, openBiometricAuthentication } from '../../utils/Authentication'



const StockChart = ({ name = "IBM", navigation }) => {

    const authDispatch = useContext(AuthContext);
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(false);

    const [active, setactive] = useState('Yearly');

    const [showModal, setshowModal] = useState(false); //make true

    // useEffect(() => {
    //     getBiometric().then(isEnabled => {
    //         if (isEnabled == '1') {
    //             openBiometricAuthentication().then(() => {
    //                 setshowModal(false);
    //             })
    //         } else if (isEnabled == '0') {
    //             setshowModal(false);
    //         }
    //     })
    // }, [])

    // console.log(data && data.data)

    useEffect(() => {
        (async function () {
            setloading(true);
            const data = await fetchStockData(name, 'TIME_SERIES_INTRADAY');
            const transformedData = transformData(data);
            console.log(transformedData)
            setdata(transformedData);
            setloading(false);
        })();
    }, [active])

    console.log(data)

    var Highcharts = 'Highcharts';
    var conf = {
        title: {
            text: 'AAPL stock price by minute'
        },
        subtitle: {
            text: 'Using ordinal X axis'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },
        exporting: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'AAPL',
            type: 'area',
            data: data,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, "#94c2ef"],
                    [1, "#e5f0fb"]
                ]
            },
            threshold: null
        }]
    }

    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };

    const onLogout = () => {
        clearTokens().then(() => {
            authDispatch('LOGOUT')
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                transparent
                visible={showModal}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }} />
            </Modal>
            <TouchableNativeFeedback onPress={() => onLogout()}>
                <Text style={{ alignSelf: 'flex-end' }}>Logout</Text>
            </TouchableNativeFeedback>
            {loading && <ActivityIndicator />}
            {data &&
                <>
                    <ChartView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        style={{ height: 400 }} config={conf} options={options} />
                    <View style={styles.row}>
                        <TouchableOpacity>
                            <View style={{ ...styles.button, backgroundColor: active == 'Yearly' ? '#e5f0fb' : '#f0f0f0' }}>
                                <Text>Yearly</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ ...styles.button, backgroundColor: active == 'Monthly' ? '#e5f0fb' : '#f0f0f0' }}>
                                <Text>Monthly</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ ...styles.button, backgroundColor: active == 'Daily' ? '#e5f0fb' : '#f0f0f0' }}>
                                <Text>Dailys</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </SafeAreaView>
    )
}

export default StockChart

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 80,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    button: {
        marginRight: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,

    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12,
    }
})
