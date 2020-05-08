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
  PermissionsAndroid, Platform
} from 'react-native';
import axios from 'axios';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-shadow-cards';
import GetLocation from 'react-native-get-location'
navigator.geolocation = require('@react-native-community/geolocation');

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
      currentLocationLat: 27.717245000000002,
      currentLocationLon: 85.32395999999999,
      pos: [],
      stop: [
        { latitude: 27.637611, longitude: 85.3933118, description: 'Biruwa Bus Stop' },
        { latitude: 27.6405099, longitude: 85.3909004, description: 'Bindebashini Marga Bus Stop' },
        { latitude: 27.6418975, longitude: 85.3905974, description: 'Hardware Bus Stop' },
        { latitude: 27.6439017, longitude: 85.3886393, description: 'Mill Bus Stop' },
        { latitude: 27.6439017, longitude: 85.3886393, description: 'Suyel Gau Bus Stop' },
        { latitude: 27.6452703, longitude: 85.3882424, description: 'Palace Bus Stop' },
        { latitude: 27.6462492, longitude: 85.3872124, description: 'New Marga Bus Stop' },
        { latitude: 27.6483876, longitude: 85.3856675, description: 'Nic Asia Bus Stop' }
      ],
      location: [],
      longitude: 0,
      latitude: 0
    }
  }

  static navigationOptions = {
    headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
    headerShown: false,
  };

  async componentDidMount() {
    this.updateState();
    this.fetchDriver();

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.currentLocation();
    }
    else {
      alert("Location Permission Not Granted");
    }
  } catch(err) {
    console.warn(err)
  }


  currentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        })
        console.log(this.state.latitude)
        console.log(this.state.longitude)

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

  updateState = () => {

    fetch('https://api.thingspeak.com/channels/1021842/feeds.json?api_key=LIN8G7PKND7MMP6E&results=1', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.feeds[0],
          lat: responseJson.feeds[0].field1,
          lon: responseJson.feeds[0].field2
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchDriver = () => {
    fetch('https://b809215e.ngrok.io/drivers', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          drivers: responseJson.feeds,
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

    const latlngi = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }
    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 27.6439017,
              longitude: 85.3886393,
              latitudeDelta: 0,
              longitudeDelta: 0.01,
            }}
          >
              <Marker
              coordinate={{
                latitude: Number(this.state.lat),
                longitude: Number(this.state.lon),
              }}
              title="Bus Location"
              description=""
              icon={require('../../../assets/automobile.png')}
            />
            {this.state.stop.map(stop =>
              <Marker
                coordinate={{
                  latitude: stop.latitude,
                  longitude: stop.longitude,
                }}
                title="Bus Stop"
                description={stop.description}
                icon={require('../../../assets/tool.png')}
              />
            )}
          </MapView>
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