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
} from 'react-native';

import { Container, Content, Button, Footer } from 'native-base';

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
      polygons: [{"longitude":74.34699464589357,"latitude":31.513625539153338},{"longitude":74.36654258519411,"latitude":31.508436183674178},{"longitude":74.34757970273495,"latitude":31.5245020991306}],
      note:'',

    };
  }
componentDidMount(){
  this.signup()
}
  finish() {
    const { polygon } = this.state;
    this.setState({
      polygons: [...polygons],
    });
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
      this.setState({ region: initialRegion })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 });

  }
   signup = async () => {

    
      
    let R_data = {
        f_farm_id: this.props.user_ids.user_id
    }

    console.log("Login API Calling", R_data);

    await fetch(URL.url+'irrigation_schedules/irrigation_schedules_get', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ R_data })
    })
    
    .then(res => res.json())
    
    .then(async(resjson) => {

      if(resjson.data[0].map != '' && resjson.data[0] != undefined ){
      let map =JSON.parse(resjson.data[0].map);

      let array =[]
      for (let i = 0; i < (map.geometry.coordinates[0].length-1); i++) {
        let temp={"longitude":map.geometry.coordinates[0][i][0],"latitude":map.geometry.coordinates[0][i][1]}
        array.push(temp)
      }
      this.state.polygons=array
      
      this.setState({
        polygons:array,
        note:resjson.data[0].notes
      });

    }

    })
        
    .catch(err => {
      console.log('API Failed:', err);
    })
  
  };

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    

    return (
     <View>
      <View style={{height:"50%"}} >
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
          {...mapOptions}
        >
          {/* {this.state.polygons.map(polygon => ( */}
            <Polygon
              key={5}
              coordinates={this.state.polygons}
              // holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            >
            </Polygon>
          {/* ))} */}
        
        </MapView>
        <TouchableOpacity
            onPress={() => this.get_current_location()}
            style={[styles.bubble,{backgroundColor:"white"}]}
          >
            <Text style={{alignSelf:"center"}} >
              Current Location
            </Text>
          </TouchableOpacity>
      </View>
      
      <View style={{height:'43%'}} >
        
      <TextInput
              placeholderTextColor="#272626"
              // secureTextEntry={true}
              placeholder="NOTE"
              style={[styles.input_]}
              value={this.state.note}
              onChangeText={(val) => textInputChange(val,2)}
          />
      </View>
     
  
      <View style={{height:'7%'}} >
        <Form_footer  style={{height:'100%'}}  form_no={8} nav={this.props} />
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
    alignItems: 'center'
  },

  map: {
   height:'100%',
   width:'100%',
   top:0
   
    // ...StyleSheet.absoluteFillObject
  },
  input_: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    marginTop:50

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