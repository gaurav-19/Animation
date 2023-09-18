import React from "react";

const { Text, Image, TouchableOpacity, StyleSheet, Animated } = require("react-native")

const Button = (props) => {
    let translation = React.useRef(new Animated.Value(props.initialvalue)).current;  
    
    Animated.timing(translation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();

    const opacity =  translation.interpolate({
      inputRange: [0, props.initialvalue],
      outputRange: [1 , 0],
      // duration: 800,
      extrapolate: 'clamp'
    })

    return(
      <Animated.View
      style={{
        transform: [{translateX: translation}],
        opacity: opacity,
      }}
      >
        <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 4,
            marginVertical: 10,
          }}>
            <Text style={{fontWeight:'bold', fontSize: 16, color: '#000000'}}>{props.text}</Text>
            <Image style={styles.icon} source={{uri: 'https://cdn-icons-png.flaticon.com/512/109/109617.png'}} resizeMode='contain'/>
        </TouchableOpacity>
      </Animated.View>
        
    )
}

const styles = StyleSheet.create({  
    icon:{
        height: 20,
        width: 20, 
      }
  });

export default Button;