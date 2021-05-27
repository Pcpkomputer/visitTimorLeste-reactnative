import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Text, View, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

export default function MyTripScreen(props){
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{height:EStyleSheet.value('28rem')}}></View>
            <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('20rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>My Trip</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value('20rem')}}>
                <View style={{justifyContent:'flex-end',flexDirection:'row',height:EStyleSheet.value('45rem')}}>
                    <View style={{backgroundColor:"#f8323a",justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:"#ff9a9e",marginRight:EStyleSheet.value('10rem'),borderRadius:999,width:EStyleSheet.value('45rem')}}>
                        <Text>1</Text>
                    </View>
                    <View style={{backgroundColor:"#f8323a",justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:"#ff9a9e",borderRadius:999,width:EStyleSheet.value('45rem')}}>
                        <Text>1</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}