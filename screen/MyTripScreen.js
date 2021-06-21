import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage, Animated, Text, View, Dimensions,ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

import {ip} from '../utils/env';

import ImageLoader from '../components/ImageLoader';

export default function MyTripScreen(props){

    const isFocused = useIsFocused();

    const topBarFade = useRef(new Animated.Value(0)).current;
    const [topBarStop, setTopBarStop] = useState(0);

    const iTopBarFade = topBarFade.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 1]
    })

    const iTranslateYTopBar = topBarFade.interpolate({
        inputRange: [0, 70,99999],
        outputRange: [-100, 0,0]
    })


    
    let shadow = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4.84,

        elevation: 6,
    }


    let [favourite, setFavourite] = useState([
    ]);

    useEffect(()=>{
        if(isFocused){
            AsyncStorage.getItem("favourite",(err,value)=>{
                if(value===null){
                    setFavourite([]);
                }
                else{
                    let parsed = JSON.parse(value);
                    setFavourite(parsed);
                }
            })
            // setTimeout(()=>{
            //     setFavourite([
            //         {
            //             category:"Accomodation",
            //             place_name:"Gunung Ramelau",
            //             address:"1 Dili Road Timor Leste",
            //             postal_code:"049178",
            //             preview:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg"
            //         },
            //         {
            //             category:"Accomodation",
            //             place_name:"Gunung Ramelau",
            //             address:"1 Dili Road Timor Leste",
            //             postal_code:"049178",
            //             preview:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg"
            //         },
            //         {
            //             category:"Accomodation",
            //             place_name:"Gunung Ramelau",
            //             address:"1 Dili Road Timor Leste",
            //             postal_code:"049178",
            //             preview:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg"
            //         },
            //         {
            //             category:"Accomodation",
            //             place_name:"Gunung Ramelau",
            //             address:"1 Dili Road Timor Leste",
            //             postal_code:"049178",
            //             preview:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg"
            //         },
            //     ])
            // },500)
        }
      
    },[isFocused])

    if(favourite.length===0){
        return (
            <View style={{flex:1,backgroundColor:"white"}}>
                <View style={{height:EStyleSheet.value('28rem')}}></View>
                <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('20rem')}}>
                    <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                    <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>My Trip</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',paddingBottom:EStyleSheet.value("80rem"),alignItems:'center',marginHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{fontSize:EStyleSheet.value("20rem"),color:"grey"}}>Your Favourites List is Empty</Text>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        props.navigation.navigate("Search");
                    }}
                    style={{backgroundColor:"#d1222c",marginTop:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                        <Text style={{color:"white"}}>Start Exploring</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
        
            <Animated.View style={{...shadow,transform:[{translateY:iTranslateYTopBar}],backgroundColor:'white',zIndex:100,opacity:iTopBarFade,justifyContent:'center',alignItems:'center',position:'absolute',width:'100%',marginTop:EStyleSheet.value('0rem'),height:EStyleSheet.value('86rem')}}>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value('8rem'),marginTop:EStyleSheet.value('33rem')}}>My <Text style={{color:"#f23545"}}>Trip</Text></Text>
            </Animated.View>
           
            <ScrollView 
            scrollEventThrottle={16}
            onScroll={(e)=>{
                    topBarFade.setValue(e.nativeEvent.contentOffset.y);
                    // console.log(iTranslateYTopBar);
            }}
            style={{flex:1,backgroundColor:"white"}}>
                <View style={{height:EStyleSheet.value('28rem')}}></View>
                <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('20rem')}}>
                    <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                    <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>My Trip</Text>
                </View>
                {
                    (favourite.length>0) &&
                    <View style={{paddingHorizontal:EStyleSheet.value('15rem')}}>
                        <View style={{justifyContent:'flex-end',flexDirection:'row',height:EStyleSheet.value('45rem'),paddingHorizontal:EStyleSheet.value('5rem')}}>
                            <View style={{backgroundColor:"#f8323a",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},justifyContent:'center',alignItems:'center',shadowColor:"#ff9a9e",elevation:4,marginRight:EStyleSheet.value('10rem'),borderRadius:999,width:EStyleSheet.value('45rem')}}>
                                <Ionicons name="md-color-wand-outline" size={24} color="white" />
                            </View>
                            <View style={{backgroundColor:"#f8323a",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},justifyContent:'center',alignItems:'center',shadowColor:"#ff9a9e",elevation:4,borderRadius:999,width:EStyleSheet.value('45rem')}}>
                                <SimpleLineIcons name="cloud-download" size={24} color="white" />
                            </View>
                        </View>
                        <View style={{marginBottom:EStyleSheet.value('15rem'),paddingHorizontal:EStyleSheet.value('5rem')}}>
                            <Text style={{color:"#f8323a",fontWeight:"bold"}}>FAVOURITES</Text>
                        </View>
                        <View>
                            <FlatList
                            contentContainerStyle={{paddingHorizontal:EStyleSheet.value('5rem'),paddingBottom:EStyleSheet.value('5rem')}}
                            keyExtractor={(item,index)=>`favourite-${index}`}
                            data={favourite}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item,index})=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        props.navigation.navigate("DetailPlace",{item:item,image:`${ip}/static/image/tours/${item.preview}`,category:item.category,name:item.place_name});
                                    }}
                                    >
                                        <Surface style={{elevation:3,marginBottom:EStyleSheet.value("20rem"),overflow:"hidden",flexDirection:"row",backgroundColor:"white",borderRadius:EStyleSheet.value('5rem')}}>
                                            <View style={{flex:1,padding:EStyleSheet.value('10rem')}}>
                                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:EStyleSheet.value("20rem")}}>
                                                    <Text style={{flex:2,color:"#f8323a",fontSize:EStyleSheet.value('10rem'),fontFamily:"QuicksandBold"}}>{item.category.toUpperCase()}</Text>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                        <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                        <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                        <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                    </View>
                                                </View>
                                                <View style={{marginTop:EStyleSheet.value('3rem')}}>
                                                    <Text style={{fontFamily:"HeeboBold"}}>{item.place_name}</Text>
                                                </View>
                                                <View style={{marginTop:EStyleSheet.value('3rem'),marginBottom:EStyleSheet.value('20rem')}}>
                                                    <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('10rem'),color:"grey"}}>{item.address}</Text>
                                                </View>
                                            </View>
                                            <View source={{uri:item.preview}} style={{width:EStyleSheet.value('130rem'),backgroundColor:"whitesmoke"}}>
                                                <ImageLoader source={{uri:`${ip}/static/image/tours/${item.preview}`}} style={{width:EStyleSheet.value('130rem'),backgroundColor:"whitesmoke"}}/>
                                                <Pressable 
                                                onPress={()=>{
                                                    AsyncStorage.getItem("favourite",(err,value)=>{
                                                        let parsed = JSON.parse(value);
                                                        let filtered = parsed.filter((item_,index)=>{
                                                            return item_.id_tours!==item.id_tours;
                                                        })
                                                        AsyncStorage.setItem("favourite",JSON.stringify(filtered));
                                                    });

                                                    setFavourite((item_,index)=>{
                                                        return item_.filter((el,index)=>{
                                                            return el.id_tours!==item.id_tours;
                                                        })
                                                    })
                                                }}
                                                style={{position:"absolute",zIndex:100,right:EStyleSheet.value('10rem'),top:EStyleSheet.value('10rem')}}>
                                                    <AntDesign name="heart" size={24} color="#d1222c" />
                                                </Pressable>
                                            </View>
                                        </Surface>
                                    </Pressable>
                                )
                            }}
                            />
                        </View>
                    </View>
                }
            </ScrollView>
        </View>
    )
}