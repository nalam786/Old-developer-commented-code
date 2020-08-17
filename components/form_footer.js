import React from 'react';
import {Circle, Triangle} from 'react-native-shape';
import {Container, Content, Button, Footer} from 'native-base';

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
} from 'react-native';

const form_footer = props => {
  return (
    <>
      <View style={[styles.footer]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {props.form_no == 2 ? (
            <View style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('land_preperation_form')
                }>
                <Image
                  source={require('../assets/img/Land.png')}
                  style={{
                    width: '90%',
                    height: 45,
                    marginLeft: 10,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              onPress={() =>
                props.nav.navigation.navigate('land_preperation_form')
              }
              style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('land_preperation_form')
                }>
                <Image
                  source={require('../assets/img/Land.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          {props.form_no == 3 ? (
            <View style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => props.nav.navigation.navigate('seed_form')}>
                <Image
                  source={require('../assets/img/seeds.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => props.nav.navigation.navigate('seed_form')}>
                <Image
                  source={require('../assets/img/seeds.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {props.form_no == 5 ? (
            <View style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('irrigation_form')
                }>
                <Image
                  source={require('../assets/img/irrigation.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('irrigation_form')
                }>
                <Image
                  source={require('../assets/img/irrigation.png')}
                  style={{
                    width: '100%',
                    height: 30,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {props.form_no == 10 ? (
            <View style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => props.nav.navigation.navigate('pesticide_form')}>
                <Image
                  source={require('../assets/img/fertilizer.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('fertilizer_form')
                }>
                <Image
                  source={require('../assets/img/fertilizer.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {props.form_no == 4 ? (
            <View style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => props.nav.navigation.navigate('pesticide_form')}>
                <Image
                  source={require('../assets/img/pesticites.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => props.nav.navigation.navigate('pesticide_form')}>
                <Image
                  source={require('../assets/img/pesticites.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          {props.form_no == 7 ? (
            <View
              onPress={() => props.nav.navigation.navigate('crop_health_form')}
              style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('crop_health_form')
                }>
                <Image
                  source={require('../assets/img/crop_health.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              onPress={() => props.nav.navigation.navigate('crop_health_form')}
              style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('crop_health_form')
                }>
                <Image
                  source={require('../assets/img/crop_health.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={[styles.footer_box]}>
            <Image
              source={require('../assets/img/dash.png')}
              style={{
                width: '100%',
                height: 45,

                resizeMode: 'contain',
              }}
            />
          </View>
          {props.form_no == 6 ? (
            <View
              onPress={() => props.nav.navigation.navigate('harvesting_form')}
              style={[styles.footer_box, {backgroundColor: '#359814'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('harvesting_form')
                }>
                <Image
                  source={require('../assets/img/harvetsing.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.footer_box]}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() =>
                  props.nav.navigation.navigate('harvesting_form')
                }>
                <Image
                  source={require('../assets/img/harvetsing.png')}
                  style={{
                    width: '100%',
                    height: 45,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.footer_box]}>
            <Image
              source={require('../assets/img/dash.png')}
              style={{
                width: '100%',
                height: 45,

                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer_box: {
    backgroundColor: '#00432b',
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center',
    margin: 1,
    padding: 15,
  },

  footer_box_data: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default form_footer;
