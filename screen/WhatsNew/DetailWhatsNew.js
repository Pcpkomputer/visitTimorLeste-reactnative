import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
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

export default function DetailWhatsNew(props){

    let [promoLoaded, setPromoLoaded] = useState(false);
    let [otherLoaded, setOtherLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setPromoLoaded(true);
            setOtherLoaded(true);
        },500)
    },[])

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{backgroundColor:"white",height:EStyleSheet.value("50rem")}}>
            </View>
            <View style={{borderBottomWidth:0.8,borderColor:"grey",marginHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{fontSize:EStyleSheet.value('13rem'),zIndex:11,color:'black',marginTop:EStyleSheet.value('10rem')}}>TIMO<Text style={{color:'#f23545'}}>REDISCOVERS</Text></Text>
                <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),fontSize:EStyleSheet.value("22rem")}}>ACCOMODATION PROMOTIONS</Text>
                <Text style={{fontFamily:"HeeboBold",marginBottom:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("17rem"),color:"#f23545",marginTop:EStyleSheet.value("10rem")}}>Eat. Shop. Play. Stay</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("15rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{lineHeight:EStyleSheet.value("25rem"),fontSize:EStyleSheet.value("13rem")}}>Spend quality time with the people you love with these irresistible bundle delas for staycations.</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("20rem")}}>
                {
                    (promoLoaded) ?
                    <FlatList
                    keyExtractor={(item,index)=>`promotions-${index}`}
                    horizontal={true}
                    data={[1,2,3,4,5]}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                         <View style={{marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("260rem"),height:EStyleSheet.value("280rem")}}>
                             <Text>123</Text>
                         </View>
                        )
                    }}
                    />
                    :
                    <View style={{height:EStyleSheet.value("280rem"),justifyContent:"center",alignItems:"center"}}>
                        <MaterialIndicator color="#f23545"/>
                    </View>
                }
            </View>
            <View style={{marginTop:EStyleSheet.value("25rem"),flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
               <Text style={{fontSize:EStyleSheet.value("15rem")}}>All Accomodation Promotion</Text>
               <Text style={{color:"#f23545"}}>See All</Text>
            </View>
            <View style={{marginBottom:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("20rem")}}>
               {
                   (otherLoaded) ?
                   <FlatList
                   keyExtractor={(item,index)=>`allaccomodation-${index}`}
                   horizontal={true}
                   data={[1,2,3,4,5]}
                   showsHorizontalScrollIndicator={false}
                   renderItem={({item,index})=>{
                       return (
                           <View style={{marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("180rem"),height:EStyleSheet.value("135rem")}}>
                               <Text>123</Text>
                           </View>
                       )
                   }}
                   />
                   :
                   <View style={{height:EStyleSheet.value("135rem"),justifyContent:"center",alignItems:"center"}}>
                        <MaterialIndicator color="#f23545"/>
                    </View>
               }
            </View>
        </ScrollView>
    )
}