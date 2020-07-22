
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
      <ScrollView style={styles.scrollView}>
      <View style={[styles.header]} >
         <View style={{ flexDirection: 'row',justifyContent: 'space-between', }}>

            <View  >
                  <Image
                  source={require('../assets/img/Infarmer.png')}
                  style={{width: 60, height: 50,resizeMode: 'stretch',marginLeft:10,marginTop:12,}}
                  />
            </View>
            <Text style={{color:"white",fontSize:20,fontWeight:'800',marginTop:30,}} > MANAGE PROFILE</Text>
            
            <View style={{width: 50, height: 50,resizeMode: 'stretch',}}  >
                 
            </View>
        </View>
      </View>
      
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{alignSelf:"center",marginTop:30, }} >
            <View style={{alignSelf:"center",marginBottom:30 }} >
                <Image
                source={require('../assets/img/Infarmer.png')}
                style={{width: 200, height: 160,resizeMode: 'stretch',}}
                />
            </View>
            <TextInput
            placeholderTextColor="#272626"
            placeholder="USER NAME"
            style={[styles.input_email]}
            />
            <View style={{ flexDirection: 'row'}}>
                  <TextInput placeholderTextColor="#272626" placeholder="+92" style={[styles.input_phone_code]} />
                  <TextInput placeholderTextColor="#272626" placeholder="Phone No" style={[styles.input_phone]} />
            </View>
            <TextInput
            placeholderTextColor="#272626"
            placeholder="Email"
            style={[styles.input_email]}
            />
            <TextInput
            placeholderTextColor="#272626"
            placeholder="ENTER NEW PASSWORD"
            style={[styles.input_email]}
            />
            <TextInput
            placeholderTextColor="#272626"
            placeholder="RE-ENTER NEW PASSWORD"
            style={[styles.input_email]}
            />
            <Button style={[styles.input_button,{marginBottom:40,}]} full >
            <Text style={{color:"white",fontSize:15,fontWeight:'800'}} > UPDATE PROFILE</Text>
            </Button>
        </View>
        
      </View>
      </ScrollView>
        
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',

    height:70,
    // marginTop:50,
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
  green_h6: {
    color: 'black',
    fontSize: 13,
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
