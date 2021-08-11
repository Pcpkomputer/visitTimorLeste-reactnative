import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, AsyncStorage, View, Image, FlatList, Animated, Dimensions, ImageBackground, Keyboard, Pressable, useWindowDimensions, EventSubscriptionVendor } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo } from '@expo/vector-icons'; 

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

  import {ip} from '../../utils/env';
  
  export default function PrecinctGuidesDetail(props){

      let [tours,setTours] = useState([]);

      let [favourite, setFavourite] = useState([]);

      let [textWidth, setTextWidth] = useState(0);

     
      let fetchItemTours = async()=>{
            let listfavourite = [];
            let favourite = await AsyncStorage.getItem("favourite");
            if(favourite!==null){
                let parsed = JSON.parse(favourite);
                listfavourite = parsed;
                setFavourite(parsed);
            }
            else{
                listfavourite = [];
            }
            let request = await fetch(`${ip}/api/gettoursprecinct/${props.route.params.item.id_precinct}`);
            let json = await request.json();

            let idtoursfavourite = listfavourite.map((item,_)=>{
                return item.id_tours;
            })

            let json_ = json.map((item,index)=>{
                return {
                    ...item,
                    favourite:(idtoursfavourite.includes(item.id_tours)) ? true:false
                }
            })
            setTours(json_);
      }

      useEffect(()=>{
        fetchItemTours();
      },[])

      let [mainScrollEnabled, setMainScrollEnabled] = useState(true);

      const trackScroll = useRef(new Animated.Value(0)).current;

      const opacityTrack = trackScroll.interpolate({
          inputRange:[30,196],
          outputRange:[0,1]
      })

      const translateXTrack =  trackScroll.interpolate({
        inputRange:[0,196,9999],
        outputRange:[0,(Dimensions.get("screen").width/2)-(textWidth/2)-(EStyleSheet.value("20rem")),(Dimensions.get("screen").width/2)-(textWidth/2)-(EStyleSheet.value("20rem"))]
    })

    const trackColor =  trackScroll.interpolate({
        inputRange:[0,196,9999],
        outputRange:[0,1,1]
    })

     let [blackText, setBlackText] = useState(false);
     let [stickyDescShowed, setStickyDescShowed] = useState(false);

      return (
          <View
         style={{flex:1,backgroundColor:"white"}}>

            <View>
                <Animated.View style={{backgroundColor:"white",borderBottomWidth:0.5,borderBottomColor:"grey",opacity:opacityTrack,zIndex:100,position:"absolute",width:"100%",height:EStyleSheet.value("80rem")}}>
                </Animated.View>
                <Animated.View style={{position:"absolute",justifyContent:"center",zIndex:100,top:0,paddingTop:EStyleSheet.value("30rem"),width:"100%",height:EStyleSheet.value("80rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Animated.View 
                    style={{transform:[{translateX:translateXTrack}]}}>
                        <Text 
                        style={{color:"black",display:(blackText) ? null:"none",fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>{props.route.params.item.precinct_name}</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{position:"absolute",opacity:(stickyDescShowed) ? 1:0,top:EStyleSheet.value("80rem"),zIndex:100,backgroundColor:"white",paddingHorizontal:EStyleSheet.value("20rem"),width:"100%",paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>{props.route.params.item.description}</Text>
                </View>
            </View>


             <ScrollView 
             onScroll={(e)=>{
                 trackScroll.setValue(e.nativeEvent.contentOffset.y);
                 if(e.nativeEvent.contentOffset.y>171.63636779785156){
                    setBlackText(true);
                 }
                 else{
                     setBlackText(false);
                 }

                 if(e.nativeEvent.contentOffset.y>=195){
                    setStickyDescShowed(true);
                 }
                 else{
                    setStickyDescShowed(false);
                 }
             }}
             style={{flex:1,backgroundColor:"white"}}>
                    <ImageBackground 
                    source={{uri:props.route.params.item.precinct_image}}
                    style={{backgroundColor:"grey",height:EStyleSheet.value("270rem")}}>
                        <View style={{position:"absolute",zIndex:12,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                            <View style={{backgroundColor:"red",height:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("5rem"),width:EStyleSheet.value("30rem")}}></View>
                            <Animated.View 
                             onLayout={(e)=>{
                             
                                setTextWidth(e.nativeEvent.layout.width)
                            }}
                            style={{transform:[{translateX:translateXTrack}]}}>
                                <Text style={{color:"white",fontFamily:"QuicksandBold",opacity:(blackText) ? 0:1,fontSize:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("1rem"),fontFamily:"HeeboBold"}}>{props.route.params.item.precinct_name}</Text>
                            </Animated.View>
                            <Text style={{color:"white",fontFamily:"QuicksandMedium"}}>{props.route.params.item.mini_description}</Text>
                        </View>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent','rgba(0,0,0,0.5)']}
                            style={{position:'absolute',bottom:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                        />
                    </ImageBackground>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        <Text style={{lineHeight:EStyleSheet.value("18rem"),fontFamily:"QuicksandMedium"}}>{props.route.params.item.description}</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("25rem")}}>
                        <FlatList
                        onScroll={(event)=>{
                            
                        }}
                        keyExtractor={(item,index)=>`precint-${index}`}
                        data={tours}
                        style={{paddingHorizontal:EStyleSheet.value("20rem")}}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable
                                onPress={()=>{
                                   props.navigation.navigate("DetailPlace",{item:item,image:`${ip}/static/image/tours/${item.image}`,category:item.category_name,name:item.name});
                                }}
                                >
                                    <View style={{borderBottomColor:"grey",borderBottomWidth:0.5,flexDirection:"row",paddingVertical:EStyleSheet.value("10rem")}}>
                                        <Image source={{uri:`${ip}/static/image/tours/`+item.image}} style={{backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("90rem"),height:EStyleSheet.value("70rem")}}>
                                        </Image>
                                        <View style={{flex:1,paddingHorizontal:EStyleSheet.value("10rem")}}>
                                            <Text style={{fontSize:EStyleSheet.value("15rem"),fontFamily:"HeeboBold"}} numberOfLines={1}>{item.name}</Text>
                                            <View style={{flexDirection:"row",marginTop:EStyleSheet.value("2rem")}}>
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                                    <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                            </View>
                                        </View>
                                        {
                                            (item.favourite) ?
                                            <Pressable 
                                            onPress={()=>{

                                                AsyncStorage.getItem("favourite",(err,value)=>{
                                                    let parsed = JSON.parse(value);
                                                    let filtered = parsed.filter((item_,index)=>{
                                                        return item_.id_tours!==item.id_tours;
                                                    })
                                                    AsyncStorage.setItem("favourite",JSON.stringify(filtered));
                                                })

                                                setTours((prev)=>{
                                                    return prev.map((item,i)=>{
                                                        if(index===i){
                                                            return {
                                                                ...item,
                                                                favourite:false
                                                            }
                                                        }
                                                        return item;
                                                    })
                                                })
                                            }}
                                            style={{width:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center"}}>
                                                <Ionicons name="ios-heart" size={EStyleSheet.value("27rem")} color="red" />
                                            </Pressable>
                                            :
                                            <Pressable 
                                            onPress={()=>{
                               
                                                let payload = {
                                                    id_tours:item.id_tours,
                                                    category:item.category_name,
                                                    place_name:item.name,
                                                    address:item.address,
                                                    postal_code:"-",
                                                    preview:item.image
                                                };
                                                
                                                AsyncStorage.getItem("favourite",(err,value)=>{
                                                    if(value===null){
                                                        AsyncStorage.setItem("favourite",JSON.stringify([
                                                            payload
                                                        ]))
                                                    }  
                                                    else{
                                                        let parsed = JSON.parse(value);
                                                        AsyncStorage.setItem("favourite",JSON.stringify([
                                                            payload,
                                                            ...parsed
                                                        ]));
                                                    }
                                                })

                                                setTours((prev)=>{
                                                    return prev.map((item,i)=>{
                                                        if(index===i){
                                                            return {
                                                                ...item,
                                                                favourite:true
                                                            }
                                                        }
                                                        return item;
                                                    })
                                                })
    
    
                                            }}
                                            style={{width:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center"}}>
                                                <Ionicons name="ios-heart-outline" size={EStyleSheet.value("27rem")} color="black" />
                                            </Pressable>
                                        }
                                    </View>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
              </ScrollView>
          </View>
      )
  }