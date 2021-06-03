import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

import HTML from "react-native-render-html";

export default function DetailWeeklySpotlight(props){

    const htmlContent = `
    <p style="text-align:justify">This HTML snippet is now rendered with native components !
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    </p>
`;

    const htmlContent2 = `
    <p style="text-align:justify">This HTML snippet is now rendered with native components !
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    </p>
    <p style="text-align:justify">This HTML snippet is now rendered with native components !
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    </p>
    <p style="text-align:justify">This HTML snippet is now rendered with native components !
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    </p>
    <p style="text-align:justify">This HTML snippet is now rendered with native components !
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    This HTML snippet is now rendered with native components
    </p>
    `;

    const contentWidth = useWindowDimensions().width;

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <ImageBackground 
            source={{uri:props.route.params.item.image}}
            style={{backgroundColor:"whitesmoke",justifyContent:"flex-end",paddingBottom:EStyleSheet.value("47rem"),height:EStyleSheet.value("300rem")}}>
                <Text style={{color:"white",zIndex:11,paddingHorizontal:EStyleSheet.value("20rem"),paddingRight:EStyleSheet.value("80rem"),fontFamily:"HeeboBold",fontSize:EStyleSheet.value("21rem")}}>What's Trending: {props.route.params.item.title}</Text>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent','rgba(0,0,0,0.9)']}
                    style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('150rem')}}
                />
            </ImageBackground>
            <View style={{borderTopRightRadius:EStyleSheet.value("20rem"),borderColor:"grey",borderBottomWidth:0,borderTopLeftRadius:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("-28rem"),paddingHorizontal:EStyleSheet.value("20rem"),backgroundColor:"white",paddingVertical:EStyleSheet.value("25rem")}}>
                <Text style={{color:"#f23545",fontFamily:"QuicksandBold"}}>{props.route.params.item.dateposted}</Text>
                <HTML 
                tagsStyles={{
                    p: { color:'black',paddingTop:EStyleSheet.value("15rem") }
                }}
                source={{ html: props.route.params.item.content }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
            </View>
            {/* <View style={{marginVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Surface style={{elevation:4,borderRadius:EStyleSheet.value("15rem")}}>
                    <Image source={{uri:"https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"}} style={{backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("15rem"),height:EStyleSheet.value("180rem")}}>
                    </Image>
                </Surface>
            </View> */}
            {/* <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{color:"#f23545",fontFamily:"QuicksandBold",fontSize:EStyleSheet.value("16rem")}}>The Curious Case of the Missing Peranakan Treasure</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("25rem")}}>
                <HTML 
                    tagsStyles={{
                        p: { color:'black',fontFamily:"QuicksandMedium",paddingTop:EStyleSheet.value("15rem") }
                    }}
                    source={{ html: htmlContent2 }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
            </View> */}
        </ScrollView>
    )
}