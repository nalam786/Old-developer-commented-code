
import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button, Footer } from 'native-base';

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
  TouchableOpacity,
  CheckBox,

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
    navigate: 'general_form',
    image: require('../assets/img/Infarmer.png'),
  },
  {
    id: 2,
    title: 'ALL FARM',
    navigate: 'allfarms',
    image: require('../assets/img/all_farm.png'),
  },
  {
    id: 3,
    title: 'SUGGESTIONS',
    navigate: 'dashboard',
    image: require('../assets/img/suggestions.png'),
  },
  {
    id: 4,
    title: 'WEATHER',
    navigate: 'dashboard',
    image: require('../assets/img/weather.png'),
  },
]

const Dashboard = (props) => {
  const [data, setData] = React.useState({
    rating: 0,
    
  });
  const changeData =(v) =>{
    alert(v)
    setData({
      ...data,
      rating: v,
    });
  }

  return (
    <>
      <View style={[styles.header]}>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>

          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
            <Image
              source={require('../assets/img/menu.png')}
              style={{ width: '30%', height: 30, resizeMode: 'stretch', marginLeft: 10, }}
            />
          </View>

          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }} >
            <Text style={{ color: "white", fontSize: 20, fontWeight: '800' }} >  Feedback</Text>
          </View>

          <View style={{ width: '10%', flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
            <View>
            </View>  
          </View>
          
      </View>
      </View>

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{ alignSelf: "center", marginTop: 30, }} >
        <View style={{alignSelf:"center" }} >

        <TextInput
              placeholderTextColor="#272626"
              placeholder="NOTE"
              style={[styles.input_email,{height: 80}]}
              onChangeText={(val) => textInputChange(val,1)}
            />
          
          <Text>Rate Us</Text>

        </View>
          
          <View style={{ flexDirection: 'row',alignSelf:"center",marginTop:30, }}>
          
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={1==data.rating}
                onValueChange={(val) => changeData(1)}
              />
              <Text style={{alignSelf:"center", }} >1</Text>
            </View>

            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >         
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={2==data.rating}
                onValueChange={(val) => changeData(2,)}
              />
              <Text style={{alignSelf:"center" }} >2</Text>           
            </View>
            
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={3==data.rating}
                onValueChange={(val) => changeData(3)}
              />
              <Text style={{alignSelf:"center" }} >3</Text>
            </View>
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={4==data.rating}
                onValueChange={(val) => changeData(4)}
              />
              <Text style={{alignSelf:"center" }} >4</Text>
            </View>
            <View style={{ flexDirection: 'column',alignSelf:"center",flex:1 }} >
              <CheckBox 
                style={{alignSelf:"center",borderRadius:50, }}
                value={5==data.rating}
                onValueChange={(val) => changeData(5)}
              />
              <Text style={{alignSelf:"center" }} >5</Text>
            </View>
          
          </View>
          
          
        <Button onPress={ ()=> signup() } style={[styles.input_button]} full >
          <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >SUBMIT</Text>
        </Button>
        </View>

      </View>
      <Footer style={{ backgroundColor: '#00432b', }} >
        <View style={{ flexDirection: 'column', alignSelf: "center", }}>

          <Text style={{ color: 'white', fontSize: 15, fontWeight: '400', marginTop: 20, alignSelf: "center" }} > معلومات براءے جدید فارمنگ</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '400', marginBottom: 10, alignSelf: "center" }} > INFPRMATION ABOUT MODERN FARMING</Text>
        </View>
      </Footer>

    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#359814',

    height: 70,
    // marginTop:50,

  },
  cart: {
    height: 200,
    width: '42%',
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 40,
    backgroundColor: '#d7f3db',
    borderRadius: 25,
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
    alignSelf: "center",
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
  green_h2: {
    color: '#05422b',
    fontWeight: '400',
    fontSize: 13,
    alignSelf: "center",
    marginTop: 40,
  },
  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf: "flex-end",
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
