import React from 'react';
import Form_footer from '../components/report_footer';
import URL from '../URL';
navigator.geolocation = require('@react-native-community/geolocation');

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
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
      polygons: [],
      colors: ['red', 'green', 'orange', 'yellow'],
      note: '',
      polygons2: [],
    };
  }
  componentDidMount() {
    this.fetchdata();
  }
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
  fetchdata = async () => {
    let R_data = {
      f_farm_id: this.props.route.params.farm_id_,
    };

    console.log('Login API Calling', R_data);

    await fetch(URL.url + 'crop_health_reports/crop_health_report_get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({R_data}),
    })
      .then(res => res.json())

      .then(async resjson => {
        console.log('wow', resjson.data[0].map);

        var str = resjson.data[0].map;
        // '[{"geometry":{"type":"Polygon","coordinates":[[[74.34919975697994,31.5294936603615],[74.3760047480464,31.528747772424754],[74.36107188463211,31.506432395088108],[74.34919975697994,31.5294936603615]]]}},{"geometry":{"type":"Polygon","coordinates":[[[74.34151623398066,31.532158803603252],[74.3581972271204,31.53588461836935],[74.3518253043294,31.521825876874768],[74.34151623398066,31.532158803603252]]]}}]';
        var regex = /[+-]?\d+(\.\d+)?/g;
        var arr1 = [];

        var split_strings_1 = str.split('}},');

        console.log(split_strings_1);
        for (var str1 of split_strings_1) {
          var split_strings_2 = str1.split('],');
          var arr2 = [];
          for (var str2 of split_strings_2) {
            var floats = str2.match(regex).map(function(v) {
              return parseFloat(v);
            });
            var json = {latitude: floats[1], longitude: floats[0]};
            arr2.push(json);
          }
          arr1.push(arr2);
        }
        console.log('cook', arr1[0][0].latitude);
        this.setState({
          polygons: [],
          polygons: arr1,
          polygons2: arr1,
          note: resjson.data[0].notes,
          latitude_: arr1[0][0].latitude,
          longitude_: arr1[0][0].longitude,
          region: {
            latitude: arr1[0][0].latitude,
            longitude: arr1[0][0].longitude,

            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        // }
      })

      .catch(err => {
        console.log('API Failed:', err);
      });
  };

  render() {
    console.log('notes', this.state.region);
    const mapOptions = {
      scrollEnabled: true,
    };
    // console.log(this.state.polygons);
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
            {this.state.polygons.map(
              (polygon, index) => (
                console.log(JSON.stringify(this.state.polygons)),
                (
                  <Polygon
                    key={5}
                    coordinates={polygon}
                    // holes={polygon.holes}
                    strokeColor={this.state.colors[index]}
                    fillColor={this.state.colors[index]}
                    strokeWidth={2}
                    onPress={() => {
                      if (this.state.colors[index] == 'red') {
                        Alert.alert('Unhealthy');
                      } else {
                        Alert.alert('Healthy');
                      }
                    }}
                    tappable={true}
                  />
                )
              ),
            )}
          </MapView>
          {/* <View style={styles.buttonContainer}> */}
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
          {/*   </View> */}
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
            form_no={7}
            nav={this.props}
            farm_id_={this.props.route.params.farm_id_}
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
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
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
