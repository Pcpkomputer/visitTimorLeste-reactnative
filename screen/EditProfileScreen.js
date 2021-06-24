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

export default function EditProfileScreen(props){

    let globalContext = useContext(GlobalContext);

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>PROFILE SETTINGS</Text>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        props.navigation.navigate("EditProfileDetail");
                    }}
                    >
                        <Text style={{fontWeight:"bold",color:"#f23545"}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("15rem")}}>
                <Text style={{fontSize:EStyleSheet.value("25rem"),fontWeight:"bold"}}>Your Information</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("20rem")}}>
                <Text style={{marginBottom:EStyleSheet.value("7rem")}}>First Name</Text>
                <Text style={{fontSize:EStyleSheet.value("16rem"),fontWeight:"bold"}}>{globalContext.credentials.data.first_name}</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("20rem")}}>
                <Text style={{marginBottom:EStyleSheet.value("7rem")}}>Last Name</Text>
                <Text style={{fontSize:EStyleSheet.value("16rem"),fontWeight:"bold"}}>{globalContext.credentials.data.last_name}</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("35rem")}}>
                <Text style={{fontSize:EStyleSheet.value("25rem"),fontWeight:"bold"}}>Sign in & Security</Text>
            </View>
            <Pressable 
            onPress={()=>{
                alert("123");
            }}
            style={{marginTop:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{fontSize:EStyleSheet.value("17rem")}}>Email</Text>
                <Entypo name="chevron-right" size={24} color="black" />
            </Pressable>
            <Pressable 
            onPress={()=>{
                alert("555");
            }}
            style={{marginTop:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{fontSize:EStyleSheet.value("17rem")}}>Password</Text>
                <Entypo name="chevron-right" size={24} color="black" />
            </Pressable>
        </ScrollView>
    )
}