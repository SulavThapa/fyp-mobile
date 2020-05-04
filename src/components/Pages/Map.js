import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,Platform
} from 'react-native';
import axios from 'axios';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-shadow-cards';


class BusTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      lat: '',
      lon: '',
      data: [],
      first: [],
      busNumber: '',
      fullName: '',
      busRoute: '',
    }
  }

  static navigationOptions = {
    headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
    headerShown: false,
  };

  componentDidMount() {
    this.updateState();
    this.fetchDriver();
  }
   updateState = () => {

    fetch('https://api.thingspeak.com/channels/1021842/feeds.json?api_key=LIN8G7PKND7MMP6E&results=1', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          lat: responseJson.feeds[0].field1,
          lon: responseJson.feeds[0].field2,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchDriver = () => {
    fetch('https://77c59586.ngrok.io/drivers', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          drivers: responseJson,
          busNumber: responseJson[0].busNumber,
          fullName: responseJson[0].fullName,
          busRoute: responseJson[0].busRoute
        })
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 27.645699,
              longitude: 85.391891,
              latitudeDelta: 0,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: 27.645699,
                longitude: 85.391891,
              }}
              title="Test Maker"
              description="This is the test marker"
              icon={require('../../../assets/tool.png')}
            />
            <Marker
              coordinate={{
                latitude: 27.645699,
                longitude: 85.392885,
              }}
              title="Test Maker"
              description="This is the test marker"
              icon={require('../../../assets/tool.png')}
            />
            <Marker
              coordinate={{
                latitude: 27.645699,
                longitude: 85.393891,
              }}
              title="Test Maker"
              description="This is the test marker"
              icon={require('../../../assets/tool.png')}
            />
          </MapView>
          {/* {this.state.drivers.map( (driver, i) => */}
          <Card style={styles.card}>
            <View style={styles.secondcontainer}>
              {this.state.busNumber.length > 0 ?
                <React.Fragment>
                  <Image style={styles.logo} source={require('../../../assets/bus.png')}></Image>
                  <View style={styles.cardView}>
                    <Text style={styles.cardtext}>Bus Number</Text>
                    <Text style={styles.innertext}>{this.state.busNumber}</Text>
                    <Text style={styles.cardtext1}>Driver Name</Text>
                    <Text style={styles.innertext}>{this.state.fullName}</Text>
                    <Text style={styles.cardtext2}>Bus Route</Text>
                    <Text style={styles.innertext}>{this.state.busRoute}</Text>
                  </View>
                </React.Fragment>
                : <ActivityIndicator size="small" color="#00ff00" />

              }

            </View>
          </Card>
          {/* )} */}
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#7a42f4',
    height: '100%',
    width: '100%',
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  innertext: {
    fontSize: 16,
    fontFamily: 'monospace',
    textAlign: 'center'
  },
  cardtext: {
    fontWeight: 'bold',
    marginTop: '10%',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'monospace'
  },
  cardtext1: {
    fontWeight: 'bold',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'monospace'
  },
  cardtext2: {
    fontWeight: 'bold',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'monospace'
  },
  card: {
    bottom: '5%',
    width: '87%',
    borderRadius: 15,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardView: {
    height: '100%',
    width: '55%'
  },
  logo: {
    borderRadius: 100,
    backgroundColor: "white",
    height: 130,
    width: 130,
    elevation: 15,
  },
  secondcontainer: {
    flex: 1,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '20%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  }
})

export default BusTracker;