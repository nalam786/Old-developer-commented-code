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
  CheckBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_4 = (props) => {

  

  const changeData = (value, s_key,index) =>{
    props.changeFlag({flag:'pesticides_create',s_key:s_key,index:index,value:value})
  };
  const removeData = (value, s_key,index) =>{
    props.changeFlag({flag:'pesticides_delete',s_key:s_key,index:index2,value:value})
  };
  const focus =() =>{
    props.changeFlag({flag:"pesticides_hide/show_footer",s_key:'',index:'',value:'hide'})
    // alert(23456789)
  }
  const blur =() =>{
    props.changeFlag({flag:"pesticides_hide/show_footer",s_key:'',index:'',value:'show'})
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

    props.changeFlag({flag:'pesticides_create',s_key:s_key,index:index,value:date});

  };

  const {
    f_use_reason,
    f_chemical_per_acre,
    f_date_of_application,
    f_pesticide_name,
    f_pesticide_company,
    f_crop_disease,
    index2 
  } =props; 
  
  console.log(props.f_chemical_per_acre);
  
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

        <View>
          <Text style={styles.q_text}>Reason of use</Text>
          <Text style={styles.q_text}>زہر کا استعمال</Text>
        </View>
        <View style={{marginTop:2}} >
            <Picker 
             onValueChange={(itemValue, itemIndex) => changeData(itemValue,1,index2)}
             selectedValue={props.f_use_reason[index2].use_reason}
            >
            <Picker.Item label="Weed removal (جڑی بوٹیوں کا خاتمہ)" value="0" />
            <Picker.Item label="Disease control (بیماری کے لئے)" value="1" />
            <Picker.Item label="Killing insects (کیڑوں کے لئے)" value="2" />
            </Picker>
            <View style={[styles.border_bottom]} ></View>
        </View> 
        <View>
          <Text style={styles.q_text}>Amount of chemical used per acre</Text>
          <Text style={styles.q_text}>کیمیائی مقدار فی ایکڑ استعمال</Text>
        </View>
        <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,2,index2)} value={props.f_chemical_per_acre[index2].chemical_per_acre} placeholder="" keyboardType="numeric" style={[styles.input_email]} />
       
       
        <View style={{marginTop:20,}} >
            <View>
              <Text style={styles.q_text}>Pesticide company</Text>
              <Text style={styles.q_text}>زہرکی کمپنی</Text>
            </View>
            <Picker 
             onValueChange={(itemValue, itemIndex) => changeData(itemValue,5,index2)}
             selectedValue={props.f_pesticide_company[index2].pesticide_company}
            >
            <Picker.Item label="Sygenta (سیجنٹا)" value="0" />
              <Picker.Item label="Sungro (سن گرو)" value="1" />
              <Picker.Item label="ICI Pakistan (آئ سی آئ پاکستان)" value="2" />
              <Picker.Item label="Swat Agro  (سوات ايگرو )" value="3" />
              <Picker.Item label="Warble (واربل)" value="4" />
              <Picker.Item label="FMC (ایف ايم سی)" value="5" />
              <Picker.Item label="Hexon Crop  (بائير کراپ )" value="6" />
              <Picker.Item label="Excel Crop  (ايکسل کراپ )" value="7" />
              <Picker.Item label="Sayban (سائبان)" value="8" />
              <Picker.Item label="Pak Agro (پاک ايگرو)" value="9" />
              <Picker.Item label="Well wisher (ويل وشر)" value="10" />
              <Picker.Item label="Agrarian (ايگريرين)" value="11" />
              <Picker.Item label="Kanzo AG (کينزو۔اے جی)" value="12" />
              <Picker.Item label="Target (ٹارگٹ)" value="13" />
              <Picker.Item label="Jaffer Brothers (جعفر برا درز)" value="14" />
              <Picker.Item label="Arista  (آرسٹا )" value="15" />
              <Picker.Item label="Four Brothers (فور برا درز)" value="16" />
              <Picker.Item label="Geo  (جيو )" value="17" />
              <Picker.Item label="Saver  (سيور )" value="18" />
              <Picker.Item label="Greenlet (گرین لٹ)" value="19" />
              <Picker.Item label="Tara Group (تارا گروپ)" value="20" />
              <Picker.Item label="Parbat Agro  (پربت ايگرو)" value="21" />
              <Picker.Item label="Bio Star (بائيو سٹار)" value="22" />
              <Picker.Item label="Agriforce (ايگری فورس)" value="23" />
              <Picker.Item label="Auriga  (اوريگا )" value="24" />
              <Picker.Item label="Crop Land (کراپ لينڈ)" value="25" />
              <Picker.Item label="Tarzan Group  (ٹارزن گروپ )" value="26" />
            
            </Picker>
            <View style={[styles.border_bottom]} ></View>
        </View> 

        
        
        {/* <View style={[styles.border_bottom]} ></View> */}
        
        <View style={{marginTop:20}} >
        <View>
          <Text style={styles.q_text}>Pesticide name</Text>
          <Text style={styles.q_text}> زہر کا نام</Text>
        </View>
            <Picker 
             onValueChange={(itemValue, itemIndex) => changeData(itemValue,4,index2)}
             selectedValue={props.f_pesticide_name[index2].pesticide_name}
            >
            <Picker.Item label="Abamectine (ايباميکٹن) " value="0" />
            <Picker.Item label="Azocyclotin (ايزسائيکلوٹن)" value="1" />
            <Picker.Item label="Imidacloprid SL (اميڈاکلوپرڈ ايس ايل)" value="2" />
            <Picker.Item label="Imidacloprid WP  (اميڈاکلوپرڈ ڈبليو پی)" value="3" />
            <Picker.Item label="Acetameprid (اسيٹاميپرڈ)" value="4" />
            <Picker.Item label="Diafenthuron  (ڈايافنتھران)" value="5" />
            
            </Picker>
            <View style={[styles.border_bottom]} ></View>
        </View> 
        
        


        <View style={{marginTop:20,}} >
          <View>
            <Text style={styles.q_text}>Disease/Insects affecting crop</Text>
            <Text style={styles.q_text}>فصل کا  مسئلہ (بیماری/ کیڑے وغیرہ)</Text>
          </View>
            <Picker 
            onValueChange={(itemValue, itemIndex) => changeData(itemValue,6,index2)}
            selectedValue={props.f_crop_disease[index2].crop_disease}
            >
            <Picker.Item label="Root Rot disease (ٹوکا)" value="0" />
            <Picker.Item label="Boll Rot Disease (سبز تيلا)" value="1" />
            <Picker.Item label="Leaf spot or Blight disease (چت تيلا)" value="2" />
            <Picker.Item label="Angular leaf spot  (تھرپس)" value="3" />
            <Picker.Item label="Redning (ملی بگ)" value="4" />
            <Picker.Item label="CLCV (ڈسکی بگ)" value="5" />
            
            </Picker>
            <View style={[styles.border_bottom]} ></View>
        </View> 
          
      </View>   
      <View>
          <Text style={styles.q_text}>Application date</Text>
          <Text style={styles.q_text}>تاریخ (زہر لگانے کی)</Text>
        </View>
      <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray',height:'5%'}]} >
          
          <DatePicker
                defaultDate={new Date(props.f_date_of_application[index2].date_of_application)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={""+props.f_date_of_application[index2].date_of_application}
                textStyle={{ color: "#fff" }}
                onDateChange={(val) => setDate(val,3,index2)}
                disabled={false}
                />
                 <Image
                        source={require('../assets/img/calendar.png')}
                        style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10,marginTop:2}}
                />
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
    height:'3%',
    padding:0,
    margin:0
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

export default connect(mapStateToProps,mapDispatchToProps)(form_4);