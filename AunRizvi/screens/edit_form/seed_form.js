import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form5 from '../../components/edit_form/form_5';
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

const form_5 = props => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,
    
    seed_id: [],
    removal_of_herbs: [],
    seed_variety: [],
    qty_per_acre: [],
    sowing_date: [],
    

  });
  
  renderForm = () => {

    data.seed_id.push({ seed_id: 0 });
    data.removal_of_herbs.push({ removal_of_herbs: '' });
    data.seed_variety.push({ seed_variety: '' });
    data.qty_per_acre.push({ qty_per_acre: '' });
    data.sowing_date.push({ sowing_date: '' });

    setData({
      ...data,
      removal_of_herbs: data.removal_of_herbs
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

    for (let j = 0; j < data.removal_of_herbs.length; j++) {

      if (data.removal_of_herbs[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.removal_of_herbs.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_farm_id:props.user_ids.update_farm_id,
        f_seed_id:data.seed_id[i].seed_id,
        removal_of_herbs: data.removal_of_herbs[i].removal_of_herbs ,
        seed_variety: data.seed_variety[i].seed_variety ,
        qty_per_acre: data.qty_per_acre[i].qty_per_acre ,
        sowing_date: data.sowing_date[i].sowing_date ,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

      }

      console.log('Seeds Create API Calling', F_Data);

      await fetch(URL.url+'seeds/seeds_update', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New Seed Created Successfully') {
          // props.navigation.navigate('seed_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Seed API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.removal_of_herbs[props.flag.index].removal_of_herbs = props.flag.value;
        break;
      case 2:
        data.seed_variety[props.flag.index].seed_variety = props.flag.value;
        break;
      case 3:
        data.qty_per_acre[props.flag.index].qty_per_acre = props.flag.value;
        break;
      case 4:
        data.sowing_date[props.flag.index].sowing_date = props.flag.value;
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
      if(data.seed_id[props.flag.index].seed_id == 0){
 
            removal_of_herbs.splice(props.flag.index, 1);
            seed_variety.splice(props.flag.index, 1);
            qty_per_acre.splice(props.flag.index, 1);
            sowing_date.splice(props.flag.index, 1);

      }else{

            this.del_seeds(data.seed_id[props.flag.index].seed_id);
            
            removal_of_herbs.splice(props.flag.index, 1);
            seed_variety.splice(props.flag.index, 1);
            qty_per_acre.splice(props.flag.index, 1);
            sowing_date.splice(props.flag.index, 1);

      }
    if (data.rander_flag == 0) {
      // this.test();

      // this.renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        removal_of_herbs: data.removal_of_herbs,
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
  del_seeds = async (seed_id) => {
    // alert(3456)
    let F_Data = {
      f_seed_id:seed_id   //props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'seeds/seeds_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Seeds Form Deleted Successfully') {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  const get_seeds = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'seeds/seeds_get', {
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
            data.seed_id.push({ seed_id:element.id  });
            removal_of_herbs.push({ removal_of_herbs:element.removal_of_herbs });
            seed_variety.push({ seed_variety:element.seed_variety });
            qty_per_acre.push({ qty_per_acre:element.qty_per_acre });
            sowing_date.push({ sowing_date:element.sowing_date });
          });
          setData({
            ...data,
            removal_of_herbs: data.removal_of_herbs
          });

        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  if (data.didmount == 0) {

    // this.renderForm();
    get_seeds();
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
            data.removal_of_herbs.map((
              removal_of_herbs,
              keys, //you can use  mandatory field here
            ) => (

                <Form5
                  index={keys + 1}
                  farm_id={data.farm_id} 
                  removal_of_herbs={ data.removal_of_herbs }
                  seed_variety={ data.seed_variety }
                  qty_per_acre={ data.qty_per_acre }
                  sowing_date={ data.sowing_date }
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

export default connect(mapStateToProps,mapDispatchToProps)(form_5);