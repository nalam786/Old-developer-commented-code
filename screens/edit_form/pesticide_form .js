//Edit Pestiside Screen

import React from 'react';
import Form_footer from '../../components/edit_form/form_footer';
import Form4 from '../../components/edit_form/form_4';
import URL from '../../URL';
import {connect} from 'react-redux';

import {Container, Content, Button, Fab} from 'native-base';

import {
  SafeArea_inputView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Picker,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const form_4 = props => {
  console.log('IN pesticide edit form');
  const [data, setData] = React.useState({
    didmount: 0,
    rander_flag: 0,
    farm_id: [],
    use_reason: [],
    chemical_per_acre: [],
    date_of_application: [],
    pesticide_name: [],
    pesticide_company: [],
    chemical_per_acre_measure: [],
    crop_disease: [],
    fertilizer_type: [],
    fertilizer_per_acre: [],
    application_date: [],
    insects_disease: [],
    bottomfooter: false,
    footer: true,
  });

  React.useEffect(() => {
    get_pesticide();
  }, []);

  const getDate = () => {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      return y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        return y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        return y + '-0' + m + '-' + day;
      }
    }
  };

  const get_pesticide = async () => {
    await fetch(URL.url + 'pesticides/pesticides_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          f_farm_id: props.user_ids.update_farm_id,
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('GET PESTICITE SUCCESS', resjson);
        if (resjson.Successful) {
          resjson.data.forEach(element => {
            data.farm_id.push({farm_id: element.id});
            //data.pesticide_id.push({pesticide_id: element.id});
            data.use_reason.push({use_reason: element.use_reason});
            data.chemical_per_acre.push({
              chemical_per_acre: element.chemical_per_acre,
            });
            data.date_of_application.push({
              date_of_application: element.date_of_application,
            });
            data.pesticide_name.push({pesticide_name: element.pesticide_name});
            data.pesticide_company.push({
              pesticide_company: element.pesticide_company,
            });
            data.crop_disease.push({crop_disease: element.crop_disease});
            data.insects_disease.push({insects_disease: element.crop_insects});
            data.application_date.push({
              date_of_application: element.application_date
                ? element.application_date
                : getDate(),
            });
          });
          setData({
            ...data,
            use_reason: data.use_reason,
          });
        } else {
          renderForm();
        }
      })
      .catch(err => {
        console.log('failed', err);
        renderForm();
      });
  };

  const renderForm = () => {
    data.farm_id.push({farm_id: ''});
    data.use_reason.push({use_reason: ''});
    data.chemical_per_acre.push({chemical_per_acre: ''});
    data.date_of_application.push({date_of_application: ''});
    data.chemical_per_acre_measure.push({chemical_per_acre_measure: ''});
    data.pesticide_name.push({pesticide_name: ''});
    data.pesticide_company.push({pesticide_company: ''});
    data.crop_disease.push({crop_disease: ''});
    data.fertilizer_type.push({fertilizer_type: ''});
    data.fertilizer_per_acre.push({fertilizer_per_acre: ''});
    data.application_date.push({application_date: ''});
    data.insects_disease.push({insects_disease: ''});

    setData({
      ...data,
      use_reason: data.use_reason,
    });
  };

  const del_pesticide = async pesticide_id => {
    // alert(3456)
    let F_Data = {
      f_pesticide_id: pesticide_id, //props.user_ids.update_farm_id,
    };

    console.log('Get Farm API Calling: ', F_Data);

    await fetch(URL.url + 'pesticides/pesticides_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        if (resjson.Successful) {
          alert(resjson.Message);
        }
      })
      .catch(err => {
        console.log('failed', err);
      });
  };

  const sendform = async () => {
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

    for (let j = 0; j < data.use_reason.length; j++) {
      if (data.use_reason[j] == '') {
        alert('Please fill all the mandatory fields' + j);
        return false;
      }
    }

    for (let i = 0; i < data.use_reason.length; i++) {
      let F_data = {};
      if (data.farm_id[i].farm_id === '') {
        let F_Data = {
          f_farm_id: props.user_ids.update_farm_id,
          // f_pesticide_id: data.pesticide_id[i].pesticide_id,
          f_use_reason: data.use_reason[i].use_reason,
          f_chemical_per_acre: data.chemical_per_acre[i].chemical_per_acre,
          f_date_of_application:
            data.date_of_application[i].date_of_application,
          f_pesticide_name: data.pesticide_name[i].pesticide_name,
          f_pesticide_company: data.pesticide_company[i].pesticide_company,
          f_crop_disease: data.crop_disease[i].crop_disease,
          f_crop_insects: data.insects_disease[i].insects_disease,
          f_created_by: props.user_ids.update_farm_id,
          f_created_at: date,
          f_modified_by: props.user_ids.update_farm_id,
          f_modified_at: date,
        };

        console.log('Pesticide Create API Calling', F_Data);

        await fetch(URL.url + 'pesticides/pesticides_create', {
          method: 'POST',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({F_Data}),
        })
          .then(res => res.json())
          .then(resjson => {
            if (resjson.Successful) {
              props.navigation.navigate('crop_health_form_edit');
            }

            alert(resjson.Message);
          })

          .catch(err => {
            console.log('Pesticide API Failed', err);
            alert('Failed to Submit Data: ' + err);
          });
      } else {
        let F_Data = {
          f_farm_id: props.user_ids.update_farm_id,
          //f_pesticide_id: data.pesticide_id[i].pesticide_id,
          f_use_reason: data.use_reason[i].use_reason,
          f_chemical_per_acre: data.chemical_per_acre[i].chemical_per_acre,
          f_date_of_application:
            data.date_of_application[i].date_of_application,
          f_pesticide_name: data.pesticide_name[i].pesticide_name,
          f_pesticide_company: data.pesticide_company[i].pesticide_company,
          f_crop_disease: data.crop_disease[i].crop_disease,
          f_crop_insects: data.insects_disease[i].insects_disease,
          f_created_by: props.user_ids.update_farm_id,
          f_created_at: date,
          f_modified_by: props.user_ids.update_farm_id,
          f_modified_at: date,
        };

        console.log('Pesticide Create API Calling', F_Data);

        await fetch(URL.url + 'pesticides/pesticides_update', {
          method: 'POST',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({F_Data}),
        })
          .then(res => res.json())
          .then(resjson => {
            console.log('Pestiside update successfull', resjson);
            if (resjson.Successful) {
              props.navigation.navigate('crop_health_form_edit');
            }

            alert(resjson.Message);
          })

          .catch(err => {
            console.log('Pesticide API Failed', err);
            alert('Failed to Submit Data: ' + err);
          });
      }
    }
  };

  console.log('hereeeeeeeeeeeeeeeeeeeeeeee', props.flag);
  if (props.flag.flag == 'pesticides_create') {
    switch (props.flag.s_key) {
      case 1:
        data.use_reason[props.flag.index].use_reason = props.flag.value;
        break;

      case 2:
        console.log('setttttttttttttttttttting data');
        data.chemical_per_acre[props.flag.index].chemical_per_acre =
          props.flag.value;
        break;

      case 3:
        data.date_of_application[props.flag.index].date_of_application =
          props.flag.value;
        break;

      case 4:
        data.pesticide_name[props.flag.index].pesticide_name = props.flag.value;
        break;

      case 5:
        data.pesticide_company[props.flag.index].pesticide_company =
          props.flag.value;
        break;

      case 6:
        data.insects_disease[props.flag.index].insects_disease =
          props.flag.value;
        break;

      // case 6:
      //   data.crop_disease[props.flag.index].crop_disease = props.flag.value;
      //   break;

      case 7:
        data.fertilizer_type[props.flag.index].fertilizer_type =
          props.flag.value;
        break;

      case 8:
        data.fertilizer_per_acre[props.flag.index].fertilizer_per_acre =
          props.flag.value;
        break;

      case 9:
        data.application_date[props.flag.index].application_date =
          props.flag.value;
        break;
      case 8:
        data.chemical_per_acre_measure[
          props.flag.index
        ].chemical_per_acre_measure = props.flag.value;
        break;

      default:
        break;
    }

    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });

    console.log('Props Flag Changed to 0');
  }

  if (props.flag.flag == 'pesticides_delete') {
    data.farm_id[props.flag.index] &&
      data.farm_id[props.flag.index].farm_id &&
      del_pesticide(data.farm_id[props.flag.index].farm_id);
    data.use_reason.splice(props.flag.index, 1);
    data.chemical_per_acre.splice(props.flag.index, 1);
    data.date_of_application.splice(props.flag.index, 1);
    data.pesticide_name.splice(props.flag.index, 1);
    data.pesticide_company.splice(props.flag.index, 1);
    data.crop_disease.splice(props.flag.index, 1);
    data.insects_disease.splice(props.flag.index, 1);
    data.fertilizer_type.splice(props.flag.index, 1);
    data.fertilizer_per_acre.splice(props.flag.index, 1);
    data.application_date.splice(props.flag.index, 1);

    if (data.rander_flag == 0) {
      // this.test();

      // renderForm();
      data.rander_flag = 1;
      setData({
        ...data,
        use_reason: data.use_reason,
        rander_flag: 1,
      });
    }
    props.changeFlag({
      flag: 0,
      s_key: 's_key',
      index: 'index',
      value: 'value',
    });
  }

  if (data.didmount == 0) {
    // renderForm();
    data.didmount = 1;

    setData({
      ...data,
      didmount: 1,
    });
  }

  const bottom_footer = () => {
    if (data.bottomfooter == true) {
      return data.footer ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Fab
            active={false}
            containerStyle={{
              marginTop: -50,
            }}
            style={{
              backgroundColor: 'white',
              zIndex: 11,
              width: 40,
              height: 40,
            }}
            position="topLeft"
            onPress={() =>
              setData({
                ...data,
                bottomfooter: !data.bottomfooter,
              })
            }>
            <Image
              source={require('../../assets/img/arow_up.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                transform: [{rotate: '180deg'}],
              }}
            />
          </Fab>
          <View>
            <Form_footer form_no={4} nav={props} />
          </View>
        </View>
      ) : (
        <View />
      );
    } else {
      return null;
    }
  };
  //2. add this bottom before
  const fabbuttonbefor = () => {
    if (data.bottomfooter == false) {
      return (
        <Fab
          active={false}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: 'white', zIndex: 11, width: 40, height: 40}}
          position="bottomRight"
          onPress={() =>
            setData({
              ...data,
              bottomfooter: !data.bottomfooter,
            })
          }>
          <Image
            source={require('../../assets/img/arow_up.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </Fab>
      );
    }
  };

  return (
    <>
      <Container>
        <View style={{flex: 1}}>
          <ScrollView style={styles.scrollView}>
            {fabbuttonbefor()}

            <View style={[styles.header]}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/img/menu.png')}
                    style={{
                      width: '30%',
                      height: 30,
                      resizeMode: 'stretch',
                      marginLeft: 10,
                    }}
                  />
                </View> */}
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  onPress={() => props.navigation.navigate('dashboard')}>
                  <Image
                    source={require('../../assets/img/home.png')}
                    style={{
                      width: '30%',
                      height: 30,
                      resizeMode: 'stretch',
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                    Use of Pesticides
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
              }}>
              <View style={{alignSelf: 'center', marginTop: 30, width: '95%'}}>
                {data.use_reason.map((
                  use_reason,
                  keys, //you can use  mandatory field here
                ) => (
                  <Form4
                    index={keys + 1}
                    farm_id={data.farm_id}
                    f_use_reason={data.use_reason}
                    f_chemical_per_acre={data.chemical_per_acre}
                    f_chemical_per_acre_measure={data.chemical_per_acre_measure}
                    f_date_of_application={data.date_of_application}
                    f_pesticide_name={data.pesticide_name}
                    f_pesticide_company={data.pesticide_company}
                    f_crop_disease={data.crop_disease}
                    f_insects_disease={data.insects_disease}
                    index2={keys}
                    hideFooter={() =>
                      setData({
                        ...data,
                        bottomfooter: false,
                      })
                    }
                  />
                ))}
              </View>
            </View>

            <View>
              <Button
                onPress={() => renderForm()}
                style={[styles.input_button]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  ADD FORM
                </Text>
              </Button>
            </View>

            <View>
              <Button
                onPress={() => sendform()}
                style={[styles.input_button]}
                full>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
                  Update (اپ ڈیٹ)
                </Text>
              </Button>
            </View>

            {/* <Form_footer form_no={4} nav={props} /> */}
          </ScrollView>
        </View>
        {bottom_footer()}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',
    height: 70,
  },

  input_button: {
    height: 40,
    width: 300,
    backgroundColor: '#05422b',
    color: 'red',
    alignSelf: 'center',
    margin: 0,
    marginBottom: 20,
  },

  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },

  body: {
    backgroundColor: Colors.white,
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
)(form_4);
