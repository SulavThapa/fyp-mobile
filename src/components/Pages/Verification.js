import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';

class Verification extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
        headerShown: false,
    };

    render() {
        return (
            <React.Fragment>
                <ImageBackground style={styles.secondContainer} source={require('../../../assets/veriback.png')}>

                    <View style={styles.container}>
                        <Card style={styles.card}>
                            <Image style={styles.logo} source={require('../../../assets/d.png')}></Image>

                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Bus Code"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                                onChangeText={this.handlesubmit} />

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={
                                    () => this.props.navigation.navigate('BusTracker')
                                }>
                                <Text style={styles.submitButtonText}>     Submit     </Text>
                            </TouchableOpacity>
                        </Card>
                        <Text style={styles.footer}>
                            Developed By:- Sulav Thapa
                    </Text>
                    </View>
                </ImageBackground>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({

    secondContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 760
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        marginTop: '40%',
        alignItems: "center"
    },
    logo: {
        marginBottom: 20,
        borderRadius: 100,
        backgroundColor: "white",
        height: 130,
        width: 130
    },
    footer: {
        color: 'gray',
        fontSize: 11,
        alignItems: 'center'
    },
    card: {
        bottom: '2%',
        borderRadius: 10,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 240,
        margin: 15,
        height: 50,
        backgroundColor: 'white',
        textAlign: 'center',
        borderColor: '#7a42f4',
        borderWidth: 2
    },
    submitButton: {
        marginBottom: 100,
        elevation: 15,
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        justifyContent: 'center',
        height: 50,
        borderRadius: 5
    },
    submitButtonText: {
        color: 'white'
    }
})

export default Verification;