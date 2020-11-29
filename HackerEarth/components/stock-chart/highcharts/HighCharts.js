import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview'

const win = Dimensions.get('window');

class ChartWeb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: `<html>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
                    <style media="screen" type="text/css">
                    #container {
                        width:100%;
                        height:100%;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        position:absolute;
                        user-select: none;
                        -webkit-user-select: none;
                    }
                    </style>
                    <head>
                        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
                        <script src="https://code.highcharts.com/stock/highstock.js"></script>
                        <script src="https://code.highcharts.com/modules/exporting.js"></script>
                        <script>
                        $(function () {
                            Highcharts.setOptions(${JSON.stringify(this.props.options)});
                            Highcharts.stockChart('container', `,
            end: `           );
                        });
                        </script>
                    </head>
                    <body>
                        <div id="container">
                        </div>
                    </body>
                </html>`,
            Wlayout: {
                height: win.height,
                width: win.width
            }
        }
    }

    reRenderWebView(e) {
        this.setState({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        })
    }

    render() {
        let config = JSON.stringify(this.props.config, function (key, value) {//create string of json but if it detects function it uses toString()
            return (typeof value === 'function') ? value.toString() : value;
        });


        config = JSON.parse(config)
        let concatHTML = `${this.state.init}${flattenObject(config)}${this.state.end}`;

        return (
            <View style={this.props.style}>
                <WebView
                    onLayout={(e) => this.reRenderWebView(e)}
                    style={styles.full}
                    source={{ html: concatHTML }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    {...this.props}
                />
            </View>
        );
    };
};

var flattenObject = function (obj, str = '{') {
    Object.keys(obj).forEach(function (key) {
        str += `${key}: ${flattenText(obj[key])}, `
    })
    return `${str.slice(0, str.length - 2)}}`
};

var flattenText = function (item, key) {
    if (key == "y") console.log(item, typeof item);
    var str = ''
    if (item && typeof item === 'object' && item.length == undefined) {
        str += flattenObject(item)
    } else if (item && typeof item === 'object' && item.length !== undefined) {
        str += '['
        item.forEach(function (k2) {
            str += `${flattenText(k2)}, `
        })
        if (item.length > 0) str = str.slice(0, str.length - 2)
        str += ']'
    } else if (typeof item === 'string' && item.slice(0, 8) === 'function') {
        str += `${item}`
    } else if (typeof item === 'string') {
        str += `\"${item.replace(/"/g, '\\"')}\"`
    } else {
        str += `${item}`
    }
    return str
};

var styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});

export default ChartWeb;
