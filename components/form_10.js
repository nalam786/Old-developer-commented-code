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

const form_4 = props => {
  const changeData = (value, s_key, index) => {
    props.changeFlag({
      flag: 'fertilizers_create',
      s_key: s_key,
      index: index,
      value: value,
    });
  };
  const removeData = (value, s_key, index) => {
    props.changeFlag({
      flag: 'fertilizers_delete',
      s_key: s_key,
      index: index2,
      value: value,
    });
  };
  const focus = () => {
    props.changeFlag({
      flag: 'fertilizers_hide/show_footer',
      s_key: '',
      index: '',
      value: 'hide',
    });
    // alert(23456789)
  };
  const blur = () => {
    props.changeFlag({
      flag: 'fertilizers_hide/show_footer',
      s_key: '',
      index: '',
      value: 'show',
    });
    // alert(23456789)
  };
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

    props.changeFlag({
      flag: 'fertilizers_create',
      s_key: s_key,
      index: index,
      value: date,
    });
  };

  const {
    f_fertilizer_type,
    f_fertilizer_per_acre,
    f_application_date,
    f_fertilizer_company,
    f_fertilizer_name,
    index2,
  } = props;

  console.log(props.f_chemical_per_acre);

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

          <View style={{marginTop: 2}}>
            <View>
              <Text style={styles.q_text}>Fertilizer type</Text>
              <Text style={styles.q_text}>کھاد کی قسم</Text>
            </View>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 7, index2)
              }
              selectedValue={props.f_fertilizer_type[index2].fertilizer_type}>
              <Picker.Item label="Bio-Fertilizer (بائیو کھاد)" value="0" />
              <Picker.Item
                label="Chemical or Synthetic fertilizer (کیمیائی)"
                value="1"
              />
              <Picker.Item label="Other (دیگر)" value="2" />
              <Picker.Item label="None (کوئی نہیں) " value="3" />
            </Picker>
            <View style={[styles.border_bottom]} />
          </View>

          <View style={{marginTop: 20}}>
            <View>
              <Text style={styles.q_text}>Fertilizer name</Text>
              <Text style={styles.q_text}>کھاد کا نام</Text>
            </View>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 6, index2)
              }
              selectedValue={props.f_fertilizer_name[index2].fertilizer_name}>
              <Picker.Item label="CAN (گوارہ)" value="1" />
              <Picker.Item label="DAP (ڈی اے پی)" value="2" />
              <Picker.Item label="Urea (یوریا)" value="3" />
              <Picker.Item label="SSP (ایس ایس پی)" value="4" />
              <Picker.Item label="TSP (ٹی ایس پی)" value="5" />
              <Picker.Item label="Nitrophos (نائٹروفاس)" value="6" />
              <Picker.Item
                label="Ammonium sulphate (ایمونیم سلفیٹ)"
                value="7"
              />
              <Picker.Item
                label="Ammonium nitrate (ایمونیم نائٹریٹ)"
                value="9"
              />
              <Picker.Item
                label="Potassium sulphate (پوٹاشیم سلفیٹ)"
                value="11"
              />
              <Picker.Item
                label="Potassium chloride (پوٹاشیم کلورائد)"
                value="13"
              />
              <Picker.Item
                label="Potassium phosphate MB  ( پوٹاشیم فاسفیٹ مونو)"
                value="15"
              />
              <Picker.Item label="Farm yard manure (گوبر)" value="17" />
              <Picker.Item label="Green manure (سبز کھاد)" value="18" />
              <Picker.Item
                label="Other organic fertiliser (دوسری نامیاتی کھاد)"
                value="19"
              />
              <Picker.Item label="Boron (بوران)" value="21" />
              <Picker.Item label="Zinc (زنک)" value="22" />
              <Picker.Item
                label="Other [N, P, K] ([دیگر [این، پی، کے ) "
                value="23"
              />

              <Picker.Item label="None (کوئی نہیں)" value="25" />
            </Picker>
            <View style={[styles.border_bottom]} />
            <View>
              <Text style={styles.q_text}>Fertilizer company</Text>
              <Text style={styles.q_text}>کھاد کی کمپنی</Text>
            </View>
            <Picker
              onValueChange={(itemValue, itemIndex) =>
                changeData(itemValue, 5, index2)
              }
              selectedValue={
                props.f_fertilizer_company[index2].fertilizer_company
              }>
              <Picker.Item
                label="Fauji Fertilizer  (فوجی فرٹيلائزر )"
                value="1"
              />
              <Picker.Item
                label="Fatima Fertilizer  (فاطمہ فرٹيلائزر )"
                value="2"
              />
              <Picker.Item
                label="Engro Fertilizer (اينگرو فرٹيلائزر)"
                value="3"
              />
              <Picker.Item label="Sitara Group (ستارہ گروپ)" value="4" />
              <Picker.Item label="Jaffar Brothers (جعفر برادرز)" value="5" />
              <Picker.Item label="Tara Fertilizer (تارا فرٹيلائزر)" value="6" />
              <Picker.Item label=" Other (دیگر )" value="7" />
            </Picker>
          </View>
          <View style={{marginTop: 20}}>
            <View style={[styles.border_bottom]} />
          </View>
          <View>
            <Text style={styles.q_text}>
              Amount of fertilizer used per acre (Kg)
            </Text>
            <Text style={styles.q_text}>
              {' '}
              کھاد کی مقدار فی ایکڑ ( کلوگرام){' '}
            </Text>
          </View>
          <TextInput
            placeholderTextColor="#272626"
            onFocus={() => focus()}
            onBlur={() => blur()}
            onChangeText={val => changeData(val, 8, index2)}
            value={props.f_fertilizer_per_acre[index2].fertilizer_per_acre}
            keyboardType="numeric"
            placeholder=""
            style={[styles.input_email]}
          />

          <View>
            <Text style={styles.q_text}>Application date</Text>
            <Text style={styles.q_text}>تاریخ (کھاد لگانے کی)</Text>
          </View>
          <View
            style={[
              styles.input_email,
              {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'gray',
                height: '5%',
              },
            ]}>
            <DatePicker
              defaultDate={
                new Date(props.f_application_date[index2].application_date)
              }
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={
                '' + props.f_application_date[index2].application_date
              }
              textStyle={{color: '#fff'}}
              onDateChange={val => setDate(val, 3, index2)}
              disabled={false}
            />
            <Image
              source={require('../assets/img/calendar.png')}
              style={{
                width: '12%',
                height: '80%',
                resizeMode: 'stretch',
                marginRight: 10,
                marginTop: 3,
              }}
            />
          </View>
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

    // marginTop:50,
  },
  paragraph: {
    backgroundColor: '#359814',
    fontSize: 8,

    // marginTop:50,
  },
  header: {
    backgroundColor: '#359814',

    height: 70,
    // marginTop:50,
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
    // height: '16%',
    width: '95%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: 'center',
    // height: '3%',
    padding: 0,
    margin: 0,
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
    // marginTop:50,
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
)(form_4);
