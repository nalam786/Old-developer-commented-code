
import React from 'react';
import URL from '../URL';
import { connect } from 'react-redux';

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
} from 'react-native';

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
      Crop:'RICE',
      Season: 'RABI',
      SowingDate: '20 July 2020',
  },
  {
    id: 2,
    Name: 'NEW FARMS1',
      Area: '3Acres',
      Crop:'RICE',
      Season: 'RABI',
      SowingDate: '20 July 2020',
  },
  {
    id: 3,
    Name: 'NEW FARMS1',
      Area: '3Acres',
      Crop:'RICE',
      Season: 'RABI',
      SowingDate: '20 July 2020',
  },
  {
    id: 4,
    Name: 'NEW FARMS1',
    Area: '3Acres',
    Crop:'RICE',
    Season: 'RABI',
    SowingDate: '20 July 2020',
  },
]


const Allfarms = (props) =>  {
  const [data, setData] = React.useState({
    farm_info: [],
    didmount:0,
    

    
});

  const get_farms = async () => {
    
    let data = {
      f_farm_id:props.user_ids.user_id
       
  
    }
    //  console.log(Q_data)
    console.log("Qualification in final call API................", data)
    await fetch(URL.url+'farms/farms_get', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
        .then(res => res.json())
        .then((resjson) => {
          if(resjson.Message == 'Farm Get Successfully'){
            data.farm_info=resjson.data
            setData({
              ...data,
              farm_info:resjson.data,
            });
          }
          console.log(data.farm_info)
  
        }
        )
        .catch(err => {
            console.log('failed', err)
  
        })
  
  }
  if(data.didmount == 0){   //
    get_farms();
    data.didmount=1
    setData({
      ...data,
      didmount:1,
    });
  }
  // console.log(props)
  renderItem = ({ item, index }) => {
    let style = {};
    let season=JSON.stringify(item.season)
    console.log(item.id);
    if (index % NUM_COLUMNS !== 0) {
      style.borderLeftWidth = 3;
      style.borderLeftColor = "black";
  }
    return (
  
          <View  style={[styles.cart]} >
              {/* <ProductCard2 {...item} /> */}
              <View  style={{flex:2,flexDirection: 'column',justifyContent: 'space-between',}} >
                  <View><Text style={[styles.green_h2_start]}> FARM {item.farm_name} </Text></View>
                  <View>
                    <Text style={[styles.green_h6_start]}>AREA:رقبہ </Text>
                      <Text style={[styles.green_h6_start,{color:'#359814',fontWeight: 'bold'}]}>{item.area} </Text>
                  </View>
                    
                    <View>
                      <Text style={[styles.green_h6_start]}>CROP: </Text>
                      <Text style={[styles.green_h6_start,{color:'#359814',fontWeight: 'bold'}]}>{item.crop} </Text>
                    </View>
                    <View>
                          <Text style={[styles.green_h6_start]}>SEASON: </Text>
                          {/* <Text style={[styles.green_h6_start,{color:'#359814',fontWeight: 'bold'}]}>{item.season} </Text> */}
                          <Picker 
                            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            // selectedValue={props.select_input[props.index2].select_input}
                            selectedValue={season}
                          >
                          <Picker.Item label="SEASON" value="" />
                          <Picker.Item label="Rabi" value="0" />
                          <Picker.Item label="Kharif" value="1" />
                          <Picker.Item label="Yearly" value="2" />
                          <Picker.Item label="Otherly" value="3" />
                          </Picker>
                    </View>
                    <View>
                          <Text style={[styles.green_h6_start]}>SOWING DATE: </Text>
                          <Text style={[styles.green_h6_start,{color:'#359814',fontWeight: 'bold'}]}>{item.sowing_date} </Text>
                    </View>
  
  
              </View>
  
              <View  style={{flex:1,flexDirection: 'column',justifyContent: 'center',alignItems:'center'}} >
  
                        <View style={[styles.box,{backgroundColor:'#359814'}]} >
                        <Text style={{color:'#fff'}} >رپورٹ دیکھیں </Text>
                            <Text style={{color:'#fff'}} >VIEW REPORT </Text>
                        </View>
                    <View style={[styles.box,{backgroundColor:'#05422b',marginVertical:5}]} >
                        <Image
                              source={require('../assets/img/edit.png')}
                              style={{width: '15%', height: '20%',resizeMode: 'stretch',}}
                              />
                         <Text style={{color:'#fff'}} >تبدیل کریں </Text>
                            <Text style={{color:'#fff'}} >EDIT </Text>
                    </View>
                    <View style={[styles.box,{backgroundColor:'#05422b'}]} >
                      <Image
                                source={require('../assets/img/delete.png')}
                                style={{width: '15%', height: '20%',resizeMode: 'stretch'}}
                                />
                    <Text style={{color:'#fff'}} >مسخ کریں </Text>
                            <Text style={{color:'#fff'}} >DELETE </Text>
                    </View>
              </View>
          </View>
      );
  };
  separator = () => <View style={{height: 3,}} />;
  
  const NUM_COLUMNS = 1;
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
                <Text style={{color:"white",fontSize:20,fontWeight:'800'}} >  ALL FARMS</Text>

               
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
        <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >
        <FlatList
                                data={data.farm_info}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                                numColumns={NUM_COLUMNS}
                                ItemSeparatorComponent={this.separator}
                                
         />
        </View>
        
      </View>
      
        
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#05422b',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:80,

    // marginTop:50,
    
  },
  paragraph: {
    backgroundColor: '#359814',
    fontSize:8,
    
    // marginTop:50,
    
  },
  header: {
    backgroundColor: '#359814',

    height:70,
    // marginTop:50,
    
  },
  cart:{
    backgroundColor:'#d7f3db', 
    borderRadius:10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:'5%',
    paddingRight:'5%',
    // paddingTop:'3%',
    paddingVertical:'3%',
    

    
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
  green_h6_start: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    alignSelf:"flex-start",
    // marginTop:50,

  },
  green_h2_start: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    alignSelf:"flex-start",
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


const mapStateToProps = (state) => {
  return {
    flag:state.flag,
    signup:state.sugnup_recux,
    user_ids:state.user_id_recux


  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
      changeFlag: (data) =>{
          dispatch({ type:'CHANGE_FLAG',payload:data})
      },
      changeSignup: (data) =>{
        dispatch({ type:'SUGNUP_DATA',payload:data})
    },
    user_id: (data) =>{
      dispatch({ type:'USER_ID',payload:data})
  }
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Allfarms);