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
                         <Surface style={{elevation:4,marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("260rem"),height:EStyleSheet.value("300rem")}}>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['rgba(0,0,0,0.7)', 'transparent']}
                                style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem'),borderRadius:EStyleSheet.value("10rem")}}
                            />
                             <Image source={{uri:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dmlsbGF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"}} style={{position:"absolute",width:"100%",height:"100%",borderRadius:EStyleSheet.value("10rem")}}></Image>
                             <View style={{paddingHorizontal:EStyleSheet.value("15rem"),zIndex:11,paddingVertical:EStyleSheet.value("15rem")}}>
                                 <Text style={{color:"white",marginTop:EStyleSheet.value("2rem")}}>HOTEL DEALS</Text>
                                 <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),color:"white",fontSize:EStyleSheet.value("17rem")}}>W SINGAPORE US$200 CREDIT WITH 2 NIGHT STAY</Text>
                             </View>
                         </Surface>
                        )
                    }}
                    />
                    :
                    <View style={{height:EStyleSheet.value("300rem"),justifyContent:"center",alignItems:"center"}}>
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
                           <Surface style={{elevation:3,marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("180rem"),height:EStyleSheet.value("135rem")}}>
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['rgba(0,0,0,0.6)', 'transparent']}
                                    style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem'),borderRadius:EStyleSheet.value("10rem")}}
                                />
                                <Image source={{uri:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dmlsbGF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"}} style={{position:"absolute",width:"100%",height:"100%",borderRadius:EStyleSheet.value("10rem")}}></Image>
                                <View style={{paddingHorizontal:EStyleSheet.value("10rem"),zIndex:11,paddingVertical:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",marginTop:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem")}}>HOTEL DEALS</Text>
                                    <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),color:"white",fontSize:EStyleSheet.value("12rem")}}>W SINGAPORE US$200 CREDIT WITH 2 NIGHT STAY</Text>
                                </View>
                           </Surface>
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