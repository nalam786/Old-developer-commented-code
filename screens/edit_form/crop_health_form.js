import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form7 from '../../components/edit_form/form_7';
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

const form_7 = props => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,

    crop_health_id: [],
    farm_id: [],
    crop_height:[],
    plants_distance:[],
    leaf_width:[],
    crop_health:[],
    check_date:[],
    note:[],
    pic:[],
    date:[],
    

  });
  
  renderForm = () => {
    
    data.crop_health_id.push({ crop_health_id: 0 })
    data.farm_id.push({ farm_id: '' });
    data.crop_height.push({crop_height:''})
    data.plants_distance.push({plants_distance:''})
    data.leaf_width.push({leaf_width:''})
    data.crop_health.push({crop_health:''})
    data.check_date.push({check_date:''})
    data.note.push({note:''})
    data.pic.push({pic:''})
    data.date.push({date:''})

    setData({
      ...data,
      crop_height: data.crop_height
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

    for (let j = 0; j < data.crop_height.length; j++) {

      if (data.crop_height[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.crop_height.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_crop_health_id:data.crop_health_id[i].crop_health_id,
        f_farm_id:props.user_ids.farm_id,
        f_crop_height: data.crop_height,
        f_plants_distance: data.plants_distance,
        f_leaf_width: data.leaf_width,
        f_crop_health: data.crop_health,
        f_check_date: data.check_date,
        f_note: data.note,
        f_pic: data.pic,
        f_date: data.date,

      }

      console.log('Crop Health Create API Calling', F_Data);

      await fetch(URL.url+'crop_healths/crop_healths_update', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New Crop Health Created Successfully') {
          // props.navigation.navigate('seed_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Crop Health API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.crop_height[props.flag.index].crop_height=props.flag.value           
        break;

      case 2:
        data.plants_distance[props.flag.index].plants_distance=props.flag.value           
        break;
      
      case 3:
        data.leaf_width[props.flag.index].leaf_width=props.flag.value           
        break;

      case 4:
        data.crop_health[props.flag.index].crop_health=props.flag.value           
        break;
      
      case 5:
        data.check_date[props.flag.index].check_date=props.flag.value           
        break;

      case 6:
        data.note[props.flag.index].note=props.flag.value           
        break;
      
      case 7:
        data.pic[props.flag.index].pic=props.flag.value           
        break;
      
      case 8:
        data.date[props.flag.index].date=props.flag.value           
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
      if(data.crop_health_id[props.flag.index].crop_health_id == 0){
        data.crop_height.splice(props.flag.index, 1),
        data.plants_distance.splice(props.flag.index, 1),
        data.leaf_width.splice(props.flag.index, 1),
        data.crop_health.splice(props.flag.index, 1),
        data.check_date.splice(props.flag.index, 1),
        data.note.splice(props.flag.index, 1),
        data.pic.splice(props.flag.index, 1),
        data.date.splice(props.flag.index, 1)
      }else{

        this.del_landpreperation(data.crop_health_id[props.flag.index].crop_health_id);

                  data.crop_height.splice(props.flag.index, 1),
                  data.plants_distance.splice(props.flag.index, 1),
                  data.leaf_width.splice(props.flag.index, 1),
                  data.crop_health.splice(props.flag.index, 1),
                  data.check_date.splice(props.flag.index, 1),
                  data.note.splice(props.flag.index, 1),
                  data.pic.splice(props.flag.index, 1),
                  data.date.splice(props.flag.index, 1)
      }
    if (data.rander_flag == 0) {
      // this.test();

      // this.renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        crop_height: data.crop_height,
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
  del_landpreperation = async (crop_health_id) => {
    // alert(3456)
    let F_Data = {
      f_crop_health_id:crop_health_id   //props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'crop_healths/crop_healths_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Crop Health of Farm Deleted Successfully') {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  const get_crophealth = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get crop_health API Calling: ", F_Data);

    await fetch(URL.url + 'crop_healths/crop_healths_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Crop Health of Farm Get Successfully') {
          resjson.data.forEach(element => {
            
            data.crop_height.push({ crop_height:element.crop_height }),
            data.plants_distance.push({ plants_distance:element.plants_distance }),
            data.leaf_width.push({ leaf_width:element.leaf_width }),
            data.crop_health.push({ crop_health:element.crop_health }),
            data.check_date.push({ check_date:element.check_date }),
            data.note.push({ note:element.note }),
            data.pic.push({ pic:element.pic }),
            data.date.push({ date:element.date })

          });
          setData({
            ...data,
            crop_height: data.crop_height
          });

        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  if (data.didmount == 0) {

    // this.renderForm();
    get_crophealth();
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

          <View style={{ alignSelf: 'center', marginTop: 30, width: '95%' }}>{
            data.crop_height.map((
              crop_height,
              keys, //you can use  mandatory field here
            ) => (

                <Form7
                  index={keys + 1}
                  farm_id={data.farm_id}
                  f_crop_height= {data.crop_height}
                  f_plants_distance= {data.plants_distance}
                  f_leaf_width= {data.leaf_width}
                  f_crop_health= {data.crop_health}
                  f_check_date= {data.check_date}
                  f_note= {data.note}
                  f_pic= {data.pic}
                  f_date= {data.date}
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

        <Form_footer form_no={7} nav={props} />

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

export default connect(mapStateToProps,mapDispatchToProps)(form_7);