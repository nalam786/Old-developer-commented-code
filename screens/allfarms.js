//All Farms Screen

import React from 'react';
import URL from '../URL';
import {connect} from 'react-redux';
import {Drawer} from 'native-base';
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
  FlatList,
  Picker,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const ProductsData = [
  {
    id: 1,
    Name: 'NEW FARMS1',
    Area: '3Acres',
    Crop: 'RICE',
    Season: 'RABI',
    SowingDate: '20 July 2020',
  },
  {
    id: 2,
    Name: 'NEW FARMS1',
    Area: '3Acres',
    Crop: 'RICE',
    Season: 'RABI',
    SowingDate: '20 July 2020',
  },
  {
    id: 3,
    Name: 'NEW FARMS1',
    Area: '3Acres',
    Crop: 'RICE',
    Season: 'RABI',
    SowingDate: '20 July 2020',
  },
  {
    id: 4,
    Name: 'NEW FARMS1',
    Area: '3Acres',
    Crop: 'RICE',
    Season: 'RABI',
    SowingDate: '20 July 2020',
  },
];

const Allfarms = props => {
  const [data, setData] = React.useState({
    farm_info: [],
    didmount: 0,
    searchText: '',
    data: [],
    filteredData: [],
  });
  console.log('I am here');

//Delete Farm Function
  const del_farms = async id => {

    Alert.alert('Successfully Deleted');
    let data = {
      f_farms_id: id,
    };

    fetch(URL.url + 'farms/farm_delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data}),
    })
      .then(res => res.json())
      .then(resjson => {
        try {
          setData({
            ...data,
            farm_info: filteredData,
          });
        } catch (e) {}
        get_farms();
        console.log(JSON.stringify(resjson));
      })
      .catch(err => {
        console.log('Failed to Get Farms: ', err);
      });
  };

  //Get all Farms Function
  const get_farms = async () => {
    console.log('22');
    console.log('getting', props.user_ids.user_id);
    let F_Data = {
      f_user_id: props.user_ids.user_id,
    };

    console.log('All Farms API Calling: ', F_Data);
    await fetch(URL.url + 'farms/farms_get_all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({F_Data}),
    })
      .then(res => res.json())
      .then(resjson => {
        if (resjson.Message == 'All Farms Get Successfully') {
          data.farm_info = resjson.data;
          setData({
            ...data,
            farm_info: resjson.data,
            searchText: '',
          });
        }
        console.log(data.farm_info);
      })
      .catch(err => {
        console.log('Failed to Get Farms: ', err);
      });
  };

  //Send Values for Edit Farm
  const edit_form = id => {
    props.user_id({
      user_id: props.user_ids.user_id,
      farm_id: 2,
      update_farm_id: id,
    });

   props.navigation.navigate('general_form_edit');
  };
  if (data.didmount == 0) {
    get_farms();
    data.didmount = 1;
    setData({
      ...data,
      didmount: 1,
    });
  }

  //Search Farm Function
  const search = searchText => {
    console.log(searchText);
    if (searchText == '') {
      get_farms();
    } else {
      console.log(data.farm_info);

      let filteredData = data.farm_info.filter(function(item) {
        return item.farm_name.toLowerCase().includes(searchText.toLowerCase());
      });
      setData({
        ...data,
        farm_info: filteredData,
        searchText: searchText,
      });
    }
  };

  //Render Farm List items 
  renderItem = ({item, index}) => {
    let style = {};
    let season = JSON.stringify(item.season);
    console.log(item.id);

    if (index % NUM_COLUMNS !== 0) {
      style.borderLeftWidth = 3;
      style.borderLeftColor = 'black';
    }

    return (
      <View style={[styles.cart]}>
        {/* <ProductCard2 {...item} /> */}
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={[styles.green_h2_start]}> FARM {item.farm_name} </Text>
          </View>
          <View>
            <Text style={[styles.green_h6_start]}>AREA:رقبہ </Text>
            <Text
              style={[
                styles.green_h6_start,
                {color: '#359814', fontWeight: 'bold'},
              ]}>
              {item.area}{' '}
            </Text>
          </View>

          <View>
            <Text style={[styles.green_h6_start]}>CROP: </Text>
            <Text
              style={[
                styles.green_h6_start,
                {color: '#359814', fontWeight: 'bold'},
              ]}>
              {item.crop}{' '}
            </Text>
          </View>
          <View>
            <Text style={[styles.green_h6_start]}>SEASON: </Text>
            <Picker selectedValue={season}>
              <Picker.Item label="SEASON" value="" />
              <Picker.Item label="Rabi" value="0" />
              <Picker.Item label="Kharif" value="1" />
              <Picker.Item label="Yearly" value="2" />
              <Picker.Item label="Otherly" value="3" />
            </Picker>
          </View>
          <View>
            <Text style={[styles.green_h6_start]}>SOWING DATE: </Text>
            <Text
              style={[
                styles.green_h6_start,
                {color: '#359814', fontWeight: 'bold'},
              ]}>
              {item.sowing_date}{' '}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // onPress={
            //   (() => props.navigation.navigate('crop_health_report'),
            //   {farm_id: 1})
            // }
            onPress={() => {
              props.navigation.navigate('crop_health_report', {
                farm_id_: item.id,
              });
            }}
            style={[styles.box, {backgroundColor: '#359814'}]}>
            <Text
              // onPress={() => props.navigation.navigate('crop_health_report')}
              style={{color: '#fff'}}>
              رپورٹ دیکھیں{' '}
            </Text>
            <Text
              // onPress={() => props.navigation.navigate('crop_health_report')}
              style={{color: '#fff'}}>
              VIEW REPORT{' '}
            </Text>
          </TouchableOpacity>
          <View
            onPress={() => edit_form(item.id)}
            style={[
              styles.box,
              {backgroundColor: '#05422b', marginVertical: 5},
            ]}>
            <Image
              source={require('../assets/img/edit.png')}
              style={{width: '15%', height: '20%', resizeMode: 'stretch'}}
            />
            <Text onPress={() => edit_form(item.id)} style={{color: '#fff'}}>
              تبدیل کریں{' '}
            </Text>
            <Text onPress={() => edit_form(item.id)} style={{color: '#fff'}}>
              EDIT{' '}
            </Text>
          </View>

          <View
            onPress={() =>
              Alert.alert(
                'Delete Farm',
                'Are you sure you want to delete this Farm.',
                [
                  {
                    text: 'Yes',
                    onPress: () => console.log('Yes button clicked'),
                  },
                  {
                    text: 'No',
                    onPress: () => console.log('No button clicked'),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                },
              )
            }
            style={[
              styles.box,
              {backgroundColor: '#05422b', marginVertical: 5},
            ]}>
            <Image
              source={require('../assets/img/edit.png')}
              style={{width: '15%', height: '20%', resizeMode: 'stretch'}}
            />
            <Text
              onPress={() =>
                Alert.alert(
                  'Delete Farm',
                  'Are you sure you want to delete this Farm.',
                  [
                    {
                      text: 'Yes',
                      onPress: () => del_farms(item.id),
                    },
                    {
                      text: 'No',
                      onPress: () => console.log('No button clicked'),
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: true,
                  },
                )
              }
              style={{color: '#fff'}}>
              مسخ کریں{' '}
            </Text>
            <Text
              onPress={() =>
                Alert.alert(
                  'Delete Farm',
                  'Are you sure you want to delete this Farm.',
                  [
                    {
                      text: 'Yes',
                      onPress: () => del_farms(item.id),
                    },
                    {
                      text: 'No',
                      onPress: () => console.log('No button clicked'),
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: true,
                  },
                )
              }
              style={{color: '#fff'}}>
              Delete{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  separator = () => <View style={{height: 3}} />;

  const NUM_COLUMNS = 1;
  const openDrawer = () => {
    // console.log("i am")
    this.drawer._root.open();
  };

  return (
    <Drawer
      ref={ref => {
        this.drawer = ref;
      }}
      openDrawerOffset={0.3}
      content={<SideBar nav={props} close={() => this.closeDrawer()} />}>
      <View style={[styles.header]}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onPress={() => props.navigation.navigate('dashboard')}>
              <Image
                source={require('../assets/img/home.png')}
                style={{
                  width: '30%',
                  height: 30,
                  resizeMode: 'stretch',
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
              {' '}
              All farms{' '}
            </Text>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
              تمام فارمز
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

      <SearchBar
        round={true}
        lightTheme={true}
        placeholder="Search..."
        round
        searchIcon={{size: 24}}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={search}
        value={data.searchText}
        // onClear={text => get_farms()}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{alignSelf: 'center', marginTop: 30, width: '95%'}}>
          <FlatList
            data={data.farm_info}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            numColumns={NUM_COLUMNS}
            ItemSeparatorComponent={this.separator}
          />
        </View>
      </View>
    </Drawer>
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

//Map State to Props
const mapStateToProps = state => {
  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
  };
};

//Map Dispatch to Props
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

//Export Connect Function
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Allfarms);
