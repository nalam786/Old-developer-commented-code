import React from 'react';
import { useState } from "react";
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker,Radio } from 'native-base';
import Form_footer from './form_footer';
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
  CheckBox,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_2 = (props) =>  {


  const changeData = (value, s_key,index) =>{
    props.changeFlag({flag:1,s_key:s_key,index:index,value:value})
  };
  const removeData = (value, s_key,index) =>{
    props.changeFlag({flag:2,s_key:s_key,index:index2,value:value})
  };

  // console.log(props.f_prepared_field_irrigation);
  const focus =() =>{
    props.changeFlag({flag:"hide/show_footer",s_key:'',index:'',value:'hide'})
    // alert(23456789)
  }
  const blur =() =>{
    props.changeFlag({flag:"hide/show_footer",s_key:'',index:'',value:'show'})
    // alert(23456789)
  }
  const setDate = (value, s_key,index) => {

    var d = new Date(value);
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

    props.changeFlag({flag:1,s_key:s_key,index:index,value:date});

  };

  const { 
    f_prepared_field_irrigation,
    f_soil_type,
    f_laser_levelled,
    f_levelled_date,
    f_first_irrigation,
    f_irrigation_frequency,
    f_farm_distance_watercourse,
    f_irrigation_time,
    index2 
  } =props; 

  return (
    <>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
    
        <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
        
          <View style={[{marginTop:20,flexDirection:'row',justifyContent:'space-between'}]} >
            <Text style={{marginBottom:40,color:'green',fontSize:25,fontWeight:'bold', }} >Form:{props.index} </Text>
            <Text onPress={ ()=> removeData(2,100,props.index2) } style={{marginBottom:40,color:'green',fontSize:25,fontWeight:'bold', }} >X </Text>
          </View>
          
          <Text style={styles.q_text}>How you prepared field for irrigation?</Text>
          <Text style={styles.q_text}>(آپ کس طرح آبپاشی کے لئے کھیت تیار کرتے ہیں)</Text>
          
          <View style={{ flexDirection: 'column',marginTop:30, }}>
          
            <View style={{ flexDirection:'row' }}>
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={1==props.f_prepared_field_irrigation[index2].prepared_field_irrigation}
                onValueChange={(val) => changeData(1,1,index2)}
              />
              <Text style={{alignSelf:"center", }} >Furrow irrigation (کيارياں)</Text>
            </View>

            <View style={{ flexDirection:'row' }}>         
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={2==props.f_prepared_field_irrigation[index2].prepared_field_irrigation}
                onValueChange={(val) => changeData(2,1,index2)}
              />
              <Text style={{alignSelf:"center" }} >Basin irrigation  (سیدھی زمین)</Text>           
            </View>
            
            <View  style={{ flexDirection:'row' }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={3==props.f_prepared_field_irrigation[index2].prepared_field_irrigation}
                onValueChange={(val) => changeData(3,1,index2)}
              />
              <Text style={{alignSelf:"center" }} >Both (دونوں)</Text>
            </View>
          
          </View>
          
          <View style={{marginTop:20,height:'5%'}} >
            <Text style={styles.q_text}>Type of soil (مٹی کی قسم)</Text>
            <Picker 
              onValueChange={(itemValue, itemIndex) => changeData(itemValue,2,props.index2)}
              selectedValue={props.f_soil_type[index2].soil_type}
            >
              <Picker.Item label="Sandy soil (ریتیلی مٹی)" value="0" />
              <Picker.Item label="Clay  (چکنی مٹی)" value="1" />
              <Picker.Item label="Loam (مکس)" value="2" />
              <Picker.Item label="Sandy loam زیادہ ریتیلی (میرا)" value="3" />
              <Picker.Item label="Clayey loam (زیادہ چکنی)" value="4" />
              </Picker>
          </View>
        
          <View style={[styles.border_bottom]} ></View>

          <View style={{alignSelf:"center",marginTop:10,width:"95%" }} >
                  
            <Text style={styles.q_text}>Is your field laser levelled?</Text>
            <Text style={styles.q_text}>کیا آپ کا فارم لیزر کے ساتھ لیول ھے؟</Text>
            
            <View style={{ flexDirection: 'row',alignSelf:"center",marginTop:30 }}>
                
              <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                <CheckBox 
                  style={{alignSelf:"center",borderRadius:50 }}
                  value={0==props.f_laser_levelled[index2].laser_levelled}
                  onValueChange={(val) => changeData(0,3,index2)}
                />
                <Text style={{alignSelf:"center", }} >YES (جی ہاں)</Text>
              </View>
              
              <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                <CheckBox 
                  style={{alignSelf:"center",borderRadius:50 }}
                  value={1==props.f_laser_levelled[index2].laser_levelled}
                  onValueChange={(val) => changeData(1,3,index2)}
                />
                <Text style={{alignSelf:"center" }} >NO (نہیں)</Text>
              </View>
                      
            </View>
        
          </View>
          {
            props.f_laser_levelled[index2].laser_levelled==0? 
            (<View>
               <View style={{ marginTop:30 }}>
          <Text style={styles.q_text}>Date when you levelled your field/farm?</Text>
          <Text style={styles.q_text}>آپ نے کب اپنا فارم لیزر کے ساتھ لیول کیا تھا؟</Text>
          </View>
          <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray'}]} >
            <DatePicker
            style={{backgroundColor:'red'}}
              defaultDate={props.f_levelled_date[index2].levelled_date}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText=""
              textStyle={{ color: "#fff" }}
              onDateChange={(val) => setDate(val,4,props.index2)}
              disabled={false}
            />
            <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
          </View>
            </View>):(<View ></View>)
          }
         
          <View style={{ marginTop:30 }}>
          <Text style={styles.q_text}>Date of first irrigation to farm?</Text>
          <Text style={styles.q_text}> آپ نے پہلا پانی کب لگایا؟</Text>
          </View>
          <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray'}]} >
            <DatePicker
              defaultDate={props.f_first_irrigation[index2].first_irrigation}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText=""
              textStyle={{ color: "#fff" }}
              onDateChange={(val) => setDate(val,5,props.index2)}
              disabled={false}
            />
            <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
          </View>
          <Text style={styles.q_text}>What is your frequency of irrigation ?</Text>
          <Text style={styles.q_text}>آپ عام طور پر کتنی دیر بعد پانی لگاتے ھیں؟</Text>
          <View style={{marginTop:20,height:'3%'}} >
            <Picker 
              selectedValue={props.f_irrigation_frequency[index2].irrigation_frequency}
              onValueChange={(itemValue, itemIndex) => changeData(itemValue,6,props.index2)}
            >
              <Picker.Item label="Weekly (ہفتہ وار)" value="0" />
              <Picker.Item label="Biweekly (دو ہفتوں کے بعد)" value="1" />
              <Picker.Item label="Twice a week (ہفتے میں دو دفعہ)" value="2" />
              <Picker.Item label="After every third week (ہر تیسرے ہفتے کے بعد)" value="3" />
              <Picker.Item label="Monthly (ماہانہ)" value="4" />
              <Picker.Item label="Other (دیگر)" value="5" />
            </Picker>
            
          </View> 
          <View style={[styles.border_bottom]} ></View>
          <View>
           <Text style={styles.q_text}>How much time is required for complete irrigation in your farm?</Text>
            <Text style={styles.q_text}>فصل کو پا نی لگانے میں کتنا وقت درکار ہوتا ہے؟</Text>
           </View>
          <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,8,index2)} value={props.f_irrigation_time[index2].irrigation_time} placeholder="" keyboardType="numeric" style={[styles.input_email,{height:'3%'}]} />
          <View>
            <Text style={styles.q_text}>How far is your farm from the outlet of water course?</Text>
            <Text style={styles.q_text}>فارم موگے سے کتنے فاصلے پر ہے؟</Text>
          </View>
          <View style={{marginTop:20,height:'3%'}} >
            <Picker 
              selectedValue={props.f_farm_distance_watercourse[index2].farm_distance_watercourse}
              onValueChange={(itemValue, itemIndex) => changeData(itemValue,7,index2)}
            >
              <Picker.Item label="Head (ھیڈ)" value="0" />
              <Picker.Item label="Middle (درميان)" value="1" />
              <Picker.Item label="Tail (ٹيل)" value="2" />
            </Picker>
          </View> 
    
          <View style={[styles.border_bottom]} ></View>
      
       </View>
       
      </View>
        
    </>
  );
};

const styles = StyleSheet.create({

  box: {
    backgroundColor: '#05422b',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:80   
  },

  paragraph: {
    backgroundColor: '#359814',
    fontSize:8
  },

  header: {
    backgroundColor: '#359814',
    height:70
  },

  cart:{
    backgroundColor:'#d7f3db', 
    borderRadius:10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:'5%',
    paddingRight:'5%',
    paddingVertical:'3%'
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
    marginTop:30
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
    marginRight:5
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
    width:'95%',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    alignSelf:'center',
  },

  border_bottom: {
    height: '1%',
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
    alignSelf:"flex-start"
  },

  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf:"flex-start"
  },
    
  scrollView: {
    backgroundColor: Colors.lighter,
    height:'100%'
  },

  engine: {
    position: 'absolute',
    right: 0
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

  q_text:{
    color:'green',
    fontWeight:'bold',
    fontSize:16
  }
  
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

export default connect(mapStateToProps,mapDispatchToProps)(form_2);