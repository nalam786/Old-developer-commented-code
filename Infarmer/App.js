import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import resetpass from './screens/resetpass';
import signup from './screens/signup';
import opt from './screens/opt';
import forgetpass from './screens/forgetpass';
import manageprofile from './screens/manageprofile';
import dashboard from './screens/dashbord';
import dashboard1 from './screens/dashbord1';



import signin from './screens/signin';
import splash from './screens/splash';
import allfarms from './screens/allfarms';
import form_footer from './componente/form_footer';
import general_form from './screens/general_form';
import land_prepration_form from './screens/land_prepration_form';
import seed_form from './screens/seed_form';
import use_of_pesticide_form from './screens/use_of_pesticide_form ';
import irrigation_form from './screens/irrigation_form ';
import harvesting_form from './screens/harvesting_form';
import crop_health_form from './screens/crop_health_form'; 
import irrigation_schedule_form from './screens/irrigation_schedule_form ';
import excepted_crop_yield_form from './screens/excepted_crop_yield_form';    
import test_screen from './screens/test_screen';


const Stack = createStackNavigator();

function HomeScreen(props) {
  console.log(props)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={ ()=> props.navigation.navigate('screen1') }>Home Screen</Text>
    </View>
  );
}


function Screen1() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen1</Text>
    </View>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>

        {/* <Stack.Screen name="allfarms" component={allfarms} /> */}
        <Stack.Screen name="splash" component={splash} />
        <Stack.Screen name="signin" component={signin} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="forgetpass" component={forgetpass} />
        <Stack.Screen name="opt" component={opt} />
        <Stack.Screen name="resetpass" component={resetpass} />
        <Stack.Screen name="dashboard" component={dashboard1} />
        <Stack.Screen name="allfarms" component={allfarms} />
        <Stack.Screen name="general_form" component={general_form} /> 
        <Stack.Screen name="land_prepration_form" component={land_prepration_form} />
        <Stack.Screen name="seed_form" component={seed_form} />
        <Stack.Screen name="use_of_pesticide_form" component={use_of_pesticide_form} />
        <Stack.Screen name="irrigation_form" component={irrigation_form} />
        <Stack.Screen name="harvesting_form" component={harvesting_form} />
        <Stack.Screen name="crop_health_form" component={crop_health_form} />
        <Stack.Screen name="irrigation_schedule_form" component={irrigation_schedule_form} />
        <Stack.Screen name="excepted_crop_yield_form" component={excepted_crop_yield_form} />
        <Stack.Screen name="form_footer" component={form_footer} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;