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

export default function DetailWhatsNew(props){

    let [promotions, setPromotions] = useState([]);

    let [promoLoaded, setPromoLoaded] = useState(false);
    let [otherLoaded, setOtherLoaded] = useState(false);

    let fetchDetailPromotions = async()=>{
        let request = await fetch(`${ip}/api/getpromotions/${props.route.params.item.id_category}`);
        let json = await request.json();
        setPromotions(json);

        setPromoLoaded(true);
        setOtherLoaded(true);
    }

    useEffect(()=>{
       fetchDetailPromotions();
    },[])

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{backgroundColor:"white",height:EStyleSheet.value("50rem")}}>
            </View>
            <View style={{borderBottomWidth:0.6,borderColor:"grey",marginHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{fontSize:EStyleSheet.value('13rem'),zIndex:11,color:'black',marginTop:EStyleSheet.value('10rem'),fontFamily:"QuicksandMedium"}}>TIMO<Text style={{color:'#f23545'}}>REDISCOVERS</Text></Text>
                <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),fontSize:EStyleSheet.value("22rem")}}>{props.route.params.item.category_name.toUpperCase()} PROMOTIONS</Text>
                <Text style={{fontFamily:"HeeboBold",marginBottom:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("17rem"),color:"#f23545",marginTop:EStyleSheet.value("10rem")}}>Eat. Shop. Play. Stay</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("15rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                <Text style={{lineHeight:EStyleSheet.value("25rem"),fontSize:EStyleSheet.value("14rem"),fontFamily:"QuicksandMedium"}}>Spend quality time with the people you love with these irresistible bundle deals for staycations.</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("20rem")}}>
                {
                    (promoLoaded) ?
                    <FlatList
                    keyExtractor={(item,index)=>`promotions-${index}`}
                    horizontal={true}
                    data={promotions}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("DetailPromotion",{item:item});
                        }}
                        >
                            <Surface style={{elevation:4,marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("260rem"),height:EStyleSheet.value("320rem")}}>
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['rgba(0,0,0,0.7)', 'transparent']}
                                    style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem'),borderRadius:EStyleSheet.value("10rem")}}
                                />
                                <ImageLoader source={{uri:`${ip}/static/image/tours/${item.image}`}} style={{position:"absolute",width:"100%",height:"100%",borderRadius:EStyleSheet.value("10rem")}}></ImageLoader>
                                <View style={{paddingHorizontal:EStyleSheet.value("15rem"),zIndex:11,paddingVertical:EStyleSheet.value("15rem")}}>
                                    <Text style={{color:"white",marginTop:EStyleSheet.value("2rem"),fontFamily:"QuicksandMedium"}}>{props.route.params.item.category_name.toUpperCase()} DEALS</Text>
                                    <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),color:"white",fontSize:EStyleSheet.value("17rem")}}>{item.promotions_name}</Text>
                                </View>
                            </Surface>
                         </Pressable>
                        )
                    }}
                    />
                    :
                    <View style={{height:EStyleSheet.value("320rem"),justifyContent:"center",alignItems:"center"}}>
                        <MaterialIndicator color="#f23545"/>
                    </View>
                }
            </View>
            <View style={{marginTop:EStyleSheet.value("25rem"),flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
               <Text style={{fontSize:EStyleSheet.value("15rem"),fontFamily:"HeeboBold"}}>All {props.route.params.item.category_name} Promotions</Text>
               <TouchableOpacity
               activeOpacity={0.7}
               onPress={()=>{
                   props.navigation.navigate("Search");
               }}
               >
               <Text style={{color:"#f23545",fontFamily:"QuicksandMedium"}}>See All</Text>
               </TouchableOpacity>
            </View>
            <View style={{marginBottom:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("20rem")}}>
               {
                   (otherLoaded) ?
                   <FlatList
                   keyExtractor={(item,index)=>`allaccomodation-${index}`}
                   horizontal={true}
                   data={promotions}
                   showsHorizontalScrollIndicator={false}
                   renderItem={({item,index})=>{
                       return (
                           <Pressable
                           onPress={()=>{
                               console.log(item);
                                props.navigation.navigate("DetailPlace", {item:item,image:`${ip}/static/image/tours/${item.imagetours}`,category:item.category_name.toUpperCase(),name:item.name});
                               
                           }}
                           >
                                <Surface style={{elevation:3,marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,borderRadius:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke",marginRight:EStyleSheet.value("15rem"),width:EStyleSheet.value("180rem"),height:EStyleSheet.value("135rem")}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem'),borderRadius:EStyleSheet.value("10rem")}}
                                        />
                                        <ImageLoader source={{uri:`${ip}/static/image/tours/${item.image}`}} style={{position:"absolute",width:"100%",height:"100%",borderRadius:EStyleSheet.value("10rem")}}></ImageLoader>
                                        <View style={{paddingHorizontal:EStyleSheet.value("10rem"),zIndex:11,paddingVertical:EStyleSheet.value("10rem")}}>
                                            <Text style={{color:"white",marginTop:EStyleSheet.value("2rem"),fontFamily:"QuicksandMedium",fontSize:EStyleSheet.value("10rem")}}>{props.route.params.item.category_name.toUpperCase()}</Text>
                                            <Text style={{fontFamily:"HeeboBold",marginTop:EStyleSheet.value("5rem"),color:"white",fontSize:EStyleSheet.value("12rem")}}>{item.name}</Text>
                                        </View>
                                </Surface>
                           </Pressable>
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