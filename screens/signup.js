//Register Screen

import React from 'react';
import {useState} from 'react';
import URL from '../URL';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  KeyboardAvoidingView,
  Picker,
} from 'react-native';

import {Container, Content, Button} from 'native-base';

import {connect} from 'react-redux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const signup = props => {
  const [isSelected, setSelection] = useState(false);
  const [data, setData] = React.useState({
    didmount: 0,
    user_name: '',
    email: '',
    password: '',
    phone_no: '',
    phone_code: '92',
    terms_conditions: false,
    country: [],
    options: 1,
  });
//Input Field Selector on Change
  const textInputChange = (v, no) => {
    switch (no) {
      case 1:
        if (v.length !== 0) {
          data.user_name = v;
        }
        console.log('user_name:', data.user_name);
        break;

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

      case 5:
        if (v.length !== 0) {
          data.password = v;
        }
        console.log('password:', data.password);
        break;
      case 6:
        if (v.length !== 0) {
          setData({
            ...data,
            options: v,
          });
          data.options = v;
        }
        console.log('password:', data.password);
        break;
    }
  };
// SMS API Function
  const send_sms = mycode => {
    alert(data.phone_no);
    fetch(
      'https://connect.jazzcmt.com/sendsms_url.html?Username=03040740644&Password=Flux_12345&From=WATERSPRINT&To=' +
        data.phone_no +
        '&Message=Your infarmer OTP code is: ' +
        mycode,
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
  };
  //Email Send Function
  const send_email = async (mycode, email) => {
    let F_Data = {
      Email: email,
      code: mycode,
    };

    await fetch(URL.url + 'users/Send_email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        //   alert(resjson.Message);
        console.log(resjson);
      })
      .catch(err => {
        console.log('failed', err);
      });
  };
  //User Register Function
  const signup = async () => {
    var mycode = '';

    mycode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    if (data.user_name == '' || data.password == '' || data.phone_code == '') {
      alert('Please fill all the required fields');
      return false;
    }

    if (isSelected != true) {
      // return false;

      alert('Please check the Terms and Conditions');
      return false;
    }

    if (data.input_phone == '') {
      alert('Please Enter Your Email or Phone number');

      return false;
    } else {
      console.log('i am here');
      console.log(data.phone_no);
      console.log(mycode);
      if (data.phone_no.includes('@')) {
        console.log('this is email');
        send_email(mycode, data.phone_no);
        props.changeSignup({
          email: data.phone_no,
          phone_code: data.phone_code,
          //  phone: data.phone_no,
          password: data.password,
          username: data.user_name,
          code: mycode,
        });
        props.navigation.navigate('otp', {
          from: 'email',
        });
      } else {
        console.log('this is phone');
        send_sms(mycode, data.phone_no);
        props.changeSignup({
          // email: data.phone_no,
          phone_code: data.phone_code,
          phone: data.phone_no,
          password: data.password,
          username: data.user_name,
          code: mycode,
        });
        props.navigation.navigate('otp', {from: 'phone'});
      }
    }

  };

  //Countries API for Phone Code
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
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            {/* <View style={[styles.triangleCorner]} /> */}

            <View style={{alignSelf: 'center', marginTop: 50}}>
              <Text style={[styles.green_h2, {marginBottom: 0}]}>SIGN UP</Text>
              <Text style={[styles.green_h2_urdu]}>سائن اپ</Text>

              <TextInput
                placeholderTextColor="#272626"
                onChangeText={val => textInputChange(val, 1)}
                placeholder="Full Name (پورا نام)"
                style={[styles.input_email]}
              />

              <TextInput
                placeholderTextColor="#272626"
                onChangeText={val => textInputChange(val, 3)}
                placeholder="Mobile number Or Email موبائل نمبر  "
                // keyboardType="numeric"
                // maxLength={11}
                style={[styles.input_phone]}
              />

              {/* <TextInput
                placeholderTextColor="#272626"
                onChangeText={val => textInputChange(val, 4)}
                placeholder="Email (ای میل)"
                style={[styles.input_email]}
              /> */}

              <TextInput
                placeholderTextColor="#272626"
                onChangeText={val => textInputChange(val, 5)}
                secureTextEntry={true}
                placeholder="Password (پاس ورڈ)"
                style={[styles.input_]}
              />
              {/* <View>
              <Text>Receive OTP Code via:</Text>
              <Text>او ٹی پی کوڈ وصول کرنے کا ذریعہ:</Text>

                   </View> */}

              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  style={styles.checkbox}
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <View>
                  <Text style={[styles.green_h6, {marginTop: 6}]}>
                    I agree with the terms and conditions
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.green_h6,
                  {marginTop: 0, alignSelf: 'flex-end', marginBottom: 5},
                ]}>
                میں شرائط و ضوابط سے اتفاق کرتا ہوں
              </Text>
            </View>

            <Button onPress={() => signup()} style={[styles.input_button]} full>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                SIGN UP (سائن اپ)
              </Text>
            </Button>

            <Text
              onPress={() => props.navigation.navigate('signin')}
              style={[
                styles.green_h6,
                {
                  alignSelf: 'center',
                  color: 'green',
                  fontSize: 13,
                  marginTop: 20,
                },
              ]}>
              Already have an account?
            </Text>
            <Text
              onPress={() => props.navigation.navigate('signin')}
              style={[
                styles.green_h6,
                {
                  alignSelf: 'center',
                  color: 'green',
                  fontSize: 13,
                },
              ]}>
              کیا آپ پہلے سے اکاؤنٹ رکھتے ہیں؟
            </Text>
            {/* <View style={[styles.triangleCorner_bottom]} rotate={270} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  input_phone_code: {
    // height: 35,
    width: 180,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 20,
  },

  input_phone: {
    // height: 35,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  green_h2_urdu: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 50,
  },
  input_button: {
    height: 35,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    marginBottom: -10,
  },

  input_email: {
    // height: 35,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },

  input_: {
    // height: 35,
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
    fontSize: 35,
    alignSelf: 'center',
    marginBottom: 30,
  },

  green_h6: {
    color: 'black',
    fontSize: 11,
    alignSelf: 'flex-start',
    marginTop: 5,
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
});

const mapStateToProps = state => {
  return {
    flag: state.flag,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFlag: data => {
      dispatch({
        type: 'CHANGE_FLAG',
        payload: data,
      });
    },
    changeSignup: data => {
      dispatch({
        type: 'SIGNUP_DATA',
        payload: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(signup);
