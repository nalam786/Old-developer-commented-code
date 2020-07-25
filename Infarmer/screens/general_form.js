import React from 'react';
import Form_footer from '../components/form_footer';
import Form1 from '../components/form_1';

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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_1 = (props) =>  {
  console.log(1234);
  console.log(props);
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
            
              <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
                <Form1 nav={props} />
              </View>

            </View>
            
            {/* <Form_footer form_no={1} nav={props} /> */}
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
    paddingRight:20
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
    marginBottom:20
  },

  input_email: {
    height: '12%',
    width:'95%',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    alignSelf:'center'
  },

  input_: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20
  },

  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf:"flex-start",
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
    backgroundColor: Colors.white
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },

  highlight: {
    fontWeight: '700'
  },

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }

});

export default form_1;
