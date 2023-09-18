import React from 'react';
import {View, Animated, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Button from './Button';


function getSharedElementOpacityStyle(animatedValue) {
  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.995, 1],
    outputRange: [0, 0, 1],
  });
  return {
    opacity: opacityInterpolation,
    paddingHorizontal: 0,
  };
}

const DetailedScreen = ({index, data, onCardClicked, animatedValue}) => {
  var item = data;
  const transitionLayerStyle = getSharedElementOpacityStyle(animatedValue);

  // Animation for colors flatlist
  let translation = React.useRef(new Animated.Value(150)).current;  
  Animated.timing(translation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
  }).start();

  const opacity =  translation.interpolate({
      inputRange: [0, 150],
      outputRange: [1, 0],
      extrapolate: 'clamp'
  })

  return (
    <Animated.View style={[transitionLayerStyle]}>
      <View style={styles.detailedContainer}>
        <ScrollView>
            <View 
            style={styles.textContainer}>
              <View>
                <Text style={styles.dtitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => {
              if (onCardClicked) {
                onCardClicked();
              }
            }}>
                <Image style={styles.icon} source={{uri: 'https://cdn-icons-png.flaticon.com/512/109/109602.png'}} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <Image style={[styles.dimage, 
          ]} source={item.image} resizeMode='contain'/>
            
            <Animated.FlatList 
            style={{marginBottom: 20, opacity: opacity, transform: [{translateX: translation}]}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={['#808080','#000000','#800000','#008000','#008080','#FFFF00','#FF00FF']}
            renderItem={({item, index}) => <View 
            style={{
              height: 60, 
              width: 60, 
              marginHorizontal: 4,
              backgroundColor: item,
              borderRadius: 12,
            }} />}
            />

            <Button text="Get a free service" initialvalue={175} />
            <Button text="Save 10% and buy now!" initialvalue={200} />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  detailedContainer:{
    flex: 1,
    width: '90%',
    marginTop: 16,
    paddingLeft:1
  },
  textContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems:'center'
  },
  dtitle:{
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#bfbfbf'
  },
  dimage:{
    width: 600,
    height: 300,
  },
  icon:{
    height: 20,
    width: 20, 
  }
});

export default DetailedScreen;