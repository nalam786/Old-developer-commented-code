import React from 'react';
import {Circle, Triangle} from 'react-native-shape';
import Form_footer from '../components/form_footer';
import URL from '../URL';
import Form6 from '../components/form_6';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from 'react-redux';

import {
  SafeArea_inputView,
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_6 = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    render_flag: 0,
    footer: true,
    farm_id: [],
    harvesting_area: [],
    crop_yield: [],
    crop_qty: [],
    crop_qty_detail: [],
    harvest_date: [],
    additional_info: [],
    created_at: [],
    modified_at: [],
    gestureName: '',
    bottomfooter: false,
  });

  renderForm = () => {
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
    data.farm_id.push({farm_id: ''});
    data.harvesting_area.push({harvesting_area: ''});
    data.crop_yield.push({crop_yield: ''});
    data.crop_qty.push({crop_qty: ''});
    data.crop_qty_detail.push({crop_qty_detail: ''});
    data.harvest_date.push({harvest_date: date});
    data.additional_info.push({additional_info: ''});

    setData({
      ...data,
      harvesting_area: data.harvesting_area,
    });
  };

  const sendform = async () => {
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

    // for (let j = 0; j < data.harvesting_area.length; j++) {

    //   // if (data.f_harvesting_area[j] == "") {
    //   //   alert('Please fill all the mandatory fields' + j);
    //   //   return false;
    //   // }
    // }

    for (let i = 0; i < data.harvesting_area.length; i++) {
      let F_data = {};
      let F_Data = {
        f_farm_id: props.user_ids.farm_id,
        f_harvesting_area: data.harvesting_area[i].harvesting_area,
        f_crop_yield: data.crop_yield[i].crop_yield,
        f_crop_qty: data.crop_qty[i].crop_qty,
        f_crop_qty_detail: data.crop_qty_detail[i].crop_qty_detail,
        f_harvest_date: data.harvest_date[i].harvest_date,
        f_additional_info: data.additional_info[i].additional_info,
        f_created_by: props.user_ids.farm_id,
        f_created_at: date,
        f_modified_by: props.user_ids.farm_id,
        f_modified_at: date,
      };

      console.log('Harvesting Form Create API Calling', F_Data);

      await fetch(URL.url + 'harvestings/harvestings_create', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({F_Data}),
      })
        .then(res => res.json())

        .then(resjson => {
          if (resjson.Message == 'New Harvesting Created Successfully') {
            props.navigation.navigate('crop_health_form');
          }

          alert(resjson.Message);
        })

        .catch(err => {
          console.log('Harvesting API Failed', err);
          alert('Failed to Submit Data: ' + err);
        });
    }
  };

  if (props.flag.flag == 'harvisting_create') {
    switch (props.flag.s_key) {
      case 1:
        data.harvesting_area[props.flag.index].harvesting_area =
          props.flag.value;
        break;
      case 2:
        data.crop_yield[props.flag.index].crop_yield = props.flag.value;
        break;
      case 3:
        data.crop_qty[props.flag.index].crop_qty = props.flag.value;
        break;
      case 4:
        data.crop_qty_detail[props.flag.index].crop_qty_detail =
          props.flag.value;
        break;
      case 5:
        data.harvest_date[props.flag.index].harvest_date = props.flag.value;
        break;
      case 6:
        data.additional_info[props.flag.index].additional_info =
          props.flag.value;
        break;

      default:
        break;
    }

    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });
  }

  if (props.flag.flag == 'harvisting_delete') {
    data.farm_id.splice(props.flag.index, 1);
    data.harvesting_area.splice(props.flag.index, 1);
    data.crop_yield.splice(props.flag.index, 1);
    data.crop_qty.splice(props.flag.index, 1);
    data.crop_qty_detail.splice(props.flag.index, 1);
    data.harvest_date.splice(props.flag.index, 1);
    data.additional_info.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      this.renderForm();
      data.rander_flag = 1;

      setData({
        ...data,
        harvesting_area: data.harvesting_area,
        rander_flag: 1,
      });
    }

    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });
  }
  if (props.flag.flag == 'harvisting_hide/show_footer') {
    // alert(data.rander_flag)

    if (props.flag.value == 'hide' && data.render_flag == 0) {
      // alert(3456)
      data.render_flag = 1;
      setData({
        ...data,
        footer: false,
        render_flag: 1,
      });
    }
    if (props.flag.value == 'show' && data.render_flag == 1) {
      data.render_flag = 0;
      // alert(33333)
      setData({
        ...data,
        footer: true,
        render_flag: 0,
      });
    }
  }
  if (data.didmount == 0) {
    this.renderForm();
    data.didmount = 1;
    setData({
      ...data,
      didmount: 1,
    });
  }
  const onSwipeUp = gestureState => {
    setData({
      ...data,
      bottomfooter: true,
    });
    console.log('s');
  };
  const onSwipeDown = gestureState => {
    console.log('dddd');
    setData({
      ...data,
      bottomfooter: false,
    });
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    // this.setState({gestureName: gestureName});
    setData({
      ...data,
      gestureName: data.gestureName,
    });
    switch (gestureName) {
      case SWIPE_UP:
        setData({
          ...data,
          bottomfooter: true,
        });

        console.log('wool');
        break;
      case SWIPE_DOWN:
        setData({
          ...data,
          bottomfooter: false,
        });
        break;
    }
  };
  const bottom_footer = () => {
    console.log('my dta');
    console.log(data.bottomfooter);
    if (data.bottomfooter == true) {
      return data.footer ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
          }}>
          <Form_footer form_no={6} nav={props} />
        </View>
      ) : (
        <View />
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeUp={state => onSwipeUp(state)}
        onSwipeDown={state => onSwipeDown(state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.header]}>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/img/menu.png')}
                  style={{
                    width: '30%',
                    height: 20,
                    resizeMode: 'stretch',
                    marginLeft: 10,
                  }}
                />
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                  Harvesting
                </Text>
              </View>
              <View
                style={{
                  width: '10%',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{alignSelf: 'center', marginTop: 30, width: '95%'}}>
              {data.harvesting_area.map((harvesting_area, keys) => (
                <Form6
                  index={keys + 1}
                  farm_id={data.farm_id}
                  f_harvesting_area={data.harvesting_area}
                  f_crop_yield={data.crop_yield}
                  f_crop_qty={data.crop_qty}
                  f_crop_qty_detail={data.crop_qty_detail}
                  f_harvest_date={data.harvest_date}
                  f_additional_info={data.additional_info}
                  index2={keys}
                />
              ))}
            </View>
          </View>
          <View>
            <Button
              onPress={() => renderForm()}
              style={[styles.input_button]}
              full>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                ADD FORM
              </Text>
            </Button>
          </View>
          <View style={{marginBottom: 8}}>
            <Button
              onPress={() => sendform()}
              style={[styles.input_button,{ marginBottom: 300}]}
              full>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                Submit
              </Text>
            </Button>
          </View>
          {/* {
            data.footer ? (
              <Form_footer form_no={6} nav={props} />
            ):(<View/>)
          } */}
        </ScrollView>
      </GestureRecognizer>
      {bottom_footer()}
      {/* {
            data.footer ? (
              <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:"white"}} >
      <Form_footer form_no={6} nav={props} /></View>
            ):(<View/>)
          } */}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#05422b',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,

    // marginTop:50,
  },
  paragraph: {
    backgroundColor: '#359814',
    fontSize: 8,

    // marginTop:50,
  },
  header: {
    backgroundColor: '#359814',
    height: 50,
    // marginTop:50,
  },
  cart: {
    backgroundColor: '#d7f3db',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    // paddingTop:'3%',
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
    height: '12%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
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
    // marginTop:50,
  },
  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: 'flex-start',
    // marginTop:50,
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
)(form_6);
