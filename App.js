import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import splash from './screens/splash';
import signup from './screens/signup';
import signin from './screens/signin';
import forgetpass from './screens/forgetpass';
import resetpass from './screens/resetpass';
import otp from './screens/otp';
import dashboard from './screens/dashboard';
import manageprofile from './screens/manageprofile';
import feedback from './screens/feedback';
import weather from './screens/weather';
import allfarms from './screens/allfarms';
import general_form from './screens/general_form';
import land_preperation_form from './screens/land_preperation_form';
import seed_form from './screens/seed_form';

import pesticide_form from './screens/pesticide_form ';
import fertilizer_form from './screens/fertilizer_form';
import irrigation_form from './screens/irrigation_form ';
import harvesting_form from './screens/harvesting_form';
import crop_health_form from './screens/crop_health_form';
import irrigation_schedule_form from './screens/irrigation_schedule_form ';
import expected_yield_form from './screens/expected_yield_form';
import form_footer from './components/form_footer';
import crop_health_report from './screens/crop_health_report';
import farm_map from './screens/farm_map';
import farm_map_edit from './screens/edit_form/farm_map_edit';
import test_footer from './screens/test_footer';

// edit
import general_form_edit from './screens/edit_form/general_form';
import land_preperation_form_edit from './screens/edit_form/land_preperation_form';
import seed_form_edit from './screens/edit_form/seed_form';
import pesticide_form_edit from './screens/edit_form/pesticide_form ';
import irrigation_form_edit from './screens/edit_form/irrigation_form ';
import harvesting_form_edit from './screens/edit_form/harvesting_form';
import crop_health_form_edit from './screens/edit_form/crop_health_form';

const Stack = createStackNavigator();

function HomeScreen(props) {
  console.log(props);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text onPress={() => props.navigation.navigate('screen1')}>
        Home Screen
      </Text>
    </View>
  );
}

function Screen1() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Screen1</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="feedback" component={feedback} /> */}
        {/* <Stack.Screen name="land_preperation_form" component={irrigation_form} />  */}
        {/* <Stack.Screen name="dashboard" component={dashboard} /> */}
        {/* <Stack.Screen name="general_form" component={general_form} />  */}
        {/* <Stack.Screen name="signin" component={signin} /> */}
        {/* <Stack.Screen name="farm_map" component={farm_map} /> */}
        {/* <Stack.Screen name="forgetpass" component={forgetpass} /> */}
        {/* <Stack.Screen name="land_preperation_form" component={land_preperation_form} /> */}
        {/* <Stack.Screen name="seed_form" component={seed_form} /> */}
        {/* <Stack.Screen name="test_footer" component={test_footer} /> */}
        {/* <Stack.Screen name="irrigation_form" component={irrigation_form} /> */}
        <Stack.Screen name="splash" component={splash} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="otp" component={otp} />
        <Stack.Screen name="signin" component={signin} />
        <Stack.Screen name="forgetpass" component={forgetpass} />
        <Stack.Screen name="resetpass" component={resetpass} />
        <Stack.Screen name="dashboard" component={dashboard} />
        <Stack.Screen name="manageprofile" component={manageprofile} />
        <Stack.Screen name="allfarms" component={allfarms} />

        <Stack.Screen name="farm_map" component={farm_map} />
        <Stack.Screen name="farm_map_edit" component={farm_map_edit} />
        <Stack.Screen name="general_form" component={general_form} />
        <Stack.Screen
          name="land_preperation_form"
          component={land_preperation_form}
        />
        <Stack.Screen name="seed_form" component={seed_form} />
        <Stack.Screen name="pesticide_form" component={pesticide_form} />
        <Stack.Screen name="fertilizer_form" component={fertilizer_form} />
        <Stack.Screen name="irrigation_form" component={irrigation_form} />
        <Stack.Screen name="harvesting_form" component={harvesting_form} />
        <Stack.Screen
          name="land_preperation_form_edit"
          component={land_preperation_form_edit}
        />
        <Stack.Screen name="crop_health_form" component={crop_health_form} />
        <Stack.Screen
          name="crop_health_report"
          component={crop_health_report}
        />
        <Stack.Screen
          name="irrigation_schedule_form"
          component={irrigation_schedule_form}
        />
        <Stack.Screen
          name="expected_crop_yield_form"
          component={expected_yield_form}
        />
        <Stack.Screen name="form_footer" component={form_footer} />

        <Stack.Screen name="general_form_edit" component={general_form_edit} />

        <Stack.Screen name="seed_form_edit" component={seed_form_edit} />
        <Stack.Screen
          name="pesticide_form_edit"
          component={pesticide_form_edit}
        />
        <Stack.Screen
          name="irrigation_form_edit"
          component={irrigation_form_edit}
        />
        <Stack.Screen
          name="harvesting_form_edit"
          component={harvesting_form_edit}
        />
        <Stack.Screen
          name="crop_health_form_edit"
          component={crop_health_form_edit}
        />

        <Stack.Screen name="feedback" component={feedback} />
        <Stack.Screen name="weather" component={weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
