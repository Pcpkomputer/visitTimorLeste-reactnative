import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

import {ip} from '../../utils/env';

export default function About(props){

    let [about, setAbout] = useState([]);

    let fetchAbout = async ()=>{
        let request = await fetch(`${ip}/api/about`);
        let json = await request.json();
        if(json.succes){
            setAbout(json.data);
        }
        else{
            alert("There's error fetching data from server");
        }
    }

    useEffect(()=>{
        fetchAbout();
    },[])


    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('25rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>About</Text>
            </View>
            <View>
                {
                    about.map((element,index)=>{
                            return (
                                <Pressable 
                                onPress={()=>{
                                    props.navigation.navigate("DetailAbout",{element:element,content:element.content})
                                }}
                                key={index} style={{borderBottomWidth:0.5,borderColor:"grey",flexDirection:"row",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                                    <Text style={{fontSize:EStyleSheet.value("16rem")}}>{element.about_title}</Text>
                                    <Entypo name="chevron-right" size={24} color="black" />
                                </Pressable>
                            )
                        })
                    }
            </View>
        </ScrollView>
    )
}