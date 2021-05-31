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



  export default function DetailPromotion(){

    const contentWidth = useWindowDimensions().width;

      return (
          <View style={{flex:1,backgroundColor:"white"}}>
              <ScrollView>
                    <View style={{backgroundColor:"whitesmoke",height:EStyleSheet.value("230rem")}}>
                        <Text>123</Text>
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
                            source={{ html: htmlContent2 }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
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
                            source={{ html: htmlContent2 }} contentWidth={contentWidth-EStyleSheet.value("40rem")} />
                        </View>
                    </View>
              </ScrollView>
          </View>
      )
  }