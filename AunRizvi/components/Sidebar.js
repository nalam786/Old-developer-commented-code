import React, { Component } from 'react';
import { Image } from 'react-native'
import { Container, Button, Icon, Body, Right, Switch, Text, Content, Input, ListItem, Left, Item, View } from 'native-base';
import { AsyncStorage } from 'react-native';
export default class Sidebar extends Component {
 constructor(props) {
    super(props);
    this.state = {
    };
  }

    componentDidMount=()=>{

    }
    logout = async () => {

        try {
            await AsyncStorage.setItem('User_ID','');
          } catch (error) {
            // Error saving data
          }
            this.props.nav.navigation.navigate('signin');
          
      }
    render() {
        return (
            <View style={{ height:'100%',width:'100%',backgroundColor:'#359814'}}>
                 <View style={{alignSelf:"center",marginTop:20 ,borderRadius:150,backgroundColor:'white',height: 150,width: 150,padding:10 }} >
            <Image
            source={require('../assets/img/Infarmer.png')}
            style={{width:'100%', height: "100%",resizeMode: 'stretch',}}
            />
        </View >
                <Text onPress={ ()=> this.props.nav.navigation.navigate('allfarms') } style={{alignSelf:"center",color:'white',fontSize:17,marginTop:40}}>All farms</Text>
                <View style={{color:'white',borderBottomWidth:1,borderBottomColor:'white',marginTop:10,width:'80%',alignSelf:'center' }} />
                <Text onPress={ ()=> this.props.nav.navigation.navigate('feedback') } style={{alignSelf:"center",color:'white',fontSize:17,marginTop:20 }}>Feedback</Text>
                <View style={{color:'white',borderBottomWidth:1,borderBottomColor:'white',marginTop:10,width:'80%',alignSelf:'center' }} />
                {/* <Text onPress={ ()=> this.props.nav.navigation.navigate('signin') } style={{alignSelf:"center",color:'white',fontSize:17,marginTop:20 }}>Profile</Text>     */}
                <Text onPress={ ()=> this.logout() } style={{alignSelf:"center",color:'white',fontSize:17,marginTop:20 }}>logout</Text>    
            </View>        
        );
       
    }
    
}