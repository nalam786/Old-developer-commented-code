import React from 'react';
import Form_footer from '../components/report_footer';

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

const { width, height } = Dimensions.get('window');

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
      polygons: []
    };
  }

  finish() {
    const { polygon } = this.state;
    this.setState({
      polygons: [...polygons],
    });
  }

  

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    

    return (
      <View style={styles.container}>
      <MapView
        provider={this.props.provider}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={this.state.region}
        {...mapOptions}
      >
        {this.state.polygons.map(polygon => (
          <Polygon
            key={1}
            coordinates={[{"longitude":31.5204,"latitude":74.3587},{"longitude":74.3587,"latitude":31.5204},{"longitude":74.3587,"latitude":32.790730965147205},{"longitude":74.43892315775155,"latitude":32.79029167118311}]}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={10}
          />
        ))}
      
      </MapView>
      <Form_footer form_no={7} nav={this.props} />
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
    alignItems: 'center'
  },

  map: {
   height:'50%',
   width:'100%',
   top:0
   
    // ...StyleSheet.absoluteFillObject
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
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
});

const mapStateToProps = (state) => {

  return {
    flag:state.flag,
    signup:state.signup_redux,
    user_ids:state.user_id_redux,
    map_r:state.map_redux
  }

};
  
const mapDispatchToProps = (dispatch) => {

  return {
    changeFlag: (data) =>{
      dispatch({ type:'CHANGE_FLAG',payload:data})
    },
    
    changeSignup: (data) =>{
      dispatch({ type:'SIGNUP_DATA',payload:data})
    },
    
    user_id: (data) =>{
      dispatch({ type:'USER_ID',payload:data})
    },   
    map: (data) =>{
      dispatch({ type:'MAP',payload:data})
    }     
  }

};

export default connect(mapStateToProps,mapDispatchToProps)(PolygonCreator);