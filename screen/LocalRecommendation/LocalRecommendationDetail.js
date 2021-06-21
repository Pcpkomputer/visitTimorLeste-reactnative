import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons'; 

import ImageLoader from '../../components/ImageLoader';

import HTML from "react-native-render-html";

export default function LocalRecommendationDetail(props){


    useEffect(()=>{
        console.log(props.route.params.item);
    },[])

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value("28rem"),backgroundColor:"white"}}></View>

            <View source={{uri:props.route.params.item.image}} style={{backgroundColor:"grey",position:"absolute",zIndex:1,height:EStyleSheet.value("318rem"),width:"100%"}}>
                <ImageLoader source={{uri:props.route.params.item.image}} style={{backgroundColor:"grey",position:"absolute",zIndex:1,height:EStyleSheet.value("318rem"),width:"100%"}}></ImageLoader>
            </View>

            <View style={{marginHorizontal:EStyleSheet.value("0rem"),zIndex:2,height:EStyleSheet.value("210rem"),justifyContent:"center",alignItems:"center"}}>
                <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['transparent','rgba(0,0,0,0.6)','rgba(0,0,0,0.7)', 'transparent']}
                        style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('140rem')}}
                    />
                    <Text style={{color:"white",zIndex:11}}>{props.route.params.item.category}</Text>
                    <Text style={{color:"white",zIndex:11,fontSize:EStyleSheet.value("22rem"),fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem")}}>{props.route.params.item.place_name}</Text>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        props.navigation.navigate("DetailPlace", {item:props.route.params.item,image:props.route.params.item.image,category:props.route.params.item.category,name:props.route.params.item.place_name});
                    }}
                    style={{marginTop:EStyleSheet.value("8rem"),zIndex:11,backgroundColor:"white",paddingVertical:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("28rem"),borderRadius:EStyleSheet.value("20rem")}}>
                        <Text style={{color:"#f23545",fontFamily:"QuicksandMedium"}}>More Info</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{zIndex:2,marginHorizontal:EStyleSheet.value("25rem"),marginBottom:EStyleSheet.value("20rem")}}>
                <View style={{backgroundColor:"white",padding:EStyleSheet.value("20rem"),flexDirection:"row",paddingVertical:EStyleSheet.value("15rem"),height:EStyleSheet.value("80rem"),borderTopLeftRadius:EStyleSheet.value("30rem"),borderTopRightRadius:EStyleSheet.value("30rem")}}>
                    <ImageBackground source={{uri:props.route.params.item.avatar}} style={{backgroundColor:"whitesmoke",overflow:"hidden",width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem"),borderRadius:999}}>
                    </ImageBackground>
                    <View style={{justifyContent:"center",alignItems:"center",marginLeft:EStyleSheet.value("10rem")}}>
                        <Text>{props.route.params.item.user_name}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:"#f5f5f5",padding:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("60rem")}}>
                    <Fontisto name="quote-a-right" size={24} style={{position:"absolute",top:EStyleSheet.value("25rem"),left:EStyleSheet.value("25rem")}} color="#e3e3e3" />
                    <Fontisto name="quote-a-left" size={24} style={{position:"absolute",bottom:EStyleSheet.value("25rem"),right:EStyleSheet.value("25rem")}} color="#e3e3e3" />
                    <Text style={{marginHorizontal:EStyleSheet.value("40rem"),fontSize:EStyleSheet.value("20rem"),lineHeight:EStyleSheet.value("35rem")}}>{props.route.params.item.comment}</Text>
                </View>
                <View style={{backgroundColor:"#f5f5f5",paddingHorizontal:EStyleSheet.value("25rem"),paddingBottom:EStyleSheet.value("25rem")}}>
                    <View style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("7rem"),backgroundColor:"red",marginBottom:EStyleSheet.value("8rem")}}></View>
                    <Text style={{fontSize:EStyleSheet.value("18rem"),fontFamily:"HeeboBold"}}>WHY YOU SHOULD VISIT</Text>
                    <Text style={{marginTop:EStyleSheet.value("15rem"),lineHeight:EStyleSheet.value("20rem"),fontFamily:"QuicksandMedium"}}>{props.route.params.item.whyshouldvisit}</Text>
                </View>
                <View style={{backgroundColor:"#f5f5f5",borderBottomLeftRadius:EStyleSheet.value("30rem"),borderBottomRightRadius:EStyleSheet.value("30rem"),paddingHorizontal:EStyleSheet.value("25rem"),paddingBottom:EStyleSheet.value("25rem")}}>
                    <View style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("7rem"),backgroundColor:"red",marginBottom:EStyleSheet.value("8rem")}}></View>
                    <Text style={{fontSize:EStyleSheet.value("18rem"),fontFamily:"HeeboBold"}}>SPECIAL TIP</Text>
                    <Text style={{marginTop:EStyleSheet.value("15rem"),lineHeight:EStyleSheet.value("20rem"),fontFamily:"QuicksandMedium"}}>{props.route.params.item.specialtip}</Text>
                </View>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("35rem")}}>
                <ImageBackground source={{uri:props.route.params.item.avatar}} style={{overflow:"hidden",width:EStyleSheet.value("100rem"),height:EStyleSheet.value("100rem"),backgroundColor:"whitesmoke",borderRadius:999}}>
                </ImageBackground>
                <Text style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("17rem"),fontFamily:"HeeboBold",}}>{props.route.params.item.user_name}</Text>
                <Text style={{marginTop:EStyleSheet.value("3rem")}}>{props.route.params.item.minitype}</Text>
                <Text style={{textAlign:"center",marginTop:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>
                    {props.route.params.item.aboutme}
                </Text>
                <View style={{marginTop:EStyleSheet.value("15rem"),backgroundColor:"#f5f5f5",borderRadius:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("8rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{color:"#f23545",fontFamily:"QuicksandMedium"}}>Get to know me</Text>
                </View>
            </View>
        </ScrollView>
    )
}