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
import dateParser from '../Utils/Parser';

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
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState('itemTwo');
  const [season, setSelectedValue] = useState('');

  const [data, setData] = React.useState({
    sole_type: '',
    crop: '',
    sowing_date: new Date(),
    area: 0,
  });

  const changeData = (value, s_key, index) => {
    props.changeFlag({flag: 1, s_key: s_key, index: index, value: value});
  };
  const removeData = (value, s_key, index) => {
    props.changeFlag({flag: 2, s_key: s_key, index: index2, value: value});
  };

  const {
    f_prepared_field_irrigation,
    f_soil_type,
    f_laser_levelled,
    f_levelled_date,
    f_first_irrigation,
    f_irrigation_frequency,
    f_farm_distance_watercourse,
    index2,
  } = props;

  // console.log(props.f_first_irrigation);

  const setDate = (value, s_key, index) => {
    var d = new Date(value);
    var y = d.getFullYear();
    var m = Number(d.getMonth()) + 1;
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
  };

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
          <View style={{marginTop: 20, height: '5%'}}>
            <Text style={styles.q_text}>Soil type (مٹی کی قسم)</Text>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 2, props.index2)
              }
              selectedValue={props.f_soil_type[index2].soil_type}>
              <Picker.Item label="Sandy soil ( مٹی)" value="0" />
              <Picker.Item label="Clay  (چکنی مٹی)" value="1" />
              <Picker.Item label="Loam (میرا)" value="2" />
              <Picker.Item label="Sandy loam (ریتیلی میرا)" value="3" />
              <Picker.Item label="Clayey loam (چکنی میرا)" value="4" />
            </Picker>
          </View>
          <Text style={[styles.q_text, {marginTop: 25}]}>Weed Eradication</Text>
          <Text style={styles.q_text}>(جڑی بوٹیوں کی تلفی)</Text>
          <View style={{flexDirection: 'column', marginTop: 30}}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={1 == props.f_weed_eradication[index2].weed_eradication}
                onValueChange={val => changeData(1, 12, index2)}
              />
              <Text style={{alignSelf: 'center'}}>By hand (اتھ سے)</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={2 == props.f_weed_eradication[index2].weed_eradication}
                onValueChange={val => changeData(2, 12, index2)}
              />
              <Text style={{alignSelf: 'center'}}>Hoeing (گوڈی)</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={3 == props.f_weed_eradication[index2].weed_eradication}
                onValueChange={val => changeData(3, 12, index2)}
              />
              <Text style={{alignSelf: 'center'}}>
                Chemical (زرعی زہر کا استعمال)
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={4 == props.f_weed_eradication[index2].weed_eradication}
                onValueChange={val => changeData(4, 12, index2)}
              />
              <Text style={{alignSelf: 'center'}}>None (کوئ نہیں)</Text>
            </View>
          </View>
          {/* <Text style={[styles.q_text, {marginTop: 25}]}>
            Field Preparation
          </Text>
          <Text style={styles.q_text}>(طریقہ کاشت)</Text>
          <View style={{flexDirection: 'column', marginTop: 30}}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={
                  1 == props.prepared_field_irrigation[index2].field_preparation
                }
                onValueChange={val => changeData(1, 13, index2)}
              />
              <Text style={{alignSelf: 'center'}}>
                Furrow Irrigation (کھیلیوں/ پٹڑیوں)
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={
                  2 == props.prepared_field_irrigation[index2].field_preparation
                }
                onValueChange={val => changeData(2, 13, index2)}
              />
              <Text style={{alignSelf: 'center'}}>
                Basin Irrigation (ڈرل کاشت)
              </Text>
            </View>
          </View> */}
          <View style={[styles.border_bottom]} />
          {/* <View style={{alignSelf: 'center', marginTop: 10, width: '95%'}}>
            <Text style={styles.q_text}>Is your field laser levelled?</Text>
            <Text style={styles.q_text}>
              کیا آپ کا فارم لیزر کے ساتھ لیول ھے؟
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 30,
              }}>
              <View
                style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
                <CheckBox
                  style={{alignSelf: 'center', borderRadius: 50}}
                  value={0 == props.f_laser_levelled[index2].laser_levelled}
                  onValueChange={val => changeData(0, 3, index2)}
                />
                <Text style={{alignSelf: 'center'}}>YES (جی ہاں)</Text>
              </View>

              <View
                style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
                <CheckBox
                  style={{alignSelf: 'center', borderRadius: 50}}
                  value={1 == props.f_laser_levelled[index2].laser_levelled}
                  onValueChange={val => changeData(1, 3, index2)}
                />
                <Text style={{alignSelf: 'center'}}>NO (نہیں)</Text>
              </View>
            </View>
          </View> */}
          {/* {props.f_laser_levelled[index2].laser_levelled == 0 ? (
            <View>
              <View style={{marginTop: 30}}>
                <Text style={styles.q_text}>
                  Date when you levelled your field/farm?
                </Text>
                <Text style={styles.q_text}>
                  آپ نے کب اپنا فارم لیزر کے ساتھ لیول کیا تھا؟
                </Text>
              </View>
              <View
                style={[
                  styles.input_email,
                  {
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray',
                  },
                ]}>
                <DatePicker
                  style={{backgroundColor: 'red'}}
                  defaultDate={props.f_levelled_date[index2].levelled_date}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText=""
                  textStyle={{color: '#fff'}}
                  onDateChange={val => setDate(val, 4, props.index2)}
                  disabled={false}
                />
                <Image
                  source={require('../../assets/img/calendar.png')}
                  style={{
                    width: '12%',
                    height: '80%',
                    resizeMode: 'stretch',
                    marginRight: 10,
                  }}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
          <View style={{alignSelf: 'center', marginTop: 10, width: '95%'}}>
            <Text style={styles.q_text}>
              Do you know discharge of your water course?
            </Text>
            <Text style={styles.q_text}>
              کیا آپ اپنے کھالے کا بہاؤ جانتے ہیں؟
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 30,
              }}>
              <View
                style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
                <CheckBox
                  style={{alignSelf: 'center', borderRadius: 50}}
                  value={
                    0 ==
                    props.f_watercourse_discharge[index2].watercourse_discharge
                  }
                  onValueChange={val => changeData(0, 9, index2)}
                />
                <Text style={{alignSelf: 'center'}}>YES (جی ہاں)</Text>
              </View>

              <View
                style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
                <CheckBox
                  style={{alignSelf: 'center', borderRadius: 50}}
                  value={
                    1 ==
                    props.f_watercourse_discharge[index2].watercourse_discharge
                  }
                  onValueChange={val => changeData(1, 9, index2)}
                />
                <Text style={{alignSelf: 'center'}}>NO (نہیں)</Text>
              </View>
            </View>
          </View>

          {props.f_watercourse_discharge[index2].watercourse_discharge == 0 ? (
            <View>
              <View>
                <Text style={styles.q_text}>Flow of water course?</Text>
                <Text style={styles.q_text}>(نہری کھالے کا بہاؤ (کیوسک)</Text>
              </View>
              <TextInput
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 14, index2)}
                value={props.f_flow_watercourse[index2].flow_watercourse}
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email]}
              />
            </View>
          ) : (
            <View>
              <View>
                <Text style={styles.q_text}>Type/Lining of water course</Text>
                <Text style={styles.q_text}>نہری کھالےکی قسم/لائننگ</Text>
              </View>
              <View style={{marginTop: 20, height: '1.5%'}}>
                <Picker
                  onValueChange={(itemValue, itemIndex) =>
                    changeData(itemValue, 4, index2)
                  }
                  selectedValue={
                    props.f_watercourse_discharge[index2].watercourse_discharge
                  }>
                  <Picker.Item label="Earthen مٹی" value="0" />
                  <Picker.Item label="Brick lined اینٹوں کی پرت" value="1" />
                  <Picker.Item label="Concrete lined کنکریٹ" value="2" />
                  <Picker.Item label="Other دیگر" value="3" />
                  <Picker.Item label="Not Known معلوم نہیں" value="4" />
                </Picker>
              </View>
              <View style={[styles.border_bottom]} />
              <View>
                <Text style={styles.q_text}>
                  Depth of water in water course (feet)
                </Text>
                <Text style={styles.q_text}>
                  نہری کھالے میں پانی کی گہرائی (فیٹ)
                </Text>
              </View>
              <TextInput
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 15, index2)}
                value={props.f_depth_water_course[index2].depth_water_course}
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email]}
              />

              <View>
                <Text style={styles.q_text}>
                  Width of water course at water level (feet)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  نہری کھالےکی چوڑائی پانی کی سطح پر (فیٹ)
                </Text>
              </View>
              <TextInput
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 16, index2)}
                value={
                  props.f_width_watercourse_water[index2]
                    .width_watercourse_water
                }
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email]}
              />
              <View>
                <Text style={styles.q_text}>
                  Width of water course at bed Level (feet)
                </Text>
                <Text style={styles.q_text}>
                  {' '}
                  نہری کھالےکی چوڑا ئی کھالےکی تہ میں (فیٹ)
                </Text>
              </View>
              <TextInput
                placeholderTextColor="#272626"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onChangeText={val => changeData(val, 8, index2)}
                value={
                  props.f_watercourse_discharge[index2].watercourse_discharge
                }
                placeholder=""
                keyboardType="numeric"
                style={[styles.input_email]}
              />
              <View>
                <Text style={styles.q_text}>Vegetation in water course</Text>
                <Text style={styles.q_text}>
                  {' '}
                  نہری کھالےمیں گھاس/جڑی بوٹیوں کی تعداد
                </Text>
              </View>
              <View style={{marginTop: 20, height: '1.5%'}}>
                <Picker
                  onValueChange={(itemValue, itemIndex) =>
                    changeData(itemValue, 22, index2)
                  }
                  selectedValue={props.f_vegetation[index2].vegetation}>
                  <Picker.Item label="Very Low بہت کم" value="0" />
                  <Picker.Item label="Low کم " value="1" />
                  <Picker.Item label="Medium میڈیم" value="2" />
                  <Picker.Item label="High بہت اونچی" value="3" />
                  <Picker.Item label="Very High بہت زیادہ اونچی" value="4" />
                  <Picker.Item label="None کوئی نہیں" value="5" />
                  <Picker.Item label="Don't Know معلوم نہیں" value="6" />
                </Picker>
              </View>
            </View>
          )}
          {/* //////} */}
          {/* <View style={{marginTop: 20}}>
            <Text style={styles.q_text}>
              How far is the farm from the outlet of water course
            </Text>
            <Text style={styles.q_text}>(فارم موگے سے کتنے فاصلہ پر ہے؟)</Text>
            <Picker
              selectedValue={props.f_far_from_outlet[index2].far_from_outlet}
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 17, index2)
              }>
              <Picker.Item label="Head (ھیڈ)" value="0" />
              <Picker.Item label="Middle (درميان)" value="1" />
              <Picker.Item label="Tail (ٹيل)" value="2" />
            </Picker>
          </View> */}
          {/* <View>
            <Text style={styles.q_text}>Tubewell size ?</Text>
            <Text style={styles.q_text}>ٹیوب ویل کا سائز</Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 11, index2)}
            value={props.f_tubewellsize[index2].tubewellsize}
            placeholder=""
            keyboardType="numeric"
            style={[styles.input_email]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <View
              style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={0 == props.f_tubewellsize[index2].tubewellsize}
                onValueChange={val => changeData(0, 11, index2)}
              />
              <Text style={{alignSelf: 'center'}}>Cusecs ( کیوسک)</Text>
            </View>

            <View
              style={{flexDirection: 'column', alignSelf: 'center', flex: 1}}>
              <CheckBox
                style={{alignSelf: 'center', borderRadius: 50}}
                value={1 == props.f_tubewellsize[index2].tubewellsize}
                onValueChange={val => changeData(1, 11, index2)}
              />
              <Text style={{alignSelf: 'center'}}>HP (ہارس پاور)</Text>
            </View>
          </View>
          <View>
            <Text style={styles.q_text}>bore depth of tube well(feet)?</Text>
            <Text style={styles.q_text}>ٹیوب ویل کے بور کی گہرائی (فیٹ)</Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 18, index2)}
            value={props.f_bore_depth[index2].bore_depth}
            placeholder=""
            keyboardType="numeric"
            style={[styles.input_email]}
          />
          <View>
            <Text style={styles.q_text}>Ground water depth(feet)?</Text>
            <Text style={styles.q_text}>ذمینی پانی کی گہرائی (فیٹ)</Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 19, index2)}
            value={props.f_ground_water_depth[index2].ground_water_depth}
            placeholder=""
            keyboardType="numeric"
            style={[styles.input_email]}
          />
          <View>
            <Text style={styles.q_text}>Groundwater quality</Text>
            <Text style={styles.q_text}>زمینی پانی کا معیار</Text>
          </View>
          <View>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 10, index2)
              }
              selectedValue={
                props.f_ground_water_quality[index2].ground_water_quality
              }>
              <Picker.Item label="Sweet (میٹھا)" value="0" />
              <Picker.Item label="Brackish   (کھارا)" value="1" />
              <Picker.Item label="Saline (نمکین)" value="2" />
              <Picker.Item label="Other (دیگر)" value="3" />
              <Picker.Item label="Don't Know (معلوم نہیں)" value="4" />
            </Picker>
            <View style={[styles.border_bottom]} />
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.q_text}>Date of first irrigation to farm?</Text>
            <Text style={styles.q_text}> آپ نے پہلا پانی کب لگایا؟</Text>
          </View>
          <View
            style={[
              styles.input_email,
              {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'gray',
              },
            ]}>
            <DatePicker
              defaultDate={props.f_first_irrigation[index2].first_irrigation}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText=""
              textStyle={{color: '#fff'}}
              onDateChange={val => setDate(val, 5, props.index2)}
              disabled={false}
            />
            <Image
              source={require('../../assets/img/calendar.png')}
              style={{
                width: '12%',
                height: '80%',
                resizeMode: 'stretch',
                marginRight: 10,
              }}
            />
          </View>
          <View>
            <Text style={styles.q_text}>
              Allocated time of canal water (minutes)
            </Text>
            <Text style={styles.q_text}>
              وارہ بندی کا مختص وقت (منٹوں میں)؟
            </Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 20, index2)}
            value={props.f_allocated_time_canal[index2].allocated_time_canal}
            placeholder=""
            keyboardType="numeric"
            style={[styles.input_email]}
          />
          <View>
            <Text style={styles.q_text}>
              How much time(minutes) is required for complete irrigation from
              tubewell in your farm?
            </Text>
            <Text style={styles.q_text}>
              فصل کو ٹیوب ویل سے پانی لگانے میں کتنا وقت( منٹوں میں ) درکار ہوتا
              ہے
            </Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 21, index2)}
            value={props.f_time_req_irrigation[index2].time_req_irrigation}
            placeholder=""
            keyboardType="numeric"
            style={[styles.input_email]}
          /> 
          <View style={{marginTop: 20}}>
            <Text style={styles.q_text}>
              What is your frequency of irrigation
            </Text>
            <Text style={styles.q_text}>
              آپ عام طور پر کتنی دیر بعد پانی لگاتے ہیں؟
            </Text>
            <Picker
              selectedValue={
                props.f_irrigation_frequency[index2].irrigation_frequency
              }
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 6, props.index2)
              }>
              <Picker.Item label="Weekly (ہفتہ وار)" value="0" />
              <Picker.Item label="Biweekly (دو ہفتوں کے بعد)" value="1" />
              <Picker.Item label="Twice a week (ہفتے میں دو دفعہ)" value="2" />
              <Picker.Item
                label="After every third week (ہر تیسرے ہفتے کے بعد)"
                value="3"
              />
              <Picker.Item label="Monthly (ماہانہ)" value="4" />
              <Picker.Item label="Other (دیگر)" value="5" />
            </Picker>
          </View>
*/}
          <View style={{marginTop: 20, marginBottom: 30}}>
            <Text style={styles.q_text} />
          </View>
          <View style={[styles.border_bottom]} />
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
    height: 80,
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
  q_text: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
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
