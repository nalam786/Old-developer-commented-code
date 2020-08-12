import React from 'react';
import { Circle, Triangle } from 'react-native-shape';
import { Container, Content, Button, Footer,DatePicker } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import URL from '../URL';
import {
  connect
} from 'react-redux';
import Slider from 'react-native-slider';



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
Picker,
// ScrollView,

} from 'react-native';

import {
Header,
LearnMoreLinks,
Colors,
DebugInstructions,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Feedback = (props) => {
const [data, setData] = React.useState({
rating: 5,
note:'',
photo:'',
crop:'',
didmount:0,
fb_list:[],
});
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
const changeData =(v) =>{
  console.log(v.value);
  // alert(v)

setData({
...data,
rating: v.value,

});
}
const textInputChange = (v,no) => {

  switch (no) {

    case 1:
      if( v.length !== 1 ) {
        data.note=v;
        }
        console.log('email:', data.note);
      break;

    case 2:
      if (v.length !== 0) {
        var d = new Date(v);
        var y = d.getFullYear();
        var m = d.getMonth();
        var day = d.getDate();
        var date = '';
        if (day < 10 && m < 10) {
          date = y + '-0' + m + '-0' + day;
        } else {
          if (day < 10) {
            date = y + '-' + m + '-0' + day;
          }
          if (m < 10) {
            date = y + '-0' + m + '-' + day;
          }
        }
        
        data.date = date;
      }
      setData({
        ...data,
        date: date,
      });
      console.log(data.date);
      break;
      case 4:
      if( v.length !== 1 ) {
        data.crop=v;

        }
        setData({
          ...data,
          crop: v,
        });
        console.log('email:', data.note);
      break;
      
}




};
const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
const image_upload=()=>{
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image picked')
        // const source = { uri: response.uri };
  
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response.uri)
        // const source = { uri: response.uri };
        // let size = response.fileSize / 1048576;
        //console.log("image size", response.fileSize / 1048576)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //console.log("file size of image", response.fileSize / 1024000)
        
          
            setData({
                ...data,
              photo: response
            });
            // handleUploadPhoto(1)
          
        
  
      }
    });
  
  }
 const handleUploadPhoto = async (v) => {
    // await fetch(URL.url+'personal_information/UploadImagess', {
    //     method: "GET",
    //   })
    
    await fetch(URL.url+'feedbacks/UploadImages', {
      method: "POST",
      body: createFormData(data.photo,{ userId: v })
    })
      .then(response => response.json())
      .then(response => {
        if (response.Successful) {
        //  alert("Uploaded")
        //  console.log(response.name)
         // console.log(response.uri)
          // this.setState({
          //   image_name:response.name,
          //   image_uri:response.uri
          // })
          // console.log(this.state.image_name)
          // console.log(this.state.image_uri)
  
        }
        else{
        //  alert("Upload Failed")
        }
        //  alert("Upload success!");
      })
      .catch(error => {
        console.log("upload error", error);
      //  alert("Upload failed!");
      });
  };
