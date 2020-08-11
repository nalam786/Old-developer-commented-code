import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form4 from '../../components/edit_form/form_4';
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

const form_4 = props => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,
    
    pesticide_id: [],
    use_reason: [],
    chemical_per_acre: [],
    date_of_application: [],
    pesticide_name: [],
    pesticide_company: [],
    crop_disease: [],
    fertilizer_type: [],
    fertilizer_per_acre: [],
    application_date: [],
    

  });
  
  renderForm = () => {

    data.pesticide_id.push({ pesticide_id: 0 });
    data.use_reason.push({ use_reason: '' });
    data.chemical_per_acre.push({ chemical_per_acre: '' });
    data.date_of_application({ date_of_application: '' });
    data.pesticide_name({ pesticide_name: '' });
    data.pesticide_company({ pesticide_company: '' });
    data.crop_disease({ crop_disease: '' });
    data.fertilizer_type.push({ fertilizer_type: '' });
    data.fertilizer_per_acre.push({ fertilizer_per_acre: '' });
    data.application_date({ application_date: '' });

    setData({
      ...data,
      use_reason: data.use_reason
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

    for (let j = 0; j < data.use_reason.length; j++) {

      if (data.use_reason[j] == "") {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.use_reason.length; i++) {
      
      let F_data={};
      let F_Data = {

        f_farm_id:props.user_ids.update_farm_id,
        f_pesticide_id:data.pesticide_id[i].pesticide_id,
        f_use_reason:data.use_reason[i].use_reason,
        f_chemical_per_acre:data.chemical_per_acre[i].chemical_per_acre,
        f_date_of_application:data.date_of_application[i].date_of_application,
        f_pesticide_name:data.pesticide_name[i].pesticide_name,
        f_pesticide_company:data.pesticide_company[i].pesticide_company,
        f_crop_disease:data.crop_disease[i].crop_disease,
        f_fertilizer_type:data.fertilizer_type[i].fertilizer_type,
        f_fertilizer_per_acre:data.fertilizer_per_acre[i].fertilizer_per_acre,
        f_application_date:data.application_date[i].application_date,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

      }

      console.log('Pesticide Create API Calling', F_Data);

      await fetch(URL.url+'pesticides/pesticides_update', {

        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ F_Data }),

      })

      .then(res => res.json())

      .then((resjson) => {

        if (resjson.Message == 'New pesticide form Created Successfully') {
          // props.navigation.navigate('seed_form');
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Pesticide API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag == 1) {
    switch (props.flag.s_key) {

      case 1:
        data.use_reason[props.flag.index].use_reason = props.flag.value;
        break;

      case 2:
        data.chemical_per_acre[props.flag.index].chemical_per_acre = props.flag.value;
        break;

      case 3:
        data.date_of_application[props.flag.index].date_of_application = props.flag.value;
        break;

      case 4:
        data.pesticide_name[props.flag.index].pesticide_name = props.flag.value;
        break;

      case 5:
        data.pesticide_company[props.flag.index].pesticide_company = props.flag.value;
        break;

      case 6:
        data.crop_disease[props.flag.index].crop_disease = props.flag.value;
        break;

      case 7:
        data.fertilizer_type[props.flag.index].fertilizer_type = props.flag.value;
        break;

      case 8:
        data.fertilizer_per_acre[props.flag.index].fertilizer_per_acre = props.flag.value;
        break;

      case 9:
        data.application_date[props.flag.index].application_date = props.flag.value;
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
      if(data.pesticide_id[props.flag.index].pesticide_id == 0){
            
            data.use_reason.splice(props.flag.index, 1);
            data.chemical_per_acre.splice(props.flag.index, 1);
            data.date_of_application.splice(props.flag.index, 1);
            data.pesticide_name.splice(props.flag.index, 1);
            data.pesticide_company.splice(props.flag.index, 1);
            data.crop_disease.splice(props.flag.index, 1);
            data.fertilizer_type.splice(props.flag.index, 1);
            data.fertilizer_per_acre.splice(props.flag.index, 1);
            data.application_date.splice(props.flag.index, 1);
      }else{

            this.del_pesticide(data.pesticide_id[props.flag.index].pesticide_id);

            data.use_reason.splice(props.flag.index, 1);
            data.chemical_per_acre.splice(props.flag.index, 1);
            data.date_of_application.splice(props.flag.index, 1);
            data.pesticide_name.splice(props.flag.index, 1);
            data.pesticide_company.splice(props.flag.index, 1);
            data.crop_disease.splice(props.flag.index, 1);
            data.fertilizer_type.splice(props.flag.index, 1);
            data.fertilizer_per_acre.splice(props.flag.index, 1);
            data.application_date.splice(props.flag.index, 1);
      }
    if (data.rander_flag == 0) {
      // this.test();

      // this.renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        use_reason: data.use_reason,
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
  del_pesticide = async (pesticide_id) => {
    // alert(3456)
    let F_Data = {
      f_pesticide_id:pesticide_id   //props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'pesticides/pesticides_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Pesticide form of Farm Deleted Successfully') {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  const get_pesticide = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'pesticides/pesticides_get', {
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
            data.pesticide_id.push({ pesticide_id:element.id  });
            use_reason.push({ use_reason:element.use_reason });
            chemical_per_acre.push({ chemical_per_acre:element.chemical_per_acre });
            date_of_application.push({ date_of_application:element.date_of_application });
            pesticide_name.push({ pesticide_name:element.pesticide_name });
            pesticide_company.push({ pesticide_company:element.pesticide_company });
            crop_disease.push({ crop_disease:element.crop_disease });
            fertilizer_type.push({ fertilizer_type:element.fertilizer_type });
            fertilizer_per_acre.push({ fertilizer_per_acre:element.fertilizer_per_acre });
            application_date.push({ application_date:element.application_date });
          });
          setData({
            ...data,
            use_reason: data.use_reason
          });

        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };
  if (data.didmount == 0) {

    // this.renderForm();
    get_pesticide();
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
            data.use_reason.map((
              use_reason,
              keys, //you can use  mandatory field here
            ) => (

                <Form4
                  index={keys + 1}
                  farm_id={data.farm_id}  
                  use_reason={data.use_reason}
                  chemical_per_acre={data.chemical_per_acre}
                  date_of_application={data.date_of_application}
                  pesticide_name={data.pesticide_name}
                  pesticide_company={data.pesticide_company}
                  crop_disease={data.crop_disease}
                  fertilizer_type={data.fertilizer_type}
                  fertilizer_per_acre={data.fertilizer_per_acre}
                  application_date={data.application_date}
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

export default connect(mapStateToProps,mapDispatchToProps)(form_4);