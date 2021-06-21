import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

import HTML from "react-native-render-html";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

  import ImageLoader from '../../components/ImageLoader';

  import {ip} from '../../utils/env';



  export default function DetailPromotion(props){

    const contentWidth = useWindowDimensions().width;

      return (
          <View style={{flex:1,backgroundColor:"white"}}>
              <ScrollView>
                    <View style={{backgroundColor:"whitesmoke",justifyContent:'flex-end',height:EStyleSheet.value("230rem")}}>
                        {/* <Text>123</Text> */}
                        <Image source={{uri:`${ip}/static/image/tours/${props.route.params.item.image}`}} style={{position:"absolute",width:"100%",height:"100%"}}></Image>
                    </View>
                    <View style={{borderBottomWidth:0.4,borderColor:"grey"}}>
                        <View style={{backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                            <Text style={{fontFamily:"HeeboBold"}}>Description</Text>
                        </View>
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingBottom:EStyleSheet.value("20rem")}}>
                            <HTML 
                            tagsStyles={{
                                p: { color:'black',fontFamily:"QuicksandMedium",paddingBottom:EStyleSheet.value("15rem") }
                            }}
                            source={{ html: props.route.params.item.description }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                    </View>
                    <View style={{borderBottomWidth:0.4,borderColor:"grey"}}>
                        <View style={{backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                            <Text style={{fontFamily:"HeeboBold"}}>Redemption Instruction</Text>
                        </View>
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingBottom:EStyleSheet.value("20rem")}}>
                            <HTML 
                            tagsStyles={{
                                p: { color:'black',fontFamily:"QuicksandMedium",paddingBottom:EStyleSheet.value("15rem") }
                            }}
                            source={{ html: props.route.params.item.redemptioninstruction }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                    </View>
                    <View style={{borderBottomWidth:0.4,borderColor:"grey"}}>
                        <View style={{backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                            <Text style={{fontFamily:"HeeboBold"}}>Terms and Conditions</Text>
                        </View>
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingBottom:EStyleSheet.value("20rem")}}>
                            <HTML 
                            tagsStyles={{
                                p: { color:'black',fontFamily:"QuicksandMedium",paddingBottom:EStyleSheet.value("15rem") }
                            }}
                            source={{ html: props.route.params.item.termsandconditions }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                    </View>
                    <View style={{borderBottomWidth:0.4,borderColor:"grey"}}>
                        <View style={{backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                            <Text style={{fontFamily:"HeeboBold"}}>Disclaimer</Text>
                        </View>
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingBottom:EStyleSheet.value("20rem")}}>
                            <HTML 
                            tagsStyles={{
                                p: { color:'black',fontFamily:"QuicksandMedium",paddingBottom:EStyleSheet.value("15rem") }
                            }}
                            source={{ html: props.route.params.item.disclaimer }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                    </View>
              </ScrollView>
          </View>
      )
  }