const sendFeedback1 =async () => {
  // if (v.length !== 0) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      date = y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        date = y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        date = y + '-0' + m + '-' + day;
      }
    }
  let FB_Data = {
    id:props.user_ids.user_id,
    // email:data.date,
    fb_form_id:1,
    fb_admin_response:'',
    fb_image:'',
    fb_notes:'',
    fb_rating: data.rating,
    fb_crop:'',
    fb_created_by:props.user_ids.user_id,
    fb_created_at:date,
    
  }
  console.log(FB_Data)
  // await fetch(URL.url+'users/countr_data', {
  await fetch(URL.url+'feedbacks/feedbacks_create', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({FB_Data}),
  })
  .then(console.log('User Data:'+FB_Data))
  .then(res => res.json())
  .then((resjson) => {

    if(resjson.Message == 'Feedbacks Successfully Submitted'){
      alert("Feedback Successfully Submitted.");
    props.navigation.navigate('dashboard');
    }
    
    alert(resjson.Message);
    
  })

  .catch(err => {
    console.log('Registered Failed', err);
    alert('Unable to Register: '+err);
  })






    // alert("Feedback Successfully Submitted.");
    // props.navigation.navigate('dashboard');
};
const sendFeedback2 =async () => {
  // if (v.length !== 0) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      date = y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        date = y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        date = y + '-0' + m + '-' + day;
      }
    }
  let FB_Data = {
    fb_form_id:2,
    id:props.user_ids.user_id,
    fb_admin_response:'',
    fb_image:'',
    fb_notes: data.note,
    fb_crop: data.crop,
    fb_created_by:props.user_ids.user_id,
    fb_created_at:date,
    
  }
  console.log(FB_Data)
  // await fetch(URL.url+'users/countr_data', {
  await fetch(URL.url+'feedbacks/feedbacks_create', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({FB_Data}),
  })
  .then(console.log('User Data:'+FB_Data))
  .then(res => res.json())
  .then((resjson) => {

    if(resjson.Message == 'Feedbacks Successfully Submitted'){
      alert("Feedback Successfully Submitted.");
    props.navigation.navigate('dashboard');
    }
    
    alert(resjson.Message);
    
  })

  .catch(err => {
    console.log('Registered Failed', err);
    alert('Unable to Register: '+err);
  })






    // alert("Feedback Successfully Submitted.");
    // props.navigation.navigate('dashboard');
};
const sendFeedback3 =async () => {
  // if (v.length !== 0) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    var date = '';
    if (day < 10 && m < 10) {
      date = y + '-0' + m + '-0' + day;
    } else {
      if (day < 10) {
        date = y + '-' + m + '-0' + day;
      }
      if (m < 10) {
        date = y + '-0' + m + '-' + day;
      }
    }
  let FB_Data = {
    id:props.user_ids.user_id,
    // email:data.date,
    fb_form_id:3,
    fb_admin_response:'',
    fb_image:'',
    fb_notes:data.note,
    fb_crop:'',
    fb_created_by:props.user_ids.user_id,
    fb_created_at:date,
    
  }
  console.log(FB_Data)
  // await fetch(URL.url+'users/countr_data', {
  await fetch(URL.url+'feedbacks/feedbacks_create', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({FB_Data}),
  })
  .then(console.log('User Data:'+FB_Data))
  .then(res => res.json())
  .then((resjson) => {

    if(resjson.Message == 'Feedbacks Successfully Submitted'){
      alert("Feedback Successfully Submitted.");
    props.navigation.navigate('dashboard');
    }
    
    alert(resjson.Message);
    
  })

  .catch(err => {
    console.log('Registered Failed', err);
    alert('Unable to Register: '+err);
  })






    // alert("Feedback Successfully Submitted.");
    // props.navigation.navigate('dashboard');
};
const getFeedback =async () => {
  // alert(21222)
   
  let FB_Data = {
    id:props.user_ids.user_id,
  }
  console.log(FB_Data)
  // await fetch(URL.url+'users/countr_data', {
  await fetch(URL.url+'feedbacks/feedbacks_get', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({FB_Data}),
  })
  .then(console.log('User Data:'+FB_Data))
  .then(res => res.json())
  .then((resjson) => {

    if(resjson.Message == 'Feedbacks Get Successfully'){
      data.fb_list=resjson.data
      setData({
        ...data,
        fb_list: resjson.data,
      });
      console.log(resjson);
    }
    
    alert(resjson.Message);
    
  })

  .catch(err => {
    console.log('Registered Failed', err);
    alert('Unable to Register: '+err);
  })

};
if (data.didmount == 0) {

  getFeedback();
  data.didmount = 1;

  setData({

    ...data,
    didmount: 1

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
<Text style={{ color: "white", fontSize: 20, fontWeight: '800' }} > Feedback</Text>
</View>

<View style={{ width: '10%', flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
<View>
</View>
</View>

</View>
</View>
<ScrollView>

<View style={{
flex: 1,
flexDirection: 'column',
justifyContent: 'space-between',
width:'90%',
justifyContent:'center',
alignItems:'center',
alignSelf:'center'
}}>
<View style={{ alignSelf: "center", marginTop: 30, }} >
<View style={{alignSelf:"center" }} >

<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >How do you rate our advisory services?</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >ہمارے مشورہ آپ کتنا مفید سمجھتے ہیں؟</Text>
<Text> (Please score us on a scale from 1 to </Text>
<Text> 10 with 10 as excellent and 1 as poor) </Text>
<Text>( براہے کرم ہمیں ۱ سے ۱۰ کے درمیان لائک کریں ۱ کا مطلب مفید نہیں اور ۱۰ کا مطلب بہت مفید ہے)</Text>
<View style={styles.container}>
    <Text style={{fontSize:16,color:'green',fontWeight:'bold',marginTop:10 }} >Rating: {data.rating}</Text>
        <Slider
        minimumValue={0}
        maximumValue={10}
        value={data.rating}
        step={1}
        thumbTintColor={'#05422b'}
        minimumTrackTintColor={'green'}
        onValueChange={(value) =>changeData({value})}
        />

      </View>
</View>
<Button onPress={ ()=> sendFeedback1() } style={[styles.input_button]} full >
<Text style={{color:"white",fontSize:15,fontWeight:'800'}} >SUBMIT</Text>
</Button>
<View style={{ alignSelf: "center", marginTop: 30, width: "95%" }} >
<View style={{color:'white',borderBottomWidth:1,borderBottomColor:'#05422b',marginTop:10,width:'80%',alignSelf:'center' }} />

<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > If your crop is affected by a disease and</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > and you don’t know what it is and how to</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > to manage it, please upload the close </Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > picture of your affected crop and we would  </Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > detect the disease and inform you about</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} > the next steps.</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >اگر آپ کی فصل بیماری سے متاثر ہے اور آپ کا علم اس کے متعلق کم ہے تو براہ کرم اپنے پودے/فصل کی ایک قریب سے تصویر کھینچ کر اپ لوڈ کریں_ہمارا ماڈل بیماری کو تشخیص کرکے آپ کو مطلع کرے گا اور مزید رہنمائی بھی کرے گا-</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold',marginTop: 30 }} >Crop (فصل):</Text>
<View style={[styles.input_email]} >
              <Picker
                onValueChange={(itemValue, itemIndex) => textInputChange(itemValue, 4)}
                selectedValue={data.crop}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Wheat (گندم)" value="Wheat" />
                <Picker.Item label="Rice (چاول)" value="Rice" />
                <Picker.Item label="Cotton (روئی)" value="Cotton" />
                <Picker.Item label="Soybean (سویا بین)" value="Soybean" />
                <Picker.Item label="Other (دیگر)" value="Other" />
              </Picker>
            </View>
<Text style={{fontSize:16,color:'green',fontWeight:'bold',marginTop: 0 }} >Note (نوٹ):</Text>
<TextInput
placeholderTextColor="#272626"
style={[styles.input_email,{height: 50}]}
onChangeText={(val) => textInputChange(val,1)}
/>

            </View>
<Button onPress={ ()=> image_upload() } style={[{backgroundColor:'green'}]} full >
<Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Upload</Text>
</Button>

<Button onPress={ ()=> sendFeedback2() } style={[styles.input_button]} full >
<Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Submit</Text>
</Button>
<Text style={{fontSize:16,color:'green',fontWeight:'bold',marginTop: 30 }} >If you have any other question in regard</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >to your farm, crop and soil health, please</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >write the details in the text area below </Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >and we will contact you to give our feedback.</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >and we will contact you to give our feedback.</Text>
<Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >اگر آپ کو فارم،فصل اور زمین کی صہت کے باکے میں کچھ معلومات چاہیے تو براہ کرم اپنا سوال نیچے درج کریں</Text>

<Text style={{fontSize:16,color:'green',fontWeight:'bold',marginTop: 20 }} >Note (نوٹ):</Text>
<TextInput
placeholderTextColor="#272626"
style={[styles.input_email,{height: 50,marginBottom:0}]}
onChangeText={(val) => textInputChange(val,1)}
/>
<Button onPress={ ()=> sendFeedback3() } style={[styles.input_button]} full >
<Text style={{color:"white",fontSize:15,fontWeight:'800'}} >Submit</Text>
</Button>
</View>

</View>
<View style={[styles.border_bottom]} ></View>
{
          data.fb_list.map((
            list,
              keys,
            ) => (
              list.form_id==1 ? (
                <View style={{ alignSelf: "center", marginTop: 5, width: "95%" }} >

            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Rating</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.rating}</Text>
            </View>
            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Date</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.created_at}</Text>
            </View>
            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Admin Response</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
          <Text style={{ fontSize: 15}} >{list.admin_response}</Text>
            </View>
            <View style={[styles.border_bottom,{marginTop:5,marginBottom:5,}]} ></View>

          </View>
          
              ) : (<View ></View>)
            
          ))
          
}
{
          data.fb_list.map((
            list,
              keys,
            ) => (
              list.form_id==2 ? (
                <View style={{ alignSelf: "center", marginTop: 5, width: "95%" }} >

            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Crop</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.crop}</Text>
            </View>
            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Note</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.notes}</Text>
            </View>
            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Date</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.created_at}</Text>
            </View>
            <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Admin Response</Text>
            <View style={{ alignSelf: "center", width: "90%" }} >
          <Text style={{ fontSize: 15}} >{list.admin_response}</Text>
            </View>
            <View style={[styles.border_bottom,{marginTop:5,marginBottom:5,}]} ></View>

          </View>
          
              ) : (<View ></View>)
            
          ))
          
}
{
          data.fb_list.map((
            list,
              keys,
            ) => (
              list.form_id==3 ? (
                <View style={{ alignSelf: "center", marginTop: 5, width: "95%" }} >

                
                <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Note</Text>
                <View style={{ alignSelf: "center", width: "90%" }} >
                  <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.notes}</Text>
                </View>
                <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Date</Text>
                <View style={{ alignSelf: "center", width: "90%" }} >
                  <Text style={{fontSize:13,fontWeight:'bold',color:'#05422b' }} >{list.created_at}</Text>
                </View>
                <Text style={{fontSize:16,color:'green',fontWeight:'bold' }} >Admin Response</Text>
                <View style={{ alignSelf: "center", width: "90%" }} >
              <Text style={{ fontSize: 15}} >{list.admin_response}</Text>
                </View>
                <View style={[styles.border_bottom,{marginTop:5,marginBottom:5,}]} ></View>
    
              </View>
          
              ) : (<View ></View>)
            
          ))
          
}
<Footer style={{ backgroundColor: '#00432b', }} >
<View style={{ flexDirection: 'column', alignSelf: "center", }}>

