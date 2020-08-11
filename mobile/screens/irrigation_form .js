
import React from 'react';
import { Container, Content, Button,Footer,DatePicker } from 'native-base';
import Form_footer from '../components/form_footer';
import { connect } from 'react-redux';


import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Picker,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_1 = (props) => {

  const [data, setData] = React.useState({
    form:[],
    application_of_water:[],
    date_canal_irrigation:[],
    tubewellsize: [],
    boresize: [],
    ground_quality:[],  
    groundwater_depth:[],  
    date_groungwater_irrigarion:[],  
    groungwater_use:[],  
  });


let data2=[];


renderForm = () =>{
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
  data.application_of_water.push({application_of_water:''})
  data.date_canal_irrigation.push({date_canal_irrigation:date})
  data.tubewellsize.push({tubewellsize:''})
  data.boresize.push({boresize:''})
  data.ground_quality.push({ground_quality:''})
  data.groundwater_depth.push({groundwater_depth:''})
  data.date_groungwater_irrigarion.push({date_groungwater_irrigarion:date})
  data.groungwater_use.push({groungwater_use:''})
 
  // console.log(data.irrigation_date)
  // console.log('=============================='+i)
          data.form.push( <Form5
            index={data.form.length+1} 

            application_of_water={ data.application_of_water}
            date_canal_irrigation={ data.date_canal_irrigation}
            tubewellsize={ data.tubewellsize}
            boresize={ data.boresize}
            ground_quality={ data.ground_quality}
            groundwater_depth={ data.groundwater_depth}
            date_groungwater_irrigarion={ data.date_groungwater_irrigarion}
            groungwater_use={ data.groungwater_use}
            index2={data.form.length}
          />)
          setData({
            ...data,
            form: data.form
        });
}
const sendform = async () => {
  if (data.application_of_water.length <= 0 ||  data.date_canal_irrigation.length <= 0 ||
  data.tubewellsize.length <= 0 || data.boresize.length <= 0 ||  data.ground_quality.length <= 0 ||
  data.groundwater_depth.length <= 0 ||  data.date_groungwater_irrigarion.length <= 0 ||
  data.groungwater_use.length <= 0  ) {
            alert('Please fill all the fields');
            return false;
        }
    
 
  // props.navigation.navigate('dashboard') ()=> props.navigation.navigate('dashboard')
  let F_data = {
    application_of_water: data.application_of_water,
    date_canal_irrigation: data.date_canal_irrigation,
    tubewellsize: data.tubewellsize,
    boresize: data.boresize,
    ground_quality: data.ground_quality,
    groundwater_depth: data.groundwater_depth,
    date_groungwater_irrigarion: data.date_groungwater_irrigarion,
    groungwater_use: data.groungwater_use,

  }
  console.log("Qualification in final call API................", F_data)
  // await fetch(URL.url + 'user/user_create', {
  //     method: 'POST',
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ U_data }),
  // })
  //     .then(res => res.json())
  //     .then((resjson) => {
  //       if(resjson.Message == 'Successfully Registered'){
  //         send_sms()
  //         props.navigation.navigate('dashboard')
  //       }


  //         alert(resjson.Message)
  //     }
  //     )
  //     .catch(err => {
  //         console.log('failed', err)
  //         alert('failed'+err)

  //     })
      

}
if (props.flag.flag==1) {
    
  switch (props.flag.s_key) {
    case 17:
      data.application_of_water[props.flag.index].application_of_water=props.flag.value           
    break;
    case 18:
      data.date_canal_irrigation[props.flag.index].date_canal_irrigation=props.flag.value           
    break;
    case 19:
      data.tubewellsize[props.flag.index].tubewellsize=props.flag.value           
    break;
    case 20:
      data.boresize[props.flag.index].boresize=props.flag.value           
    break;
    case 21:
      data.ground_quality[props.flag.index].ground_quality=props.flag.value           
    break;
    case 22:
      data.groundwater_depth[props.flag.index].groundwater_depth=props.flag.value           
    break;
    case 23:
      data.date_groungwater_irrigarion[props.flag.index].date_groungwater_irrigarion=props.flag.value           
    break;
    case 24:
      data.groungwater_use[props.flag.index].groungwater_use=props.flag.value           
    break;
    default:
      break;
  }
  props.changeFlag({flag:0,s_key:'s_key',index:'index',value:'value'})
  console.log('==============================')
}

  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      <ScrollView style={styles.scrollView}>
            <View style={[styles.header]} >
              <View style={{flex:2, flexDirection: 'row',justifyContent: 'space-between', }}>
                      <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',}} >
                              <Image
                                        source={require('../assets/img/menu.png')}
                                        style={{width: '30%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
                                        />
                          </View>

                  {/* <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >
                        <Image
                        source={require('./menu.png')}
                        style={{width: '100%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
                        />
                  </View> */}
                
                  <View style={{flex:2,justifyContent: 'center',alignItems:'center', }} >
                      <Text style={{color:"white",fontSize:20,fontWeight:'800'}} >  ALL FARMS</Text>

                    
                  </View>
                  <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >

                  <View  >
                  </View>
                  </View>
              </View>
            </View>
            
            <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
        
        {
          data.form
        }
        </View>
           
        
      </View>
      <View>
          <Button onPress={ ()=> renderForm() } style={[styles.input_button]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >ADD FORM</Text>
          </Button>
      </View>
      <View>
          <Button onPress={ ()=> sendform() } style={[styles.input_button]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Submit</Text>
          </Button>
      </View>
      <Form_footer form_no={5} nav={props} />
      </ScrollView>
        
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
    flag:state.flag
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
      changeFlag: (data) =>{
          dispatch({ type:'CHANGE_FLAG',payload:data})
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(form_1);