import React from 'react';
import {useState} from 'react';
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
  FlatList,
  Picker,
} from 'react-native';

import {Container, Content, Button, Footer, DatePicker} from 'native-base';

import {connect} from 'react-redux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_1 = props => {
  const [season, setSelectedValue] = useState('');
  const [data, setData] = React.useState({
    farm_name: '',
    crop: '',
    sowing_date: new Date(),
    area: props.area_,
    user_id: '',
    map: '',
    didmount: 0,
  });
  // alert(props.area_)
  const textInputChange = (v, no) => {
    console.log('value:', v, no);

    switch (no) {
      case 1:
        if (v.length !== 0) {
          data.farm_name = v;
        }
        setData({
          ...data,
          farm_name: v,
        });
        console.log('user_name:', data.farm_name);
        break;

      case 2:
        if (v.length !== 0) {
          data.crop = v;
        }
        setData({
          ...data,
          crop: v,
        });
        console.log('phone_code:', data.crop);
        break;

      case 3:
        if (v.length !== 0) {
          var d = new Date(v);
          var y = d.getFullYear();
          var m = d.getMonth();
          var day = d.getDate();
          var date = '';
          if (day < 10 && m < 10) {
            date = y + '-0' + m + '-0' + day;
          } else {
            if (day < 10) {
              date = y + '-' + m + '-0' + day;
            }
            if (m < 10) {
              date = y + '-0' + m + '-' + day;
            }
          }
          console.log(date);
          data.sowing_date = date;
        }
        setData({
          ...data,
          sowing_date: date,
        });
        console.log('sowing_date:', data.sowing_date);
        break;

      case 4:
        if (v.length !== 0) {
          data.area = v;
        }
        setData({
          ...data,
          area: v,
        });
        console.log('area:', data.area);
        break;

      case 5:
        if (v.length !== 0) {
          season = v;
        }
        setData({
          ...data,
          area: v,
        });
        console.log('season:', season);
        break;
    }
  };

  const get_farms = async () => {
    let F_Data = {
      f_user_id: props.user_ids.user_id,
    };

    console.log('Get Farm API Calling: ', F_Data);

    await fetch(URL.url + 'farms/farms_get_all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        if (resjson.Message == 'All Farms Get Successfully') {
          console.log(resjson.data);

          let data = resjson.data.length;
          let id = resjson.data[data - 1].id;

          props.user_id({user_id: props.user_ids.user_id, farm_id: id});

          console.log('Farm ID: ' + props.user_ids.farm_id);

          props.nav.navigation.navigate('land_preperation_form');
        }
      })
      .catch(err => {
        console.log('failed', err);
      });
  };

  const sendform = async () => {
    //get_farms();

    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      date = y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        date = y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        date = y + '-0' + m + '-' + day;
      }
    }
    if (
      data.farm_name == '' ||
      data.crop == '' ||
      data.sowing_date == '' ||
      data.area == ''
    ) {
      alert('Please fill all the fields');
      return false;
    }

    let F_Data = {
      f_user_id: props.user_ids.user_id,
      f_farm_name: data.farm_name,
      f_crop: data.crop,
      f_sowing_date: data.sowing_date,
      f_area: props.area_,
      f_season: season,
      f_map: props.map_cord.coordinates,
      f_created_by: props.user_ids.user_id,
      f_created_at: date,
      f_modified_by: props.user_ids.user_id,
      f_modified_at: date,
    };

    console.log('Create Farms API Calling: ', F_Data);

    await fetch(URL.url + 'farms/farms_create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        if (resjson.Message == 'New Farm Created Successfully') {
          get_farms();
        }
        alert(resjson.Message);
      })
      .catch(err => {
        console.log('Failed', err);
        alert('Failed' + err);
      });
  };
  if (data.didmount == 0) {
    let a = props.area_;
    a = JSON.stringify(a);
    // this.renderForm();
    // get_landpreperation();
    if (props.area_ != 0) {
      data.didmount = 1;

      setData({
        ...data,
        didmount: 1,
        area: a,
      });
    }
  }
  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={{alignSelf: 'center', marginTop: 30, width: '95%'}}>
            <Text>FARM NAME (فارم کانام):</Text>
            <TextInput
              placeholderTextColor="#272626"
              onChangeText={val => textInputChange(val, 1)}
              value={data.farm_name}
              placeholder=" "
              style={[styles.input_email]}
            />
            <Text>Crop (فصل):</Text>
            <View style={[styles.input_email]}>
              <Picker
                onValueChange={(itemValue, itemIndex) =>
                  textInputChange(itemValue, 2)
                }
                selectedValue={data.crop}>
                <Picker.Item label="" value="" />
                <Picker.Item label="Wheat (گندم)" value="Wheat" />
                <Picker.Item label="Rice (چاول)" value="Rice" />
                <Picker.Item label="Cotton (روئی)" value="Cotton" />
                <Picker.Item label="Soybean (سویا بین)" value="Soybean" />
                <Picker.Item label="Other (دیگر)" value="Other" />
              </Picker>
            </View>

            <Text>Season (موسم):</Text>
            <View style={[styles.input_email]}>
              <Picker
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
                selectedValue={season}>
                <Picker.Item label="" value="" />
                <Picker.Item label="Rabi (ربیع)" value="0" />
                <Picker.Item label="Kharif (خریف)" value="1" />
                <Picker.Item label="Yearly (سالانہ)" value="2" />
                <Picker.Item label="Other (دیگر)" value="3" />
              </Picker>
            </View>
            <Text>Showing date (بیج کی بوائی)</Text>
            <View
              style={[
                styles.input_email,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#e3e3e3',
                },
              ]}>
              <Content>
                <DatePicker
                  defaultDate={data.sowing_date}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: 'green'}}
                  onDateChange={val => textInputChange(val, 3)}
                  disabled={false}
                />
              </Content>
              <Image
                source={require('../assets/img/calendar.png')}
                style={{
                  width: '12%',
                  height: '80%',
                  resizeMode: 'stretch',
                  marginRight: 10,
                }}
              />
            </View>

            {/* <View
              style={[
                styles.input_email,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#e3e3e3',
                },
              ]}>
              <DatePicker
                defaultDate={data.sowing_date}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText=""
                textStyle={{color: 'green'}}
                onDateChange={val => textInputChange(val, 3)}
                disabled={false}
              />
              <Image
                source={require('../assets/img/calendar.png')}
                style={{
                  width: '12%',
                  height: '80%',
                  resizeMode: 'stretch',
                  marginRight: 10,
                }}
              />
            </View> */}

            <View>
              <Button
                onPress={() => props.nav.navigation.navigate('farm_map')}
                style={[styles.input_button]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  Map Farm ( فارم شامل کریں )
                </Text>
              </Button>
            </View>
            <Text style={{marginTop: 20}}>AREA (ACRES)( رقبہ (ایکڑ</Text>
            {/* <TextInput
              placeholderTextColor="#272626"
              value={props.area_}
              onChangeText={val => textInputChange(val, 4)}
              keyboardType="numeric"
              placeholder=""
              style={[styles.input_email]}
            /> */}
            <Text>{props.area_}</Text>
            <View>
              {/* <Button onPress={() => props.nav.navigation.navigate('farm_map')} style={[styles.input_button]} full >
                <Text style={{ color: "white", fontSize: 15, fontWeight: '800' }} >Farm Map</Text>
              </Button> */}
            </View>
          </View>
        </View>
        <View>
          <Button onPress={() => sendform()} style={[styles.input_button]} full>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
              Submit (جمع کرائیں)
            </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  input_button: {
    height: 35,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 0,
  },

  box: {
    backgroundColor: '#05422b',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },

  paragraph: {
    backgroundColor: '#359814',
    fontSize: 8,
  },

  header: {
    backgroundColor: '#359814',
    height: 70,
  },

  cart: {
    backgroundColor: '#d7f3db',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: '3%',
  },

  cartbody: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 0,
    marginTop: 30,
  },

  input_phone_code: {
    height: 35,
    width: 65,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 5,
  },

  input_phone: {
    height: 35,
    width: 230,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },

  input_email: {
    height: '8%',
    width: '100%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
    paddingBottom: 0,
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

  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },

  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: 'flex-start',
  },

  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
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
    map_cord: state.map_redux,
    area_: state.area_of_poligon,
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
)(form_1);
