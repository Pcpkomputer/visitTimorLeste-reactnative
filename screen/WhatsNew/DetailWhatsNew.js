import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

import HTML from "react-native-render-html";

export default function DetailWhatsNew(props){
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <Text>123</Text>
        </View>
    )
}