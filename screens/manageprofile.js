import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import URL from '../URL';
import {Circle, Triangle} from 'react-native-shape';
import {Container, Content, Button, Drawer} from 'native-base';
import SideBar from '../components/Sidebar';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const profile = props => {
  const [data, setData] = React.useState({
    didmount: 0,
    name: '',
    phone: '',
    email: '',
    password: '',
    c_password: '',
    affiliation: '0',
    bci_partner: '0',
    bci_partner_note: '',
    farmer_code: 0,
    lg_code: 0,
    lead_farmer_name: '',
    village: '',
    ff_name: '',
    pu_manager_name: '',
    no_of_male_member: 0,
    no_of_femail_member: 0,
    octal_cultivate_area: 0,
    cotton_cultivate_area: 0,
    note: '',
  });

  const fetchuserdata = async () => {
    console.log('userid', props.user_ids.user_id);
    let data = {
      f_user_id: props.user_ids.user_id,
    };

    console.log('Get Farm API Calling: ', data);

    await fetch(URL.url + 'users/user_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data}),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('saif', resjson.data[0].name);
        setData({
          ...data,
          name: resjson.data[0].name,
          email: resjson.data[0].email,
          phone: resjson.data[0].phone,
          password: resjson.data[0].password,
        });
        console.log('data', resjson);
      })
      .catch(err => {
        console.log('failed', err);
      });
  };
  useEffect(() => {
    fetchuserdata();
    console.log('mount it!');
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const signup = async () => {
    // if (data.email == '' || data.password == '') {
    //   // alert('Please fill all the fields');
    //   return false;
    // }

    let U_data = {
      farm_id: props.user_ids.user_id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      affiliation: data.affiliation,
      bci_partner: data.bci_partner,
      bci_partner_note: data.bci_partner_note,
      farmer_code: data.farmer_code,
      lg_code: data.lg_code,
      lead_farmer_name: data.lead_farmer_name,
      village: data.village,
      ff_name: data.ff_name,
      pu_manager_name: data.pu_manager_name,
      no_of_male_member: data.no_of_male_member,
      no_of_femail_member: data.no_of_femail_member,
      octal_cultivate_area: data.octal_cultivate_area,
      cotton_cultivate_area: data.cotton_cultivate_area,
      note: data.note,
    };

    console.log('Login API Calling', U_data);
    // return false;
    await fetch(URL.url + 'users/user_update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({U_data}),
    })
      .then(res => res.json())

      .then(async resjson => {
        console.log(resjson);
        if (resjson.Message == 'Successfully_Login') {
          // props.navigation.navigate('dashboard');
        }

        // alert(resjson.Message);
      })

      .catch(err => {
        console.log('API Failed:', err);
        alert('Failed to Connect to Server: ' + err);
      });
  };
  const textInputChange = (v, no) => {
    switch (no) {
      case 1:
        if (v.length !== 0) {
          data.name = v;
        }
        console.log('name:', data.name);
        break;

      case 2:
        if (v.length !== 0) {
          data.phone = v;
        }
        setData({
          ...data,
          phone: v,
        });
        console.log('phone:', data.phone);
        break;

      case 3:
        if (v.length !== 0) {
          data.note = v;
        }
        console.log('note:', data.note);
        break;

      case 4:
        if (v.length !== 0) {
          data.email = v;
        }
        console.log(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email));
        break;
      case 5:
        if (v.length !== 0) {
          data.password = v;
        }
        console.log('password:', data.password);
        break;
      case 6:
        if (v.length !== 0) {
          setData({
            ...data,
            affiliation: v,
          });
          data.affiliation = v;
        }
        console.log('password:', data.affiliation);
        break;
      case 7:
        if (v.length !== 0) {
          setData({
            ...data,
            bci_partner: v,
          });
          data.bci_partner = v;
        }
        console.log('password:', data.bci_partner);
        break;
      case 8:
        if (v.length !== 0) {
          setData({
            ...data,
            bci_partner_note: v,
          });
          data.bci_partner_note = v;
        }
        console.log('password:', data.bci_partner_note);
        break;
      case 9:
        if (v.length !== 0) {
          setData({
            ...data,
            farmer_code: v,
          });
          data.farmer_code = v;
        }
        console.log('password:', data.farmer_code);
        break;
      case 10:
        if (v.length !== 0) {
          setData({
            ...data,
            lg_code: v,
          });
          data.lg_code = v;
        }
        console.log('password:', data.lg_code);
        break;
      case 11:
        if (v.length !== 0) {
          setData({
            ...data,
            lead_farmer_name: v,
          });
          data.lead_farmer_name = v;
        }
        console.log('password:', data.lead_farmer_name);
        break;
      case 12:
        if (v.length !== 0) {
          setData({
            ...data,
            village: v,
          });
          data.village = v;
        }
        console.log('password:', data.village);
        break;
      case 13:
        if (v.length !== 0) {
          setData({
            ...data,
            ff_name: v,
          });
          data.ff_name = v;
        }
        console.log('password:', data.ff_name);
        break;
      case 14:
        if (v.length !== 0) {
          setData({
            ...data,
            pu_manager_name: v,
          });
          data.pu_manager_name = v;
        }
        console.log('password:', data.pu_manager_name);
        break;
      case 15:
        if (v.length !== 0) {
          setData({
            ...data,
            no_of_male_member: v,
          });
          data.no_of_male_member = v;
        }
        console.log('password:', data.no_of_male_member);
        break;
      case 16:
        if (v.length !== 0) {
          setData({
            ...data,
            no_of_femail_member: v,
          });
          data.no_of_femail_member = v;
        }
        console.log('password:', data.no_of_femail_member);
        break;
      case 17:
        if (v.length !== 0) {
          setData({
            ...data,
            octal_cultivate_area: v,
          });
          data.octal_cultivate_area = v;
        }
        console.log('password:', data.octal_cultivate_area);
        break;
      case 18:
        if (v.length !== 0) {
          setData({
            ...data,
            cotton_cultivate_area: v,
          });
          data.cotton_cultivate_area = v;
        }
        console.log('password:', data.cotton_cultivate_area);
        break;
      case 19:
        if (v.length !== 0) {
          setData({
            ...data,
            password: v,
          });
          data.password = v;
        }
        console.log('password:', data.password);
        break;
      case 20:
        if (v.length !== 0) {
          setData({
            ...data,
            c_password: v,
          });
          data.c_password = v;
        }
        console.log('password:', data.c_password);
        break;
    }
  };
  const closeDrawer = () => {
    this.drawer._root.close();
  };
  const openDrawer = () => {
    console.log('i am');
    this.drawer._root.open();
  };
  return (
    <Drawer
      ref={ref => {
        this.drawer = ref;
      }}
      openDrawerOffset={0.3}
      content={<SideBar nav={this.props} close={() => closeDrawer()} />}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header]}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onPress={() => openDrawer()}>
              <View
                onPress={() => openDrawer()}
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/img/menu.png')}
                  style={{
                    width: '30%',
                    height: 30,
                    resizeMode: 'stretch',
                    marginLeft: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                {' '}
                MANAGE PROFILE
              </Text>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                {' '}
                پروفائل مینیج کریں{' '}
              </Text>
            </View>

            <View
              style={{
                width: '10%',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <View style={{alignSelf: 'center', marginTop: 30}}>
            <View style={{alignSelf: 'center', marginBottom: 30}}>
              <Image
                source={require('../assets/img/Infarmer.png')}
                style={{width: 150, height: 150, resizeMode: 'stretch'}}
              />
            </View>

            <View style={{marginTop: 20}}>
              <Text style={styles.q_text}>Name (نام)</Text>
            </View>
            <TextInput
              placeholderTextColor="#272626"
              onChangeText={val => textInputChange(val, 1)}
              placeholder={data.name}
              style={[styles.input_email]}
              keyboardType="default"
            />
            <View style={{marginTop: 20}}>
              <Text style={styles.q_text}>mobile phone (موبائل فون نمبر)</Text>
            </View>
            <TextInput
              placeholderTextColor="#272626"
              keyboardType="numeric"
              onChangeText={val => textInputChange(val, 2)}
              placeholder={data.phone}
              style={[styles.input_email]}
              keyboardType="numeric"
            />
            <View style={{marginTop: 20}}>
              <Text style={styles.q_text}> E mail ( ای میل )</Text>
            </View>
            <TextInput
              placeholderTextColor="#272626"
              keyboardType="numeric"
              onChangeText={val => textInputChange(val, 4)}
              placeholder={data.email}
              style={[styles.input_email]}
              keyboardType="email-address"
            />
            <View>
              <Text style={styles.q_text}>Affiliation (وابستگی) </Text>
            </View>
            <View style={{marginTop: 20}}>
              <Picker
                selectedValue={data.affiliation}
                onValueChange={(itemValue, itemIndex) =>
                  textInputChange(itemValue, 6)
                }>
                <Picker.Item label="Farmer (کسان)" value="0" />
                <Picker.Item label="BCI (بی سی آئی)" value="1" />
                <Picker.Item label="Other (دیگر)" value="2" />
              </Picker>
              <View style={[styles.border_bottom]} />
            </View>

            {data.affiliation == '1' ? (
              <View>
                <View>
                  <Text style={styles.q_text}>
                    Name of BCI partner (پارٹنرکانامBCI){' '}
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Picker
                    selectedValue={data.bci_partner}
                    onValueChange={(itemValue, itemIndex) =>
                      textInputChange(itemValue, 7)
                    }>
                    <Picker.Item label="REEDS (‏‎رییڈز)" value="0" />
                    <Picker.Item label="SWRDO (ایس ڈبلیو آر ڈی او)" value="1" />

                    <Picker.Item
                      label="Cotton Connect (کاٹن کونکٹ ‏)"
                      value="3"
                    />
                    <Picker.Item label="WWF (ڈبلیو ڈبلیو ایف)" value="4" />
                    <Picker.Item label="CABI (کابی ‏)" value="5" />
                    <Picker.Item label="LSF (ایل ایس ایف)" value="6" />
                    <Picker.Item label="MRWO (ایم آر ڈبلیو او)" value="7" />
                    <Picker.Item label="YAZMAN (یاذمان)" value="8" />
                    <Picker.Item label="Other ( دیگر)" value="9" />
                  </Picker>
                </View>
                <View style={[styles.border_bottom]} />
                {data.bci_partner == '9' ? (
                  <View>
                    <View style={{marginTop: 20}}>
                      <Text style={styles.q_text}> Note( نوٹ )</Text>
                    </View>
                    <TextInput
                      placeholderTextColor="#272626"
                      keyboardType="numeric"
                      onChangeText={val => textInputChange(val, 8)}
                      placeholder=""
                      style={[styles.input_email]}
                    />
                  </View>
                ) : (
                  <View />
                )}
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}> Farmer Code ( کسان کوڈ )</Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 9)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}> LG Code ( ایل جی کوٹ )</Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 10)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    Lead Farmer Name ( لیڈفارمرکانام )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 11)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    Name of the Village ( گاؤں کانام )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 12)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}> Name of FF ( FF کا نام )</Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 13)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    Name of PU Manager( مینجر کانام PU, )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 14)}
                  placeholder=""
                  style={[styles.input_email]}
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    No. of male members of the family working on farm( کسانکوڈ )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 15)}
                  placeholder=""
                  style={[styles.input_email]}
                  keyboardType="numeric"
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    No. of female members of the family working on farm( کسانکوڈ
                    )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 16)}
                  placeholder=""
                  style={[styles.input_email]}
                  keyboardType="numeric"
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    otal cultivated area (Acre)( کسانکوڈ )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 17)}
                  placeholder=""
                  style={[styles.input_email]}
                  keyboardType="numeric"
                />
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}>
                    {' '}
                    Cotton cultivated area during this year (Acre)( کسانکوڈ )
                  </Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 18)}
                  placeholder=""
                  style={[styles.input_email]}
                  keyboardType="numeric"
                />
              </View>
            ) : (
              <View />
            )}
            {data.affiliation == '2' ? (
              <View>
                <View style={{marginTop: 20}}>
                  <Text style={styles.q_text}> Note( نوٹ )</Text>
                </View>
                <TextInput
                  placeholderTextColor="#272626"
                  onChangeText={val => textInputChange(val, 3)}
                  placeholder=""
                  style={[styles.input_email]}
                />
              </View>
            ) : (
              <View />
            )}
            <View style={{marginTop: 20}}>
              <Text style={styles.q_text}> Password( پاس ورڈ )</Text>
            </View>
            <TextInput
              placeholderTextColor="#272626"
              secureTextEntry={true}
              onChangeText={val => textInputChange(val, 19)}
              placeholder={data.password}
              style={[styles.input_email]}
            />
            <View style={{marginTop: 20}}>
              <Text style={styles.q_text}>
                {' '}
                Confirm password( پاس ورڈ کی تصدیق کریں )
              </Text>
            </View>
            <TextInput
              placeholderTextColor="#272626"
              secureTextEntry={true}
              onChangeText={val => textInputChange(val, 20)}
              placeholder={data.password}
              style={[styles.input_email]}
            />
            <Button
              onPress={() => signup()}
              style={[styles.input_button, {marginBottom: 40}]}
              full>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                {' '}
                UPDATE PROFILE
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',

    height: 70,
    // marginTop:50,
  },
  q_text: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
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
    height: 40,
    width: 300,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
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
  green_h2: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 50,
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf: 'flex-end',
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

const mapStateToProps = state => {
  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFlag: data => {
      dispatch({type: 'CHANGE_FLAG', payload: data});
    },
    changeSignup: data => {
      dispatch({type: 'SIGNUP_DATA', payload: data});
    },
    user_id: data => {
      dispatch({type: 'USER_ID', payload: data});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(profile);
