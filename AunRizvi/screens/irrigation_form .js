import React from 'react';
import Form_footer from '../components/form_footer';
import Form3 from '../components/form_3';
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

const form_3 = (props) => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,
    footer:true,
    farm_id: [],
    water_source:[],
    flow_water_source:[],
    water_source_value:[],
    type_water_source:[],
    type_water_source_other:[],
    water_depth:[],
    water_width:[],
    bed_level_water_width:[],
    vegetation:[],
    canal_application:[],
    irrigation_date:[],
    tube_well_size:[],
    ground_water_depth:[],
    water_quality:[],
    created_at: [],
    modified_at: []

  });

renderForm = () =>{
  data.farm_id.push({ farm_id: '' });
  data.water_source.push({water_source: ''}),
  data.flow_water_source.push({flow_water_source: ''}),
  data.water_source_value.push({water_source_value: ''}),
  data.type_water_source.push({type_water_source: ''}),
  data.type_water_source_other.push({type_water_source_other: ''})
  data.water_depth.push({water_depth: ''}),
  data.water_width.push({water_width: ''}),
  data.bed_level_water_width.push({bed_level_water_width: ''}),
  data.vegetation.push({vegetation: ''}),
  data.canal_application.push({canal_application: ''}),
  data.irrigation_date.push({irrigation_date: new Date()}),
  data.tube_well_size.push({tube_well_size: ''}),
  data.ground_water_depth.push({ground_water_depth: ''}),
  data.water_quality.push({water_quality:''})

  setData({
    ...data,
    water_source: data.water_source
  });

};

