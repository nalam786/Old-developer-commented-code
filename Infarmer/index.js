/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
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
import { createStore } from 'redux'
import reducer from './Reducers/form_reducer';
import { Provider } from 'react-redux'




import {name as appName} from './app.json';
const store = createStore(reducer);
const ReduxRender_customise = () =>{
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName,() =>ReduxRender_customise);