<Text style={{ color: 'white', fontSize: 15, fontWeight: '400', marginTop: 20, alignSelf: "center" }} > معلومات براءے جدید فارمنگ</Text>
<Text style={{ color: 'white', fontSize: 15, fontWeight: '400', marginBottom: 10, alignSelf: "center" }} > INFPRMATION ABOUT MODERN FARMING</Text>
</View>
</Footer>
</ScrollView>
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
height: 70
},
container: {
  // flex: 1,
  // marginLeft: 10,
  // marginRight: 10,
  alignItems: 'stretch',
  justifyContent: 'center',
},
border_bottom: {
  height: '1%',
  width:'95%',
  borderTopWidth:0,
  borderLeftWidth:0,
  borderRightWidth:0,
  borderBottomColor:'gray',
  borderWidth: 1,
  marginTop:15,
  marginBottom:15,
  alignSelf:'center',
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
marginTop: 30
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
marginRight: 5
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
marginBottom: 20
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
const mapStateToProps = (state) => {

  return {
    flag: state.flag,
    signup: state.signup_redux,
    user_ids: state.user_id_redux,
    map_cord: state.map_redux,
    area_:state.area_of_poligon,
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    changeFlag: (data) => {
      dispatch({ type: 'CHANGE_FLAG', payload: data })
    },
    changeSignup: (data) => {
      dispatch({ type: 'SIGNUP_DATA', payload: data })
    },
    user_id: (data) => {
      dispatch({ type: 'USER_ID', payload: data })
    }

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