const sendform = async () => {
  
  var d = new Date();
  var y=d.getFullYear();
  var m=d.getMonth();
  var day=d.getDate();
  var date='';
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

    // if (data.water_source[j] == "") {
    //   alert('Please fill all the mandatory fields' + j);
    //   return false;
    // }
  }
  alert(data.water_source.length)
  for (let i = 0; i < data.water_source.length; i++) {
    
    let F_data={};
     F_Data = {

      f_farm_id:props.user_ids.farm_id,
      f_water_source:data.water_source[i].water_source,
      f_flow_water_source:data.flow_water_source[i].flow_water_source,
      f_water_source_value: data.water_source_value[i].water_source_value,
      f_type_water_source:data.type_water_source[i].type_water_source,
      f_type_water_source_other:data.type_water_source_other[i].type_water_source_other,
      f_water_depth:data.water_depth[i].water_depth,
      f_water_width:data.water_width[i].water_width,
      f_bed_level_water_width: data.bed_level_water_width[i].bed_level_water_width,
      f_vegetation: data.vegetation[i].vegetation,
      f_canal_application: data.canal_application[i].canal_application,
      f_irrigation_date: data.irrigation_date[i].irrigation_date,
      f_tube_well_size: data.tube_well_size[i].tube_well_size,
      f_ground_water_depth: data.ground_water_depth[i].ground_water_depth,
      f_water_quality:data.water_quality[i].water_quality,
      f_created_by:props.user_ids.farm_id,
      f_created_at:date,
      f_modified_by:props.user_ids.farm_id,
      f_modified_at:date


  }
  console.log("Irrigation Create API Calling: ", F_Data);
  await fetch(URL.url+'irrigations/irrigations_create', {

    method: 'POST',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ F_Data }),

  })

  .then(res => res.json())

  .then((resjson) => {

    if (resjson.Message == 'New Irrigation Created Successfully') {
      props.navigation.navigate('pesticide_form');
    }

    alert(resjson.Message);

  })

  .catch(err => {
    console.log('Irrigation API Failed', err);
    alert('Failed to Submit Data: ' + err);
  })

}

};
// alert(props.flag.flag)
if (props.flag.flag=='irrigation_create') {


  switch (props.flag.s_key) {
    case 1:
      data.water_source[props.flag.index].water_source=props.flag.value;           
    break;
    case 2:
      data.flow_water_source[props.flag.index].flow_water_source=props.flag.value;          
    break;
    case 3:
      data.water_source_value[props.flag.index].water_source_value=props.flag.value;          
    break;
    case 4:
      data.type_water_source[props.flag.index].type_water_source=props.flag.value;           
    break;
    case 5:
      data.type_water_source_other[props.flag.index].type_water_source_other=props.flag.value;          
    break;
    case 6:
      data.water_depth[props.flag.index].water_depth=props.flag.value;           
    break;
    case 7:
      data.water_width[props.flag.index].water_width=props.flag.value;           
    break;
    case 8:
      data.bed_level_water_width[props.flag.index].bed_level_water_width=props.flag.value;           
    break;
    case 9:
      data.vegetation[props.flag.index].vegetation=props.flag.value;           
    break;
    case 10:
      data.canal_application[props.flag.index].canal_application=props.flag.value;           
    break;
    case 11:
      data.irrigation_date[props.flag.index].irrigation_date=props.flag.value;           
    break;
    case 12:
      data.tube_well_size[props.flag.index].tube_well_size=props.flag.value;           
    break;
    case 13:
      data.ground_water_depth[props.flag.index].ground_water_depth=props.flag.value;           
    break;
    case 14:
      data.water_quality[props.flag.index].water_quality=props.flag.value;           
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

  console.log('Props Flag Changed to tttttt');

}

if (props.flag.flag == 'irrigation_delete') {

  data.farm_id.splice(props.flag.index, 1);
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
  data.water_quality.splice(props.flag.index, 1);
  
  if (data.rander_flag == 0) {

    this.renderForm();
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
if (props.flag.flag == 'irrigation_hide/show_footer') { 
  // alert(3456)

  if(props.flag.value == 'hide' && data.rander_flag==0 ){
    // alert(3456)
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
                height: 30,
                resizeMode: 'stretch',
                marginLeft: 10,
              }}
            />
          </View>

          <View
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
              Irrigation
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
                f_water_source={data.water_source}
                f_flow_water_source={data.flow_water_source}
                f_water_source_value={data.water_source_value}  
                f_type_water_source={data.type_water_source}
                f_type_water_source_other={data.type_water_source_other}
                f_water_depth={data.water_depth}
                f_water_width={data.water_width}
                f_bed_level_water_width={data.bed_level_water_width}
                f_vegetation={data.vegetation}
                f_canal_application={data.canal_application}
                f_irrigation_date={data.irrigation_date}   
                f_tube_well_size={data.tube_well_size}  
                f_ground_water_depth={data.ground_water_depth}
                f_water_quality={data.water_quality}        
                       
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
              <Form_footer form_no={5} nav={props} />
            ):(<View/>)
          }

    </ScrollView>
    {
            data.footer ? (
              <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:"white"}} >
      <Form_footer form_no={5} nav={props} /></View>
            ):(<View/>)
          }
  </>
);
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#05422b',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:80,

    // marginTop:50,
    
  },
  paragraph: {
    backgroundColor: '#359814',
    fontSize:8,
    
    // marginTop:50,
    
  },
  header: {
    backgroundColor: '#359814',

    height:70,
    // marginTop:50,
    
  },
  cart:{
    backgroundColor:'#d7f3db', 
    borderRadius:10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:'5%',
    paddingRight:'5%',
    // paddingTop:'3%',
    paddingVertical:'3%',
    

    
  },
  cartbody:{
        paddingLeft:20,
        paddingRight:20,
  },
  input_button: {
    height: 40,
    width:300,
    backgroundColor:'#05422b',
    color:'red',
    alignSelf:"center",
    margin:0,
    marginTop:30,

  },
  input_phone_code: {
    height: 35,
    width:65,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    marginRight:5,
    
  },
  input_phone: {
    height: 35,
    width:230,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20,
  },
  input_email: {
    height: '12%',
    width:'95%',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    alignSelf:'center',
  },
  input_: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20,
  },
  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf:"flex-start",
    // marginTop:50,

  },
  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf:"flex-start",
    // marginTop:50,

  },
  
  
  scrollView: {
    backgroundColor: Colors.lighter,
    height:'100%'
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