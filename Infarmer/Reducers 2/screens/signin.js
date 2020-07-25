
import React from 'react';
import URL from '../URL';

import { 
  connect 
} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import { 
  Container, 
  Content, 
  Button 
} from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = (props) => {

  const [data, setData] = React.useState({
    email: '',
    password: ''  
});

  const textInputChange = (v,no) => {

    switch (no) {

        case 1:
          if( v.length !== 1 ) {
                data.email=v;   
          } 
          console.log('email:', data.email);
          break;

        case 2:
          if( v.length !== 2 ) {
                data.password=v;   
          } 
          console.log('password:', data.password)
          break;
          
    }

  }

  const signup = async () => {
    if (data.email == '' ||  data.password == '' ) {
      alert('Please fill all the fields');
      return false;
    }
      
    let U_data = {
        email: data.email,
        password: data.password
    }

    console.log("Login API Calling", U_data);

    await fetch(URL.url+'users/log_in', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ U_data })
    })
    
    .then(res => res.json())
    
    .then((resjson) => {

      if(resjson.Message == 'Successfully_Login'){
        props.user_id({user_id:resjson.data[0].id,farm_id:0,phone:data.phone_no,password:data.password,username:data.user_name,code:0});
        props.navigation.navigate('dashboard');
      }

      alert(resjson.Message);

    })
        
    .catch(err => {
      console.log('API Failed:', err);
      alert('Failed to Connect to Server: '+err);
    })
  
  };

  return (
    <>
     
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

      <View style={[styles.triangleCorner]} />
       
        <View style={{alignSelf:"center" }} >
          
          <Text style={[styles.green_h2]}>SIGN IN</Text>

          <TextInput
              placeholderTextColor="#272626"
              placeholder="Email"
              style={[styles.input_email]}
              onChangeText={(val) => textInputChange(val,1)}
            />
          <TextInput
              placeholderTextColor="#272626"
              secureTextEntry={true}
              placeholder="Password"
              style={[styles.input_]}
              onChangeText={(val) => textInputChange(val,2)}
          />
          <Text onPress={ ()=> props.navigation.navigate('forgetpass') } style={[styles.green_h6]}>Forget Password?</Text>
        
        </View>

        <Button onPress={ ()=> signup() } style={[styles.input_button]} full >
          <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >LOGIN</Text>
        </Button>

        <Text onPress={ ()=> props.navigation.navigate('signup') } style={[styles.green_h6,{alignSelf:"center",color:'green',marginTop:15}]}>Create A New Account!</Text>
        
        <View style={[styles.triangleCorner_bottom]} rotate={270} />

      </View>
      
    </>
  );
};

const styles = StyleSheet.create({

  input_button: {
    height: 40,
    width:300,
    backgroundColor:'#05422b',
    color:'red',
    alignSelf:"center",
    margin:0
  },

  input_email: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:30
  },

  input_: {
    height: 40,
    width:300,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'gray',
    borderWidth: 1,
    marginBottom:20
  },

  green_h2: {
    color: '#05422b',
    fontWeight: '700',
    fontSize: 40,
    alignSelf:"center",
    marginBottom:50
  },

  green_h6: {
    color: 'black',
    fontSize: 13,
    alignSelf:"flex-end"
  },

  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 130,
    borderTopWidth: 130,
    borderRightColor: 'transparent',
    borderTopColor: '#359814'
  },

  triangleCorner_bottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 130,
    borderBottomWidth: 130,
    borderLeftColor: 'transparent',
    borderBottomColor: '#359814',
    alignSelf:"flex-end"
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
    textAlign: 'right'
  }

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

export default connect(mapStateToProps,mapDispatchToProps)(App);