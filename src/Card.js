import React, { useRef } from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions} from 'react-native';

const { screenwidth } = Dimensions.get('window');

export default function Card(props) {
    const cardRef = useRef();
    const {item, onCardClicked, index, styleAnim, isOpen, animating} = props;

    const getFontSize = () => {
        if(animating){
            var fontsize = animating.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 28],
                extrapolate: 'clamp'
              });
    
            return {
                fontSize: fontsize,
                fontWeight: '700',
                color: '#000000'
            }
        }  
    }

    const getImageSize = () => {
        if(animating){
          var height = animating.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 300],
              extrapolate: 'clamp',
            });
          var width = animating.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 600],
          extrapolate: 'clamp'
          });
          var right = animating.interpolate({
              inputRange: [0, 1],
              outputRange: [-180, 0],
              extrapolate: 'clamp'
          });
          var bottom = animating.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
              extrapolate: 'clamp'
          });
    
            return {
                width: width,
                height: height,
                right: right,
                bottom: bottom
            }
        }  
    }

    return(
        <TouchableOpacity style={styleAnim ? styles.animContainer : styles.cardcontainer} ref={cardRef}
        onPress={() => {
                  if (cardRef) {
                    cardRef.current.measure((x, y, width, height, pageX, pageY) => {
                      const layout = {x: pageX, y: pageY, width, height};
                      if (onCardClicked) {
                        onCardClicked({item, index, layout});
                      }
                    });
                  }
                }}>
          <View style={{width: '100%'}} >
            <Animated.Text numberOfLines={1} style={ styleAnim ? getFontSize() : styles.title}>{item.title}</Animated.Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

        <Animated.Image style={styleAnim ? getImageSize() : styles.image} source={item.image} resizeMode='contain'/>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({  
    cardcontainer:{
        flex:1,
        overflow: 'hidden',
        backgroundColor: '#eaeff6',
        borderRadius: 12,
        margin: 8,
        padding: 12,
        height: 140,
        width: screenwidth,
    },
    animContainer:{
        flex:1,
        overflow: 'hidden',
        backgroundColor: '#fff',
        height: 140,
        width: '90%',
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: '#000000',
    },
    description: {
      fontSize: 14,
      color: '#bfbfbf'
    },
    image:{
      width: 300,
      height: 150,
      right: -180,
      bottom: 30,
    },
  });