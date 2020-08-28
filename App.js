import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { render,ReactDOM } from 'react-dom';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

class  Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'User',
    };
  }

  decide=()=>{
    
    if(this.state.name=='Yaris')
      this.setState({name: 'User'})
    else if(this.state.name== 'User')
      this.setState({name: this.props.name})
    else if(this.state.name== this.props.name)
      this.setState({name: 'Yaris'})

  }

  render() {
    return (
    <View style={styles.Text_view}>
      <TouchableOpacity onPress={()=> this.decide()} style={styles.btnn}>
        <Text style={styles.text_st}>Change User!</Text>
      </TouchableOpacity>
      <Text style = {styles.text_st}>Hello, {this.state.name}</Text>
    </View>
    )
  }
}

class Fetch_flask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: null,
      img_base64: null,
    };
  }

  getFetch=()=>{
    fetch('http://172.31.231.55:5000/api').then((response) =>
      response.blob().then((ImageBlob) => {
        console.log("sucess fetch :");
        img = document.createElement('IMG');
        document.querySelector('.newImg').appendChild(img)
         // 將 blog 物件轉為 url
        img.src = URL.createObjectURL(imageBlob);
        
      })
      .catch((error)=>{
        console.log("fail fetch :", error);
      })
    );

  };

  getFetch2=()=>{

    fetch('http://172.31.231.55:5000/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img_base64: this.props.img_base64,
      })
    }).then(response =>
      response.json().then(data => {
        console.log("success fetch :",data);
        this.setState({text: data.img_base64});
      })
    );
  };

  View_content=()=>{
    <TouchableOpacity onPress={()=> this.getFetch2()} style={styles.btnn}>
       <Image source= {require('./assets/fetch_button.png')} />
    </TouchableOpacity>   
  }

  render() {
    return (
    <View style={styles.btn} >
       <Text style = {styles.text_st}>Hello, {this.state.text}</Text>
    </View>
    )
  }
  
}

class Pic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_64 : null,
      fetch_img_64 : null
    };
  }

  getFetch2=()=>{

   if(this.state.image_64 != null){

    fetch('http://d03ef9df956d.ngrok.io/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fetch_img_64: this.state.image_64,
      })
    }).then(response =>
      response.json().then(data => {
        console.log("success fetch :",data);
        this.setState({text: data.fetch_img_64});
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
       aspect: [9, 9],
       allowsEditing: true,
       base64: true
    });
    if (!cancelled) this.setState({ image: uri , image_64: base64});
    console.log("image uri from phone:",this.state.image);
    console.log("image uri base64 from phone:",this.state.image_64);
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      base64: true
    });
    this.setState({ image: uri , image_64: base64});
    console.log("image uri from camera:",this.state.image);
    console.log("image uri from camera:",this.state.image_64);
  };

  Upload_to_fetch = () => {

    if(this.state.image_64 != null){
       <Fetch_flask img_base64 = {this.state.image_64}/>
       alert("Upload Success!")
    }
    else
       alert("Please Select a photo!");

  }


  render() {
    return (
      <View style={styles.container_pic}>
        <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+this.state.fetch_img_64}} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this.selectPicture}>
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.takePicture}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress= {this.getFetch2} >
            <Text style={styles.text}>Upload!</Text>
          </TouchableOpacity>
        </View>
        <Text>Hello, {this.state.image_64}</Text>
      </View>
    )
  }

  
}



export default function App() {

  var url = "http://172.31.231.55:5000/api";
  var name = 'Lika' ;
  var img;
  var uri = 'https://images.unsplash.com/photo-1513313778780-9ae4807465f0?auto=format&fit=crop&w=634&q=80';
  <Text>Hello! Yusha! Hi!</Text>

  const getAxios=()=>{
    axios.get('http://172.31.231.55:5000/api').then((response)=>{
        console.log("sucess axios :",response.data);
    });
  };


  return (
  <View style={styles.container}>
   <ImageBackground source= {require('./assets/spot.jpg')} style={styles.backgroundImage}>
      <Welcome id='user' name= {name} />  
      <Pic />
    </ImageBackground>
  </View>      
   );

}










