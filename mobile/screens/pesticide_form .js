import React from 'react';
import Form_footer from '../components/form_footer';
import Form4 from '../components/form_4';
import URL from '../URL';
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

const form_4 = (props) =>  {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,

    form:[],
    reason_of_use:[],
    quantiamount_chemical: [],
    date_application:[],  
    name:[],  
    pesticide_company:[],  
    crop_disease:[],  
    created_at: [],
    modified_at: []
    
  });

  renderForm = () => {

    data.farm_id.push({ farm_id: '' });
    data.reason_of_use.push({reason_of_use:''})
    data.quantiamount_chemical.push({quantiamount_chemical:''})
    data.date_application.push({date_application:date})
    data.name.push({name:''})
    data.pesticide_company.push({pesticide_company:''})
    data.crop_disease.push({crop_disease:''})

    setData({
      ...data,
      prepared_field_irrigation: data.prepared_field_irrigation
    });

  };

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


 
  // console.log(data.irrigation_date)
  // console.log('=============================='+i)
          data.form.push( <Form4 
            index={data.form.length+1} 

            reason_of_use={ data.reason_of_use}
            quantiamount_chemical={ data.quantiamount_chemical}
            date_application={ data.date_application}

            name={ data.name}
            pesticide_company={ data.pesticide_company}
            crop_disease={ data.crop_disease}

            index2={data.form.length}
          />)
          setData({
            ...data,
            form: data.form
        });
}
const sendform = async () => {
  if (data.reason_of_use.length <= 0 ||  data.quantiamount_chemical.length <= 0 ||
  data.date_application.length <= 0 || data.name.length <= 0 ||  data.pesticide_company.length <= 0 ||
  data.crop_disease.length <= 0  ) {
            alert('Please fill all the fields');
            return false;
        }
    
 
  // props.navigation.navigate('dashboard') ()=> props.navigation.navigate('dashboard')
  let F_data = {
    reason_of_use: data.reason_of_use,
    quantiamount_chemical: data.quantiamount_chemical,
    date_application: data.date_application,

    name: data.name,
    pesticide_company: data.pesticide_company,
    crop_disease: data.crop_disease,

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
    case 11:
      data.reason_of_use[props.flag.index].reason_of_use=props.flag.value           
    break;
    case 12:
      data.quantiamount_chemical[props.flag.index].quantiamount_chemical=props.flag.value           
    break;
    case 13:
      data.date_application[props.flag.index].date_application=props.flag.value           
    break;
    case 14:
      data.name[props.flag.index].name=props.flag.value           
    break;
    case 15:
      data.pesticide_company[props.flag.index].pesticide_company=props.flag.value           
    break;
    case 16:
      data.crop_disease[props.flag.index].crop_disease=props.flag.value           
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
      <Form_footer form_no={4} nav={props} />
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

export default connect(mapStateToProps,mapDispatchToProps)(form_4);