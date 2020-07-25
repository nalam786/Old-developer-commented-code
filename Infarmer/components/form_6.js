
import React,{useState} from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker } from 'native-base';
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
  CheckBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const form_1 = (props) => {
  const [isSelected, setSelection] = useState(false);
  const changeData = (value, s_key,index) =>{
    props.changeFlag({flag:1,s_key:s_key,index:index,value:value})
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
            alert(date)
            props.changeFlag({flag:1,s_key:s_key,index:index,value:date})
    // alert(newDate)
  }
  const {crop_area,crop_yield,date_of_harvisting,additional_info,index2 } =props; 
  console.log(props.crop_area)
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
        <Text style={{marginBottom:40,color:'green',fontSize:25,fontWeight:'bold', }} >Form:{props.index} </Text>
        <TextInput placeholderTextColor="#272626" onChangeText={(val) => changeData(val,25,index2)} value={props.crop_area[index2].crop_area} placeholder="Crop/ harvesting area" style={[styles.input_email]} />
        <TextInput placeholderTextColor="#272626" onChangeText={(val) => changeData(val,26,index2)} value={props.crop_yield[index2].crop_yield} placeholder="Crop yield (kg)" style={[styles.input_email]} />
        
        <Text>Crop quality</Text>
              
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Best</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Medium</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Poor</Text>
              </View>
              
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Other</Text>
              </View>
              <View style={{ flexDirection: 'row',alignSelf:"flex-start",flex:1,marginTop:15 }} >
                <View style={{flex:1, }} >                
                      <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                       style={{alignSelf:"center",borderRadius:50, }} />
                </View>
                <Text style={{alignSelf:"center",flex:1, }} >Do not know</Text>
              </View>
            
        <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between'}]} >
            <DatePicker
            defaultDate={new Date(props.date_of_harvisting[index2].date_of_harvisting)}
                  // defaultDate={new Date(2018, 4, 4)}
                  // minimumDate={new Date(2018, 1, 1)}
                  // maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={"Date of harvest"+props.date_of_harvisting[index2].date_of_harvisting}
                  textStyle={{ color: "green" }}
                  // placeHolderTextStyle={{ color: "#d3d3d3" }}
                  // onDateChange={this.setDate}
                  onDateChange={(val) => setDate(val,28,index2)}
                  disabled={false}
                  
                  />
                  <Image
                  source={require('../assets/img/calendar.png')}
                  style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
                  />
        </View>

        <TextInput placeholderTextColor="#272626" onChangeText={(val) => changeData(val,29,index2)} value={props.additional_info[index2].additional_info} placeholder="Additional information" style={[styles.input_email]} />

        
        


        </View>
        
        
        
        
        
      </View>
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