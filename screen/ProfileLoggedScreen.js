import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useContext, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, MaterialIcons, Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

import ImageLoader from '../components/ImageLoader';

import {GlobalContext} from '../App';

import {ip} from '../utils/env';

export default function ProfileLoggedScreen(props){

    let globalContext = useContext(GlobalContext);

    let greeting = ()=>{
        var myDate = new Date();
        var hrs = myDate.getHours();
    
        var greet;
    
        if (hrs < 12)
            greet = 'Good Morning';
        else if (hrs >= 12 && hrs <= 17)
            greet = 'Good Afternoon';
        else if (hrs >= 17 && hrs <= 24)
            greet = 'Good Evening';
        return greet;
    }

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>

            <View style={{backgroundColor:"grey",position:"absolute",height:EStyleSheet.value("330rem"),width:"100%"}}>
                <ImageLoader source={{uri:"http://"}} style={{width:"100%",height:"100%"}}/>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent','white']}
                    style={{position:'absolute',bottom:0,zIndex:10,width:"100%",height:EStyleSheet.value('150rem')}}
                />
            </View>

            <View style={{height:EStyleSheet.value("28rem")}}></View>
            <View style={{width:"100%",justifyContent:"center",alignItems:"center",height:EStyleSheet.value("250rem")}}>
                <View style={{paddingHorizontal:EStyleSheet.value("50rem"),flexDirection:"row",width:"100%",height:EStyleSheet.value("100rem"),justifyContent:"space-between",alignItems:"center"}}>
                    <View style={{opacity:0}}>
                        <Text>111</Text>
                    </View>
                    <View style={{marginLeft:EStyleSheet.value("15rem"),backgroundColor:"white",justifyContent:"center",alignItems:"center",width:EStyleSheet.value("100rem"),height:EStyleSheet.value("100rem"),borderRadius:999}}>
                        <AntDesign name="user" size={EStyleSheet.value("53rem")} color="grey" />
                    </View>
                    <View>
                        <AntDesign name="edit" size={EStyleSheet.value("30rem")} color="white" />
                    </View>
                </View>
                <Text style={{color:"white",marginVertical:EStyleSheet.value("10rem")}}>{greeting()}</Text>
                <Text style={{fontWeight:"bold",color:"white",fontSize:EStyleSheet.value("20rem")}}>{globalContext.credentials.data.first_name} {globalContext.credentials.data.last_name}</Text>
            </View>
            <Surface style={{backgroundColor:"white",paddingTop:EStyleSheet.value("40rem"),borderRadius:EStyleSheet.value("30rem"),marginHorizontal:EStyleSheet.value("30rem")}}>
                <View style={{backgroundColor:"white",alignItems:"center",justifyContent:"center",height:EStyleSheet.value("300rem")}}>
                    <Text style={{fontSize:EStyleSheet.value("15rem"),fontFamily:"HeeboBold"}}>Your Favourite Tours</Text>
                    <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("15rem"),width:"100%"}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("MyTrip");
                        }}
                        >
                            <Surface style={{elevation:2,justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("10rem"),backgroundColor:"white",height:EStyleSheet.value("60rem"),width:EStyleSheet.value("60rem")}}>
                                <MaterialIcons name="favorite-border" size={EStyleSheet.value("28rem")} color="#f23545" />
                            </Surface>
                        </Pressable>
                    </View>


                    <Text style={{fontSize:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("25rem"),fontFamily:"HeeboBold"}}>Action</Text>
                    <View style={{justifyContent:"center",flexDirection:"row",alignItems:"center",marginTop:EStyleSheet.value("15rem"),width:"100%"}}>
                        <Pressable
                        onPress={()=>{
                            globalContext.setCredentials(null);
                        }}
                        >
                            <Surface style={{elevation:2,justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("10rem"),backgroundColor:"white",height:EStyleSheet.value("60rem"),width:EStyleSheet.value("60rem")}}>
                                <MaterialIcons name="logout" size={24} color="#f23545" />
                            </Surface>
                        </Pressable>
                        
                    </View>


                </View>
            </Surface>
        </ScrollView>
    )
}