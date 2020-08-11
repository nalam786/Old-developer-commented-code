/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Reducers/form_reducer';

import App from './App';

import splash from './screens/splash';
import signup from './screens/signup';
import otp from './screens/otp';
import signin from './screens/signin';
import forgetpass from './screens/forgetpass';
import resetpass from './screens/resetpass';
import dashboard from './screens/dashboard';
import manageprofile from './screens/manageprofile';
import allfarms from './screens/allfarms';
import general_form from './screens/general_form';
import land_preperation_form from './screens/land_preperation_form';
import seed_form from './screens/seed_form';
import pesticide_form from './screens/pesticide_form ';
import irrigation_form from './screens/irrigation_form ';
import harvesting_form from './screens/harvesting_form';
import crop_health_form from './screens/crop_health_form';
import irrigation_schedule_form from './screens/irrigation_schedule_form ';
import expected_yield_form from './screens/expected_yield_form';
import form_footer from './components/form_footer';
import farm_map from './screens/farm_map';
import crop_health_report from './screens/crop_health_report';
import feedback from './screens/feedback';

import {name as appName} from './app.json';

const store = createStore(reducer);

const ReduxRender_customise = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxRender_customise);
