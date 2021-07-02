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


export default function DetailHandyTips(props){

    const contentWidth = useWindowDimensions().width;

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{backgroundColor:"white",height:EStyleSheet.value("28rem")}}>
            </View>
            <View style={{height:EStyleSheet.value("55rem"),justifyContent:"center",alignItems:"center",backgroundColor:"white",borderBottomWidth:0.5,borderColor:"grey"}}>
                <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value("15rem")}}>{props.route.params.element.tips_name}</Text>
            </View>
            <View style={{padding:EStyleSheet.value("20rem")}}>
            <HTML 
                tagsStyles={{
                    p: { color:'black',fontFamily:"QuicksandBold",lineHeight:EStyleSheet.value("25rem"),marginBottom:EStyleSheet.value("20rem")}
                }}
                source={{ html: props.route.params.content }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
            </View>
        </ScrollView>
    )
}