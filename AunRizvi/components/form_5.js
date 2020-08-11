import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer,DatePicker } from 'native-base';
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

const form_5 = (props) =>  {

  console.log(props);

  // const [isSelected, setSelection] = useState(false);

  // const [data, setData] = React.useState({
  //   removal_of_herbs: '',
  //   seed_variety:'',
  //   qty_per_acre: '',
  //   sowing_date:new Date(),
  // });

  const changeData = (value, s_key,index) =>{
    props.changeFlag({flag:'seed_create',s_key:s_key,index:index,value:value})
  };
  const removeData = (value, s_key,index) =>{
    props.changeFlag({flag:'seed_delete',s_key:s_key,index:index2,value:value})
  };
  const focus =() =>{
    props.changeFlag({flag:"seed_hide/show_footer",s_key:'',index:'',value:'hide'})
    // alert(23456789)
  }
  const blur =() =>{
    props.changeFlag({flag:"seed_hide/show_footer",s_key:'',index:'',value:'show'})
    // alert(23456789)
  }
  console.log(props.f_removal_of_herbs);

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

    props.changeFlag({flag:'seed_create',s_key:s_key,index:index,value:date});

  };
  
  const {
    f_removal_of_herbs, 
    f_seed_variety,
    f_qty_per_acre,
    f_sowing_data,
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
          
          <Text>Removal of Herbs جڑی بوٹیوں کی تلفی</Text>
          
          <View style={{ flexDirection: 'row',alignSelf:"center",marginTop:30, }}>
          
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={1==props.f_removal_of_herbs[index2].removal_of_herbs}
                onValueChange={(val) => changeData(1,1,index2)}
              />
              <Text style={{alignSelf:"center", }} >By Hand ہاتھ سے</Text>
            </View>

            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >         
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={2==props.f_removal_of_herbs[index2].removal_of_herbs}
                onValueChange={(val) => changeData(2,1,index2)}
              />
              <Text style={{alignSelf:"center" }} >Hoeing گوڈی</Text>           
            </View>
            
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={3==props.f_removal_of_herbs[index2].removal_of_herbs}
                onValueChange={(val) => changeData(3,1,index2)}
              />
              <Text style={{alignSelf:"center" }} >Chemical زرعی زہر کا استعمال</Text>
            </View>

            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={4==props.f_removal_of_herbs[index2].removal_of_herbs}
                onValueChange={(val) => changeData(4,1,index2)}
              />
              <Text style={{alignSelf:"center" }} >None کوئی نہیں</Text>
            </View>
          
          </View>
          
          <View style={{marginTop:20,}} > 

          <TextInput placeholderTextColor="#272626"  onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,2,index2)} value={props.f_seed_variety[index2].seed_variety} placeholder="Seed Varietyبیج ورائٹی" style={[styles.input_email]} />
          
          <TextInput placeholderTextColor="#272626" onFocus={() => focus()} onBlur={() => blur()} onChangeText={(val) => changeData(val,3,index2)} value={props.f_qty_per_acre[index2].qty_per_acre} keyboardType="numeric" placeholder="Quantity per acre مقدار فی ایکڑ" style={[styles.input_email]} />

          <View style={[styles.input_email,{marginTop:20,flexDirection:'row',justifyContent:'space-between',backgroundColor:'gray'}]} >
              <DatePicker
              defaultDate={new Date(props.f_sowing_date[index2].sowing_date)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={"Date (sowing) تاریخ (بیج کی بوائی)"+props.f_sowing_date[index2].sowing_date}
                    textStyle={{ color: "green" }}
                    onDateChange={(val) => setDate(val,4,index2)}
                    disabled={false}
              />
              <Image
                    source={require('../assets/img/calendar.png')}
                    style={{width: '12%', height:'80%',resizeMode: 'stretch',marginRight:10}}
              />
          </View>

        </View>

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
    marginBottom:20
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

export default connect(mapStateToProps,mapDispatchToProps)(form_5);