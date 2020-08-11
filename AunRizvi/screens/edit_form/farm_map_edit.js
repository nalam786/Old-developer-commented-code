import React from 'react';
import { Marker } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
} from 'react-native-maps';

import {
  connect
} from 'react-redux';
navigator.geolocation = require('@react-native-community/geolocation');

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
let temarr=[];

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
      editing: null,
      creatingHole: false
    };
  }
  calculateAreaInSquareMeters(x1, x2, y1, y2) {
    return (y1 * x2 - x1 * y2) / 2;
  }
  calculateYSegment(latitudeRef, latitude, circumference) {
    return (latitude - latitudeRef) * circumference / 360.0;
  }
  calculateXSegment(longitudeRef, longitude, latitude, circumference) {
    let val = (longitude - longitudeRef) * circumference * Math.cos((latitude * (3.1415926535 / 180))) / 360.0
    
    return (longitude - longitudeRef) * circumference * Math.cos((latitude * (3.1415926535 / 180))) / 360.0;
  }

  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
 
    let GeoJSON = {
      geometry: {
        type: 'Polygon',
        coordinates: []
      }
    };

    setTimeout(() => {
      console.log(this.state.polygons[0].coordinates)
      if (this.state.polygons[0] != undefined) {
        let b = 0
        let locations = this.state.polygons[0].coordinates;



        let radius = 6371000;

        const diameter = radius * 2;
        const circumference = diameter * 3.1415926535;
        const listY = [];
        const listX = [];
        const listArea = [];

        // calculate segment x and y in degrees for each point
        const latitudeRef = locations[0].latitude;
        const longitudeRef = locations[0].longitude;

        for (let i = 1; i < locations.length; i++) {
          let latitude = locations[i].latitude;
          let longitude = locations[i].longitude;
          listY.push(this.calculateYSegment(latitudeRef, latitude, circumference));
          listX.push(this.calculateXSegment(longitudeRef, longitude, latitude, circumference));
        }

        // calculate areas for each triangle segment
        for (let i = 1; i < listX.length; i++) {
          let x1 = listX[i - 1];
          let y1 = listY[i - 1];
          let x2 = listX[i];
          let y2 = listY[i];
          listArea.push(this.calculateAreaInSquareMeters(x1, x2, y1, y2));
        }
         // sum areas of all triangle segments
        let areasSum = 0;
        listArea.forEach(area => areasSum = areasSum + area)

        let areaCalc = Math.abs(areasSum);// Math.sqrt(areasSum * areasSum);  
        let acreArea = areaCalc * 0.000247105;
        //return areaCalc;
        console.log(acreArea);
        alert(acreArea);
      
        this.state.polygons[0].coordinates.map((data, keys) => (
          temarr.push([data.longitude, data.latitude])
        ));
        console.log(temarr);
        temarr.push(temarr[0]);
        console.log('New Tem Arr:'+temarr);
        GeoJSON.geometry.coordinates.push(temarr);
        console.log('-----------------');
        console.log(GeoJSON);
        let a = JSON.stringify(GeoJSON)
        this.props.map({ coordinates: a, });
      }

      this.props.navigation.navigate('general_form')
    }, 2000);
  }

  get_current_location() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      console.log(initialRegion)
      this.setState({ region: initialRegion })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 });

  }

  undo() {
    const { editing, creatingHole } = this.state;
    let a = []
    for (let index = 0; index < this.state.editing.coordinates.length-1; index++) {
      a.push(this.state.editing.coordinates[index])      
    }
    this.setState({
      editing: {
        ...editing,
        coordinates:a,
      }
    });
    this.state.editing.coordinates=a    
    console.log(a)
    console.log(this.state.editing.coordinates)
  }
  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {

      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });

    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    // if (this.state.editing) {
    //   alert(22)
    //   mapOptions.scrollEnabled = true;
    //   // mapOptions.onPanDrag = e => this.onPress(e);
    // }

    return (
      <View style={styles.container}>
        <MapView
         // region={this.state.region}
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          zoomEnabled={true}
          showsUserLocation={true}
          followUserLocation={true}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            >
            </Polygon>
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#FFFF00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            >
            </Polygon>
          )}
          {this.state.editing && (

            this.state.editing.coordinates.map((latlong, key) => (
              <Marker coordinate={latlong} title={"Point" + key} />
            ))
          )}

        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.get_current_location()}
            style={[styles.bubble, styles.button]}
          >
            <Text>
              Current Location
            </Text>
          </TouchableOpacity>

          {this.state.editing.coordinates.length > 4 && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}

        </View>
        {this.state.editing && (

      <TouchableOpacity
            onPress={() => this.undo()}
            style={[styles.bubble, styles.button,{position: 'absolute', right: 0, top: "5%"}]}
            // style={{position: 'absolute', right: 10, top: "50%"}}
          >
            <Text>Undo</Text>
          </TouchableOpacity>
                  )}

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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  map: {
    ...StyleSheet.absoluteFillObject
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },

  latlng: {
    width: 200,
    alignItems: 'stretch',
  },

  button: {
    width: 100,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    color: 'green'
    
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },

});

const mapStateToProps = (state) => {

  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
    map_r: state.map_redux
  }

};

const mapDispatchToProps = (dispatch) => {

  return {
    changeFlag: (data) => {
      dispatch({ type: 'CHANGE_FLAG', payload: data })
    },

    changeSignup: (data) => {
      dispatch({ type: 'SIGNUP_DATA', payload: data })
    },

    user_id: (data) => {
      dispatch({ type: 'USER_ID', payload: data })
    },
    map: (data) => {
      dispatch({ type: 'MAP', payload: data })
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(PolygonCreator);