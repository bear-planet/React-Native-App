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
      <Card/>
      
     );
  
  }