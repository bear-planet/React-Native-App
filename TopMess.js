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
            style={{width:this.state.w, height:10 , alignItems:'center', backgroundColor:'#e6d1b1', flex:1,flexDirection:'row'}}
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