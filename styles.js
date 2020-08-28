import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
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
        width: 300, 
        height: 300, 
        backgroundColor: 'gray',
      },
      button: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
      },
      container_pic: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',

      },
      row: {
        flexDirection: 'row'
      },
      text: {
        fontSize:21
      }

});