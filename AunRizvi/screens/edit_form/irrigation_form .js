import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form3 from '../../components/edit_form/form_3';
import URL from '../../URL';
import { connect } from 'react-redux';

import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker
} from 'native-base';

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

    irrigation_id: [],
    water_source: [],
    flow_water_source: [],
    water_source_value: [],
    type_water_source: [],
    type_water_source_other: [],
    water_depth: [],
    water_width: [],
    bed_level_water_width: [],
    vegetation: [],
    canal_application: [],
    irrigation_date: [],
    tube_well_size: [],
    ground_water_depth: [],
    

  });
  
  renderForm = () => {

    data.irrigation_id.push({ irrigation_id: '' })
    data.water_source.push({ water_source: '' })
    data.flow_water_source.push({ flow_water_source: '' })
    data.water_source_value.push({ water_source_value: '' })
    data.type_water_source.push({ type_water_source: '' })
    data.type_water_source_other.push({ type_water_source_other: '' })
    data.water_depth.push({ water_depth: '' })
    data.water_width.push({ water_width: '' })
    data.bed_level_water_width.push({ bed_level_water_width: '' })
    data.vegetation.push({ vegetation: '' })
    data.canal_application.push({ canal_application: '' })
    data.irrigation_date.push({ irrigation_date: '' })
    data.tube_well_size.push({ tube_well_size: '' })
    data.ground_water_depth.push({ ground_water_depth: '' })

    setData({
      ...data,
      water_source: data.water_source
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

    for (let j = 0; j < data.water_source.length; j++) {

      if (data.water_source[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.water_source.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_farm_id:props.user_ids.update_farm_id,
        f_irrigation_id:data.irrigation_id[i].irrigation_id,
        f_water_source:data.water_source[i].water_source,
        f_flow_water_source:data.flow_water_source[i].flow_water_source,
        f_water_source_value:data.water_source_value[i].water_source_value,
        f_type_water_source:data.type_water_source[i].type_water_source,
        f_type_water_source_other:data.type_water_source_other[i].type_water_source_other,
        f_water_depth:data.water_depth[i].water_depth,
        f_water_width:data.water_width[i].water_width,
        f_bed_level_water_width:data.bed_level_water_width[i].bed_level_water_width,
        f_vegetation:data.vegetation[i].vegetation,
        f_canal_application:data.canal_application[i].canal_application,
        f_irrigation_date:data.irrigation_date[i].irrigation_date,
        f_tube_well_size:data.tube_well_size[i].tube_well_size,
        f_ground_water_depth:data.ground_water_depth[i].ground_water_depth,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

      }

      console.log('Irrigation Create API Calling', F_Data);

      await fetch(URL.url+'irrigations/irrigations_update', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New Irrigation Form Created Successfully') {
          // props.navigation.navigate('seed_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Irrigation form API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.water_source[props.flag.index].water_source = props.flag.value;
        break;
      
      case 2:
        data.flow_water_source[props.flag.index].flow_water_source = props.flag.value;
        break;

      case 3:
        data.water_source_value[props.flag.index].water_source_value = props.flag.value;
        break;
      
      case 4:
        data.type_water_source[props.flag.index].type_water_source = props.flag.value;
        break;

      case 5:
        data.type_water_source_other[props.flag.index].type_water_source_other = props.flag.value;
        break;

      case 6:
        data.water_depth[props.flag.index].water_depth = props.flag.value;
        break;

      case 7:
        data.water_width[props.flag.index].water_width = props.flag.value;
        break;

      case 8:
        data.bed_level_water_width[props.flag.index].bed_level_water_width = props.flag.value;
        break;

      case 9:
        data.vegetation[props.flag.index].vegetation = props.flag.value;
        break;

      case 10:
        data.canal_application[props.flag.index].canal_application = props.flag.value;
        break;

      case 11:
        data.irrigation_date[props.flag.index].irrigation_date = props.flag.value;
        break;

      case 12:
        data.tube_well_size[props.flag.index].tube_well_size = props.flag.value;
        break;

      case 12:
        data.ground_water_depth[props.flag.index].ground_water_depth = props.flag.value;
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

    console.log('Props Flag Changed to 0');

  }

  if (props.flag.flag == 2) {
      if(data.irrigation_id[props.flag.index].irrigation_id == 0){
           
            data.water_source.splice(props.flag.index, 1);
            data.flow_water_source.splice(props.flag.index, 1);
            data.water_source_value.splice(props.flag.index, 1);
            data.type_water_source.splice(props.flag.index, 1);
            data.type_water_source_other.splice(props.flag.index, 1);
            data.water_depth.splice(props.flag.index, 1);
            data.water_width.splice(props.flag.index, 1);
            data.bed_level_water_width.splice(props.flag.index, 1);
            data.vegetation.splice(props.flag.index, 1);
            data.canal_application.splice(props.flag.index, 1);
            data.irrigation_date.splice(props.flag.index, 1);
            data.tube_well_size.splice(props.flag.index, 1);
            data.ground_water_depth.splice(props.flag.index, 1);

      }else{

            this.del_landpreperation(data.irrigation_id[props.flag.index].irrigation_id);

            data.water_source.splice(props.flag.index, 1);
            data.flow_water_source.splice(props.flag.index, 1);
            data.water_source_value.splice(props.flag.index, 1);
            data.type_water_source.splice(props.flag.index, 1);
            data.type_water_source_other.splice(props.flag.index, 1);
            data.water_depth.splice(props.flag.index, 1);
            data.water_width.splice(props.flag.index, 1);
            data.bed_level_water_width.splice(props.flag.index, 1);
            data.vegetation.splice(props.flag.index, 1);
            data.canal_application.splice(props.flag.index, 1);
            data.irrigation_date.splice(props.flag.index, 1);
            data.tube_well_size.splice(props.flag.index, 1);
            data.ground_water_depth.splice(props.flag.index, 1);
            
      }
    if (data.rander_flag == 0) {
      // this.test();

      // this.renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        water_source: data.water_source,
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
  del_landpreperation = async (irrigation_id) => {
    // alert(3456)
    let F_Data = {
      f_irrigation_id:irrigation_id   //props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'irrigations/irrigations_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'irrigation Deleted Successfully') {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  const get_irrigation = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'irrigations/irrigations_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Land Preperation of Farm Get Successfully') {
          resjson.data.forEach(element => {
            
            data.irrigation_id.push({ irrigation_id:element.id })
            data.water_source.push({ water_source:element.water_source })
            data.flow_water_source.push({ flow_water_source:element.flow_water_source })
            data.water_source_value.push({ water_source_value:element.water_source_value })
            data.type_water_source.push({ type_water_source:element.type_water_source })
            data.type_water_source_other.push({ type_water_source_other:element.type_water_source_other })
            data.water_depth.push({ water_depth:element.water_depth })
            data.water_width.push({ water_width:element.water_width })
            data.bed_level_water_width.push({ bed_level_water_width:element.bed_level_water_width })
            data.vegetation.push({ vegetation:element.vegetation })
            data.canal_application.push({ canal_application:element.canal_application })
            data.irrigation_date.push({ irrigation_date:element.irrigation_date })
            data.tube_well_size.push({ tube_well_size:element.tube_well_size })
            data.ground_water_depth.push({ ground_water_depth:element.ground_water_depth })

          });
          setData({
            ...data,
            water_source: data.water_source
          });

        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  if (data.didmount == 0) {

    // this.renderForm();
    get_irrigation();
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
                source={require('../../assets/img/menu.png')}
                style={{
                  width: '30%',
                  height: 30,
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
            data.water_source.map((
              water_source,
              keys, //you can use  mandatory field here
            ) => (

                <Form3
                  index={keys + 1}
                  farm_id={data.farm_id}
                  f_water_source={ data.water_source }
                  f_flow_water_source={ data.flow_water_source }
                  f_water_source_value={ data.water_source_value }
                  f_type_water_source={ data.type_water_source }
                  f_type_water_source_other={ data.type_water_source_other }
                  f_water_depth={ data.water_depth }
                  f_water_width={ data.water_width }
                  f_bed_level_water_width={ data.bed_level_water_width }
                  f_vegetation={ data.vegetation }
                  f_canal_application={ data.canal_application }
                  f_irrigation_date={ data.irrigation_date }
                  f_tube_well_size={ data.tube_well_size }
                  f_ground_water_depth={ data.ground_water_depth }
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

        <Form_footer form_no={2} nav={props} />

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#359814',
    height: 70,
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

export default connect(mapStateToProps,mapDispatchToProps)(form_3);