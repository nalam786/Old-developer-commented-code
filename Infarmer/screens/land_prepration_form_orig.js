
import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker } from 'native-base';
import Form_footer from '../componente/form_footer';
import Form2 from '../componente/form_2';
import Form3 from '../componente/form_3';
import Form4 from '../componente/form_4';
import Form5 from '../componente/form_5';
import Form6 from '../componente/form_6';
import Form7 from '../componente/form_7';
import Form8 from '../componente/form_8';
import { connect } from 'react-redux'





// import ProductCard2 from '../componente/ProductCard2';
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
    didmount:0,
    form:[],
    check_1:[],
    soul_type:[],
    irrigation_date: [],
    area:[],
    frequency_irrigatin:[],
    time_req_for_irrigation:[]
    
    
});

let data2=[];

  renderForm = () =>{
      data.soul_type.push({soul_type:''})
      data.check_1.push({check_1:''})
      data.irrigation_date.push({irrigation_date:new Date()})
      data.area.push({area:''})
      data.frequency_irrigatin.push({frequency_irrigatin:''})
      data.time_req_for_irrigation.push({time_req_for_irrigation:'sdfsdfsd'})
      // console.log(data.irrigation_date)
      // console.log('=============================='+i)
              data.form.push( <Form2 
                index={data.form.length+1} 

                soul_type={ data.soul_type}
                check_1={ data.check_1}
                irrigation_date={ data.irrigation_date}
                area={ data.area}
                frequency_irrigatin={ data.frequency_irrigatin}
                time_req_for_irrigation={ data.time_req_for_irrigation}
                index2={data.form.length}
              />)
              setData({
                ...data,
                form: data.form
            });
  }
  const sendform = async () => {
    if (data.form.length <= 0 || data.soul_type.length <= 0 ||  data.irrigation_date.length <= 0 ||
    data.area.length <= 0 || data.frequency_irrigatin.length <= 0 || data.time_req_for_irrigation.length <= 0 ) {
              alert('Please fill all the fields');
              return false;
          }
      
   
    // props.navigation.navigate('dashboard') ()=> props.navigation.navigate('dashboard')
    let F_data = {
      soul_type: data.soul_type,
      irrigation_date: data.irrigation_date,
      area: data.area,
      frequency_irrigatin: data.frequency_irrigatin,
      time_req_for_irrigation: data.time_req_for_irrigation,
  
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
      case 2:
        data.soul_type[props.flag.index].soul_type=props.flag.value           
      break;
      case 4:
        data.irrigation_date[props.flag.index].irrigation_date=props.flag.value           
      break;
      case 5:
        data.area[props.flag.index].area=props.flag.value           
      break;
      case 6:
        data.time_req_for_irrigation[props.flag.index].time_req_for_irrigation=props.flag.value           
      break;
      case 7:
        data.frequency_irrigatin[props.flag.index].frequency_irrigatin=props.flag.value           
      break;
      case 100:
        data.check_1[props.flag.index].check_1=props.flag.value           
      break;
      default:
        break;
    }
    props.changeFlag({flag:0,s_key:'s_key',index:'index',value:'value'})
    console.log('==============================')
  }
  if(data.didmount == 0){
    alert(324)
    this.renderForm();
    data.didmount=1
    setData({
      ...data,
      didmount:1,
  });
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
                      <Text style={{color:"white",fontSize:20,fontWeight:'800'}} > LAND PREPRATION</Text>

                    
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
      <Form_footer form_no={2} nav={props} />
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
    marginBottom:20,

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