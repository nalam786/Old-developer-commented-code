import React from 'react';
import Form_footer from '../components/form_footer';
import Form5 from '../components/form_5';
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

const form_5 = props => {
  
  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,
    footer:true,
    farm_id: [],
    removal_of_herbs:[],
    seed_variety:[],
    qty_per_acre: [],
    sowing_date:[],
    created_at: [],
    modified_at: []
  });

  renderForm = () => {
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
    data.farm_id.push({ farm_id: '' });
    data.removal_of_herbs.push({ removal_of_herbs: '' });
    data.seed_variety.push({seed_variety:''});
    data.qty_per_acre.push({qty_per_acre:''});
    data.sowing_date.push({sowing_date:date});

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

        f_farm_id:props.user_ids.farm_id,
        f_removal_of_herbs:data.removal_of_herbs[i].removal_of_herbs,
        f_seed_variety: data.seed_variety[i].seed_variety,
        f_qty_per_acre: data.qty_per_acre[i].qty_per_acre,
        f_sowing_date: data.sowing_date[i].sowing_date,
        f_created_by:props.user_ids.farm_id,
        f_created_at:date,
        f_modified_by:props.user_ids.farm_id,
        f_modified_at:date

    }
         console.log('Seeds Create/ API Calling', F_Data);

      await fetch(URL.url+'seeds/seeds_create', {

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
          props.navigation.navigate('harvesting_form')
        }

        alert(resjson.Message);

      })

      .catch(err => {
        console.log('Seed API Failed', err);
        alert('Failed to Submit Data: ' + err);
      })

    }

  };

  if (props.flag.flag=='seed_create') {
    switch (props.flag.s_key) {
      case 1:
        data.removal_of_herbs[props.flag.index].removal_of_herbs = props.flag.value           
      break;
      case 2:
        data.seed_variety[props.flag.index].seed_variety = props.flag.value           
      break;
      case 3:
        data.qty_per_acre[props.flag.index].qty_per_acre = props.flag.value           
      break;
      case 4:
        data.sowing_date[props.flag.index].sowing_date = props.flag.value           
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

  if (props.flag.flag == 'seed_delete') {

    data.farm_id.splice(props.flag.index, 1);
    data.removal_of_herbs.splice(props.flag.index, 1);
    data.seed_variety.splice(props.flag.index, 1);
    data.qty_per_acre.splice(props.flag.index, 1);
    data.sowing_date.splice(props.flag.index, 1);
    
    if (data.rander_flag == 0) {

      this.renderForm();
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
  
  if (data.didmount == 0) {

    this.renderForm();
    data.didmount = 1;

    setData({

      ...data,
      didmount: 1

    });

  }
  if (props.flag.flag == 'seed_hide/show_footer') { 
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
        Seeds
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
          f_removal_of_herbs={data.removal_of_herbs}
          f_seed_variety={data.seed_variety}
          f_qty_per_acre={data.qty_per_acre}
          f_sowing_date={data.sowing_date}             
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
              <Form_footer form_no={3} nav={props} />
            ):(<View/>)
          }

</ScrollView>
{
            data.footer ? (
              <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:"white"}} >
      <Form_footer form_no={3} nav={props} /></View>
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

export default connect(mapStateToProps,mapDispatchToProps)(form_5);