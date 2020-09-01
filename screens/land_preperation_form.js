import React from 'react';
import Form_footer from '../components/form_footer';
import Form2 from '../components/form_2';
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

const form_2 = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    rander_flag: 0,
    footer: true,
    farm_id: [],
    prepared_field_irrigation: [],
    field_preparation: [],
    soil_type: [],
    laser_levelled: [],
    levelled_date: [],
    first_irrigation: [],
    irrigation_frequency: [],
    irrigation_time: [],
    farm_distance_watercourse: [],
    watercourse_discharge: [],
    ground_water_quality: [],
    tubewellsize: [],
    weed_eradication: [],
    flow_watercourse: [],
    depth_water_course: [],
    width_watercourse_water: [],
    far_from_outlet: [],
    bore_depth: [],
    ground_water_depth: [],
    allocated_time_canal: [],
    time_req_irrigation: [],
    vegetation: [],

    created_at: [],
    modified_at: [],
    gestureName: '',
    bottomfooter: false,
  });

  renderForm = () => {
    data.farm_id.push({farm_id: ''});
    data.prepared_field_irrigation.push({prepared_field_irrigation: 0});
    data.irrigation_time.push({irrigation_time: 0});
    data.soil_type.push({soil_type: ''});
    data.weed_eradication.push({weed_eradication: ''});
    data.laser_levelled.push({laser_levelled: 1});
    data.levelled_date.push({levelled_date: ''});
    data.first_irrigation.push({first_irrigation: ''});
    data.irrigation_frequency.push({irrigation_frequency: 0});
    data.farm_distance_watercourse.push({farm_distance_watercourse: ''});
    data.watercourse_discharge.push({watercourse_discharge: ''});
    data.ground_water_quality.push({ground_water_quality: ''});
    data.tubewellsize.push({tubewellsize: ''});
    data.field_preparation.push({field_preparation: ''});
    data.flow_watercourse.push({flow_watercourse: ''});
    data.depth_water_course.push({depth_water_course: ''});
    data.width_watercourse_water.push({width_watercourse_water: ''});
    data.far_from_outlet.push({far_from_outlet: ''});
    data.bore_depth.push({bore_depth: ''});
    data.ground_water_depth.push({ground_water_depth: ''});
    data.allocated_time_canal.push({allocated_time_canal: ''});
    data.time_req_irrigation.push({time_req_irrigation: ''});
    data.vegetation.push({vegetation: ''});

    setData({
      ...data,
      prepared_field_irrigation: data.prepared_field_irrigation,
    });
  };

  const sendform = async () => {
    // console.log(data.soil_type);
    // console.log(data.weed_eradication);
    //console.log(data.field_preparation);
    // console.log(data.laser_levelled);
    // console.log(data.watercourse_discharge);
    // console.log(data.flow_watercourse);
    // console.log(data.far_from_outlet);
    //  console.log(data.tubewellsize);
    //  console.log(data.bore_depth);
    //  console.log(data.ground_water_depth);
    //   console.log(data.ground_water_quality);
    //   console.log(data.first_irrigation);
    //  console.log(data.allocated_time_canal);
    //  console.log(data.time_req_irrigation);
    //   console.log(data.irrigation_frequency);

    // console.log(data.depth_water_course);
    //  console.log(data.width_watercourse_water);
    //  console.log(data.vegetation);

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

    for (let j = 0; j < data.prepared_field_irrigation.length; j++) {
      if (data.prepared_field_irrigation[j] == '') {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.prepared_field_irrigation.length; i++) {
      let F_data = {};
      let F_Data = {
        f_farm_id: props.user_ids.farm_id,

        f_soil_type: data.soil_type[i].soil_type,
        f_weed_eradication: data.weed_eradication[i].weed_eradication,
        f_field_preparation: data.field_preparation[i].field_preparation,
        f_laser_levelled: data.laser_levelled[i].field_preparation,
        f_water_course_discharge:
          data.watercourse_discharge[i].watercourse_discharge,
        water_course_flow: data.flow_watercourse[i].flow_watercourse,
        f_water_course_distance_outlet: data.far_from_outlet[i].far_from_outlet,
        f_tubewell_size: data.tubewellsize[i].tubewellsize,

        f_tubewell_bore_depth_ft: data.bore_depth[i].bore_depth,
        f_groundwater_depth_ft: data.ground_water_depth[i].ground_water_depth,
        f_groundwater_quality:
          data.ground_water_quality[i].ground_water_quality,

        f_first_irrigation: data.first_irrigation[i].first_irrigation,
        f_canal_allocated_time_mins:
          data.allocated_time_canal[i].canal_allocated_time_mins,
        f_tubewell_irrigation_time_mins:
          data.time_req_irrigation[i].time_req_irrigation,
        f_irrigation_frequency:
          data.irrigation_frequency[i].irrigation_frequency,
        f_water_course_depth: data.depth_water_course[i].depth_water_course,
        f_water_course_width:
          data.width_watercourse_water[i].width_watercourse_water,
        f_water_course_vegetation: data.vegetation[i].vegetation,

        f_irrigation_time: data.irrigation_time[i].irrigation_time,
        f_laser_levelled: data.laser_levelled[i].laser_levelled,
        f_levelled_date: data.levelled_date[i].levelled_date,
        f_first_irrigation: data.first_irrigation[i].first_irrigation,
        f_irrigation_frequency:
          data.irrigation_frequency[i].irrigation_frequency,
        f_farm_distance_watercourse:
          data.farm_distance_watercourse[i].farm_distance_watercourse,
        f_created_by: props.user_ids.farm_id,
        f_created_at: date,
        f_modified_by: props.user_ids.farm_id,
        f_modified_at: date,
        f_prepared_field_irrigation:
          data.prepared_field_irrigation[i].prepared_field_irrigation,
      };

      console.log('Land Preperation Create API Calling', F_Data);
      console.log('====================================================');
      await fetch(URL.url + 'land_preperations/land_preperations_create', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({F_Data}),
      })
        .then(res => res.json())

        .then(resjson => {
          if (resjson.Message == 'New Land Preperation Created Successfully') {
            props.navigation.navigate('seed_form');
          }

          alert(resjson.Message);
        })

        .catch(err => {
          console.log('Land Preperation API Failed', err);
          alert('Failed to Submit Data: ' + err);
        });
    }
  };
  // console.log(props.flag);
  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {
      case 1:
        data.prepared_field_irrigation[
          props.flag.index
        ].prepared_field_irrigation = props.flag.value;
        break;
      case 2:
        data.soil_type[props.flag.index].soil_type = props.flag.value;
        break;
      case 3:
        data.laser_levelled[props.flag.index].laser_levelled = props.flag.value;
        break;
      case 4:
        data.levelled_date[props.flag.index].levelled_date = props.flag.value;
        break;
      case 5:
        data.first_irrigation[props.flag.index].first_irrigation =
          props.flag.value;
        break;
      case 6:
        data.irrigation_frequency[props.flag.index].irrigation_frequency =
          props.flag.value;
        break;

      case 7:
        data.farm_distance_watercourse[
          props.flag.index
        ].farm_distance_watercourse = props.flag.value;
        break;
      case 8:
        data.irrigation_time[props.flag.index].irrigation_time =
          props.flag.value;
        break;
      case 9:
        data.watercourse_discharge[props.flag.index].watercourse_discharge =
          props.flag.value;
        break;
      case 10:
        data.ground_water_quality[props.flag.index].ground_water_quality =
          props.flag.value;
        break;
      case 11:
        data.tubewellsize[props.flag.index].tubewellsize = props.flag.value;
        break;
      case 12:
        data.weed_eradication[props.flag.index].weed_eradication =
          props.flag.value;
        break;
      case 13:
        data.field_preparation[props.flag.index].field_preparation =
          props.flag.value;
        break;
      case 14:
        data.flow_watercourse[props.flag.index].flow_watercourse =
          props.flag.value;
        break;
      case 15:
        data.depth_water_course[props.flag.index].depth_water_course =
          props.flag.value;
        break;
      case 16:
        data.width_watercourse_water[props.flag.index].width_watercourse_water =
          props.flag.value;
        break;
      case 17:
        data.far_from_outlet[props.flag.index].far_from_outlet =
          props.flag.value;
        break;
      case 18:
        data.bore_depth[props.flag.index].bore_depth = props.flag.value;
        break;
      case 19:
        data.ground_water_depth[props.flag.index].ground_water_depth =
          props.flag.value;
        break;
      case 20:
        data.allocated_time_canal[props.flag.index].allocated_time_canal =
          props.flag.value;
        break;
      case 21:
        data.time_req_irrigation[props.flag.index].time_req_irrigation =
          props.flag.value;
        break;
      case 22:
        data.vegetation[props.flag.index].vegetation = props.flag.value;
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

    console.log('Props Flag Changed to land');
  }

  if (props.flag.flag == 2) {
    data.farm_id.splice(props.flag.index, 1);
    data.prepared_field_irrigation.splice(props.flag.index, 1);
    data.soil_type.splice(props.flag.index, 1);
    data.laser_levelled.splice(props.flag.index, 1);
    data.levelled_date.splice(props.flag.index, 1);
    data.first_irrigation.splice(props.flag.index, 1);
    data.irrigation_frequency.splice(props.flag.index, 1);
    data.farm_distance_watercourse.splice(props.flag.index, 1);
    data.irrigation_time.splice(props.flag.index, 1);
    data.watercourse_discharge.splice(props.flag.index, 1);
    data.ground_water_quality.splice(props.flag.index, 1);
    data.tubewellsize.splice(props.flag.index, 1);
    data.weed_eradication.splice(props.flag.index, 1);
    data.field_preparation.splice(props.flag.index, 1);
    data.flow_watercourse.splice(props.flag.index, 1);
    data.depth_water_course.splice(props.flag.index, 1);
    data.width_watercourse_water.splice(props.flag.index, 1);
    data.far_from_outlet.splice(props.flag.index, 1);
    data.bore_depth.splice(props.flag.index, 1);
    data.ground_water_depth.splice(props.flag.index, 1);
    data.allocated_time_canal.splice(props.flag.index, 1);
    data.time_req_irrigation.splice(props.flag.index, 1);
    data.vegetation.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      this.renderForm();
      data.rander_flag = 1;

      setData({
        ...data,
        prepared_field_irrigation: data.prepared_field_irrigation,
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
  if (props.flag.flag == 'hide/show_footer') {
    if (props.flag.value == 'hide' && data.rander_flag == 0) {
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
    this.renderForm();
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
            <Form_footer form_no={2} nav={props} />
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
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                    Farm info
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                    بنیادی معلومات
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
                {data.prepared_field_irrigation.map((
                  prepared_field_irrigation,
                  keys, //you can use  mandatory field here
                ) => (
                  <Form2
                    index={keys + 1}
                    farm_id={data.farm_id}
                    f_prepared_field_irrigation={data.prepared_field_irrigation}
                    f_soil_type={data.soil_type}
                    f_laser_levelled={data.laser_levelled}
                    f_levelled_date={data.levelled_date}
                    f_first_irrigation={data.first_irrigation}
                    f_irrigation_frequency={data.irrigation_frequency}
                    f_farm_distance_watercourse={data.farm_distance_watercourse}
                    f_watercourse_discharge={data.watercourse_discharge}
                    f_irrigation_time={data.irrigation_time}
                    f_ground_water_quality={data.ground_water_quality}
                    f_tubewellsize={data.tubewellsize}
                    f_weed_eradication={data.weed_eradication}
                    f_field_preparation={data.field_preparation}
                    f_flow_watercourse={data.flow_watercourse}
                    f_depth_water_course={data.depth_water_course}
                    f_width_watercourse_water={data.width_watercourse_water}
                    f_far_from_outlet={data.far_from_outlet}
                    f_bore_depth={data.bore_depth}
                    f_ground_water_depth={data.ground_water_depth}
                    f_allocated_time_canal={data.allocated_time_canal}
                    f_time_req_irrigation={data.time_req_irrigation}
                    f_vegetation={data.vegetation}
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

            <View>
              <Button
                onPress={() => sendform()}
                style={[styles.input_button, {marginBottom: 300}]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  Submit (جمع کرائیں)
                </Text>
              </Button>
            </View>
            {/* {data.footer ? <Form_footer form_no={2} nav={props} /> : <View />} */}
          </ScrollView>
        </View>
        {bottom_footer()}
      </Container>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',
    height: 50,
  },

  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 0,
    marginBottom: 20,
  },

  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },

  body: {
    backgroundColor: Colors.white,
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
)(form_2);
