
import React from 'react';
import { useState } from "react";
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker,Radio } from 'native-base';
import Form_footer from './form_footer';
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
  CheckBox,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const form_1 = (props) =>  {
  console.log(props)
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState('itemTwo');
  const [season, setSelectedValue] = useState("");
  const [data, setData] = React.useState({
    sole_type: '',
    crop: '',
    sowing_date: new Date(),
    area: 0,

    
});

const changeData = (value, s_key,index) =>{
  props.changeFlag({flag:1,s_key:s_key,index:index,value:value})
}

const { soul_type,irrigation_date,area,frequency_irrigatin,time_req_for_irrigation,check_1,index2 } =props; 
console.log(222222222222222222222222222222222)
console.log(props.soul_type[index2].soul_type)
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
          props.changeFlag({flag:1,s_key:s_key,index:index,value:date})
  // alert(newDate)
}
// alert(567)
  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      {/* <ScrollView style={styles.scrollView}> */}
           
            
            <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
          <Text style={{marginBottom:40,color:'green',fontSize:25,fontWeight:'bold', }} >Form:{props.index} </Text>
              <Text>How You Prepared Field For Irrigation</Text>
              <View style={{ flexDirection: 'row',alignSelf:"center",marginTop:30, }}>
              
              <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                    {/* <View  onPress={(val) => changeData(val,5,index2)} > */}
                    <CheckBox style={{alignSelf:"center",borderRadius:50, }}
                    value={'Forrow_Irrigation'==props.f_prepared_field_irrigation[index2].f_prepared_field_irrigation}
                    onValueChange={(val) => changeData('Forrow_Irrigation',1,index2)}
                    
                    />
                    {/* </View> */}
                    <Text style={{alignSelf:"center", }} >Forrow Irrigation</Text>
                    </View>
                    <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                     <CheckBox style={{alignSelf:"center",borderRadius:50, }}
                    value={'Basian_Irrigation'==props.f_prepared_field_irrigation[index2].f_prepared_field_irrigation}
                    onValueChange={(val) => changeData('Basian_Irrigation',1,index2)}
                    />
                    <Text style={{alignSelf:"center" }} >Basian_Irrigation</Text>
                    </View>
                    <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                     <CheckBox style={{alignSelf:"center",borderRadius:50, }}
                        value={'Both'==props.f_prepared_field_irrigation[index2].f_prepared_field_irrigation}
                        onValueChange={(val) => changeData('Both',1,index2)}
                    />
                    <Text style={{alignSelf:"center" }} >Both</Text>
                    </View>
                    
            
               </View>
        
               <View style={{marginTop:20,}} >
                  <Picker 
                  onValueChange={(itemValue, itemIndex) => changeData(itemValue,2,props.index2)}
                  selectedValue={props.f_soil_type[props.index2].f_soil_type}
                  >
                  <Picker.Item label="TYPE OF SOIL" value="" />
                  <Picker.Item label="Sandy soil" value="0" />
                  <Picker.Item label="Clay" value="1" />
                  <Picker.Item label="Loam" value="2" />
                  <Picker.Item label="Sandy loam" value="3" />
                  <Picker.Item label="Clayey loam" value="4" />
                   </Picker>
              </View>
        

              <View style={[styles.border_bottom]} ></View>
        <View style={{alignSelf:"center",marginTop:10,width:"95%" }} >
                
              <Text> Is your field laser levelled? </Text>
              <View style={{ flexDirection: 'row',alignSelf:"center",marginTop:30, }}>
              
              <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                     <CheckBox style={{alignSelf:"center",borderRadius:50, }}
                   value={'YES'==props.f_laser_levelled[index2].f_laser_levelled}
                   onValueChange={(val) => changeData('YES',3,index2)}
                    />
                    <Text style={{alignSelf:"center", }} >YES</Text>
                    </View>
                    <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
                     <CheckBox style={{alignSelf:"center",borderRadius:50, }}
                    value={'NO'==props.f_laser_levelled[index2].f_laser_levelled}
                    onValueChange={(val) => changeData('NO',3,index2)}
                    />
                    <Text style={{alignSelf:"center" }} >NO</Text>
                    </View>
                    
            
               </View>
        </View>
        <View style={[styles.input_email,{marginTop:20,}]} >
            <DatePicker
                  defaultDate={props.f_first_irrigation[index2].f_first_irrigation}
                  // minimumDate={new Date(2018, 1, 1)}
                  // maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="When did/will you apply first irrigation to your field/farm?"
                  textStyle={{ color: "green" }}
                  // placeHolderTextStyle={{ color: "#d3d3d3" }}
                  // onChangeText={(t) => this.changeData(t,4,index2)}
                  onDateChange={(val) => setDate(val,4,props.index2)}
                  // onDateChange={(t) => this.changeData(t,4,index2)}
                  disabled={false}
                  
                  />
        </View>


       
        <TextInput placeholderTextColor="#272626" value={props.f_irrigation_frequency[index2].f_irrigation_frequency} onChangeText={(val) => changeData(val,5,props.index2)}  placeholder="How much time is required for a complete irrigation in your farm?" style={[styles.input_email]} />
        <View style={{marginTop:20,}} >
            <Picker 
             // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
             selectedValue={props.f_farm_distance_watercourse[index2].f_farm_distance_watercourse}
             onValueChange={(itemValue, itemIndex) => changeData(itemValue,6,index2)}
            >
            <Picker.Item label="What is your farm distance fromwatercourse?" value="" />
            <Picker.Item label="Head" value="0" />
            <Picker.Item label="Middle" value="1" />
            <Picker.Item label="Tail" value="2" />
            </Picker>
        </View> 
        <View style={[styles.border_bottom]} ></View>
    </View>
       
      </View>
      {/* </ScrollView> */}
        
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

export default connect(mapStateToProps,mapDispatchToProps)(form_1);