//Create Irrigation Component
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

const form_3 = props => {
  // console.log(props);

  // const [isSelected, setSelection] = useState(false);

  const changeData = (value, s_key, index) => {

    props.changeFlag({
      flag: 'irrigation_create',
      s_key: s_key,
      index: index,
      value: value,
    });
  };

  const removeData = (value, s_key, index) => {
    props.changeFlag({
      flag: 'irrigation_delete',
      s_key: s_key,
      index: index2,
      value: value,
    });
  };
  const focus = () => {
    props.changeFlag({
      flag: 'irrigation_hide/show_footer',
      s_key: '',
      index: '',
      value: 'hide',
    });
    // alert(23456789)
  };
  const blur = () => {
    props.changeFlag({
      flag: 'irrigation_hide/show_footer',
      s_key: '',
      index: '',
      value: 'show',
    });
    // alert(23456789)
  };
  // console.log(props.f_water_source);

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

    props.changeFlag({
      flag: 'irrigation_create',
      s_key: s_key,
      index: index,
      value: date,
    });
  };

  const {
    f_water_source,
    f_flow_water_source,
    f_bore_depth,
    f_type_water_source,
    f_ground_water_use,
    f_water_depth,
    f_water_width,
    f_bed_level_water_width,
    f_vegetation,
    f_canal_application,
    f_irrigation_date,
    f_tube_well_size,
    f_ground_water_depth,
    f_water_quality,
    f_date_round_water_irrigation,
    index2,
  } = props;

  // console.log(props.water_source);

  return (
    <>
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

          <Text style={styles.q_text}>Water source </Text>
          <Text style={styles.q_text}>فصل کو پانی کا ذریعہ</Text>

          <View style={{flexDirection: 'row', flex: 1, marginTop: 15}}>
            <View>
              <CheckBox
                style={{borderRadius: 50}}
                value={0 == props.f_water_source[index2].water_source}
                onValueChange={val => changeData(0, 1, index2)}
              />
            </View>
            <Text style={{flex: 1}}>Canal water (نہری)</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flex: 1,
              marginTop: 15,
            }}>
            <View>
              <CheckBox
                style={{borderRadius: 50}}
                value={1 == props.f_water_source[index2].water_source}
                onValueChange={val => changeData(1, 1, index2)}
              />
            </View>
            <Text>Tube-well (ٹیوب ویل)</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flex: 1,
              marginTop: 15,
            }}>
            <View>
              <CheckBox
                style={{borderRadius: 50}}
                value={2 == props.f_water_source[index2].water_source}
                onValueChange={val => changeData(2, 1, index2)}
              />
            </View>
            <Text>Both (دونوں)</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              flex: 1,
              marginTop: 15,
            }}>
            <View>
              <CheckBox
                style={{borderRadius: 50}}
                value={3 == props.f_water_source[index2].water_source}
                onValueChange={val => changeData(3, 1, index2)}
              />
            </View>
            <Text style={{alignSelf: 'center', flex: 1}}>Other (دیگر)</Text>
          </View>

          {props.f_water_source[index2].water_source == 0 ? (
            <View>
              <View style={[styles.border_bottom]} />
              <View>
                <Text style={styles.q_text}>
                  Application of canal water (time in minutes)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  نہری پانی کا استعمال (وقت منٹوں میں)
                </Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 10, index2)}
                value={props.f_canal_application[index2].canal_application}
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email, {height: '5%', paddingTop: 20}]}
              />
              <View>
                <Text style={styles.q_text}>
                  Date of canal-based irrigation
                </Text>
                <Text style={styles.q_text}>تاریخ (نہری پانی لگانےکی)</Text>
              </View>

              <View
                style={[
                  styles.input_email,
                  {
                    height: '10%',
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray',
                  },
                ]}>
                <DatePicker
                  // defaultDate={f_irrigation_date[index2].irrigation_date}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: '#fff'}}
                  onDateChange={val => setDate(val, 11, props.index2)}
                  disabled={false}
                />
                <Image
                  source={require('../assets/img/calendar.png')}
                  style={{
                    width: '12%',
                    height: '80%',
                    marginTop: 4,
                    resizeMode: 'stretch',
                    marginRight: 10,
                  }}
                />
              </View>
              <View style={[styles.border_bottom]} />

              <View style={{marginBottom: 200}} />
            </View>
          ) : props.f_water_source[index2].water_source == 1 ? (
            <View style={{marginTop: 30}}>
              <View>
                <Text style={styles.q_text}>
                  Groundwater use (time in minutes)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  زمینی پانی کا استعمال وقت (منٹوں میں)
                </Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 5, index2)}
                value={props.f_ground_water_use[index2].ground_water_use}
                placeholder=""
                style={[styles.input_email, {height: '5%', marginBottom: 10}]}
              />
              {/* <View style={[styles.border_bottom]} ></View> */}
              <View>
                <Text style={styles.q_text}>Date groundwater application</Text>
                <Text style={styles.q_text}> تاریخ زمینی پانی لگانے کی</Text>
              </View>
              {/* <View style={[styles.border_bottom]} ></View> */}
              <View
                style={[
                  styles.input_email,
                  {
                    height: '15%',
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray',
                    marginBottom: 100,
                  },
                ]}>
                <DatePicker
                  // defaultDate={
                  //   f_date_round_water_irrigation[index2]
                  //     .date_round_water_irrigation
                  // }
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: '#fff'}}
                  onDateChange={val => setDate(val, 15, props.index2)}
                  disabled={false}
                />
                <Image
                  source={require('../assets/img/calendar.png')}
                  style={{
                    width: '12%',
                    height: '80%',
                    marginTop: 4,
                    resizeMode: 'stretch',
                    marginRight: 10,
                  }}
                />
              </View>
            </View>
          ) : props.f_water_source[index2].water_source == 2 ? (
            <View style={{marginTop: 30}}>
              <View style={[styles.border_bottom]} />
              <View>
                <Text style={styles.q_text}>
                  Application of canal water (time in minutes)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  نہری پانی کا استعمال (وقت منٹوں میں)
                </Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 10, index2)}
                value={props.f_canal_application[index2].canal_application}
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email, {height: '5%', paddingTop: 20}]}
              />
              <View>
                <Text style={styles.q_text}>
                  Date of canal-based irrigation
                </Text>
                <Text style={styles.q_text}>تاریخ (نہری پانی لگانےکی)</Text>
              </View>

              <View
                style={[
                  styles.input_email,
                  {
                    height: '10%',
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray',
                  },
                ]}>
                <DatePicker
                  // defaultDate={f_irrigation_date[index2].irrigation_date}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: '#fff'}}
                  onDateChange={val => setDate(val, 11, props.index2)}
                  disabled={false}
                />
                <Image
                  source={require('../assets/img/calendar.png')}
                  style={{
                    width: '12%',
                    height: '80%',
                    marginTop: 4,
                    resizeMode: 'stretch',
                    marginRight: 10,
                  }}
                />
              </View>

              <View>
                <Text style={styles.q_text}>
                  Groundwater use (time in minutes)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  زمینی پانی کا استعمال وقت (منٹوں میں)
                </Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 5, index2)}
                value={props.f_ground_water_use[index2].ground_water_use}
                placeholder=""
                style={[styles.input_email, {height: '5%', marginBottom: 10}]}
              />
              {/* <View style={[styles.border_bottom]} ></View> */}
              <View>
                <Text style={styles.q_text}>Date groundwater application</Text>
                <Text style={styles.q_text}> تاریخ زمینی پانی لگانے کی</Text>
              </View>
              {/* <View style={[styles.border_bottom]} ></View> */}
              <View
                style={[
                  styles.input_email,
                  {
                    height: '10%',
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray',
                    marginBottom: 100,
                  },
                ]}>
                <DatePicker
                  // defaultDate={
                  //   f_date_round_water_irrigation[index2]
                  //     .date_round_water_irrigation
                  // }
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: '#fff'}}
                  onDateChange={val => setDate(val, 15, props.index2)}
                  disabled={false}
                />
                <Image
                  source={require('../assets/img/calendar.png')}
                  style={{
                    width: '12%',
                    height: '80%',
                    marginTop: 4,
                    resizeMode: 'stretch',
                    marginRight: 10,
                  }}
                />
              </View>
            </View>
          ) : (
            <View>
              <Text>Other</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#05422b',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paragraph: {
    backgroundColor: '#359814',
    fontSize: 8,
  },

  header: {
    backgroundColor: '#359814',
    height: 70,
  },

  cart: {
    backgroundColor: '#d7f3db',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    // paddingTop:'3%',
    paddingVertical: '3%',
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
    alignSelf: 'center',
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
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
    height: '2%',
    padding: 0,
  },

  border_bottom: {
    height: '1%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
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
  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'flex-start',
    // marginTop:50,
  },
  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: 'flex-start',
  },

  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
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
  q_text: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
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
)(form_3);
