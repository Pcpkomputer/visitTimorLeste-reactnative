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
        outputRange:[0,125,125]
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
                        <Text style={{color:"black",display:(blackText) ? null:"none",fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>CHINATOWN</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{position:"absolute",opacity:(stickyDescShowed) ? 1:0,top:EStyleSheet.value("80rem"),zIndex:100,backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawdWe understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawdWe understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd</Text>
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
                    source={{uri:"https://images0.westend61.de/0001040218pw/japan-kyoto-gion-alley-and-temple-at-sunset-EPF00487.jpg"}}
                    style={{backgroundColor:"grey",height:EStyleSheet.value("270rem")}}>
                        <View style={{position:"absolute",zIndex:12,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                            <View style={{backgroundColor:"red",height:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("5rem"),width:EStyleSheet.value("30rem")}}></View>
                            <Animated.View style={{transform:[{translateX:translateXTrack}]}}>
                                <Text style={{color:"white",fontFamily:"QuicksandBold",opacity:(blackText) ? 0:1,fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>CHINATOWN</Text>
                            </Animated.View>
                            <Text style={{color:"white",fontFamily:"QuicksandMedium"}}>Immerse yourself in timeless experiences</Text>
                        </View>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent','rgba(0,0,0,0.5)']}
                            style={{position:'absolute',bottom:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                        />
                    </ImageBackground>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawdWe understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd We understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawdWe understang sadlksadlasknflasknflaskfnsalkfnaslkfnaslkndlawuadawdwadawd</Text>
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
                                        <View style={{backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("90rem"),height:EStyleSheet.value("70rem")}}>
                                        </View>
                                        <View style={{flex:1,paddingHorizontal:EStyleSheet.value("10rem")}}>
                                            <Text style={{fontSize:EStyleSheet.value("15rem"),fontFamily:"HeeboBold"}} numberOfLines={1}>Chinatown Trishaw Tour (Basdsada)</Text>
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