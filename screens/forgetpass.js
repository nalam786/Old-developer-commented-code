import React from 'react';
import {Circle, Triangle} from 'react-native-shape';
import {Container, Content, Button} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import URL from '../URL';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  Linking,
  Picker,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const forgetpass = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    email: '',
    phone_no: '',
    phone_code: '',
    country: [],
  });
  const textInputChange = (v, no) => {
    switch (no) {
      case 2:
        if (v.length !== 0) {
          data.phone_code = v;
        }
        setData({
          ...data,
          phone_code: v,
        });
        console.log('phone_code:', data.phone_code);
        break;

      case 3:
        if (v.length !== 0) {
          data.phone_no = v;
        }
        console.log('phone_no:', data.phone_no);
        break;

      case 4:
        if (v.length !== 0) {
          data.email = v;
        }
        console.log('email:', data.email);
        break;
    }
  };
  const country = async () => {
    // alert(isSelected)

    // console.log("Login API Calling", U_data);

    await fetch(URL.url + 'users/country_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ U_data })
    })
      .then(res => res.json())

      .then(resjson => {
        console.log(resjson.c_data);
        setData({
          ...data,
          country: resjson.c_data,
        });
      })

      .catch(err => {
        console.log('API Failed:', err);
        alert('Failed to Connect to Server: ' + err);
      });
  };
  const signup = async () => {
    if (data.email != '') {
      alert(3456);
      send_email(data.email);
    }
    if (data.phone_no != '') {
      send_sms(data.phone_no);
    }
    if (data.email == '' && data.phone_no == '') {
      send_sms(data.phone_no);
      send_email(data.email);
    }
  };
  const send_sms = async phone => {
    let F_Data = {
      phone: phone,
    };
    console.log('Get Farm API Calling: ', F_Data);
    await fetch(URL.url + 'users/phone_varification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        alert(34567);
        fetch(
          'https://connect.jazzcmt.com/sendsms_url.html?Username=03040740644&Password=Flux_12345&From=Business&To=92' +
            phone +
            '&Message=Your Infarmer Registration code is' +
            resjson.password,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
          .then(res => res)
          .then(resjson => {
            console.log('OTP Successful');
            alert('OTP Successfully Sent to requested number.');
          })
          .catch(err => {
            console.log('Jazz API Failed', err);
            alert('Unable to Send SMS to the requested number: ' + err);
          });
      })
      .catch(err => {
        console.log('failed', err);
      });

    alert(data.phone_no);
  };
  const send_email = async mycode => {
    let F_Data = {
      Email: data.email,
    };

    console.log('Get Farm API Calling: ', F_Data);

    await fetch(URL.url + 'users/Reset_pass', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        alert(resjson.Message);
        console.log(resjson);
      })
      .catch(err => {
        console.log('failed', err);
      });
  };
  if (data.didmount == 0) {
    country();
    data.didmount = 1;

    setData({
      ...data,
      didmount: 1,
    });
  }
  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.triangleCorner]} />
          <View style={{alignSelf: 'center'}}>
            <Text style={[styles.green_h3]}>FORGET </Text>
            <Text style={[styles.green_h2]}> PASSWORD</Text>
            <Text style={[styles.green_h6_1]}>
              Pleas Enter Your Mobile No or Email{' '}
            </Text>
            <Text style={[styles.green_h6]}>
              اپنا موباءل نمبر یا ای میل درج کریں{' '}
            </Text>
            <View style={{flexDirection: 'row', width: '80%'}}>
              <View style={[styles.input_phone_code, {width: '25%'}]}>
                {/* <Picker
                  onValueChange={(itemValue, itemIndex) =>
                    textInputChange(itemValue, 2)
                  }
                  selectedValue={data.phone_code}>
                  <Picker.Item label="Code" value="" />
                  {data.country.map((
                    country,
                    keys, //you can use  mandatory field here
                  ) => (
                    <Picker.Item
                      label={country.phonecode}
                      value={country.phonecode}
                    />
                  ))}
                </Picker> */}
                <Text>92</Text>
              </View>
              <TextInput
                placeholderTextColor="#272626"
                onChangeText={val => textInputChange(val, 3)}
                placeholder="Phone No"
                keyboardType="numeric"
                maxLength={11}
                style={[styles.input_phone]}
              />
            </View>
            <Text style={[styles.green_h6_2]}>OR </Text>

            <TextInput
              placeholderTextColor="#272626"
              placeholder="Email"
              onChangeText={val => textInputChange(val, 4)}
              style={[styles.input_]}
            />
          </View>
          <Button onPress={() => signup()} style={[styles.input_button]} full>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
              RESET PASSEORD{' '}
            </Text>
          </Button>
          <Text
            onPress={() => props.navigation.navigate('signin')}
            style={[styles.green_h6, {marginTop: 20}]}>
            Don't have an account? Signin from hear{' '}
          </Text>

          <View style={[styles.triangleCorner_bottom]} rotate={270} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 0,
  },
  input_phone_code: {
    height: 35,
    width: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 20,
  },
  input_phone: {
    height: 35,
    width: '75%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  input_email: {
    height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
  },
  input_: {
    height: 40,
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
  green_h3: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf: 'center',
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf: 'center',
    marginBottom: 30,
  },
  green_h6_1: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
    // marginBottom:30,
  },
  green_h6_2: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 5,
    // marginBottom:30,
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

export default forgetpass;
