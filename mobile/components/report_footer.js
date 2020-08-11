
import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer } from 'native-base';

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
  TouchableOpacity
} from 'react-native';

const form_footer = (props) => {
  return (
    <>
    
      <View style={[styles.footer]} >

        <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between', }}>
                
          {
            props.form_no == 7 ?
            (
              <View onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box,{backgroundColor:'#359814'}]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box_data]} >  CROP HEALTH</Text>
              </View>
             
            ):(
            
              <View onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('crop_health_form') } style={[styles.footer_box_data]} >  CROP HEALTH</Text>
              </View>
             
            )
          }
          
          {
            props.form_no == 8 ?
            (
          
              <View onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box,{backgroundColor:'#359814'}]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box_data]} >  IRRIGATION SCHEDULE</Text>
              </View>
             
            ):(
            
              <View onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('irrigation_schedule_form') } style={[styles.footer_box_data]} >  IRRIGATION SCHEDULE</Text>
              </View>
             
            )
          }

          {
            props.form_no == 9 ?
            (
           
              <View onPress={ ()=> props.nav.navigation.navigate('expected_yield_form') } style={[styles.footer_box,{backgroundColor:'#359814'}]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('expected_yield_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('expected_yield_form') } style={[styles.footer_box_data]} >  EXPECTED CROP YIELD</Text>
              </View>
             
            ):(
            
              <View onPress={ ()=> props.nav.navigation.navigate('expected_crop_yield_form') } style={[styles.footer_box]} >
                <Text onPress={ ()=> props.nav.navigation.navigate('expected_crop_yield_form') } style={[styles.footer_box_data]} >  فصل کی صحت</Text>
                <Text onPress={ ()=> props.nav.navigation.navigate('expected_crop_yield_form') } style={[styles.footer_box_data]} >  EXPECTED CROP YIELD</Text>
              </View>
            
            )
          }
               
        </View>

      </View>
      
    </>

  );

};

const styles = StyleSheet.create({
  
  footer_box: {
    backgroundColor: '#00432b',
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    margin:1,
    padding:20
  },

  footer_box_data: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
  
});

export default form_footer;
