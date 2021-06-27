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

//var fx = require("../../utils/money");

import {ip} from '../../utils/env';

export default function CurrencyConverter(){
    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
           <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Currency Converter</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                <View style={{backgroundColor:"white",overflow:"hidden",borderTopLeftRadius:EStyleSheet.value("20rem"),borderTopRightRadius:EStyleSheet.value("20rem")}}>
                    <LinearGradient

                            // Background Linear Gradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['#760508', '#e83037']}
                            style={{position:'absolute',zIndex:10,width:"100%",height:"100%"}}
                        />
                    <View style={{flexDirection:"row",zIndex:100,justifyContent:"space-around",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <View style={{backgroundColor:"whitesmoke",height:EStyleSheet.value("50rem"),width:EStyleSheet.value("70rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                
                            </View>
                            <Text style={{marginLeft:EStyleSheet.value("10rem"),color:"white",fontWeight:"bold"}}>SGD</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <View style={{backgroundColor:"whitesmoke",height:EStyleSheet.value("50rem"),width:EStyleSheet.value("70rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                
                            </View>
                            <Text style={{marginLeft:EStyleSheet.value("10rem"),color:"white",fontWeight:"bold"}}>SGD</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#e8e8e8",borderBottomLeftRadius:EStyleSheet.value("20rem"),borderBottomRightRadius:EStyleSheet.value("20rem"),flexDirection:"row",padding:EStyleSheet.value("10rem")}}>
                    <View style={{flex:1,borderRightWidth:1,borderColor:"grey",paddingRight:EStyleSheet.value("10rem")}}>
                        <TextInput style={{fontSize:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem")}} placeholder=""></TextInput>
                        <Text style={{color:"grey",marginBottom:EStyleSheet.value("5rem")}}>Singapore Dollar</Text>
                    </View>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("10rem")}}>
                        <TextInput style={{fontSize:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem")}} placeholder=""></TextInput>
                        <Text style={{color:"grey",marginBottom:EStyleSheet.value("5rem")}}>Singapore Dollar</Text>
                    </View>
                </View>
                <View style={{marginTop:EStyleSheet.value("30rem")}}>
                    <Text style={{fontSize:EStyleSheet.value("20rem"),fontFamily:"HeeboBold"}}>Currencies</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("45rem"),backgroundColor:"#e8e8e8"}}>
                    <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:EStyleSheet.value("50rem")}}>
                    <FontAwesome name="search" size={EStyleSheet.value("17rem")} color="black" />
                    </View>
                    <TextInput style={{width:"100%",paddingHorizontal:EStyleSheet.value("10rem")}}></TextInput>
                </View>
                <View style={{flex:1,height:EStyleSheet.value("350rem"),marginBottom:EStyleSheet.value("20rem")}}>
                    <FlatList
                    keyExtractor={(item,index)=>`currencies-${index}`}
                    data={[1,2,3,4,5]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{flexDirection:"row",marginBottom:([1,2,3,4,5].length-1===index) ? EStyleSheet.value("10rem"):null,borderBottomWidth:0.5,borderColor:"grey",paddingHorizontal:EStyleSheet.value("10rem"),alignItems:"center",marginTop:(index===0) ? EStyleSheet.value("20rem"):null,paddingVertical:EStyleSheet.value("8rem")}}>
                                <View style={{backgroundColor:"whitesmoke",width:EStyleSheet.value("70rem"),height:EStyleSheet.value("50rem")}}>
                                </View>
                                <View style={{marginLeft:EStyleSheet.value("10rem")}}>
                                    <Text style={{fontWeight:"bold"}}>Australian Dollar</Text>
                                    <Text style={{marginTop:EStyleSheet.value("5rem"),fontWeight:"bold"}}>AUD</Text>
                                </View>
                            </View>
                        )
                    }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
