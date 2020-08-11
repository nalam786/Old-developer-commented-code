import React from 'react';
import { useState } from "react";
import URL from '../../URL';

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
  Picker
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker
} from 'native-base';

import {
  connect
} from 'react-redux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

const form_1 = (props) => {
  const [season, setSelectedValue] = useState("");
  const [data, setData] = React.useState({
    didmount:0,
    farm_name: 'scsdcsdc',
    crop: '',
    sowing_date: new Date(),
    area: '',
    user_id:'',
    season:'',
		map:''
  });

  const textInputChange = (v, no) => {
    
    console.log('value:', v, no);

    switch (no) {

      case 1:
        if (v.length !== 0) {
          data.farm_name = v;
        }
        setData({
          ...data,
          farm_name: v,
        });
        console.log('user_name:', data.farm_name);
        break;

      case 2:
        if (v.length !== 0) {
          data.crop = v;
        }
        setData({
          ...data,
          crop: v,
        });
        console.log('phone_code:', data.crop);
        break;

      case 3:
        if (v.length !== 0) {
          var d = new Date(v);
          var y = d.getFullYear();
          var m = d.getMonth();
          var day = d.getDate();
          var date = '';
          if (day < 10 && m < 10) {
            date = y + '-0' + m + '-0' + day;
          } else {
            if (day < 10) {
              date = y + '-' + m + '-0' + day;
            }
            if (m < 10) {
              date = y + '-0' + m + '-' + day;
            }
          }
          console.log(date);
          data.sowing_date = date;
        }
        setData({
          ...data,
          sowing_date: date,
        });
        console.log('sowing_date:', data.sowing_date);
        break;

      case 4:
        if (v.length !== 0) {
          data.area = v;
        }
        setData({
          ...data,
          area: v,
        });
        console.log('area:', data.area);
        break;

        case 5:
          if (v.length !== 0) {
            data.season = v;
          }
          setData({
            ...data,
            season: v,
          });
          console.log('season:', season);
          break;
    }
  };

  const get_farm = async () => {

    let F_Data = {
      f_id:props.user_ids.update_farm_id,
    };

    console.log("Get Farm API Calling: ", F_Data);

    await fetch(URL.url + 'farms/farms_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Farm Get Successfully') {
         
          setData({
            ...data,
            farm_name:resjson.data[0].farm_name,
            crop:resjson.data[0].crop,
            sowing_date:resjson.data[0].sowing_date,
            area:resjson.data[0].area,
            season:resjson.data[0].season,
            sowing_date:resjson.data[0].sowing_date,
            map:resjson.data[0].f_map,
          });
          console.log(resjson.data[0])
        }
      })
      .catch(err => {
        console.log('failed', err)

      });
  };

  const editform = async () => {

    //get_farms();

    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      date = y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        date = y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        date = y + '-0' + m + '-' + day;
      }
    }
    if (data.farm_name == '' || data.crop == '' || data.sowing_date == '' || data.area == '') {
      alert('Please fill all the fields');
      return false;
    }
    let F_Data={};
    if(props.map_cord.coordinates == undefined){
      alert(23456789)
       F_Data = {
        f_id:props.user_ids.update_farm_id,
        f_farm_name: data.farm_name,
        f_crop: data.crop,
        f_sowing_date: data.sowing_date,
        f_area: data.area,
        f_season: data.season,
        f_map:data.map,
        f_modified_by: props.user_ids.user_id,
        f_modified_at: date
      };
    }else{
       F_Data = {
        f_id:props.user_ids.update_farm_id,
        f_farm_name: data.farm_name,
        f_crop: data.crop,
        f_sowing_date: data.sowing_date,
        f_area: data.area,
        f_season: data.season,
        f_map:props.map_cord.coordinates,
        f_modified_by: props.user_ids.user_id,
        f_modified_at: date
      };
    }
   

    console.log("Create Farms API Calling: ", F_Data);

    await fetch(URL.url + 'farms/farms_update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ F_Data }),
    })
      .then(res => res.json())
      .then((resjson) => {
        if (resjson.Message == 'Farm Successfully Updated') {
          props.nav.navigation.navigate('land_preperation_form_edit')
        }
        alert(resjson.Message);
      })
      .catch(err => {
        console.log('Failed', err)
        alert('Failed' + err)

      });

  }
  
  if (data.didmount == 0) {
    get_farm();
    data.didmount = 1;
    setData({
      ...data,
      didmount: 1
    });

  }
  return (

    <>
      {/* <StatusBar barStyle="dark" /> */}
      <ScrollView style={styles.scrollView}>

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <View style={{ alignSelf: "center", marginTop: 30, width: "95%" }} >
            <TextInput placeholderTextColor="#272626" onChangeText={(val) => textInputChange(val, 1)} value={data.farm_name} placeholder="FARM NAME" style={[styles.input_email]} />
            <TextInput placeholderTextColor="#272626" onChangeText={(val) => textInputChange(val, 2)} value={data.crop} placeholder="CROP" style={[styles.input_email]} />
            <View style={[styles.input_email]} >
              <Picker
                onValueChange={(itemValue, itemIndex) => changeData(itemValue,7)}
                selectedValue={data.season}
              >
                <Picker.Item label="SEASON" value="" />
                <Picker.Item label="Rabi" value="0" />
                <Picker.Item label="Kharif" value="1" />
                <Picker.Item label="Yearly" value="2" />
                <Picker.Item label="Other" value="3" />
              </Picker>
            </View>
            <View style={[styles.input_email, { flexDirection: 'row', justifyContent: 'space-between' }]} >
              <DatePicker
              {
                ...console.log(data.sowing_date)
              }
                defaultDate={new Date(data.sowing_date)}
                // minimumDate={new Date(2018, 1, 1)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={"SOWING DATE "+data.sowing_date}
                textStyle={{ color: "green" }}
                // placeHolderTextStyle={{ color: "#d3d3d3" }}
                // onDateChange={(date) => textInputChange(date,3)}
                onDateChange={(val) => textInputChange(val, 3)}

                disabled={false}

              />
              <Image
                source={require('../../assets/img/calendar.png')}
                style={{ width: '12%', height: '80%', resizeMode: 'stretch', marginRight: 10 }}
              />
            </View>
           
            <View>
              <Button onPress={ ()=> props.nav.navigation.navigate('farm_map') } style={[styles.input_button]} full >
                <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Farm Map</Text>
              </Button>
            </View>

            <TextInput placeholderTextColor="#272626" value={data.area} onChangeText={(val) => textInputChange(val,4)} keyboardType="numeric" placeholder="AREA (ACERS)" style={[styles.input_email]} />
            
            <View>
              <Button onPress={ ()=> props.nav.navigation.navigate('farm_map_edit') } style={[styles.input_button]} full >
                <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Farm Map</Text>
              </Button>
            </View>

          </View>

        </View>
        <View>
          <Button onPress={() => editform()} style={[styles.input_button]} full >
      <Text style={{ color: "white", fontSize: 15, fontWeight: '800' }} >UPDATE</Text>
          </Button>
        </View>

      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({

  input_button: {
    height: 35,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: "center",
    margin: 0
  },

  box: {
    backgroundColor: '#05422b',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

  paragraph: {
    backgroundColor: '#359814',
    fontSize: 8
  },

  header: {
    backgroundColor: '#359814',
    height: 70
  },

  cart: {
    backgroundColor: '#d7f3db',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingVertical: '3%'
  },

  cartbody: {
    paddingLeft: 20,
    paddingRight: 20
  },

  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: "center",
    margin: 0,
    marginTop: 30
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
    marginRight: 5
  },

  input_phone: {
    height: 35,
    width: 230,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  },

  input_email: {
    height: '12%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center'
  },

  input_: {
    height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  },

  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: "flex-start"
  },

  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: "flex-start"
  },

  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%'
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

const mapStateToProps = (state) => {

  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
    map_cord:state.map_redux
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    changeFlag: (data) => {
      dispatch({ type: 'CHANGE_FLAG', payload: data })
    },
    changeSignup: (data) => {
      dispatch({ type: 'SIGNUP_DATA', payload: data })
    },
    user_id: (data) => {
      dispatch({ type: 'USER_ID', payload: data })
    }

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(form_1);