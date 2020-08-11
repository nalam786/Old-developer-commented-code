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
  TouchableWithoutFeedback,
  CheckBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const form_7 = (props) =>  {

  

  const changeData = (value, s_key,index) =>{
    props.changeFlag({flag:"crop_health_create",s_key:s_key,index:index,value:value})
  }
  const removeData = (value, s_key,index) =>{
    props.changeFlag({flag:'crop_health_delete',s_key:s_key,index:index2,value:value})
  };
  const focus =() =>{
    props.changeFlag({flag:"crop_health_hide/show_footer",s_key:'',index:'',value:'hide'})
    // alert(23456789)
  }
  const blur =() =>{
    props.changeFlag({flag:"crop_health_hide/show_footer",s_key:'',index:'',value:'show'})
    // alert(23456789)
  }
  const setDate = (value, s_key,index) => {

    var d = new Date(value);
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
    // alert(date)
    props.changeFlag({flag:'crop_health_create',s_key:s_key,index:index,value:date})
  // alert(newDate)
  }
  const {
    f_crop_height,
    f_plants_distance,
    f_leaf_width,
    f_crop_health,
    f_check_date,
    f_note,
    f_pic,
    f_date,
    index2
   } =props; 
  // console.log(props.crop_area)

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


        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,1,index2)} value={props.f_crop_height[index2].crop_height} placeholder="Crop / plant height (in feet) " keyboardType="numeric" style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,2,index2)} value={props.f_plants_distance[index2].plants_distance} placeholder="Distance between plants (in feet) پودوں کا درمیانی فاصلہ" keyboardType="numeric" style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,3,index2)} value={props.f_leaf_width[index2].leaf_width} placeholder="Crop’s leaf width (average in feet) فصل کے پتے کی چوڑائی" keyboardType="numeric" style={[styles.input_email]} />
        
        <Text>Overall crop health فصل کی مجموعی صحت</Text>
              
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                     value={1==props.f_crop_health[index2].crop_health}
                     onValueChange={(val) => changeData(1,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >healthy صحت بخش</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={2==props.f_crop_health[index2].crop_health}
                      onValueChange={(val) => changeData(2,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Moderate درمیانی/ معتدل </Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                       value={3==props.f_crop_health[index2].crop_health}
                       onValueChange={(val) => changeData(3,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Unhealthy غیر صحت بخش </Text>
              </View>
              
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                       value={4==props.f_crop_health[index2].crop_health}
                       onValueChange={(val) => changeData(4,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Under severe pressure سخت دباؤ میں</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                       value={5==props.f_crop_health[index2].crop_health}
                       onValueChange={(val) => changeData(5,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Do not know معلوم نہیں</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={6==props.f_crop_health[index2].crop_health}
                      onValueChange={(val) => changeData(6,4,index2)}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Other دیگر</Text>
              </View>

              {/* Note */}
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,6,index2)} value={props.f_note[index2].note} placeholder="Note نوٹ"  style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,7,index2)} value={props.f_pic[index2].pic} placeholder="Pic تصویر"  style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,4,index2)} value={props.f_crop_health[index2].crop_health} placeholder="Pic"  style={[styles.input_email]} />

            
        <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray'}]} >
            <DatePicker
            defaultDate={new Date(props.f_date[index2].date)}
                  // defaultDate={new Date(2018, 4, 4)}
                  // minimumDate={new Date(2018, 1, 1)}
                  // maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={"(checking of crop health.) تاریخ"}
                  textStyle={{ color: "green" }}
                  // placeHolderTextStyle={{ color: "#d3d3d3" }}
                  // onDateChange={this.setDate}
                  onDateChange={(val) => setDate(val,5,index2)}
                  disabled={false}
                  
                  />
                  <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
        </View>

        <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray'}]} >
            <DatePicker
            defaultDate={new Date(props.f_date[index2].date)}
                  // defaultDate={new Date(2018, 4, 4)}
                  // minimumDate={new Date(2018, 1, 1)}
                  // maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={"(checking of crop health.) تاریخ"}
                  textStyle={{ color: "green" }}
                  // placeHolderTextStyle={{ color: "#d3d3d3" }}
                  // onDateChange={this.setDate}
                  onDateChange={(val) => setDate(val,8,index2)}
                  disabled={false}
                  
                  />
                  <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
        </View>

        </View>
   
      </View>
        
    </>
  );
};

const styles = StyleSheet.create({
  PI_Text_2:{
    fontSize:13,
    marginLeft:5,
    marginTop:7,
    color:'#555555',
    fontFamily:'cretype - Artico ExtraCond Light'},

  PII_view1:{
    flexDirection:'column',
    marginTop:20,alignItems:'center'
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
    // height: '12%',
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

export default connect(mapStateToProps,mapDispatchToProps)(form_7);