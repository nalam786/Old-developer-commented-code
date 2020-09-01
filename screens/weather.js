import React from 'react';
import Form_footer from '../components/report_footer';
import URL from '../URL';
import SideBar from '../components/Sidebar';
navigator.geolocation = require('@react-native-community/geolocation');

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  drawer,
  FlatList,
} from 'react-native';

import {Container, Content, Button, Footer, Picker, Drawer} from 'native-base';

import MapView, {MAP_TYPES, Polygon, ProviderPropType} from 'react-native-maps';

import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class PolygonCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: [],
      slectedform: 0,
      forecastdata: [],
    };
  }

  componentDidMount() {
    this.fetchfarms();
  }

  async fetchweather() {
    console.log('selected vaue');
    console.log(this.state.slectedform);
    console.log(URL.url + 'weather/get_forecast');
    let W_data = {
      farm_id: this.state.slectedform,
    };
    await fetch(URL.url + 'weather/get_forecast', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({W_data}),
    })
      .then(res => res.json())
      .then(resjson => {
        this.setState({
          forecastdata: resjson.data,
        });
      })
      .catch(err => {
        console.log('Failed to Get Farms: ', err);
      });
  }
  async fetchfarms() {
    // props.user_ids.user_id,
    let F_Data = {
      f_user_id: this.props.user_ids.user_id,
    };
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
        console.log(JSON.stringify(resjson.data));
        this.setState({formdata: resjson.data});
      })
      .catch(err => {
        console.log('Failed to Get Farms: ', err);
      });
  }
  farmlist = () => {
    return this.state.formdata.map((x, i) => {
      return <Picker.Item label={x.farm_name} key={i} value={x.id} />;
    });
  };
  openDrawer = () => {
    // console.log("i am")
    this.drawer._root.open();
  };
  renderItem = ({item, index}) => {
    return (
      <View>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    );
  };
  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        openDrawerOffset={0.3}
        content={<SideBar nav={this.props} close={() => this.closeDrawer()} />}>
        <View>
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
                onPress={() => this.openDrawer()}>
                <View
                  onPress={() => this.openDrawer()}
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
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
                  WEATHER (موسم)
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
              width: '10%',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          />
          <View
            style={{
              margin: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#359814',
              overflow: 'hidden',
            }}>
            <Picker
              placeholder={'Choose Store'}
              selectedValue={this.state.slectedform}
              style={{
                width: '100%',

                borderWidth: 10,
                color: 'grey',
              }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({slectedform: itemValue}, () => {
                  this.fetchweather();
                });
                this.fetchweather();
                console.log('saif', itemIndex);

                console.log('saif', itemValue);
              }}>
              {this.farmlist()}
            </Picker>
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <View style={{flex: 2}}>
              <Text style={{fontSize: 22, color: 'green'}}>Date</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/low_temp.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text>°C</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/high_temp.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text>°C</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/average_temp.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text>°C</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/cloudy.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text>m/s</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/humidity.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text> %</Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                source={require('../assets/img/rain.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text>mm</Text>
            </View>
          </View>
          <FlatList
            data={this.state.forecastdata}
            // renderItem={this.renderItem}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', margin: 10, flex: 1}}>
                <View style={{flex: 2}}>
                  <Text style={{color: 'green'}}>{item.forecast_date}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.t_min}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.t_max}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.t_avg}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.cloud_cover}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.rain_mm}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{Number(item.wind_speed_ms).toFixed(2)}</Text>
                </View>
                {/* <Text style={{flex: 1}}>{item.forecast_date}</Text>
                <Text style={{flex: 1}}>{item.t_min}</Text>
                <Text style={{flex: 1}}>{item.t_max}</Text>
                <Text style={{flex: 1}}>{item.t_avg}</Text>
                <Text style={{flex: 1}}>{item.cloud_cover}</Text>
                <Text style={{flex: 1}}>{item.rain_mm}</Text>
                <Text style={{flex: 1}}>{item.wind_speed_ms}</Text> */}
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Drawer>
    );
  }
}

// PolygonCreator.propTypes = {
//   provider: ProviderPropType,
// };

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',
    height: 70,
  },
});

const mapStateToProps = state => {
  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
    map_r: state.map_redux,
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
    map: data => {
      dispatch({type: 'MAP', payload: data});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PolygonCreator);
