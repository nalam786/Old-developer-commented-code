import React from 'react';
import Form_footer from '../components/form_footer';
import Form4 from '../components/form_4';
import URL from '../URL';
import {connect} from 'react-redux';
import SideBar from '../components/Sidebar';

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
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker,
  Drawer,
  Fab,
} from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_4 = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    rander_flag: 0,
    footer: true,
    farm_id: [],
    use_reason: [],
    chemical_per_acre: [],
    chemical_per_acre_measure: [],
    date_of_application: [],
    pesticide_name: [],
    pesticide_company: [],
    crop_disease: [],
    insects_disease: [],
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
    data.use_reason.push({use_reason: ''});
    data.chemical_per_acre.push({chemical_per_acre: ''});
    data.chemical_per_acre_measure.push({chemical_per_acre_measure: ''});
    data.date_of_application.push({date_of_application: date});
    data.pesticide_name.push({pesticide_name: ''});
    data.pesticide_company.push({pesticide_company: ''});
    data.crop_disease.push({crop_disease: ''});
    data.insects_disease.push({insects_disease: ''});

    setData({
      ...data,
      use_reason: data.use_reason,
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

    for (let j = 0; j < data.use_reason.length; j++) {
      if (data.use_reason[j] == '') {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.use_reason.length; i++) {
      let F_data = {};
      let F_Data = {
        f_farm_id: props.user_ids.farm_id,
        f_use_reason: data.use_reason[i].use_reason,
        f_chemical_per_acre: data.chemical_per_acre[i].chemical_per_acre,
        // f_chemical_per_acre_measure:
        //   data.chemical_per_acre_measure[i].chemical_per_acre_measure,
        f_date_of_application: data.date_of_application[i].date_of_application,
        f_pesticide_name: data.pesticide_name[i].pesticide_name,
        f_pesticide_company: data.pesticide_company[i].pesticide_company,
        f_crop_disease: data.crop_disease[i].crop_disease,
        f_insects_disease: data.crop_disease[i].insects_disease,
        f_created_by: props.user_ids.farm_id,
        f_created_at: date,
        f_modified_by: props.user_ids.farm_id,
        f_modified_at: date,
      };

      console.log('Pesticide Form Create API Calling', F_Data);

      await fetch(URL.url + 'pesticides/pesticides_create', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({F_Data}),
      })
        .then(res => res.json())

        .then(resjson => {
          if (resjson.Message == 'New Pesticide Created Successfully') {
            props.navigation.navigate('crop_health_form');
          }

          alert(resjson.Message);
        })

        .catch(err => {
          console.log('Pesticide API Failed', err);
          alert('Failed to Submit Data: ' + err);
        });
    }
  };

  if (props.flag.flag == 'pesticides_create') {
    switch (props.flag.s_key) {
      case 1:
        data.use_reason[props.flag.index].use_reason = props.flag.value;
        break;
      case 2:
        data.chemical_per_acre[props.flag.index].chemical_per_acre =
          props.flag.value;
        break;
      case 3:
        data.date_of_application[props.flag.index].date_of_application =
          props.flag.value;
        break;
      case 4:
        data.pesticide_name[props.flag.index].pesticide_name = props.flag.value;
        break;
      case 5:
        data.pesticide_company[props.flag.index].pesticide_company =
          props.flag.value;
        break;
      case 6:
        data.crop_disease[props.flag.index].crop_disease = props.flag.value;
        break;
      case 7:
        data.insects_disease[props.flag.index].insects_disease =
          props.flag.value;
        break;

      default:
        break;
      case 8:
        data.chemical_per_acre_measure[
          props.flag.index
        ].chemical_per_acre_measure = props.flag.value;
        break;
    }

    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });

    console.log('Props Flag Changed to efef0');
  }

  if (props.flag.flag == 'pesticides_delete') {
    data.farm_id.splice(props.flag.index, 1);
    data.use_reason.splice(props.flag.index, 1);
    data.chemical_per_acre.splice(props.flag.index, 1);
    data.chemical_per_acre_measure.splice(props.flag.index, 1);
    data.date_of_application.splice(props.flag.index, 1);
    data.pesticide_name.splice(props.flag.index, 1);
    data.pesticide_company.splice(props.flag.index, 1);
    data.crop_disease.splice(props.flag.index, 1);
    data.insects_disease.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      this.renderForm();
      data.rander_flag = 1;

      setData({
        ...data,
        use_reason: data.use_reason,
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

  if (data.didmount == 0) {
    this.renderForm();
    data.didmount = 1;

    setData({
      ...data,
      didmount: 1,
    });
  }
  if (props.flag.flag == 'pesticides_hide/show_footer') {
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
  //1. add this bottom footer
  const bottom_footer = () => {
    if (data.bottomfooter == true) {
      return data.footer ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Fab
            active={false}
            containerStyle={{
              marginTop: -50,
            }}
            style={{
              backgroundColor: 'white',
              zIndex: 11,
              width: 40,
              height: 40,
            }}
            position="topLeft"
            onPress={() =>
              setData({
                ...data,
                bottomfooter: !data.bottomfooter,
              })
            }>
            <Image
              source={require('../assets/img/arow_up.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                transform: [{rotate: '180deg'}],
              }}
            />
          </Fab>
          <View>
            <Form_footer form_no={4} nav={props} />
          </View>
        </View>
      ) : (
        <View />
      );
    } else {
      return null;
    }
  };
  //2. add this bottom before
  const fabbuttonbefor = () => {
    if (data.bottomfooter == false) {
      return (
        <Fab
          active={false}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: 'white', zIndex: 11, width: 40, height: 40}}
          position="bottomRight"
          onPress={() =>
            setData({
              ...data,
              bottomfooter: !data.bottomfooter,
            })
          }>
          <Image
            source={require('../assets/img/arow_up.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </Fab>
      );
    }
  };
  const closeDrawer = () => {
    this.drawer._root.close();
  };
  const openDrawer = () => {
    // console.log("i am")
    this.drawer._root.open();
  };
  return (
    <Drawer
      ref={ref => {
        this.drawer = ref;
      }}
      openDrawerOffset={0.3}
      content={<SideBar nav={props} close={() => this.closeDrawer()} />}>
      <Container>
        <View style={{flex: 1}}>
          {/* //3. call  this bottom before */}
          {fabbuttonbefor()}
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
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                    onPress={() => props.navigation.navigate('dashboard')}>
                    <Image
                      source={require('../assets/img/home.png')}
                      style={{
                        width: '30%',
                        height: 30,
                        resizeMode: 'stretch',
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                    onPress={() => openDrawer()}>
                    <Image
                      source={require('../assets/img/menu.png')}
                      style={{
                        width: '30%',
                        height: 20,
                        resizeMode: 'stretch',
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity> */}
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                    Use of Pesticides
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                    زہر کا استعمال
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
                {data.use_reason.map((use_reason, keys) => (
                  <Form4
                    index={keys + 1}
                    farm_id={data.farm_id}
                    f_use_reason={data.use_reason}
                    f_chemical_per_acre={data.chemical_per_acre}
                    f_chemical_per_acre_measure={data.chemical_per_acre_measure}
                    f_date_of_application={data.date_of_application}
                    f_pesticide_name={data.pesticide_name}
                    f_pesticide_company={data.pesticide_company}
                    f_crop_disease={data.crop_disease}
                    f_insects_disease={data.insects_disease}
                    index2={keys}
                  />
                ))}
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <Button
                onPress={() => renderForm()}
                style={[styles.input_button]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  Add form (معلومات شامل کریں)
                </Text>
              </Button>
            </View>
            <View style={{marginBottom: 8}}>
              <Button
                onPress={() => sendform()}
                style={[styles.input_button, {marginBottom: 300}]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  Submit (جمع کرائیں)
                </Text>
              </Button>
            </View>
            {/* {data.footer ? <Form_footer form_no={4} nav={props} /> : <View />} */}
          </ScrollView>
        </View>
        {bottom_footer()}
      </Container>
    </Drawer>
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
)(form_4);
