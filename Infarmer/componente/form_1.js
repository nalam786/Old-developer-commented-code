
import React from 'react';
import { useState } from "react";
import { connect } from 'react-redux'
import URL from '../URL'
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker } from 'native-base';
import Form_footer from './form_footer';


// import ProductCard2 from '../compoente/ProductCard2';
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



const form_1 = (props) =>  {
  const [isSelected, setSelection] = useState(false);
  const [season, setSelectedValue] = useState("");
  const [data, setData] = React.useState({
    farm_name: '',
    crop: '',
    sowing_date: new Date(),
    area: 0,

    
});
  // alert(props.user_ids.user_id)
  const textInputChange = (v,no) => {
    console.log('value:', v, no)
    switch (no) {
        case 1:
          if( v.length !== 0 ) {
                data.farm_name=v;   
              } 
              setData({
                ...data,
                farm_name: v,
            });
            console.log('user_name:', data.farm_name)
            break;
        case 2:
          if( v.length !== 0 ) {
                data.crop=v;   
              } 
              setData({
                ...data,
                crop: v,
            });
            console.log('phone_code:', data.crop)
            break;
        case 3:
          if( v.length !== 0 ) {
            var d = new Date(v);
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
           
            console.log(date)
                data.sowing_date=date;   
              } 
              setData({
                ...data,
                sowing_date: date,
            });
            console.log('sowing_date:', data.sowing_date)
            break;
        case 4:
          if( v.length !== 0 ) {
                data.area=v;   
              } 
              setData({
                ...data,
                area: v,
            });
            console.log('area:', data.area)
            break;
        
  
    }
  }
  const get_farms = async () => {
    // alert(6789)
    let data = {
      f_farm_id:props.user_ids.user_id
       
  
    }
    //  console.log(Q_data)
    console.log("Qualification in final call API................", data)
    await fetch(URL.url+'farms/farms_get', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
        .then(res => res.json())
        .then((resjson) => {
          if(resjson.Message == 'Farm Get Successfully'){
            console.log(resjson.data)
            let data =resjson.data.length
            let id=resjson.data[data-1].id
            // alert('yeyeyeyeyey'+data)

            props.user_id({user_id:props.user_ids.user_id,farm_id:id,phone:data.phone_no,password:data.password,username:data.user_name,code:0})
            alert('ertyuityui'+props.user_ids.farm_id)
             props.navigation.navigate('land_prepration_form')
           
          }

        
  
        }
        )
        .catch(err => {
            console.log('failed', err)
  
        })
  
  }
  const sendform = async () => {
    get_farms()

    // alert(props.user_ids.user_id)
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
    if (data.farm_name == '' || data.crop == '' ||  data.sowing_date == '' ||
    data.area == '' || data.season == '') {
              alert('Please fill all the fields');
              return false;
          }
      
   
    // props.navigation.navigate('dashboard') ()=> props.navigation.navigate('dashboard')
    let F_Data = {
      f_user_id:props.user_ids.user_id,
      f_farm_name:data.farm_name,          //fk
      f_crop: data.crop,
      f_sowing_date: data.sowing_date,
      f_area: data.area,
      f_season:data.season,
      f_map: null,
      f_created_by:props.user_ids.user_id,
      f_created_at:date,
      f_modified_by:props.user_ids.user_id,
      f_modified_at:date,
  
    }
    console.log("Qualification in final call API................", F_Data)
    await fetch(URL.url + 'farms/farms_create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ F_Data }),
    })
        .then(res => res.json())
        .then((resjson) => {
          if(resjson.Message == 'Successfully Registered'){
            get_farms()
          }
  
  
            alert(resjson.Message)
        }
        )
        .catch(err => {
            console.log('failed', err)
            alert('failed'+err)
  
        })
        
  
  }

  return (
   
    <>
      {/* <StatusBar barStyle="dark" /> */}
      <ScrollView style={styles.scrollView}>
            
            
            <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
        <TextInput placeholderTextColor="#272626" onChangeText={(val) => textInputChange(val,1)} value={data.farm_name}  placeholder="FARM NAME" style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onChangeText={(val) => textInputChange(val,2)}  value={data.crop} placeholder="CROP" style={[styles.input_email]} />
        <View style={[styles.input_email]  } >
            <Picker 
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              selectedValue={season}
            >
            <Picker.Item label="SEASON" value="" />
            <Picker.Item label="Rabi" value="0" />
            <Picker.Item label="Kharif" value="1" />
            <Picker.Item label="Yearly" value="2" />
            <Picker.Item label="Otherly" value="3" />
            </Picker>
        </View>
      <View style={ [styles.input_email,{flexDirection:'row',justifyContent:'space-between'}]} >
      <DatePicker
            defaultDate={data.sowing_date}
            // minimumDate={new Date(2018, 1, 1)}
            // maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="SOWING DATE"
            textStyle={{ color: "green" }}
            // placeHolderTextStyle={{ color: "#d3d3d3" }}
            // onDateChange={(date) => textInputChange(date,3)}
            onDateChange={(val) => textInputChange(val,3)}
            
            disabled={false}
            
            />
            <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
        </View>
        <TextInput placeholderTextColor="#272626" value={data.area} onChangeText={(val) => textInputChange(val,4)} keyboardType="numeric" placeholder="AREA (ACERS)" style={[styles.input_email]} />
        
        </View>
       
           
        
      </View>
      <View>
          <Button onPress={ ()=> sendform() } style={[styles.input_button]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Submit</Text>
          </Button>
      </View>
      
      </ScrollView>
        
    </>
  );
};

const styles = StyleSheet.create({
  input_button: {
    height: 35,
    width:300,
    backgroundColor:'#05422b',
    color:'red',
    alignSelf:"center",
    margin:0,

  },
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
    signup:state.sugnup_recux,
    user_ids:state.user_id_recux


  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
      changeFlag: (data) =>{
          dispatch({ type:'CHANGE_FLAG',payload:data})
      },
      changeSignup: (data) =>{
        dispatch({ type:'SUGNUP_DATA',payload:data})
    },
    user_id: (data) =>{
      dispatch({ type:'USER_ID',payload:data})
  }
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(form_1);