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
            source={{uri:"https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"}}
            style={{backgroundColor:"whitesmoke",justifyContent:"flex-end",paddingBottom:EStyleSheet.value("47rem"),height:EStyleSheet.value("300rem")}}>
                <Text style={{color:"white",zIndex:11,paddingHorizontal:EStyleSheet.value("20rem"),paddingRight:EStyleSheet.value("50rem"),fontFamily:"HeeboBold",fontSize:EStyleSheet.value("21rem")}}>What's Trending: The Curious Case of the Missing Peranakan Treasure</Text>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent','rgba(0,0,0,0.8)']}
                    style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('150rem')}}
                />
            </ImageBackground>
            <View style={{borderTopRightRadius:EStyleSheet.value("20rem"),borderColor:"grey",borderBottomWidth:0.5,borderTopLeftRadius:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("-28rem"),paddingHorizontal:EStyleSheet.value("20rem"),backgroundColor:"white",paddingVertical:EStyleSheet.value("25rem")}}>
                <Text style={{color:"#f23545"}}>28th May 2021</Text>
                <HTML 
                tagsStyles={{
                    p: { color:'black',paddingTop:EStyleSheet.value("15rem") }
                }}
                source={{ html: htmlContent }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
            </View>
            <View style={{marginVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Surface style={{elevation:4,borderRadius:EStyleSheet.value("15rem")}}>
                    <Image source={{uri:"https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"}} style={{backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("15rem"),height:EStyleSheet.value("180rem")}}>
                    </Image>
                </Surface>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{color:"#f23545",fontFamily:"HeeboBold",fontSize:EStyleSheet.value("16rem")}}>The Curious Case of the Missing Peranakan Treasure</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("25rem")}}>
                <HTML 
                    tagsStyles={{
                        p: { color:'black',paddingTop:EStyleSheet.value("15rem") }
                    }}
                    source={{ html: htmlContent2 }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
            </View>
        </ScrollView>
    )
}