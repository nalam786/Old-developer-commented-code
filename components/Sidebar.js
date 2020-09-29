//App Navigation or Menu

import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Button,
  Icon,
  Body,
  Right,
  Switch,
  Text,
  Content,
  Input,
  ListItem,
  Left,
  Item,
  View,
} from 'native-base';
import {AsyncStorage} from 'react-native';
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};
  logout = async () => {
    try {
      await AsyncStorage.setItem('User_ID', '');
    } catch (error) {
      // Error saving data
    }
    this.props.nav.navigation.navigate('signin');
  };
  render() {
    return (
      <View style={{height: '100%', width: '100%', backgroundColor: '#359814'}}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 150,
            backgroundColor: 'white',
            height: 150,
            width: 150,
            padding: 10,
          }}>
          <Image
            source={require('../assets/img/Infarmer.png')}
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          />
        </View>
        <Text
          onPress={() => this.props.nav.navigation.navigate('manageprofile')}
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 17,
            padding: 20,
            marginTop: 10,
            width: '100%',
            textAlign: 'center',
          }}>
          Manage profile (اپ ڈیٹ پروفائل)
        </Text>
        <View
          style={{
            color: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />
        <Text
          onPress={() => this.props.nav.navigation.navigate('dashboard')}
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 17,
            padding: 20,
            width: '100%',
            textAlign: 'center',
          }}>
          Home (ہوم)
        </Text>
        <View
          style={{
            color: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />
        <Text
          onPress={() => this.props.nav.navigation.navigate('allfarms')}
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 17,
            padding: 20,
            width: '100%',
            textAlign: 'center',
          }}>
          All farms (تمام فارمز)
        </Text>
        <View
          style={{
            color: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />
        <Text
          onPress={() => this.props.nav.navigation.navigate('feedback')}
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 17,
            padding: 20,
            width: '100%',
            textAlign: 'center',
          }}>
          Feedback (بات چیت)
        </Text>

        <View
          style={{
            color: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />
        {/* <Text onPress={ ()=> this.props.nav.navigation.navigate('signin') } style={{alignSelf:"center",color:'white',fontSize:17,marginTop:20 }}>Profile</Text>     */}
        <Text
          onPress={() => this.logout()}
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 17,
            padding: 20,
            width: '100%',
            textAlign: 'center',
          }}>
          Logout (لاگ آوٹ)
        </Text>
        <View style={{position: 'absolute', bottom: 0}}>
          <Text style={{margin: 30, color: 'white'}}>Version 1.1</Text>
        </View>
      </View>
    );
  }
}
