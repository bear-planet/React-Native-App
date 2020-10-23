import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      app_container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      btn: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnn: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 10
      },

      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null,
        flexDirection: 'column'

      },
      text_st: {
        alignItems: "center",
        justifyContent: 'center',
        fontSize : 20,
        fontWeight: 'bold'
      },
      Text_view: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
      },
      image: {
        width: 350, 
        height: 350, 
        resizeMode: 'contain',
        marginTop:200
      },
      Pic_container:{
        flex:1,
        marginTop: 30,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
      },
      Pic_image: {
        width: 300, 
        height: 400, 
        backgroundColor: 'gray'
      },
      Pic_button: {
        marginTop:30,
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
      },
      button: {
        padding: 10,
        margin: 15,
        backgroundColor: '#dddddd',
        justifyContent: 'center',  
      },
      container_pic: {
        flex: 9,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',

      },
      row: {
        flexDirection: 'row'
      },
      text: {
        fontSize:21
      },
      PageScroll: {
        width : '100%',
        height : 230,
        backgroundColor: '#ffffff'
      }

});