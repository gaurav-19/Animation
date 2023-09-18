import React, {Component, useState} from 'react';
import {View, SafeAreaView, Animated, StyleSheet, Text} from 'react-native';
import Card from './Card';
import List from './List';
import DetailedScreen from './DetailedScreen';
import { DATA } from './Data';

const ANIMATION_DURATION = 500;
const TRANSITION_TO_SCREEN_CUTOFF_VALUE = 0.001;

const Main = () => {
    const [shouldShowInfo, setshouldShowInfo] = useState(false);
    const [startTransition, setstartTransition] = useState(false);
    const [transitionCompleted, settransitionCompleted] = useState(false);
    const [animatedValue, setanimatedValue] = useState(new Animated.Value(0));
    const [selectedIndex, setselectedIndex] = useState(0);
    const [selectedViewLayoutParam, setselectedViewLayoutParam] = useState({x: 0, y: 0, width: 0, height: 0});
    const [isAnimating, setisAnimating] = useState(false)

  const onCardClicked = ({item, index, layout}) => {
        setstartTransition(true);
        setselectedIndex(index);
        setselectedViewLayoutParam(layout);
        settransitionCompleted(false);
        setisAnimating(true);
        setshouldShowInfo(true);
    
        startAnimation();
  };

  const getTransitionCardStyle = () => {
    const initialPosition = selectedViewLayoutParam.y - 55;
    const finalPosition = 0;
    const top = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialPosition, finalPosition],
      extrapolate: 'clamp',
    });

    const opacityInterpolation = animatedValue.interpolate({
      inputRange: [
        0,
        TRANSITION_TO_SCREEN_CUTOFF_VALUE,

        1 - TRANSITION_TO_SCREEN_CUTOFF_VALUE,
        1,
      ],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp'
    });

    return {
        position: 'absolute',
        alignItems: 'center',
        top,
        // left: selectedViewLayoutParam.x,
        left: -15,
        opacity: opacityInterpolation,
        width: selectedViewLayoutParam.width,
        overflow: 'hidden',
    };
  };

  const getListingStyle = () => {
    const opacityInterpolation = animatedValue.interpolate({
      inputRange: [0, TRANSITION_TO_SCREEN_CUTOFF_VALUE],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return {
      opacity: opacityInterpolation,
    };
  };

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(() => {
        settransitionCompleted(true)
        setisAnimating(false)
    })
  };

  const reverseAnimation = () => {
        setstartTransition(true)
        settransitionCompleted(false)
        setisAnimating(true)
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
        }).start(() => {
            settransitionCompleted(true)
            setisAnimating(false)
            setshouldShowInfo(false)
        })
  };

    return (
      <View style={styles.containerStyle}>
        {/* Listing part. */}
        <Animated.View style={[getListingStyle(), {width: '100%', flex:1}]}>
          <List
            data={DATA}
            onCardClicked={onCardClicked}
          />
        </Animated.View>

        {/* Detail screen */}
        {shouldShowInfo && (
          <View style={[styles.absoluteStyle]}>
            <DetailedScreen
              index={0}
              data={DATA[selectedIndex]}
              animatedValue={animatedValue}
              onCardClicked={reverseAnimation}
            />
          </View>
        )}

        {/* Transition layer */}
        {startTransition && !transitionCompleted && (
          <React.Fragment>
            <Animated.View style={[getTransitionCardStyle(), 
              {margin: 16, height: "100%", width: '100%' }]}>
              <Card
                animating={animatedValue}
                index={selectedIndex}
                item={DATA[selectedIndex]}
                styleAnim={true}
              />
            </Animated.View>
          </React.Fragment>
        )}
      </View>
    );
}

const styles = StyleSheet.create({  
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
      },
      absoluteStyle: {
        position: 'absolute',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
  });

export default Main;