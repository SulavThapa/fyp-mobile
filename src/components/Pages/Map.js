import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
// import MapView, {
//   Marker,
//   AnimatedRegion,
//   Polyline,
//   PROVIDER_GOOGLE
// } from "react-native-maps";
import axios from 'axios';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


class BusTracker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.state.drivers = []
  }

  static navigationOptions = {
    headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
    headerShown: false,
  };

  componentDidMount(){
    this.updateState();
  }

  updateState = () => {
    axios.get(` https://2ddc1e05.ngrok.io/drivers`)
      .then(res => {
        this.setState({drivers: res.data});
        console.log("THis is  inside the get resource");
        console.log(this.state.drivers);
        console.log("THis is  inside the get resource");
      }).catch(err => console.log('cannot access',err));
      console.log("THis is  outside the get resource");
      console.log(this.state.drivers)
      console.log("THis is  outside the get resource");
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          {/* <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 27.645699,
            longitude: 85.391891,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}>
          <Marker
            coordinate={{
              latitude: 27.645699,
              longitude: 85.391891,
            }}
            title="Demo"
            description="A location to test"
          />
        </MapView> */}
         <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
          <Text style={{color: 'white'}}>
            This is the Map Section.
          </Text>
        </View>
        <View style={styles.secondcontainer}>

        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#7a42f4',
    height: '80%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  secondcontainer: {
    backgroundColor: 'white',
    height: '20%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  }
})

export default BusTracker;