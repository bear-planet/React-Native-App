import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground, Dimensions, TouchableNativeFeedback } from 'react-native';
import { UIManager } from 'react-native';
import { WebView} from 'react-native-webview';
import axios from 'axios';
import { render,ReactDOM } from 'react-dom';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PageScrollView from 'react-native-page-scrollview';


class Pic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_64 : null,
      fetch_img_64 : null,
      status : 'Welcome',
      choice : null,
      w: Dimensions.get('window').width,
      style_img: 'starry_night.jpg',
      imgArr: [
        require('./assets/starry_night.jpg'),
        require('./assets/caffe_night.jpg'),
        require('./assets/lake.jpg'),
        require('./assets/scream.jpg'),
        require('./assets/sea.jpg'),
        require('./assets/park.jpg'),
        require('./assets/women.jpg'),
        require('./assets/war.jpg')
      ]
    };
  }

  getFetch2=()=>{

   if(this.state.image_64 != null){

    this.setState({status: 'Please Wait...'})

    fetch('http://2559eab5f26a.ngrok.io/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fetch_img_64: this.state.image_64,
        user_choice: this.state.choice,
        style_img: this.state.style_img
      })
    }).then(response =>
      response.json().then(data => {
        console.log("success fetch :",data);
        this.setState({image: data.result , status: 'Welcome!'});

      })
    );
    }
    else{
      alert("Please select a picture or shoot!");
    }

  };
 
  
  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
       aspect: [3, 4],
       allowsEditing: true,
       base64: true,
    });
    if (!cancelled) this.setState({ image: uri , image_64: base64, choice: 'album'});
    console.log("image uri from phone:",this.state.image);
   // console.log("image uri base64 from phone:",this.state.image_64);
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      aspect: [9, 9],
      allowsEditing: false,
      base64: true,
    });
    this.setState({ image: uri , image_64: base64 , choice: 'camera'});
    console.log("image uri from camera:",this.state.image);
  };

  openCamera=()=>{

    const options = {
      title:null,
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'選擇相冊',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500/16*9,
      storageOptions: {
          skipBackup: true
      },
    }
    //在ImagePicker組件的launchCamera方法中，加入options參數，就可將圖片壓縮爲options中相應像素的照片
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
          return;
      } else {
          console.log(response);
      }
   });
  }


  //<Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+this.state.image_64}} />

  render() {
    return (
    <View style={styles.Pic_container}>
      <View style={styles.container_pic}>
        <Image style={styles.Pic_image} source={{ uri: this.state.image}} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.Pic_button} onPress={this.selectPicture}>
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Pic_button} onPress={this.takePicture}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Pic_button} onPress= {this.getFetch2} >
            <Text style={styles.text}>Upload!</Text>
          </TouchableOpacity>
        </View>
        <Text>{this.state.status},</Text>
      </View>
      <PageScrollView
       style={{width:this.state.w, height: this.state.w/16*9,flex:3}}
       builtinStyle= 'rotateChangeMode'
       builtinWH={{width:250, height:250/16*9}}
       imageArr={this.state.imgArr}
       ifAutoScroll={false}
       dealWithClickImage={
         (index)=>{
           //点击图片时需要执行的操作,index为当前点击到的图片的索引
           if(index==0)
           {
             this.setState({style_img:'starry_night.jpg',status:'梵谷《星空》'})
            // this.state.imgArr.map((data,index) => {})
           }
           else if(index==1)
             this.setState({style_img:'caffe_night.jpg',status:'《夜晚的咖啡座》'})
           else if(index==2)
             this.setState({style_img:'lake.jpg',status:'《湖》'})
           else if(index==3)
             this.setState({style_img:'scream.jpg',status:'《吶喊》'})
           else if(index==4)
             this.setState({style_img:'sea.jpg',status:'《波濤洶湧》'})
           else if(index==5)
             this.setState({style_img:'park.jpg',status:'《公園》'});
           else if(index==6)
             this.setState({style_img:'women.jpg',status:'《戴珍珠耳環的少女》'});
           else if(index==7)
             this.setState({style_img:'war.jpg',status:'《世紀大戰爭》'});
   
         }
       }
       currentPageChangeFunc={
         (currentPage)=>{

        if(currentPage==0)
           this.setState({status:'梵谷《星空》'})
        else if(currentPage==1)
          this.setState({status:'《夜晚的咖啡座》'})
        else if(currentPage==2)
          this.setState({status:'《湖》'})
        else if(currentPage==3)
          this.setState({status:'《吶喊》'})
        else if(currentPage==4)
          this.setState({status:'《波濤洶湧》'})
        else if(currentPage==5)
          this.setState({status:'《公園》'});  
        else if(currentPage==6)
          this.setState({status:'《戴珍珠耳環的少女》'});  
        else if(currentPage==7)
          this.setState({status:'《世紀大戰爭》'});  

       }}  />
    </View>
    )
  }
}