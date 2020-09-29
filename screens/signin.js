//Login Screen

import React from 'react';
import URL from '../URL';
import {useState} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {connect} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  CheckBox,
} from 'react-native';

import {Container, Content, Button} from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = props => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    didmount: 0,
  });
  const [isSelected, setSelection] = useState(false);
  const textInputChange = (v, no) => {
    switch (no) {
      case 1:
        if (v.length !== 1) {
          data.email = v;
        }
        console.log('email:', data.email);
        break;

      case 2:
        if (v.length !== 2) {
          data.password = v;
        }
        console.log('password:', data.password);
        break;
    }
  };
//Function for login
  const signup = async () => {
    try {
      await AsyncStorage.setItem('User_ID', '');
    } catch (error) {}

    if (data.email == '' || data.password == '') {
      return false;
    }

    let U_data = {
      email: data.email,
      password: data.password,
    };

    console.log('Login API Calling', U_data);

    if (data.email.includes('@')) {
      console.log('inside id');
      await fetch(URL.url + 'users/log_in', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({U_data}),
      })
        .then(res => res.json())

        .then(async resjson => {
          if (resjson.Message == 'Successfully_Login') {
            if (isSelected) {
              let a = resjson.data[0].id,
                farm_id;
              try {
                await AsyncStorage.setItem('User_ID', '' + a);
              } catch (error) {
                // Error saving data
              }
            }

            props.user_id({
              user_id: resjson.data[0].id,
              farm_id: 0,
              phone: data.phone_no,
              password: data.password,
              username: data.user_name,
              code: 0,
            });
            props.navigation.navigate('dashboard');
          } else {
            Alert.alert('Password Incorrect');
          }

          // alert(resjson.Message);
        })

        .catch(err => {
          console.log('API Failed:', err);
          alert('Failed to Connect to Server: ' + err);
        });
    } else {
      console.log('inside else');
      await fetch(URL.url + 'users/log_in_p', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({U_data}),
      })
        .then(res => res.json())

        .then(async resjson => {
          console.log(resjson);
          if (resjson.Message == 'Successfully Login') {
            if (isSelected) {
              let a = resjson.data[0].id,
                farm_id;
              try {
                AsyncStorage.setItem('User_ID', '' + a);
              } catch (error) {
                // Error saving data
              }
            }

            props.user_id({
              user_id: resjson.data[0].id,
              farm_id: 0,
              phone: data.phone_no,
              password: data.password,
              username: data.user_name,
              code: 0,
            });
            props.navigation.navigate('dashboard');
          } else {
            Alert.alert('Password Incorrect');
          }

          //   alert(resjson.Message);
        })

        .catch(err => {
          console.log('API Failed:', err);
          alert('Failed to Connect to Server: ' + err);
        });
    }
  };
  //Function to Remember login
  const auto_login = async () => {
    try {
      const value = await AsyncStorage.getItem('User_ID');
      if (value !== null) {
        props.user_id({
          user_id: JSON.parse(value),
          farm_id: 0,
          phone: data.phone_no,
          password: data.password,
          username: data.user_name,
          code: 0,
        });
        props.navigation.navigate('dashboard');
        console.log(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  if (data.didmount == 0) {
    auto_login();
    data.didmount = 1;

    setData({
      ...data,
      didmount: 1,
    });
  }
  return (
    <>
      <View
        style={{
          // flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
        {/* <View style={[styles.triangleCorner]} /> */}

        <View style={{alignSelf: 'center'}}>
          <Text style={[styles.green_h2, {marginBottom: 0}]}>SIGN IN</Text>
          <Text style={[styles.green_h2_urdu]}>سائن ان کریں</Text>

          <TextInput
            placeholderTextColor="#272626"
            placeholder="Email or Mobile (ای میل یا موبائل نمبر)"
            style={[styles.input_email]}
            onChangeText={val => textInputChange(val, 1)}
          />
          <TextInput
            placeholderTextColor="#272626"
            secureTextEntry={true}
            placeholder="Password (پاس ورڈ)"
            style={[styles.input_]}
            onChangeText={val => textInputChange(val, 2)}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15, fontWeight: '800', marginTop: 4}}>
              Remember Me (یاد رکھیں)
            </Text>

            <CheckBox
              style={{alignSelf: 'flex-start', borderRadius: 50}}
              value={isSelected}
              onValueChange={setSelection}
            />
          </View>

          <Text
            onPress={() => props.navigation.navigate('forgetpass')}
            style={[styles.green_h6]}>
            Forget Password?
          </Text>
          <Text
            onPress={() => props.navigation.navigate('forgetpass')}
            style={[styles.green_h6]}>
            کیا آپ پاس ورڈ بھول گے ہیں؟
          </Text>
        </View>
        <View>
          <Button onPress={() => signup()} style={[styles.input_button]} full>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
              LOGIN (لاگ ان کریں)
            </Text>
          </Button>
        </View>

        <Text
          onPress={() => props.navigation.navigate('signup')}
          style={[
            styles.green_h6,
            {alignSelf: 'center', color: 'green', marginTop: 15},
          ]}>
          Create a new account
        </Text>
        <Text
          onPress={() => props.navigation.navigate('signup')}
          style={[
            styles.green_h6,
            {alignSelf: 'center', color: 'green', margin: 0},
          ]}>
          نیا اکاؤنٹ بنائیں
        </Text>
        {/* <Text
          onPress={() => props.navigation.navigate('slider')}
          style={[
            styles.green_h6,
            {alignSelf: 'center', color: 'green', margin: 0},
          ]}>
          How to use this app
        </Text> */}
        {/*  */}
        {/* <View style={[styles.triangleCorner_bottom]} rotate={270} /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input_button: {
    // height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 15,
  },

  input_email: {
    // height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
  },

  input_: {
    // height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },

  green_h2: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 50,
  },
  green_h2_urdu: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 50,
  },

  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf: 'flex-end',
  },

  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 130,
    borderTopWidth: 130,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
  },

  triangleCorner_bottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 130,
    borderBottomWidth: 130,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    alignSelf: 'flex-end',
  },

  scrollView: {
    backgroundColor: Colors.lighter,
  },

  engine: {
    position: 'absolute',
    right: 0,
  },

  body: {
    backgroundColor: Colors.white,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },

  highlight: {
    fontWeight: '700',
  },

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const mapStateToProps = state => {
  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFlag: data => {
      dispatch({type: 'CHANGE_FLAG', payload: data});
    },
    changeSignup: data => {
      dispatch({type: 'SIGNUP_DATA', payload: data});
    },
    user_id: data => {
      dispatch({type: 'USER_ID', payload: data});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
