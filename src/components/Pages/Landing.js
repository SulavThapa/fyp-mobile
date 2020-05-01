import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

class Landing extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
    headerShown: false,
  };

  state = {
    email: '',
    drivers: []
  };

  componentDidMount() {
    // this.send();
  }

  handleChange = (text) => {
    this.setState({ email: text })
  }


  handleSubmit = () => {
    if (this.state.email == '') {
      alert('Fields cannot be empty');
    } else {
      // axios.get(` https://db737949.ngrok.io/sendmail`)
      // .then(res => {
      //   this.setState({drivers: res.data});
      //   console.log(res);
      // }).catch(err => console.log('cannot access',err));

      this.props.navigation.navigate('Verification')
    }
  }

  // send = () => {
  //   if(this.state.email.trim() != 0){
  //     alert('Fields cannot be empty');
  //   }else{
  //     axios.post(`http://localhost:5000/sendmail/`,
  //       {
  //           email : this.state.email
  //       } ,
  //       {
  //           headers: {
  //               'Accept': 'application/json',
  //               'Content-Type': 'application/json; charset=UTF-8'
  //           },
  //       })
  //       .then( res => {
  //           console.log(res);
  //           console.log(res.data);
  //       })
  //       .catch(err => {
  //           console.log(`${err}`)
  //       })
  //   }
  //   console.log(this.state.email);
  // };

  render() {
    return (
      <React.Fragment>
        <ImageBackground style={styles.secondContainer} source={require('../../../assets/testback.png')}>
          <Image style={styles.logo} source={require('../../../assets/d.png')}></Image>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="ENTER YOUR EMAIL"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleChange} />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handleSubmit}>
            <Text style={styles.submitButtonText}>     Submit     </Text>
          </TouchableOpacity>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({

  secondContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    marginTop: '50%',
    height: 130,
    width: 130
  },
  submitButton: {
    elevation: 15,
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  submitButtonText: {
    color: 'white'
  },
  input: {
    width: 280,
    borderRadius: 5,

    margin: 15,
    height: 55,
    backgroundColor: 'white',
    textAlign: 'center',
    borderColor: '#7a42f4',
    borderWidth: 2
  },

});

export default Landing;
