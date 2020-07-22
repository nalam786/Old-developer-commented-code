
import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button,Footer } from 'native-base';
// import ProductCard2 from '../componente/ProductCard2';
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
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const ProductsData1 = [
  {
      id: 1,
      title: 'CREATE NEW FARMS',
      navigate:'general_form',
      image: require('../assets/img/Infarmer.png'),
  },
  {
    id: 2,
    title: 'ALL FARM',
    navigate:'allfarms',
    image: require('../assets/img/all_farm.png'),
  },
  {
    id: 3,
    title: 'SUGGESTIONS',
    navigate:'dashboard',
    image: require('../assets/img/suggestions.png'),
  },
  {
    id: 4,
    title: 'WEATHER',
    navigate:'dashboard',
    image: require('../assets/img/weather.png'),
  },
]



const Dashboard = (props) => {


  renderItem1 = ({ item, index }) => {
    let style = {};
    // console.log(props);
    if (index % NUM_COLUMNS1 !== 0) {
      style.borderLeftWidth = 3;
      style.borderLeftColor = "black";
  }
    return (
        <TouchableOpacity onPress={ ()=> props.navigation.navigate(item.navigate) } style={[styles.cart]} >
          <View    >
              {/* <ProductCard2 {...item} /> */}
              <View  >
                    <Image
                    source={item.image}
                    style={{width: 80, height: 80,resizeMode: 'stretch', alignSelf:'center',}}
                    />
              </View>
  
              <Text style={[styles.green_h2]}> {item.title} </Text>
          </View>
          </TouchableOpacity>
      );
  };

  separator1 = () => <View style={{height: 20,}} />;

  const NUM_COLUMNS1 = 2;


  return (
    <>
      {/* <StatusBar barStyle="dark" /> */}
      <View style={[styles.header]} >
         <View style={{flex:2, flexDirection: 'row',justifyContent: 'space-between', }}>
                <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',}} >
                        <Image
                                  source={require('../assets/img/menu.png')}
                                  style={{width: '30%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
                                  />
                    </View>

            {/* <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >
                  <Image
                  source={require('./menu.png')}
                  style={{width: '100%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
                  />
            </View> */}
           
            <View style={{flex:2,justifyContent: 'center',alignItems:'center', }} >
                <Text style={{color:"white",fontSize:20,fontWeight:'800'}} >  DASHBOARD</Text>

               
            </View>
            <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >

            <View  >
            </View>
            </View>
        </View>
      </View>
      
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{alignSelf:"center",marginTop:30, }} >
        <FlatList
                                data={ProductsData1}
                                renderItem={this.renderItem1}
                                keyExtractor={this.keyExtractor}
                                numColumns={NUM_COLUMNS1}
                                ItemSeparatorComponent={this.separator1}
                                
         />
        </View>
        
      </View>
      <Footer style={{ backgroundColor: '#00432b',}} >
        <View style={{ flexDirection: 'column',alignSelf:"center", }}>

              <Text style={{color: 'white',fontSize:15,fontWeight:'400',marginTop:20,alignSelf:"center"}} > معلومات براءے جدید فارمنگ</Text>
              <Text style={{color: 'white',fontSize:15,fontWeight:'400',marginBottom:10,alignSelf:"center"}} > INFPRMATION ABOUT MODERN FARMING</Text>
      </View>
      </Footer>
        
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',

    height:70,
    // marginTop:50,
    
  },
  cart:{
    height:200,
    width:'42%',
    marginRight:15,
    marginLeft:15,
    paddingTop:40,
    backgroundColor:'#d7f3db', 
    borderRadius:25,
  },
  cartbody:{
        paddingLeft:20,
        paddingRight:20,
  },
  input_button: {
    height: 40,
    width:300,
    backgroundColor:'#05422b',
    color:'red',
    alignSelf:"center",
    margin:0,
    marginTop:30,

  },
  input_phone_code: {
    height: 35,
    width:65,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
    marginRight:5,
    
  },
  input_phone: {
    height: 35,
    width:230,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20,
  },
  input_email: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30,
  },
  input_: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20,
  },
  green_h2: {
    color: '#05422b',
    fontWeight: '400',
    fontSize: 13,
    alignSelf:"center",
    marginTop:40,
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf:"flex-end",
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

export default Dashboard;
