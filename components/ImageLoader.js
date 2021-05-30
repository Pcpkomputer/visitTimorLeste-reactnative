import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Text, Pressable, View, TouchableOpacity, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-asset';

export default function ImageLoader(props){

    let [imageLoaded, setImageLoaded] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0.5)).current;

    return (
        <View style={{zIndex:1,position:"absolute",width:"100%",height:"100%"}}>
            {
                (!imageLoaded) &&
                <Image style={{...props.style,width:'100%',height:'100%',opacity:0.2}} source={require("../assets/image.jpg")}></Image>
            }
            <Animated.Image style={{display:(imageLoaded) ? null:"none",width:'100%',opacity:fadeAnim,height:'100%',borderRadius:props.style.borderRadius}} onLoad={()=>{
                setTimeout(()=>{
                    setImageLoaded(true);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver:true
                      }).start();
                },1000)
            }} source={props.source}>
            </Animated.Image>
        </View>
    )
}