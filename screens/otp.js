import React from 'react';
import {connect} from 'react-redux';
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
  CheckBox,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const OTP = props => {
  console.log(props.route.params.from);
  const [data, setData] = React.useState({
    didmount: 0,

    textInput2: null,
    textInput3: null,
    textInput4: null,
    textInput5: null,
    collect_val1: '',
    collect_val2: '',
    collect_val3: '',
    collect_val4: '',
    collect_val5: '',
  });

  const shift = (v, a) => {
    switch ((v, a)) {
      case 1:
        data.textInput2.focus();
        collect(v, 1);
        break;

      case 2:
        data.textInput3.focus();
        collect(v, 2);
        break;

      case 3:
        data.textInput4.focus();
        collect(v, 3);
        break;

      case 4:
        data.textInput5.focus();
        collect(v, 4);
        break;

      case 5:
        data.textInput5.focus();
        collect(v, 5);
        break;

      default:
        break;
    }
  };

  const collect = (v, a) => {
    switch (a) {
      case 1:
        setData({
          ...data,
          collect_val1: v,
        });
        break;

      case 2:
        setData({
          ...data,
          collect_val2: v,
        });
        break;

      case 3:
        setData({
          ...data,
          collect_val3: v,
        });
        break;

      case 4:
        setData({
          ...data,
          collect_val4: v,
        });
        break;

      case 5:
        data.collect_val5 = v;
        setData({
          ...data,
          collect_val5: v,
        });

        if (a != '') {
          register();
        }
        break;

      default:
        break;
    }
  };

  const register = async () => {
    var mycode =
      data.collect_val1 +
      data.collect_val2 +
      data.collect_val3 +
      data.collect_val4 +
      data.collect_val5;

    alert('OTP Correctly Added');
    console.log(props.signup.code);
    console.log(mycode);
    if (props.signup.code == mycode) {
      console.log('i am inside if');
      let U_data = '';
      if (props.route.params.from == 'email') {
        console.log('2 if');
        U_data = {
          user_name: props.signup.username,
          email: props.signup.email,
          password: props.signup.password,
          //phone_no: '',
          phone_code: props.signup.phone_code,
        };
      } else {
        console.log('2 else');
        U_data = {
          user_name: props.signup.username,
          //  email: '',
          password: props.signup.password,
          phone_no: props.signup.phone,
          phone_code: props.signup.phone_code,
        };
      }
      //await fetch(URL.url+'users/countr_data', {
      await fetch(URL.url + 'users/users_create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({U_data}),
      })
        // .then(console.log('User Data:' + U_data))
        // .then(res => res.json())
        // .then(resjson => {
        .then(response => response.json())
        .then(responseJson => {
          console.log(JSON.stringify(responseJson));
          if (responseJson.Message == 'Successfully Registered') {
            props.navigation.navigate('dashboard');
          }

          alert(responseJson.Message);
        })

        .catch(err => {
          console.log('Registered Failed', err);
          alert('Unable to Register: ' + err);
        });
    }
  };

  if (data.didmount == 0) {
    // data.textInput.focus();
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.triangleCorner]} />

        <View style={{alignSelf: 'center'}}>
          <Text style={[styles.green_h2]}>OTP</Text>

          <Text style={[styles.green_h6_1]}>
            Pleas Enter Your 5 Digit Security Code{' '}
          </Text>
          <Text style={[styles.green_h6]}>
            اپنا 5 ہندسوں کا سکیورٹی کوڈ درج کریں{' '}
          </Text>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TextInput
              autoFocus={true}
              onChangeText={text => shift(text, 1)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#272626"
              placeholder="*"
              style={[styles.input_phone_code]}
            />
            <TextInput
              ref={input2 => (data.textInput2 = input2)}
              onChangeText={text => shift(text, 2)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#272626"
              placeholder="*"
              style={[styles.input_phone_code]}
            />
            <TextInput
              ref={input3 => (data.textInput3 = input3)}
              onChangeText={text => shift(text, 3)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#272626"
              placeholder="*"
              style={[styles.input_phone_code]}
            />
            <TextInput
              ref={input4 => (data.textInput4 = input4)}
              onChangeText={text => shift(text, 4)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#272626"
              placeholder="*"
              style={[styles.input_phone_code]}
            />
            <TextInput
              ref={input5 => (data.textInput5 = input5)}
              onChangeText={text => shift(text, 5)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#272626"
              placeholder="*"
              style={[styles.input_phone_code]}
            />
          </View>
        </View>

        <View style={[styles.triangleCorner_bottom]} rotate={270} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input_phone_code: {
    height: 35,
    width: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 5,
  },

  green_h2: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 35,
    alignSelf: 'center',
    marginBottom: 30,
  },

  green_h6_1: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
  },

  green_h6: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 130,
    borderTopWidth: 130,
    borderRightColor: 'transparent',
    borderTopColor: '#359814',
  },

  triangleCorner_bottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 130,
    borderBottomWidth: 130,
    borderLeftColor: 'transparent',
    borderBottomColor: '#359814',
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
    signup: state.signup_redux,
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
)(OTP);
