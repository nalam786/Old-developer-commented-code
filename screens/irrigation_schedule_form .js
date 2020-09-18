import React from 'react';
import Form_footer from '../components/report_footer2';
import URL from '../URL';
navigator.geolocation = require('@react-native-community/geolocation');
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import {Container, Content, Button, Footer} from 'native-base';

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [{longitude: 0, latitude: 0}],
      polygons2: [],
      note: '',
    };
  }
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('farm_id');
      if (value !== null) {
        // We have data!!
        console.log('twin', value);
        this.signup(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  finish() {
    this.setState({
      polygons: this.state.polygons2,
      region: {
        latitude: this.state.latitude_,
        longitude: this.state.longitude_,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });
  }
  get_current_location() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({region: initialRegion});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );
  }
  signup = async value => {
    console.log('in irrigation', this.props);
    let R_data = {
      f_farm_id: value,
    };

    console.log('Login API Calling', R_data);

    await fetch(URL.url + 'irrigation_schedules/irrigation_schedules_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({R_data}),
    })
      .then(res => res.json())

      .then(async resjson => {
        console.log(resjson);
        var regex = /[+-]?\d+(\.\d+)?/g;
        var arr = [];
        var split_strings = resjson.data[0].map.split('],');

        for (let x of split_strings) {
          var floats = x.match(regex).map(function(v) {
            return parseFloat(v);
          });
          var json = {latitude: floats[1], longitude: floats[0]};
          arr.push(json);
        }
        console.log('finksa', arr[0].latitude);
        this.setState({
          polygons: [],
          polygons: arr,
          polygons2: arr,
          note: resjson.data[0].notes,
          latitude_: arr[0].latitude,
          longitude_: arr[0].longitude,
          region: {
            latitude: arr[0].latitude,
            longitude: arr[0].longitude,

            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      })

      .catch(err => {
        console.log('API Failed:', err);
      });
  };

  render() {
    console.log('irri', this.props.route.params.farm_id);
    const mapOptions = {
      scrollEnabled: true,
    };

    return (
      <View>
        <View style={{height: '50%'}}>
          <MapView
            region={this.state.region}
            provider={this.props.provider}
            style={styles.map}
            mapType={MAP_TYPES.HYBRID}
            initialRegion={this.state.region}
            // onPress={e => this.onPress(e)}
            zoomEnabled={true}
            showsUserLocation={true}
            followUserLocation={true}
            {...mapOptions}>
            {/* {this.state.polygons.map(polygon => ( */}
            <Polygon
              key={5}
              coordinates={this.state.polygons}
              // holes={polygon.holes}
              strokeColor="blue"
              fillColor="rgba(44, 130, 201, 0.5)"
              strokeWidth={2}
            />
            {/* ))} */}
          </MapView>
          <TouchableOpacity
            onPress={() => this.get_current_location()}
            style={[
              styles.bubble,
              styles.button,
              {
                position: 'absolute', //use absolute position to show button on top of the map
                bottom: 0,
                alignSelf: 'center',
                paddingLeft: 0,
              },
            ]}>
            <Image
              source={require('../assets/img/hunt.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                marginLeft: 10,
                marginTop: 2.5,
                marginBottom: 2.5,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.finish()}
            style={[
              styles.bubble,
              styles.button,
              {
                position: 'absolute', //use absolute position to show button on top of the map
                bottom: 0,
                alignSelf: 'flex-end',
                paddingLeft: 0,
              },
            ]}>
            <Image
              source={require('../assets/img/refresh.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                marginLeft: 10,
                marginTop: 2.5,
                marginBottom: 2.5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('dashboard')}
            style={[
              styles.bubble,
              styles.button,

              {
                position: 'absolute', //use absolute position to show button on top of the map
                top: 0,
                alignSelf: 'flex-end',
                paddingLeft: 0,
              },
            ]}>
            <Image
              source={require('../assets/img/home.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                marginLeft: 10,
                marginTop: 2.5,
                marginBottom: 2.5,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{height: '39%'}}>
          <Text style={{marginTop: 5, marginLeft: 5, marginRight: 5}}>
            NOTE نوٹ{' '}
          </Text>
          <Text
            multiline={true}
            placeholderTextColor="#272626"
            placeholder="NOTE نوٹ"
            style={[styles.input_]}
            value={this.state.note}>
            {this.state.note}
          </Text>
        </View>

        <View style={{height: '11%'}}>
          <Form_footer
            style={{height: '100%'}}
            form_no={8}
            nav={this.props}
            temp={this.props.route.params.farm_id}
          />
        </View>
      </View>
    );
  }
}

PolygonCreator.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    height: '100%',
    width: '100%',
    top: 0,

    // ...StyleSheet.absoluteFillObject
  },
  input_: {
    width: '95%',
    marginLeft: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'gray',
    borderWidth: 1,

    flexWrap: 'wrap',
    lineHeight: 18,
    textAlign: 'right',
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 50,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
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
