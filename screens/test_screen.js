//File Not in Use

// import React from 'react';
// import { Circle, Triangle } from 'react-native-shape';
// import { Container, Content, Button,Footer,DatePicker } from 'native-base';
// import Form_footer from '../components/form_footer';
// import Form2 from '../components/test_form';
// import { connect } from 'react-redux';

// import {
//   Safetext_inputView,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   FlatList,
//   Picker,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const form_1 = (props) => {

//   const [data, setData] = React.useState({
//     didmount:0,
//     rander_flag:0,
//     radio_input:[],
//     select_input:[],
//     date_input: [],
//     text_input:[],
//     index:0,

// });

//   renderForm = () =>{

//       data.select_input.push({select_input:''})
//       data.radio_input.push({radio_input:''})
//       data.date_input.push({date_input:new Date()})
//       data.text_input.push({text_input:''})
//             setData({
//             ...data,
//             select_input: data.select_input         //you can use any mandatory field here
//         });

//   }
//   const sendform = async () => {
//       if ( data.select_input.length <= 0 ||  data.date_input.length <= 0 || data.text_input.length <= 0 )
//        {
//           alert('Please fill all the fields');
//           return false;
//         }
//           for (let i = 0; i < data.select_input.length; i++) {
//               let F_data = {
//                 select_input: data.select_input[i],
//                 date_input: data.date_input[i],
//                 text_input: data.text_input[i],
//                 radio_input:data.radio_input[i],
//               }
//               console.log("Qualification in final call API................", F_data)
//               // await fetch(URL.url + 'user/user_create', {
//               //     method: 'POST',
//               //     headers: {
//               //         Accept: 'application/json',
//               //         'Content-Type': 'application/json',
//               //     },
//               //     body: JSON.stringify({ U_data }),
//               // })
//               //     .then(res => res.json())
//               //     .then((resjson) => {
//               //       if(resjson.Message == 'Successfully Registered'){
//               //         send_sms()
//               //         props.navigation.navigate('dashboard')
//               //       }

//               //         alert(resjson.Message)
//               //     }
//               //     )
//               //     .catch(err => {
//               //         console.log('failed', err)
//               //         alert('failed'+err)

//               //     })
//           }
//     }
//     if (props.flag.flag==1) {

//       switch (props.flag.s_key) {
//         case 2:
//           data.select_input[props.flag.index].select_input=props.flag.value
//         break;
//         case 4:
//           data.date_input[props.flag.index].date_input=props.flag.value
//         break;
//         case 5:
//           data.text_input[props.flag.index].text_input=props.flag.value
//         break;
//         case 100:
//           data.radio_input[props.flag.index].radio_input=props.flag.value
//         break;
//         default:
//           break;
//       }
//       props.changeFlag({flag:0,s_key:'s_key',index:'index',value:'value'})
//       console.log('==============================')
//     }
//   if (props.flag.flag==2) {

//       data.select_input.splice(props.flag.index,1)
//       data.date_input.splice(props.flag.index,1)
//       data.text_input.splice(props.flag.index,1)
//       data.radio_input.splice(props.flag.index,1)

//       if(data.rander_flag == 0){
//           this.renderForm();
//           data.rander_flag=1
//           setData({
//               ...data,
//               select_input: data.select_input,
//               rander_flag:1,
//           });

//       }

//     props.changeFlag({flag:0,s_key:'s_key',index:'index',value:'value'})

//   }
//   if(data.didmount == 0){   //
//     this.renderForm();
//     data.didmount=1
//     setData({
//       ...data,
//       didmount:1,
//     });
//   }
//   return (
//     <>
//       {/* <StatusBar barStyle="dark" /> */}
//       <ScrollView style={styles.scrollView}>
//             <View style={[styles.header]} >
//               <View style={{flex:2, flexDirection: 'row',justifyContent: 'space-between', }}>
//                       <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',}} >
//                               <Image
//                                         source={require('../assets/img/menu.png')}
//                                         style={{width: '30%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
//                                         />
//                           </View>

//                   {/* <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >
//                         <Image
//                         source={require('./menu.png')}
//                         style={{width: '100%', height: 30,resizeMode: 'stretch',marginLeft:10,}}
//                         />
//                   </View> */}

//                   <View style={{flex:2,justifyContent: 'center',alignItems:'center', }} >
//                       <Text style={{color:"white",fontSize:20,fontWeight:'800'}} > test</Text>

//                   </View>
//                   <View style={{width: '10%',flex:1,flexDirection: 'column',justifyContent: 'center',}} >

//                   <View  >
//                   </View>
//                   </View>
//               </View>
//             </View>

//             <View style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}>
//         <View style={{alignSelf:"center",marginTop:30,width:"95%" }} >

//         {
//             data.select_input.map((select_input, keys) => (     //you can use  mandatory field here

//                 <Form2
//                     index={keys+1}
//                     select_input={data.select_input}
//                     radio_input={data.radio_input}
//                     date_input={data.date_input}
//                     text_input={data.text_input}
//                     index2={keys}
//                 />

//             ))

//         }
//         </View>
//       </View>
//       <View>
//           <Button onPress={ ()=> renderForm() } style={[styles.input_button]} full >
//             <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >ADD FORM</Text>
//           </Button>
//       </View>
//       <View>
//           <Button onPress={ ()=> sendform() } style={[styles.input_button]} full >
//             <Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Submit</Text>
//           </Button>
//       </View>
//       <Form_footer form_no={2} nav={props} />
//       </ScrollView>

//     </>
//   );
// };

// const styles = StyleSheet.create({

//   header: {
//     backgroundColor: '#359814',

//     height:70,
//     // marginTop:50,

//   },

//   input_button: {
//     height: 40,
//     width:300,
//     backgroundColor:'#05422b',
//     color:'red',
//     alignSelf:"center",
//     margin:0,
//     marginBottom:20,

//   },

//   scrollView: {
//     backgroundColor: Colors.lighter,
//     height:'100%'
//   },

//   body: {
//     backgroundColor: Colors.white,
//   },

// });

// const mapStateToProps = (state) => {
//   return {
//     flag:state.flag
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//       changeFlag: (data) =>{
//           dispatch({ type:'CHANGE_FLAG',payload:data})
//       }
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(form_1);
