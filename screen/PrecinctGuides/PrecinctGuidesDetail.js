import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Animated, Dimensions, ImageBackground, Keyboard, Pressable, useWindowDimensions, EventSubscriptionVendor } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo } from '@expo/vector-icons'; 

import HTML from "react-native-render-html";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

  export default function PrecinctGuidesDetail(props){

      let [mainScrollEnabled, setMainScrollEnabled] = useState(true);

      const trackScroll = useRef(new Animated.Value(0)).current;

      const opacityTrack = trackScroll.interpolate({
          inputRange:[30,196],
          outputRange:[0,1]
      })

      const translateXTrack =  trackScroll.interpolate({
        inputRange:[0,196,9999],
        outputRange:[0,Dimensions.get("screen").width/2-35,Dimensions.get("screen").width/2-35]
    })

    const trackColor =  trackScroll.interpolate({
        inputRange:[0,196,9999],
        outputRange:[0,1,1]
    })

     let [blackText, setBlackText] = useState(false);
     let [stickyDescShowed, setStickyDescShowed] = useState(false);

      return (
          <View
         style={{flex:1,backgroundColor:"white"}}>

            <View>
                <Animated.View style={{backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"grey",opacity:opacityTrack,zIndex:100,position:"absolute",width:"100%",height:EStyleSheet.value("80rem")}}>
                </Animated.View>
                <Animated.View style={{position:"absolute",justifyContent:"center",zIndex:100,top:0,paddingTop:EStyleSheet.value("30rem"),width:"100%",height:EStyleSheet.value("80rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Animated.View style={{transform:[{translateX:translateXTrack}]}}>
                        <Text style={{color:"black",display:(blackText) ? null:"none",fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>Dili</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{position:"absolute",opacity:(stickyDescShowed) ? 1:0,top:EStyleSheet.value("80rem"),zIndex:100,backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </View>
            </View>


             <ScrollView 
             onScroll={(e)=>{
                 trackScroll.setValue(e.nativeEvent.contentOffset.y);
                 if(e.nativeEvent.contentOffset.y>171.63636779785156){
                    setBlackText(true);
                 }
                 else{
                     setBlackText(false);
                 }

                 if(e.nativeEvent.contentOffset.y>=195){
                    setStickyDescShowed(true);
                 }
                 else{
                    setStickyDescShowed(false);
                 }
             }}
             style={{flex:1,backgroundColor:"white"}}>
                    <ImageBackground 
                    source={{uri:"https://cdn.idntimes.com/content-images/community/2019/09/dili-christo-rei-timor-leste-1-b2fd341713d3f3f151e6fba4eb19d094.jpeg"}}
                    style={{backgroundColor:"grey",height:EStyleSheet.value("270rem")}}>
                        <View style={{position:"absolute",zIndex:12,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                            <View style={{backgroundColor:"red",height:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("5rem"),width:EStyleSheet.value("30rem")}}></View>
                            <Animated.View style={{transform:[{translateX:translateXTrack}]}}>
                                <Text style={{color:"white",fontFamily:"QuicksandBold",opacity:(blackText) ? 0:1,fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>Dili</Text>
                            </Animated.View>
                            <Text style={{color:"white",fontFamily:"QuicksandMedium"}}>City of Peace, is the capital, largest city, chief port, and commercial centre of East Timor (Timor-Leste)</Text>
                        </View>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent','rgba(0,0,0,0.5)']}
                            style={{position:'absolute',bottom:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                        />
                    </ImageBackground>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("25rem")}}>
                        <FlatList
                        onScroll={(event)=>{
                            
                        }}
                        keyExtractor={(item,index)=>`precint-${index}`}
                        data={[1,2,3,4,5,6,7,8]}
                        style={{paddingHorizontal:EStyleSheet.value("20rem")}}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable
                                onPress={()=>{
                                    props.navigation.navigate("DetailPlace");
                                }}
                                >
                                    <View style={{borderBottomColor:"grey",borderBottomWidth:0.5,flexDirection:"row",paddingVertical:EStyleSheet.value("10rem")}}>
                                        <Image source={{uri:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg"}} style={{backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("90rem"),height:EStyleSheet.value("70rem")}}>
                                        </Image>
                                        <View style={{flex:1,paddingHorizontal:EStyleSheet.value("10rem")}}>
                                            <Text style={{fontSize:EStyleSheet.value("15rem"),fontFamily:"HeeboBold"}} numberOfLines={1}>Gunung Ramelau</Text>
                                            <View style={{flexDirection:"row",marginTop:EStyleSheet.value("2rem")}}>
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                            </View>
                                        </View>
                                        <View style={{width:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center"}}>
                                            <Ionicons name="ios-heart-outline" size={EStyleSheet.value("27rem")} color="black" />
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
              </ScrollView>
          </View>
      )
  }