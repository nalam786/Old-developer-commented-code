import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form6 from '../../components/edit_form/form_6';
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

const form_6 = props => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,
    
    harvesting_id: [],
    harvesting_area: [],
    crop_yield: [],
    crop_qty: [],
    crop_qty_detail: [],
    harvest_date: [],
    additional_info: [],
    

  });
  
  renderForm = () => {

    data.harvesting_id.push({ harvesting_id: 0 });
    data.harvesting_area.push({ harvesting_area: '' });
    data.crop_yield.push({ crop_yield: '' });
    data.crop_qty.push({ crop_qty: '' });
    data.crop_qty_detail.push({ crop_qty_detail: '' });
    data.harvest_date.push({ harvest_date: '' });
    data.additional_info.push({ additional_info: '' });

    setData({
      ...data,
      harvesting_area: data.harvesting_area
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

    for (let j = 0; j < data.harvesting_area.length; j++) {

      if (data.harvesting_area[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.harvesting_area.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_farm_id:props.user_ids.update_farm_id,
        f_harvesting_id:data.harvesting_id[i].harvesting_id,
        f_harvesting_area: data.harvesting_area[i].harvesting_area, 
        crop_yield: data.crop_yield[i].crop_yield ,
        crop_qty: data.crop_qty[i].crop_qty ,
        crop_qty_detail: data.crop_qty_detail[i].crop_qty_detail ,
        harvest_date: data.harvest_date[i].harvest_date ,
        additional_info: data.additional_info[i].additional_info ,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

      }

      console.log('Harvesting Form Create API Calling', F_Data);

      await fetch(URL.url+'harvestings/harvestings_update', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New Harvesting Form Created Successfully') {
          // props.navigation.navigate('seed_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Harvestings API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.harvesting_area[props.flag.index].harvesting_area = props.flag.value;
        break;
      case 2:
        data.crop_yield[props.flag.index].crop_yield = props.flag.value;
        break;
      case 3:
        data.crop_qty[props.flag.index].crop_qty = props.flag.value;
        break;
      case 4:
        data.crop_qty_detail[props.flag.index].crop_qty_detail = props.flag.value;
        break;
      case 5:
        data.harvest_date[props.flag.index].harvest_date = props.flag.value;
        break;
      case 6:
        data.additional_info[props.flag.index].additional_info = props.flag.value;
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
      if(data.harvesting_id[props.flag.index].harvesting_id == 0){
          
            data.harvesting_area.splice(props.flag.index, 1);
            data.crop_yield.splice(props.flag.index, 1);
            data.crop_qty.splice(props.flag.index, 1);
            data.crop_qty_detail.splice(props.flag.index, 1);
            data.harvest_date.splice(props.flag.index, 1);
            data.additional_info.splice(props.flag.index, 1); 

      }else{

            this.del_harvesting(data.harvesting_id[props.flag.index].harvesting_id);
            data.harvesting_area.splice(props.flag.index, 1);
            data.crop_yield.splice(props.flag.index, 1);
            data.crop_qty.splice(props.flag.index, 1);
            data.crop_qty_detail.splice(props.flag.index, 1);
            data.harvest_date.splice(props.flag.index, 1);
            data.additional_info.splice(props.flag.index, 1); 
      }
    if (data.rander_flag == 0) {
      // this.test();

      // this.renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        harvesting_area: data.harvesting_area,
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
  del_harvesting = async (harvesting_id) => {
    // alert(3456)
    let F_Data = {
      f_harvesting_id:harvesting_id   //props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'harvestings/harvestings_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Harvesting Form Deleted Successfully') {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  const get_harvesting = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'harvestings/harvestings_get', {
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
            data.harvesting_id.push({ harvesting_id:element.id  });
            harvesting_area.push({ harvesting_area:element.harvesting_area });
            crop_yield.push({ crop_yield:element.crop_yield });
            crop_qty.push({ crop_qty:element.crop_qty });
            crop_qty_detail.push({ crop_qty_detail:element.crop_qty_detail });
            harvest_date.push({ harvest_date:element.harvest_date });
            additional_info.push({ additional_info:element.additional_info });

          });
          setData({
            ...data,
            harvesting_area: data.harvesting_area
          });

        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  if (data.didmount == 0) {

    // this.renderForm();
    get_harvesting();
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
            data.harvesting_area.map((
              harvesting_area,
              keys, //you can use  mandatory field here
            ) => (

                <Form6
                  index={keys + 1}
                  farm_id={data.farm_id}
                  harvesting_area={ data.harvesting_area }
                  crop_yield={ data.crop_yield }
                  crop_qty={ data.crop_qty }
                  crop_qty_detail={ data.crop_qty_detail }
                  harvest_date={ data.harvest_date }
                  additional_info={ data.additional_info }
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

export default connect(mapStateToProps,mapDispatchToProps)(form_6);