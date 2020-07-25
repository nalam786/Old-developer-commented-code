
import React from 'react';
import Form_footer from '../components/report_footer';
import Form7 from '../components/form_7';
import URL from '../URL';
import { connect } from 'react-redux';

import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker
} from 'native-base';

import {
  SafeArea_inputView,
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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps' 

const form_7 = (props) => {

  const [data, setData] = React.useState({

    didmount: 0,
    rander_flag: 0,

    farm_id: [],
    crop_height:[],
    distance_between_plants:[],
    crop_leaf_width: [],
    date_of_check: []
    
  });

  

 

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header]} >
          <View style={{flex:2, flexDirection: 'row',justifyContent: 'space-between', }}>

            <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',}} >
              <Image
                source={require('../assets/img/menu.png')}
                style={{width: '30%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
              />
            </View>               
                  
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
        <View style={{ alignSelf: "center", marginTop: 30, }} >
        <View style={{alignSelf:"center" }} >
        <MapView provider={PROVIDER_GOOGLE}  style={{flex: 1}} region={{ latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation />
        <TextInput
              placeholderTextColor="#272626"
              placeholder="NOTE"
              style={[styles.input_email,{height: 80}]}
              onChangeText={(val) => textInputChange(val,1)}
            />
          

        </View>
          
          
          
        {/* <Button onPress={ ()=> signup() } style={[styles.input_button]} full >
          <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >SUBMIT</Text>
        </Button> */}
        </View>

      </View>
      <Form_footer form_no={7} nav={props} />
      </ScrollView>
        
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',

    height: 70,
    // marginTop:50,

  },
  cart: {
    height: 200,
    width: '42%',
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 40,
    backgroundColor: '#d7f3db',
    borderRadius: 25,
  },
  cartbody: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: "center",
    margin: 0,
    marginTop: 30,

  },
  input_phone_code: {
    height: 35,
    width: 65,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    marginRight: 5,

  },
  input_phone: {
    height: 35,
    width: 230,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  input_email: {
    height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
  },
  input_: {
    height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  green_h2: {
    color: '#05422b',
    fontWeight: '400',
    fontSize: 13,
    alignSelf: "center",
    marginTop: 40,
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf: "flex-end",
  },

  scrollView: {
    backgroundColor: Colors.lighter,
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