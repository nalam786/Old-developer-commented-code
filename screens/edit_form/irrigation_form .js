//Edit Irrigation Screen

import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form3 from '../../components/form_3';
import URL from '../../URL';
import {connect} from 'react-redux';
import SideBar from '../../components/Sidebar';
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

const form_3 = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    rander_flag: 0,
    footer: true,
    farm_id: [],
    water_source: [],
    flow_water_source: [],
    bore_depth: [], //
    type_water_source: [],
    ground_water_use: [], //
    water_depth: [],
    water_width: [],
    bed_level_water_width: [],
    vegetation: [],
    canal_application: [],
    irrigation_date: [],
    tube_well_size: [],
    ground_water_depth: [],
    date_round_water_irrigation: [],
    water_quality: [],
    water_quality: [],
    water_source_other: [],
    created_at: [],
    modified_at: [],
    gestureName: '',
    bottomfooter: false,
  });

  React.useEffect(() => {
    get_irrigationData();
  }, []);

  const get_irrigationData = async () => {
    // console.log('Get Seed API Calling: ', {data});

    await fetch(URL.url + 'irrigations/irrigations_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          f_farm_id: props.user_ids.update_farm_id,
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('GET irrigation DATA', resjson);
        if (resjson.Successful) {
          resjson.data.forEach(element => {
            data.farm_id.push({farm_id: element.id});
            data.water_source.push({water_source: element.water_source}),
              data.flow_water_source.push({
                flow_water_source: element.flow_water_source,
              }),
              data.bore_depth.push({bore_depth: element.bore_depth}),
              data.type_water_source.push({
                type_water_source: element.type_water_source,
              }),
              data.ground_water_use.push({
                ground_water_use: element.ground_water_use,
              });
            data.water_depth.push({water_depth: element.water_depth}),
              data.water_width.push({water_width: element.water_width}),
              data.bed_level_water_width.push({
                bed_level_water_width: element.bed_level_water_width,
              }),
              data.vegetation.push({vegetation: element.vegetation}),
              data.canal_application.push({
                canal_application: element.canal_application,
              }),
              data.irrigation_date.push({
                irrigation_date: element.canal_irrigation_date,
              }),
              data.tube_well_size.push({
                tube_well_size: element.tube_well_size,
              }),
              data.ground_water_depth.push({
                ground_water_depth: element.ground_water_depth,
              }),
              data.water_quality.push({water_quality: element.water_quality}),
              // data.water_source_other.push({
              //   water_source_other: element.water_source_other,
              // }),
              data.date_round_water_irrigation.push({
                date_round_water_irrigation:
                  element.date_groundwater_application,
              });
          });
          setData({
            ...data,
            prepared_field_irrigation: data.prepared_field_irrigation,
          });
        } else {
          renderForm();
        }
      })
      .catch(err => {
        console.log('failed', err);
        renderForm();
      });
  };

  const renderForm = () => {
    data.farm_id.push({farm_id: ''});
    data.water_source.push({water_source: 0}),
      data.flow_water_source.push({flow_water_source: ''}),
      data.bore_depth.push({bore_depth: ''}),
      data.type_water_source.push({type_water_source: ''}),
      data.ground_water_use.push({ground_water_use: ''});
    data.water_depth.push({water_depth: ''}),
      data.water_width.push({water_width: ''}),
      data.bed_level_water_width.push({bed_level_water_width: ''}),
      data.vegetation.push({vegetation: ''}),
      data.canal_application.push({canal_application: ''}),
      data.irrigation_date.push({irrigation_date: new Date()}),
      data.tube_well_size.push({tube_well_size: ''}),
      data.ground_water_depth.push({ground_water_depth: ''}),
      data.water_quality.push({water_quality: ''}),
      data.water_source_other.push({water_source_other: ''}),
      data.date_round_water_irrigation.push({
        date_round_water_irrigation: new Date(),
      }),
      setData({
        ...data,
        water_source: data.water_source,
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
    for (let j = 0; j < data.water_source.length; j++) {
      // if (data.water_source[j] == "") {
      //   alert('Please fill all the mandatory fields' + j);
      //   return false;
      // }
    }
    for (let i = 0; i < data.water_source.length; i++) {
      let F_data = {};
      let F_Data = {
        f_farm_id: props.user_ids.update_farm_id,
        f_water_source: data.water_source[i].water_source,
        f_flow_water_source: data.flow_water_source[i].flow_water_source,
        f_bore_depth: data.bore_depth[i].bore_depth,
        f_type_water_source: data.type_water_source[i].type_water_source,
        f_ground_water_use: data.ground_water_use[i].ground_water_use,
        f_water_depth: data.water_depth[i].water_depth,
        f_water_width: data.water_width[i].water_width,
        f_bed_level_water_width:
          data.bed_level_water_width[i].bed_level_water_width,
        f_vegetation: data.vegetation[i].vegetation,
        f_canal_application: data.canal_application[i].canal_application,
        f_canal_irrigation_date: data.irrigation_date[i].irrigation_date,
        f_tube_well_size: data.tube_well_size[i].tube_well_size,
        f_ground_water_depth: data.ground_water_depth[i].ground_water_depth,
        f_water_quality: data.water_quality[i].water_quality,
        // f_water_source_other: data.water_source_other[i].water_source_other,
        f_date_ground_water_application:
          data.date_round_water_irrigation[i].date_round_water_irrigation,
        f_created_by: props.user_ids.update_farm_id,
        f_created_at: date,
        f_modified_by: props.user_ids.update_farm_id,
        f_modified_at: date,
      };
      console.log(
        'Irrigation Create API Calling: ',
        F_Data,
        '===========================',
        `${
          data.farm_id[i].farm_id == ''
            ? 'irrigations/irrigations_create'
            : 'irrigations/irrigations_update'
        }`,
      );
      await fetch(
        `${URL.url}${
          data.farm_id[i].farm_id == ''
            ? 'irrigations/irrigations_create'
            : 'irrigations/irrigations_update'
        }`,
        {
          method: 'POST',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({F_Data}),
        },
      )
        .then(res => res.json())

        .then(resjson => {
          console.log('Api crashed!!!!!! on Irrigation create', resjson);
          if (resjson.Successful) {
            alert('Success');
            props.navigation.navigate('fertilizer_form_edit');
          }

          // alert(resjson.Message);
        })

        .catch(err => {
          console.log('Irrigation API Failed', err);
          alert('Failed to Submit Data: ' + err);
        });
    }
  };
  // alert(props.flag.flag)
  if (props.flag.flag == 'irrigation_create') {
    switch (props.flag.s_key) {
      case 1:
        data.water_source[props.flag.index].water_source = props.flag.value;
        break;
      case 2:
        data.flow_water_source[props.flag.index].flow_water_source =
          props.flag.value;
        break;
      case 3:
        data.bore_depth[props.flag.index].bore_depth = props.flag.value;
        break;
      case 4:
        data.type_water_source[props.flag.index].type_water_source =
          props.flag.value;
        break;
      case 5:
        data.ground_water_use[props.flag.index].ground_water_use =
          props.flag.value;
        break;
      case 6:
        data.water_depth[props.flag.index].water_depth = props.flag.value;
        break;
      case 7:
        data.water_width[props.flag.index].water_width = props.flag.value;
        break;
      case 8:
        data.bed_level_water_width[props.flag.index].bed_level_water_width =
          props.flag.value;
        break;
      case 9:
        data.vegetation[props.flag.index].vegetation = props.flag.value;
        break;
      case 10:
        data.canal_application[props.flag.index].canal_application =
          props.flag.value;
        break;
      case 11:
        data.irrigation_date[props.flag.index].irrigation_date =
          props.flag.value;
        break;
      case 12:
        data.tube_well_size[props.flag.index].tube_well_size = props.flag.value;
        break;
      case 13:
        data.ground_water_depth[props.flag.index].ground_water_depth =
          props.flag.value;
        break;
      case 14:
        data.water_quality[props.flag.index].water_quality = props.flag.value;
        break;
      case 15:
        data.date_round_water_irrigation[
          props.flag.index
        ].date_round_water_irrigation = props.flag.value;
        break;
      case 16:
        data.water_source_other[props.flag.index].water_source_other =
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

    console.log('Props Flag Changed to tttttt');
  }

  if (props.flag.flag == 'irrigation_delete') {
    data.farm_id.splice(props.flag.index, 1);
    data.water_source.splice(props.flag.index, 1);
    data.flow_water_source.splice(props.flag.index, 1);
    data.bore_depth.splice(props.flag.index, 1);
    data.type_water_source.splice(props.flag.index, 1);
    data.ground_water_use.splice(props.flag.index, 1);
    data.water_depth.splice(props.flag.index, 1);
    data.water_width.splice(props.flag.index, 1);
    data.bed_level_water_width.splice(props.flag.index, 1);
    data.vegetation.splice(props.flag.index, 1);
    data.canal_application.splice(props.flag.index, 1);
    data.irrigation_date.splice(props.flag.index, 1);
    data.tube_well_size.splice(props.flag.index, 1);
    data.ground_water_depth.splice(props.flag.index, 1);
    data.water_quality.splice(props.flag.index, 1);
    data.date_round_water_irrigation.splice(props.flag.index, 1);
    data.water_source_other.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      //this.renderForm();
      data.rander_flag = 1;

      setData({
        ...data,
        water_source: data.water_source,
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
  if (props.flag.flag == 'irrigation_hide/show_footer') {
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
    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });
  }
  if (data.didmount == 0) {
    // this.renderForm();
    data.didmount = 1;

    setData({
      ...data,
      didmount: 1,
    });
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
              source={require('../../assets/img/arow_up.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                transform: [{rotate: '180deg'}],
              }}
            />
          </Fab>
          <View>
            <Form_footer form_no={5} nav={props} />
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
            source={require('../../assets/img/arow_up.png')}
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
                      source={require('../../assets/img/home.png')}
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
                      source={require('../../assets/img/menu.png')}
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
                    Irrigation
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: '800',
                      marginBottom: 5,
                    }}>
                    آبپاشی
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
                {data.water_source.map((
                  water_source,
                  keys, //you can use  mandatory field here
                ) => (
                  <Form3
                    index={keys + 1}
                    f_water_source={data.water_source}
                    f_flow_water_source={data.flow_water_source}
                    f_bore_depth={data.bore_depth}
                    f_type_water_source={data.type_water_source}
                    f_ground_water_use={data.ground_water_use}
                    f_water_depth={data.water_depth}
                    f_water_width={data.water_width}
                    f_bed_level_water_width={data.bed_level_water_width}
                    f_vegetation={data.vegetation}
                    f_canal_application={data.canal_application}
                    f_irrigation_date={data.irrigation_date}
                    f_tube_well_size={data.tube_well_size}
                    f_ground_water_depth={data.ground_water_depth}
                    f_water_quality={data.water_quality}
                    f_water_source_other={data.water_source_other}
                    f_date_round_water_irrigation={
                      data.date_round_water_irrigation
                    }
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
                  Update (اپ ڈیٹ)
                </Text>
              </Button>
            </View>

            {/* {
            data.footer ? (
              <Form_footer form_no={5} nav={props} />
            ):(<View/>)
          } */}
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
)(form_3);
