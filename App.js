import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground, Dimensions, TouchableNativeFeedback } from 'react-native';
import { UIManager, PermissionsAndroid, Platform, ScrollView} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
//import { WebView} from 'react-native-webview';
import axios from 'axios';
import { render,ReactDOM } from 'react-dom';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PageScrollView from 'react-native-page-scrollview';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import styles from './styles';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

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

class Pic_new extends React.Component {

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
        'https://i.imgur.com/MNShbM9.jpg',  // caffe_night.jpg
        'https://i.imgur.com/OvCOIiM.jpg', // lake.jpg
        'https://i.imgur.com/bK25pLN.jpg', // starry_night.jpg
        'https://i.imgur.com/nmiTXU4.jpg', // war.jpg
      ],
      photo_uri: null,
      isRefreshing: false
    };
  }

  getFetch2=()=>{

   if(this.state.image_64 != null){

    this.setState({status: 'Please Wait...'})

    fetch('http://14cf562dabbe.ngrok.io/api', {
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

  _downloadFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

     //permission for camera_roll
    if (status === "granted") {

       //store the cached file

       let gifDir = null;

       if(Platform.OS === 'android')
          gifDir = FileSystem.cacheDirectory;  //Directory: Android用 cacheDirectory 
       else if(Platform.OS === 'ios')    
          gifDir = FileSystem.documentDirectory; //iOS用 documentDirectory

       const dirInfo = await FileSystem.getInfoAsync(gifDir);
       if (!dirInfo.exists) {
         try{
         console.log('download directory doesn\'t exist, creating...');
         await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
         } catch(e) {
           const Info = await FileSystem.getInfoAsync(gifDir);
           console.log("ERROR",e,Info);
         }
       } 
       
       console.log('INNNNN',gifDir,dirInfo);
    
       const file = await FileSystem.downloadAsync(this.state.image , gifDir+'photo.jpg');

       console.log('Filedownloaded!!', file);

       //save the image in the galery using the link of the cached file
       const assetLink = await MediaLibrary.createAssetAsync(file.uri);
      // await MediaLibrary.createAlbumAsync('Planet', assetLink);
       alert('已儲存至',assetLink);
      
       console.log('done!');

    }
    else{
      console.log('No Permission');
    }
  };

  //<Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+this.state.image_64}} />

  _renderAllImage() {  
    let allImage = [];  
    let imgsArr = this.state.imgArr;  
    for (let i = 0; i < imgsArr.length; i++) {  
      let imgsItem = imgsArr[i];  
      allImage.push(  
        <Image key={i} source={{uri: imgsItem}} 
        style={ {width:800, height: 500}} />  
      );  
    }  
    return allImage;  
  }  


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
        <TouchableOpacity style={styles.Pic_button} onPress= {this._downloadFile} >
            <Text style={styles.text}>Save!</Text>
        </TouchableOpacity>
        <Text>{this.state.status},</Text>     
      </View>
      <ScrollView  
          ref='scrollView'  
          //水平方向  
          style ={{width:this.state.w, height: 500,flex:3}}
          horizontal={true}  
          //當值為true時顯示滾動條  
          showsHorizontalScrollIndicator={true}  
          //當值為true時，滾動條會停在滾動視圖的尺寸的整數倍位置。這個可以用在水平分頁上  
          pagingEnabled={true}  
          //滑動完一貞  
         // onMomentumScrollEnd={(e)=>{this._onAnimationEnd(e)}}  
          //開始拖拽  
        //  onScrollBeginDrag={()=>{this._onScrollBeginDrag()}}  
          //結束拖拽  
        //  onScrollEndDrag={()=>{this._onScrollEndDrag()}}  
          >  
          {this._renderAllImage()}  
        </ScrollView>  
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
      ],
      photo_uri: null
    };
  }

  getFetch2=()=>{

   if(this.state.image_64 != null){

    this.setState({status: 'Please Wait...'})

    fetch('http://14cf562dabbe.ngrok.io/api', {
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

  _downloadFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

     //permission for camera_roll
    if (status === "granted") {

       //store the cached file

       let gifDir = null;

       if(Platform.OS === 'android')
          gifDir = FileSystem.cacheDirectory;  //Directory: Android用 cacheDirectory 
       else if(Platform.OS === 'ios')    
          gifDir = FileSystem.documentDirectory; //iOS用 documentDirectory

       const dirInfo = await FileSystem.getInfoAsync(gifDir);
       if (!dirInfo.exists) {
         try{
         console.log('download directory doesn\'t exist, creating...');
         await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
         } catch(e) {
           const Info = await FileSystem.getInfoAsync(gifDir);
           console.log("ERROR",e,Info);
         }
       } 
       
       console.log('INNNNN',gifDir,dirInfo);
    
       const file = await FileSystem.downloadAsync(this.state.image , gifDir+'photo.jpg');

       console.log('Filedownloaded!!', file);

       //save the image in the galery using the link of the cached file
       const assetLink = await MediaLibrary.createAssetAsync(file.uri);
      // await MediaLibrary.createAlbumAsync('Planet', assetLink);
       alert('已儲存至',assetLink);
      
       console.log('done!');

    }
    else{
      console.log('No Permission');
    }
  };

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
        <TouchableOpacity style={styles.Pic_button} onPress= {this._downloadFile} >
            <Text style={styles.text}>Save!</Text>
        </TouchableOpacity>
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

class PageScroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      w: Dimensions.get('window').width,
      imgArr: [
        require('./assets/love.png'),
        require('./assets/cosmos.png'),
        require('./assets/people.png'),
      ]
    };
  }

  render() {
    return(
      <PageScrollView style={{width: this.state.w ,height: this.state.w/16*9 , backgroundColor: '#e6d1b1' }} imageArr={this.state.imgArr} 
        ifAutoScroll={false} />
    )
  }

}

