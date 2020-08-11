import React from 'react';
import Form_footer from '../components/form_footer';
import Form2 from '../components/form_2';
import URL from '../URL';
import { connect } from 'react-redux';

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
  Picker
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker
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
    footer:true,
    farm_id: [],
    prepared_field_irrigation: [],
    soil_type: [],
    laser_levelled: [],
    levelled_date: [],
    first_irrigation: [],
    irrigation_frequency: [],
    farm_distance_watercourse: [],
    created_at: [],
    modified_at: [],

  });

  renderForm = () => {

    data.farm_id.push({ farm_id: '' });
    data.prepared_field_irrigation.push({ prepared_field_irrigation: 1 });
    data.soil_type.push({ soil_type: '' });
    data.laser_levelled.push({ laser_levelled: 1 });
    data.levelled_date.push({ levelled_date: '' });
    data.first_irrigation.push({ first_irrigation: '' });
    data.irrigation_frequency.push({ irrigation_frequency: 0 });
    data.farm_distance_watercourse.push({ farm_distance_watercourse: '' });

    setData({
      ...data,
      prepared_field_irrigation: data.prepared_field_irrigation
    });

  };

  const sendform = async () => {
    
    var d = new Date();
    var y=d.getFullYear()
    var m=d.getMonth()
    var day=d.getDate()
    var date=''
    if(day<10 && m<10 ){
      date=y+'-0'+m+'-0'+day;
    }else{
      if(day<10){
         date=y+'-'+m+'-0'+day;
      }
      if(m<10){
         date=y+'-0'+m+'-'+day;
      }
    }

    for (let j = 0; j < data.prepared_field_irrigation.length; j++) {

      if (data.prepared_field_irrigation[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.prepared_field_irrigation.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_farm_id:props.user_ids.farm_id,
        f_prepared_field_irrigation: data.prepared_field_irrigation[i].prepared_field_irrigation,
        f_soil_type: data.soil_type[i].soil_type,
        f_laser_levelled: data.laser_levelled[i].laser_levelled,
        f_levelled_date: data.levelled_date[i].levelled_date,
        f_first_irrigation: data.first_irrigation[i].first_irrigation,
        f_irrigation_frequency: data.irrigation_frequency[i].irrigation_frequency,
        f_farm_distance_watercourse: data.farm_distance_watercourse[i].farm_distance_watercourse,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

      }

      console.log('Land Preperation Create API Calling', F_Data);
      console.log('====================================================');
      await fetch(URL.url+'land_preperations/land_preperations_create', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New Land Preperation Created Successfully') {
          props.navigation.navigate('irrigation_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Land Preperation API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };
// console.log(props.flag);
  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.prepared_field_irrigation[props.flag.index].prepared_field_irrigation = props.flag.value;
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
        data.first_irrigation[props.flag.index].first_irrigation = props.flag.value;
        break;
      case 6:
        data.irrigation_frequency[props.flag.index].irrigation_frequency = props.flag.value;
        break;
      case 7:
        data.farm_distance_watercourse[props.flag.index].farm_distance_watercourse = props.flag.value;
        break;
      default:
        break;

    }

    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value'
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
    
    if (data.rander_flag == 0) {

      this.renderForm();
      data.rander_flag = 1;

      setData({

        ...data,
        prepared_field_irrigation: data.prepared_field_irrigation,
        rander_flag: 1

      });

    }

    props.changeFlag({

      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value'

    });

  }
  if (props.flag.flag == 'hide/show_footer') { 
    if(props.flag.value == 'hide' && data.rander_flag==0 ){
      data.rander_flag=1
      setData({

        ...data,
        footer: false,
        rander_flag:1
      });
    }
    if(props.flag.value == 'show' && data.rander_flag==1 ){
      data.rander_flag=0
      // alert(33333)
      setData({

        ...data,
        footer: true,
        rander_flag:0
      });
    }
    props.changeFlag({

      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value'

    });
  }

  if (data.didmount == 0) {

    this.renderForm();
    data.didmount = 1;

    setData({

      ...data,
      didmount: 1

    });

  }

  return (
    <>
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
              style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
                Land Preperation
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

          <View style={{ alignSelf: 'center', marginTop: 30, width: '95%' }}>{
            data.prepared_field_irrigation.map((
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
                  index2={keys}
                />

              ))
          }

          </View>

        </View>

        <View>
          <Button
            onPress={() => renderForm()}
            style={[styles.input_button]}
            full>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '800' }}>
              ADD FORM
            </Text>
          </Button>
        </View>

        <View>
          <Button onPress={() => sendform()} style={[styles.input_button]} full>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '800' }}>
              SUBMIT
            </Text>
          </Button>
        </View>
          {
            data.footer ? (
              <Form_footer form_no={2} nav={props} />
            ):(<View/>)
          }
        

      </ScrollView>
      {
            data.footer ? (
              <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:"white"}} >
      <Form_footer form_no={2} nav={props} /></View>
            ):(<View/>)
          }
      
    </>
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
  }

});

const mapStateToProps = (state) => {
  return {
    flag:state.flag,
    signup:state.signup_redux,
    user_ids:state.user_id_redux
  }
}
  
const mapDispatchToProps = (dispatch) => {

  return {
    changeFlag: (data) =>{
      dispatch({ type:'CHANGE_FLAG',payload:data})
    },
    changeSignup: (data) =>{
      dispatch({ type:'SIGNUP_DATA',payload:data})
    },
    user_id: (data) =>{
      dispatch({ type:'USER_ID',payload:data})
    }    
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(form_2);