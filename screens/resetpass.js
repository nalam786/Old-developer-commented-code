//Reset Password Screen

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

const App: () => React$Node = () => {
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
        <Text style={[styles.green_h3]}>RESET </Text>
        <Text style={[styles.green_h2]}> Password</Text>
        <TextInput
        placeholderTextColor="#272626"
        placeholder="Current Password"
        style={[styles.input_email]}
        />
        <TextInput
        placeholderTextColor="#272626"
        secureTextEntry={true}
        placeholder="New Password"
        style={[styles.input_]}
        />
        </View>
        <Button onPress={ ()=> props.navigation.navigate('forgetpass') } style={[styles.input_button]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >RESET Password </Text>
        </Button>
        <Text style={[styles.green_h6]}>Don't have an account? Signin from hear </Text>
        
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

export default App;
