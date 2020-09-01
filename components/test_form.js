import React from 'react';
import {useState} from 'react';
import {Circle, Triangle} from 'react-native-shape';
import {
  Container,
  Content,
  Button,
  Footer,
  DatePicker,
  Radio,
} from 'native-base';
import Form_footer from './form_footer';
import {connect} from 'react-redux';

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

const form_1 = props => {
  const changeData = (value, s_key, index) => {
    props.changeFlag({flag: 1, s_key: s_key, index: index, value: value});
  };
  const removeData = (value, s_key, index) => {
    props.changeFlag({flag: 2, s_key: s_key, index: index2, value: value});
  };

  const {select_input, date_input, text_input, radio_input, index2} = props;

  const setDate = (value, s_key, index) => {
    var d = new Date(value);
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
    props.changeFlag({flag: 1, s_key: s_key, index: index, value: date});
    // alert(newDate)
  };
  console.log('==============start================');

  console.log(props.text_input);
  console.log(props.index2);
  // console.log(props.select_input)
  console.log('==============end================');

  // alert(props.select_input[index2].select_input)
  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      {/* <ScrollView style={styles.scrollView}> */}

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{alignSelf: 'center', marginTop: 30, width: '95%'}}>
          <View
            style={[
              {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                marginBottom: 40,
                color: 'green',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Form:{props.index}{' '}
            </Text>
            <Text
              onPress={() => removeData(2, 100, props.index2)}
              style={{
                marginBottom: 40,
                color: 'green',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              X{' '}
            </Text>
          </View>

          <Text>How You Prepared Field For Irrigation</Text>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
            <View
              style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
              {/* <View  onPress={(val) => changeData(val,5,index2)} > */}
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={
                  'prepare_for_irrigation_1' ==
                  props.radio_input[props.index2].radio_input
                }
                onValueChange={val =>
                  changeData('prepare_for_irrigation_1', 100, props.index2)
                }
                // checked={true}
                // onValueChange={() => this.setState({radioButton: 'value1'})}
              />
              {/* </View> */}
              <Text style={{alignSelf: 'center'}}>Forrow Irrigation</Text>
            </View>
            <View
              style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={
                  'prepare_for_irrigation_2' ==
                  props.radio_input[props.index2].radio_input
                }
                onValueChange={val =>
                  changeData('prepare_for_irrigation_2', 100, props.index2)
                }
              />
              <Text style={{alignSelf: 'center'}}>Basian Irrigation</Text>
            </View>
            <View
              style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={
                  'prepare_for_irrigation_3' ==
                  props.radio_input[props.index2].radio_input
                }
                onValueChange={val =>
                  changeData('prepare_for_irrigation_3', 100, props.index2)
                }
              />
              <Text style={{alignSelf: 'center'}}>Both</Text>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 2, props.index2)
              }
              selectedValue={props.select_input[props.index2].select_input}>
              <Picker.Item label="TYPE OF SOIL" value="" />
              <Picker.Item label="Sandy soil" value="0" />
              <Picker.Item label="Clay" value="1" />
              <Picker.Item label="Loam" value="2" />
              <Picker.Item label="Sandy loam" value="3" />
              <Picker.Item label="Clayey loam" value="4" />
            </Picker>
          </View>

          <View
            style={[
              styles.border_bottom,
              {borderBottomWidth: 1, borderBottomColor: 'gray'},
            ]}
          />

          <View
            style={[
              styles.input_email,
              {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <DatePicker
              defaultDate={props.date_input[props.index2].date_input}
              // minimumDate={new Date(2018, 1, 1)}
              // maximumDate={new Date(2018, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Date apply first irrigation"
              textStyle={{color: 'green'}}
              // placeHolderTextStyle={{ color: "#d3d3d3" }}
              // onChangeText={(t) => this.changeData(t,4,index2)}
              onDateChange={val => setDate(val, 4, props.index2)}
              // onDateChange={(t) => this.changeData(t,4,index2)}
              disabled={false}
            />
            <Image
              source={require('../assets/img/calendar.png')}
              style={{
                width: '12%',
                height: '80%',
                resizeMode: 'stretch',
                marginRight: 10,
              }}
            />
          </View>
          <TextInput
            placeholderTextColor="#272626"
            value={props.text_input[props.index2].text_input}
            onChangeText={val => changeData(val, 5, props.index2)}
            placeholder="Area (ACERS)"
            style={[styles.input_email]}
          />

          <View style={[styles.border_bottom]} />
        </View>
      </View>
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  input_email: {
    // height: '12%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
  },
  border_bottom: {
    height: '1%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    // borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    flag: state.flag,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFlag: data => {
      dispatch({type: 'CHANGE_FLAG', payload: data});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(form_1);
