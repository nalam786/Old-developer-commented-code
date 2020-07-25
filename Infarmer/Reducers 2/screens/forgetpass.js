
import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button } from 'native-base';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  Linking,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const forgetpass = (props) =>  {
  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={[styles.triangleCorner]} />
        <View style={{alignSelf:"center" }} >
        <Text style={[styles.green_h3]}>FORGET </Text>
        <Text style={[styles.green_h2]}> PASSEORD</Text>
        <Text style={[styles.green_h6_1]}>Pleas Enter Your Mobile No or Email </Text>
        <Text style={[styles.green_h6]}>اپنا موباءل نمبر یا ای میل درج کریں  </Text>
        <View style={{ flexDirection: 'row'}}>
              <TextInput placeholderTextColor="#272626" placeholder="+92" style={[styles.input_phone_code]} />
              <TextInput placeholderTextColor="#272626" placeholder="Phone No" style={[styles.input_phone]} />
        </View>
           <Text style={[styles.green_h6_2]}>OR </Text>

        <TextInput
        placeholderTextColor="#272626"
        secureTextEntry={true}
        placeholder="Email"
        style={[styles.input_]}
        />
        </View>
        <Button onPress={ ()=> props.navigation.navigate('opt') } style={[styles.input_button]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >RESET PASSEORD </Text>
        </Button>
        <Text onPress={ ()=> props.navigation.navigate('signin')} style={[styles.green_h6,{marginTop:20}]}>Don't have an account? Signin from hear </Text>
        
        <View style={[styles.triangleCorner_bottom]} rotate={270} />
      </View>
      
        
    </>
  );
};

const styles = StyleSheet.create({
  input_button: {
    height: 40,
    width:300,
    backgroundColor:'#05422b',
    color:'red',
    alignSelf:"center",
    margin:0,

  },
  input_phone_code: {
    height: 35,
    width:50,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    marginRight:20,
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
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
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
  green_h2: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf:"center",
    marginBottom:50,
  },
  green_h3: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf:"center",
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf:"center",
    marginBottom:30,

  },
  green_h6_1: {
    color: 'black',
    fontSize: 15,
    alignSelf:"center",
    marginTop:5,
    // marginBottom:30,



  },
  green_h6_2: {
    color: 'black',
    fontSize: 20,
    alignSelf:"center",
    marginTop:5,
    // marginBottom:30,



  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 130,
    borderTopWidth: 130,
    borderRightColor: 'transparent',
    borderTopColor: '#359814'
  },
  triangleCorner_bottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 130,
    borderBottomWidth: 130,
    borderLeftColor: 'transparent',
    borderBottomColor: '#359814',
    alignSelf:"flex-end",
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

export default forgetpass;
