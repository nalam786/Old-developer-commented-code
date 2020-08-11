import React from 'react';
import Form_footer from '../components/form_footer';
import Form7 from '../components/form_7';
import URL from '../URL';
import {connect} from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
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

const form_7 = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    rander_flag: 0,
    footer: true,
    farm_id: [],
    crop_height: [],
    plants_distance: [],
    leaf_width: [],
    crop_health: [],
    check_date: [],
    note: [],
    pic: [],
    date: [],
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
    data.crop_height.push({crop_height: ''});
    data.plants_distance.push({plants_distance: ''});
    data.leaf_width.push({leaf_width: ''});
    data.crop_health.push({crop_health: ''});
    data.check_date.push({check_date: date});
    data.note.push({note: ''});
    data.pic.push({pic: ''});
    data.date.push({date: date});

    setData({
      ...data,
      crop_height: data.crop_height,
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

    for (let j = 0; j < data.crop_height.length; j++) {
      if (data.crop_height[j] == '') {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.crop_height.length; i++) {
      let F_data = {};
      let F_Data = {
        f_farm_id: props.user_ids.farm_id,
        f_crop_height: data.crop_height[i].crop_height,
        f_plants_distance: data.plants_distance[i].plants_distance,
        f_leaf_width: data.leaf_width[i].leaf_width,
        f_crop_health: data.crop_health[i].crop_health,
        f_check_date: data.check_date[i].check_date,
        f_note: data.note[i].note,
        f_pic: data.pic[i].pic,
        f_date: data.date[i].date,
        f_created_by: props.user_ids.farm_id,
        f_created_at: date,
        f_modified_by: props.user_ids.farm_id,
        f_modified_at: date,
      };

      console.log('Crop Health Create/Update API Calling', F_Data);

      await fetch(URL.url + 'crop_healths/crop_healths_create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({F_Data}),
      })
        .then(res => res.json())

        .then(resjson => {
          if (resjson.Message == 'New Crop Health Created Successfully') {
            props.navigation.navigate('dashboard');
          }

          alert(resjson.Message);
        })

        .catch(err => {
          console.log('Crop Health API Failed', err);
          alert('Failed to Submit Data: ' + err);
        });
    }
  };

  if (props.flag.flag == 'crop_health_create') {
    switch (props.flag.s_key) {
      case 1:
        data.crop_height[props.flag.index].crop_height = props.flag.value;
        break;

      case 2:
        data.plants_distance[props.flag.index].plants_distance =
          props.flag.value;
        break;

      case 3:
        data.leaf_width[props.flag.index].leaf_width = props.flag.value;
        break;

      case 4:
        data.crop_health[props.flag.index].crop_health = props.flag.value;
        break;

      case 5:
        data.check_date[props.flag.index].check_date = props.flag.value;
        break;

      case 6:
        data.note[props.flag.index].note = props.flag.value;
        break;

      case 7:
        data.pic[props.flag.index].pic = props.flag.value;
        break;

      case 8:
        data.date[props.flag.index].date = props.flag.value;
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

    console.log('Props Flag Changed to 0');
  }

  if (props.flag.flag == 'crop_health_delete') {
    data.farm_id.splice(props.flag.index, 1);
    data.crop_height.splice(props.flag.index, 1);
    data.plants_distance.splice(props.flag.index, 1);
    data.leaf_width.splice(props.flag.index, 1);
    data.crop_health.splice(props.flag.index, 1);
    data.check_date.splice(props.flag.index, 1);
    data.note.splice(props.flag.index, 1);
    data.pic.splice(props.flag.index, 1);
    data.date.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      this.renderForm();
      data.rander_flag = 1;

      setData({
        ...data,
        crop_height: data.crop_height,
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
  if (props.flag.flag == 'crop_health_hide/show_footer') {
    // alert(3456)

    if (props.flag.value == 'hide' && data.rander_flag == 0) {
      // alert(3456)
      data.rander_flag = 1;
      setData({
        ...data,
        footer: false,
        rander_flag: 1,
      });
    }
    if (props.flag.value == 'show' && data.rander_flag == 1) {
      data.rander_flag = 0;
      // alert(33333)
      setData({
        ...data,
        footer: true,
        rander_flag: 0,
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
                  Crop Health
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
              {data.crop_height.map((
                crop_height,
                keys, //you can use  mandatory field here
              ) => (
                <Form7
                  index={keys + 1}
                  farm_id={data.farm_id}
                  f_crop_height={data.crop_height}
                  f_plants_distance={data.plants_distance}
                  f_leaf_width={data.leaf_width}
                  f_crop_health={data.crop_health}
                  f_check_date={data.check_date}
                  f_note={data.note}
                  f_pic={data.pic}
                  f_date={data.date}
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
              style={[styles.input_button]}
              full>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                Submit
              </Text>
            </Button>
          </View>

          {data.footer ? <Form_footer form_no={7} nav={props} /> : <View />}
        </ScrollView>
      </GestureRecognizer>
      {bottom_footer()}
      {/* {data.footer ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
          }}>
          <Form_footer form_no={7} nav={props} />
        </View>
      ) : (
        <View />
      )} */}
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
)(form_7);
