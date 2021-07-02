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

import HTML from "react-native-render-html";

import {ip} from '../../utils/env';

export default function UsefulContact(props){

    let [usefulcontact, setUsefulContact] = useState([]);

    let fetchUsefulContact = async ()=>{
        let request = await fetch(`${ip}/api/usefulcontact`);
        let json = await request.json();
        if(json.succes){
            setUsefulContact(json.data);
        }
        else{
            alert("There's error fetching data from server");
        }
    }

    useEffect(()=>{
        fetchUsefulContact();
    },[])

    const contentWidth = useWindowDimensions().width;


    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('25rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Useful Contact</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("20rem")}}>
               {
                   usefulcontact.map((item,index)=>{
                       return (
                        <View key={index} style={{borderBottomWidth:0.5,borderColor:"grey",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                            <Text style={{fontSize:EStyleSheet.value("16rem"),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value("20rem")}}>{item.usefulcontact_name}</Text>
                            <HTML 
                            tagsStyles={{
                                p: { color:'black',fontFamily:"Roboto",lineHeight:EStyleSheet.value("25rem"),marginBottom:EStyleSheet.value("5rem")}
                            }}
                            source={{ html: item.content }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                       )
                   })
               }
            </View>
        </ScrollView>
    )
}