class TopMess extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      w: Dimensions.get('window').width,
    };   
  }

  render() {
    return(
      <PageScrollView
	      style={{width:this.state.w, height:10 , alignItems:'center', backgroundColor:'#e6d1b1', flex:10,flexDirection:'row'}}
      	HorV="v"
      	ifShowPointerView={false}
      	datas={['[系統] 恭喜 隔壁老王 獲得超稀有星球 "溫泉星"','狂喜 ! YUSHA成功發現黃金十八猛漢!','早安 Face_Planet祝您~平安喜樂~']}
	      view={(i,data)=>{
	        return(
	           <View style={{backgroundColor:'#e6d1b1' , flexDirection:'row' , alignItems:'center', paddingLeft:8}}>
               <Image source={require('./assets/claim.png')} style={{width:50,resizeMode:'contain'}}></Image>
               <Text>{data}</Text>
             </View>
	        );
   	    }}  />
    )
  }

}

class PageScroll3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      w: Dimensions.get('window').width,
      style_img:null,
      imgArr: [
        require('./assets/starry_night.jpg'),
        require('./assets/caffe_night.jpg'),
        require('./assets/lake.jpg'),
        require('./assets/scream.jpg'),
        require('./assets/sea.jpg'),
        require('./assets/park.jpg'),
      ]
    };
  }

  render() {
    return(
      <PageScrollView
    style={{width:this.state.w,vheight: this.state.w/16*9,flex:4}}
    builtinStyle= 'rotateChangeMode'
    builtinWH={{width:250,height:250/16*9}}
    imageArr={this.state.imgArr}
    ifAutoScroll={false}
    dealWithClickImage={
      (index)=>{
        //点击图片时需要执行的操作,index为当前点击到的图片的索引
        if(index==0)
          this.setState({style_img:'starry_night.jpg'})
        else if(index==1)
          this.setState({style_img:'caffe_night.jpg'})
        else if(index==2)
          this.setState({style_img:'lake.jpg'})
        else if(index==3)
          this.setState({style_img:'scream.jpg'})
        else if(index==4)
          this.setState({style_img:'sea.jpg'})
        else if(index==5)
          this.setState({style_img:'park.jpg'});
        
        <Pic styles_img = {this.state.style_img} />   

      }
    }
    Text='hello' />
    )
  }

}

class MyWebComponent extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: require('./assets/lake.jpg'),
      NumberHolder : 1,
      imgArr : [
        require('./assets/p1.png'),
        require('./assets/p2.png'),
        require('./assets/p3.png'),
        require('./assets/p4.png'),
        require('./assets/p5.png'),
        require('./assets/hotpot.png')
      ],
      planet_image : require('./assets/p1.png')
    };   
  }

  GenerateRandomNumber=()=>{

    var RandomNumber = Math.floor(Math.random() * 6) ;

    this.setState({
      NumberHolder : RandomNumber,
      planet_image : this.state.imgArr[RandomNumber]
    })

  }

  render() {
    return(

      <View style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={this.state.planet_image}></Image>
      </View>
      <TouchableOpacity style={styles.button} onPress={this.GenerateRandomNumber}>
        <Text>RANDOM!</Text>
      </TouchableOpacity>
    </View>
    
    )
  }
  

}

export default function App() {
  
  return (
      <Pic_new />
   );

}










