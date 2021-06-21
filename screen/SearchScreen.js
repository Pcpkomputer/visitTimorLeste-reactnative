import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Easing, Text, View, Dimensions, Pressable, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList, PanGestureHandler, TextInput, State, ScrollView } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

import {ip} from '../utils/env';

import ImageLoader from '../components/ImageLoader';


export default function SearchScreen(props){

    const translateY = useRef(new Animated.Value(-220)).current;
      
    let shadow = {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    }

    let fetchWhatsIn = async()=>{
        try {
            let result = await fetch(`${ip}/api/tours`);
            let json = await result.json();
            if(json.success){
              let preprocessed = json.data.map((item,index)=>{
                  return {
                      ...item,
                      image:`${ip}/static/image/tours/${item.image}`,
                      category:item.category_name.toUpperCase(),
                      place_name:item.name
                  }
              });
              setList(preprocessed);
              setActualList(preprocessed);
            
            }
        } catch (error) {
            alert(error.message);
        }
    }

    let [draggableToDown, setDraggableToDown] = useState(false);

    let [favourite, setFavourite] = useState([
      
    ]);


    let [categoryContainerWidth, setCategoryContainerWidth] = useState(0);

    let [lastOffsetY, setLastOffsetY] = useState(0);


    let [selectedCategory, setSelectedCategory] = useState([
    ]);
    

    useEffect(()=>{
        fetchWhatsIn();
    },[])

    useEffect(()=>{
        Animated.spring(translateY,{
            toValue:0,
            duration:10000,
            useNativeDriver:true
        }).start(()=>{
            setLastOffsetY(0);
            translateY.setOffset(0);
            translateY.setValue(0);
        });
        setDraggableToDown(false);
    },[])
    
    let [list, setList] = useState([
    ]);


    let [actualList, setActualList] = useState([]);

    useEffect(()=>{

        if(selectedCategory.length===0){
            setList(actualList);
        }else{
            let filtered = actualList.filter((item,index)=>{
                return selectedCategory.includes(item.category_name);
            })
    
            setList(filtered);
        }
       
    },[selectedCategory])

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('28rem'),zIndex:100,backgroundColor:"white"}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),backgroundColor:"white",zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('20rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Search</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),backgroundColor:"white",zIndex:100}}>
                <Surface style={{backgroundColor:"white",borderRadius:EStyleSheet.value("15rem"),elevation:2,flexDirection:'row'}}>
                    <View style={{width:EStyleSheet.value("40rem"),justifyContent:"center",alignItems:"center"}}>
                        <Ionicons name="search-outline" style={{marginLeft:EStyleSheet.value("18rem")}} size={24} color="grey" />
                    </View>
                    <TextInput placeholder="What are you looking for?" style={{height:EStyleSheet.value("50rem"),flex:1,paddingVertical:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem")}}></TextInput>
                </Surface>
            </View>
           
        
            <PanGestureHandler
                onGestureEvent={(e)=>{
                    if(lastOffsetY+e.nativeEvent.translationY<=0 && lastOffsetY+e.nativeEvent.translationY>=-220){
                        translateY.setValue(e.nativeEvent.translationY);
                    }
                }}  
                onHandlerStateChange={async (event)=>{


                    if (event.nativeEvent.oldState === State.ACTIVE) {
                    
                        if(lastOffsetY+event.nativeEvent.translationY<=0 && lastOffsetY+event.nativeEvent.translationY>=-220){
                            setLastOffsetY(lastOffsetY+event.nativeEvent.translationY);
                            translateY.setOffset(lastOffsetY+event.nativeEvent.translationY);
                            translateY.setValue(0);
                        }


                        if(event.nativeEvent.translationY<1){

                            if(!draggableToDown){
                                let h = (lastOffsetY+event.nativeEvent.translationY)+220;

                                Animated.spring(translateY,{
                                    toValue:-h,
                                    duration:10000,
                                    useNativeDriver:true
                                }).start(()=>{
                                    setLastOffsetY(-220);
                                    translateY.setOffset(-220);
                                    translateY.setValue(0);
                                });
                                setDraggableToDown(true);
                              

                            }
                        }else if(event.nativeEvent.translationY>1){

                            if(draggableToDown){
                                let h = Math.abs(lastOffsetY+event.nativeEvent.translationY);

                                Animated.spring(translateY,{
                                    toValue:h,
                                    duration:10000,
                                    useNativeDriver:true
                                }).start(()=>{
                                    setLastOffsetY(0);
                                    translateY.setOffset(0);
                                    translateY.setValue(0);
                                });
                                setDraggableToDown(false);
                            }
                        }
                      
                      }
                }}
            >
            <Animated.View style={{backgroundColor:"white",position:"absolute",top:EStyleSheet.value("189rem"),zIndex:1,overflow:"hidden",borderBottomLeftRadius:EStyleSheet.value("20rem"),transform:[{translateY:translateY}],height:EStyleSheet.value("260rem"),justifyContent:"center",borderBottomRightRadius:EStyleSheet.value("20rem"),borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,0.2)",paddingTop:EStyleSheet.value("30rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                {/* <View style={{height:EStyleSheet.value("15rem")}}></View> */}
                <View 
                onLayout={(e)=>{
                    setCategoryContainerWidth(e.nativeEvent.layout.width);
                }}
                style={{flexDirection:'row',flexWrap:"wrap"}}>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                            if(selectedCategory.includes("Promotions")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Promotions");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Promotions"];
                                })
                            }
                        }}>
                            <Surface style={{backgroundColor:(selectedCategory.includes("Promotions")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512.003 512.003"
                                width={EStyleSheet.value("25rem")}
                                height={EStyleSheet.value("25rem")}
                                >
                                <Path fill={(selectedCategory.includes("Promotions")) ? "white":"#a5a5a5"} d="M475.244 264.501a15.592 15.592 0 010-16.998l18.698-28.74c17.032-26.178 5.556-61.348-23.554-72.491l-32.02-12.26a15.596 15.596 0 01-9.992-13.754l-1.765-34.24c-1.608-31.184-31.563-52.902-61.667-44.802l-33.109 8.902a15.598 15.598 0 01-16.167-5.254l-21.555-26.665c-19.631-24.284-56.625-24.245-76.223 0l-21.556 26.666a15.597 15.597 0 01-16.167 5.254l-33.111-8.902c-30.163-8.112-60.063 13.678-61.667 44.802l-1.765 34.24a15.598 15.598 0 01-9.992 13.753l-32.018 12.26c-29.171 11.166-40.555 46.365-23.556 72.492l18.699 28.739a15.596 15.596 0 010 16.998L18.061 293.24c-17.034 26.181-5.554 61.352 23.554 72.492l32.02 12.26a15.598 15.598 0 019.992 13.754l1.765 34.24c1.608 31.19 31.568 52.899 61.667 44.802l33.109-8.902a15.602 15.602 0 0116.168 5.254l21.555 26.664c19.635 24.291 56.628 24.241 76.223 0l21.555-26.664a15.607 15.607 0 0116.167-5.254l33.111 8.902c30.155 8.115 60.062-13.674 61.667-44.802l1.765-34.24a15.598 15.598 0 019.992-13.753l32.018-12.26c29.169-11.166 40.554-46.364 23.557-72.493l-18.702-28.739zm-16.806 70.02l-32.02 12.26c-18.089 6.926-30.421 23.9-31.418 43.243l-1.765 34.24c-.511 9.921-10.036 16.821-19.612 14.249l-33.111-8.902c-18.705-5.032-38.661 1.455-50.836 16.518l-21.553 26.664c-6.245 7.725-18.009 7.709-24.242 0l-21.553-26.664c-9.438-11.676-23.55-18.198-38.132-18.198-4.229 0-8.499.548-12.706 1.68l-33.111 8.902c-9.596 2.576-19.1-4.348-19.612-14.249l-1.765-34.24c-.997-19.343-13.33-36.318-31.418-43.243l-32.02-12.261c-9.277-3.552-12.896-14.744-7.49-23.053l18.698-28.739c10.563-16.236 10.563-37.218 0-53.452l-18.698-28.739c-5.418-8.326-1.768-19.509 7.491-23.054l32.02-12.26c18.089-6.926 30.421-23.9 31.418-43.243l1.765-34.24c.511-9.921 10.036-16.821 19.612-14.249l33.111 8.902c18.705 5.031 38.66-1.455 50.836-16.518l21.555-26.665c6.245-7.724 18.01-7.708 24.241 0l21.555 26.666c12.178 15.063 32.129 21.549 50.836 16.517l33.111-8.902c9.595-2.577 19.1 4.348 19.612 14.249L395 121.98c.997 19.343 13.33 36.318 31.418 43.243l32.021 12.261c9.276 3.55 12.895 14.744 7.49 23.053l-18.697 28.738c-10.565 16.235-10.565 37.217-.001 53.453l18.698 28.738c5.416 8.328 1.768 19.51-7.491 23.055z" />
                                <Path fill={(selectedCategory.includes("Promotions")) ? "white":"#a5a5a5"} d="M339.485 170.845c-6.525-6.525-17.106-6.525-23.632 0L159.887 326.811c-6.525 6.525-6.525 17.106.001 23.632 3.263 3.263 7.54 4.895 11.816 4.895s8.554-1.632 11.816-4.895l155.966-155.967c6.526-6.524 6.526-17.105-.001-23.631zM188.414 165.95c-18.429 0-33.421 14.993-33.421 33.421 0 18.429 14.994 33.421 33.421 33.421 18.429 0 33.421-14.993 33.421-33.421.001-18.428-14.992-33.421-33.421-33.421zM310.959 288.495c-18.429 0-33.421 14.993-33.421 33.421 0 18.429 14.993 33.421 33.421 33.421s33.421-14.993 33.421-33.421c.001-18.428-14.992-33.421-33.421-33.421z" />
                                </Svg>
                            </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Promotions</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                             if(selectedCategory.includes("Attractions")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Attractions");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Attractions"];
                                })
                            }
                        }}>
                            <Surface style={{backgroundColor:(selectedCategory.includes("Attractions")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg 
                                style={{marginTop:EStyleSheet.value('2rem')}}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={EStyleSheet.value("25rem")} height={EStyleSheet.value("25rem")}>
                                    <Path fill={(selectedCategory.includes("Attractions")) ? "white":"#a5a5a5"} d="M392 150.704c-5.943 0-11.872.447-17.715 1.311-33.076-19.855-74.721-30.717-118.285-30.717-43.564 0-85.21 10.863-118.286 30.717A121.054 121.054 0 00120 150.703c-66.168 0-120 53.832-120 120s53.832 120 120 120c59.355 0 108.774-43.319 118.324-100h35.352c9.55 56.681 58.97 100 118.324 100 66.168 0 120-53.832 120-120s-53.832-119.999-120-119.999zm-272 200c-44.112 0-80-35.888-80-80s35.888-80 80-80c43.365 0 80 34.996 80 80 0 44.112-35.888 80-80 80zm153.687-100.002h-35.375c-5.328-31.484-23.103-59.898-49.725-78.451 20.582-7.16 43.571-10.954 67.413-10.954 23.843 0 46.831 3.794 67.412 10.954a120.145 120.145 0 00-49.725 78.451zM392 350.704c-44.112 0-80-35.888-80-80 0-44.527 36.16-80 80-80 44.112 0 80 35.888 80 80s-35.888 80-80 80z" />
                                </Svg>
                            </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Attractions</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                              if(selectedCategory.includes("Accomodations")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Accomodations");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Accomodations"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Accomodations")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={EStyleSheet.value("25rem")}
                            height={EStyleSheet.value("25rem")}
                            viewBox="0 0 128 128"
                            >
                            <Path fill={(selectedCategory.includes("Accomodations")) ? "white":"#a5a5a5"} d="M57.218 78.09h13.564a1.749 1.749 0 001.75-1.75V63.829a1.749 1.749 0 00-1.75-1.75H57.218a1.749 1.749 0 00-1.75 1.75V76.34a1.749 1.749 0 001.75 1.75zm1.75-12.511h10.064v9.011H58.968zM47.782 78.09a1.75 1.75 0 001.75-1.75V63.829a1.75 1.75 0 00-1.75-1.75H34.218a1.749 1.749 0 00-1.75 1.75V76.34a1.749 1.749 0 001.75 1.75zM35.968 65.579h10.064v9.011H35.968zM80.218 78.09h13.564a1.749 1.749 0 001.75-1.75V63.829a1.749 1.749 0 00-1.75-1.75H80.218a1.749 1.749 0 00-1.75 1.75V76.34a1.749 1.749 0 001.75 1.75zm1.75-12.511h10.064v9.011H81.968zM57.218 52.985h13.564a1.749 1.749 0 001.75-1.75V38.724a1.749 1.749 0 00-1.75-1.75H57.218a1.749 1.749 0 00-1.75 1.75v12.511a1.749 1.749 0 001.75 1.75zm1.75-12.511h10.064v9.011H58.968zM34.218 52.985h13.564a1.75 1.75 0 001.75-1.75V38.724a1.75 1.75 0 00-1.75-1.75H34.218a1.749 1.749 0 00-1.75 1.75v12.511a1.749 1.749 0 001.75 1.75zm1.75-12.511h10.064v9.011H35.968zM80.218 52.985h13.564a1.749 1.749 0 001.75-1.75V38.724a1.749 1.749 0 00-1.75-1.75H80.218a1.749 1.749 0 00-1.75 1.75v12.511a1.749 1.749 0 001.75 1.75zm1.75-12.511h10.064v9.011H81.968z" />
                            <Path fill={(selectedCategory.includes("Accomodations")) ? "white":"#a5a5a5"} d="M112.625 116.5h-8.8V29.882h6.167a1.75 1.75 0 001.75-1.75V18.3a1.75 1.75 0 00-1.75-1.75h-6.167v-9.8A6.758 6.758 0 0097.073 0H30.926a6.758 6.758 0 00-6.75 6.75v9.8H18.01a1.75 1.75 0 00-1.75 1.75v9.83a1.75 1.75 0 001.75 1.75h6.166v86.62h-8.8a5.757 5.757 0 00-5.75 5.75v4a1.751 1.751 0 001.75 1.75h105.25a1.75 1.75 0 001.75-1.75v-4a5.757 5.757 0 00-5.751-5.75zM27.676 6.748a3.254 3.254 0 013.25-3.25h66.147a3.254 3.254 0 013.25 3.25v9.8h-4.5v-6.8A1.75 1.75 0 0094.073 8H33.926a1.751 1.751 0 00-1.75 1.75v6.8h-4.5zm64.647 9.8H35.676V11.5h56.647zm-72.563 3.5h88.48v6.33H19.76zm7.916 9.83h72.647V116.5h-19.9V90.25a1.75 1.75 0 00-1.75-1.75H49.332a1.751 1.751 0 00-1.75 1.75v26.25H27.676zM76.918 92v24.5H65.75V92zM62.25 116.5H51.082V92H62.25zm52.625 8H13.125v-2.25a2.252 2.252 0 012.25-2.25h97.25a2.253 2.253 0 012.25 2.25z" />
                            </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Accomodations</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                              if(selectedCategory.includes("Food & Beverages")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Food & Beverages");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Food & Beverages"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Food & Beverages")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={EStyleSheet.value("25rem")}
                            height={EStyleSheet.value("25rem")}
                            >
                            <Path fill={(selectedCategory.includes("Food & Beverages")) ? "white":"#a5a5a5"} d="M240 146.087V224H120a8 8 0 00-8 8v30.111l-15.155 30.311A7.994 7.994 0 0096 296v160a7.994 7.994 0 00.845 3.578l16 32A8 8 0 00120 496h128a8 8 0 007.155-4.422l.148-.3a31.942 31.942 0 0041.586-7.19C304.228 491.351 315.448 496 328 496s23.772-4.649 31.111-11.908A31.988 31.988 0 00416 464c0-.167 0-.333-.016-.5l-7.948-127.182 7.883-55.188a7.962 7.962 0 00.071-1.13h.01V146.087a39.8 39.8 0 00-7.231-22.939L367.365 64H368a8 8 0 008-8V40a24.027 24.027 0 00-24-24h-48a24.027 24.027 0 00-24 24v16a8 8 0 008 8h.635l-41.4 59.148A39.8 39.8 0 00240 146.087zM112 448V304h64.889C184.8 324.429 192 346.041 192 368c0 35.8-10.951 56.8-24.065 80zm82.009-144h14.88C216.8 324.429 224 346.041 224 368c0 35.8-10.951 56.8-24.065 80h-13.683C198.108 426.3 208 403.57 208 368c0-22.483-6.435-43.832-13.991-64zm49.047 176H124.944l-8-16h134.112zM384 480a16.019 16.019 0 01-16-16 8 8 0 00-16 0c0 8.673-10.991 16-24 16s-24-7.327-24-16a8 8 0 00-16 0 15.993 15.993 0 01-25.492 12.873l8.647-17.3A7.994 7.994 0 00272 456V296a7.994 7.994 0 00-.845-3.578L268.944 288h129.832l-6.695 46.869a7.866 7.866 0 00-.065 1.63L400 464.225A16.019 16.019 0 01384 480zM296 40a8.009 8.009 0 018-8h48a8.009 8.009 0 018 8v8h-64zm-40 106.087a23.884 23.884 0 014.338-13.763L308.165 64h39.67l47.827 68.324A23.884 23.884 0 01400 146.087V160H256zM256 232v-56h144v96H260.944L256 262.111zm0 216h-37.748C230.108 426.3 240 403.57 240 368c0-22.483-6.435-43.832-13.991-64H256zM116.944 288l8-16H200a8 8 0 000-16h-72v-16h112v16h-8a8 8 0 000 16h11.056l8 16z" />
                            </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Food & Beverages</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                              if(selectedCategory.includes("Bars & Clubs")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Bars & Clubs");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Bars & Clubs"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Bars & Clubs")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg
                                width={EStyleSheet.value("25rem")}
                                height={EStyleSheet.value("25rem")}
                                viewBox="0 0 512.003 512.003"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <Path
                                    d="M256.002 391.003a14.999 14.999 0 01-12.348-6.484l-160-232a15 15 0 0112.348-23.516h320a15 15 0 0112.348 23.516l-160 232a15.002 15.002 0 01-12.348 6.484zm-131.435-232l131.434 190.579 131.434-190.579z"
                                     fill={(selectedCategory.includes("Bars & Clubs")) ? "white":"#a5a5a5"}
                                />
                                <Path
                                    d="M256.002 512.003c-8.284 0-15-6.716-15-15v-121c0-8.284 6.716-15 15-15s15 6.716 15 15v121c0 8.284-6.716 15-15 15z"
                                     fill={(selectedCategory.includes("Bars & Clubs")) ? "white":"#a5a5a5"}
                                />
                                <Path
                                    d="M368.002 512.003h-224c-8.284 0-15-6.716-15-15s6.716-15 15-15h224c8.284 0 15 6.716 15 15s-6.716 15-15 15zM255.99 287.006c-2.247 0-4.527-.506-6.676-1.576-7.415-3.693-10.433-12.698-6.739-20.114l128-257c3.692-7.415 12.697-10.433 20.114-6.739 7.415 3.693 10.433 12.699 6.739 20.114l-128 257c-2.623 5.267-7.927 8.315-13.438 8.315z"
                                     fill={(selectedCategory.includes("Bars & Clubs")) ? "white":"#a5a5a5"}
                                />
                                <Path
                                    d="M350.478 253.995c-2.859 0-5.748-.815-8.306-2.52l-22.49-14.99a28.18 28.18 0 00-31.358-.002c-19.637 13.091-45.009 13.091-64.643.001a28.19 28.19 0 00-31.358 0l-22.492 14.991c-6.894 4.595-16.206 2.731-20.801-4.162s-2.731-16.207 4.162-20.801l22.49-14.99c19.632-13.089 45.006-13.089 64.64.001a28.192 28.192 0 0031.359 0c19.634-13.093 45.009-13.092 64.643.001l22.487 14.988c6.894 4.594 8.757 13.907 4.162 20.801-2.889 4.336-7.647 6.682-12.495 6.682z"
                                     fill={(selectedCategory.includes("Bars & Clubs")) ? "white":"#a5a5a5"}
                                />
                                </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Bars & Clubs</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                            if(selectedCategory.includes("Mall & Shops")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Mall & Shops");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Mall & Shops"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Mall & Shops")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 width={EStyleSheet.value("25rem")}
                                 height={EStyleSheet.value("25rem")}
                                >
                                <Path fill={(selectedCategory.includes("Mall & Shops")) ? "white":"#a5a5a5"} d="M443.188 442.208L415.956 142.56c-.768-8.256-7.68-14.56-15.968-14.56h-48V96c0-25.728-9.952-49.888-28.032-67.968C305.876 9.952 281.716 0 255.988 0c-52.928 0-96 43.072-96 96v32h-48c-8.288 0-15.2 6.304-15.936 14.56L68.82 442.208c-1.632 17.856 4.384 35.712 16.48 48.96S114.612 512 132.564 512h246.88c17.952 0 35.168-7.584 47.264-20.832s18.08-31.104 16.48-48.96zM191.988 96c0-35.296 28.704-64 64-64 17.184 0 33.28 6.624 45.344 18.656S319.988 78.816 319.988 96v32h-128V96zM403.06 469.6c-6.144 6.688-14.528 10.4-23.648 10.4H132.564c-9.088 0-17.504-3.712-23.616-10.432-6.144-6.72-9.056-15.392-8.224-24.48L126.612 160h33.376v48c0 8.832 7.168 16 16 16s16-7.168 16-16v-48h128v48c0 8.832 7.168 16 16 16s16-7.168 16-16v-48h33.376l25.92 285.12c.832 9.056-2.08 17.76-8.224 24.48z" />
                                </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Mall & Shops</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{
                             if(selectedCategory.includes("Tours")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Tours");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Tours"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Tours")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg
                                width={EStyleSheet.value("25rem")}
                                height={EStyleSheet.value("25rem")}
                                viewBox="0 0 512 512"
                           
                                xmlns="http://www.w3.org/2000/svg"
                         
                                >
                                <Path  fill={(selectedCategory.includes("Tours")) ? "white":"#a5a5a5"} d="M48.817 88.701a7.462 7.462 0 005.009-1.924 247.871 247.871 0 015.468-4.779 7.488 7.488 0 00.867-10.555 7.487 7.487 0 00-10.555-.867 260.846 260.846 0 00-5.803 5.072 7.489 7.489 0 005.014 13.053zM251.442 27.039c4.837.705 9.71 1.566 14.483 2.561a7.493 7.493 0 008.86-5.804 7.489 7.489 0 00-5.804-8.859 258.517 258.517 0 00-15.38-2.72 7.489 7.489 0 00-8.49 6.332 7.488 7.488 0 006.331 8.49zM370.943 80.262a245.317 245.317 0 0111.041 9.731 7.462 7.462 0 005.116 2.022 7.489 7.489 0 005.122-12.955 259.499 259.499 0 00-11.719-10.327 7.49 7.49 0 00-9.56 11.529zM294.309 37.351a241.912 241.912 0 0113.789 5.164c.93.381 1.891.561 2.837.561a7.493 7.493 0 006.933-4.652 7.489 7.489 0 00-4.091-9.769 256.37 256.37 0 00-14.647-5.484 7.489 7.489 0 10-4.821 14.18zM207.145 24.652c.09 0 .18-.001.27-.005 4.864-.172 9.825-.199 14.721-.082 4.133.119 7.568-3.172 7.667-7.307s-3.172-7.567-7.307-7.667a266.225 266.225 0 00-15.61.088 7.488 7.488 0 00-7.219 7.749 7.487 7.487 0 007.478 7.224zM434.211 160.544a7.49 7.49 0 1013.45-6.591 257.843 257.843 0 00-7.289-13.801 7.49 7.49 0 00-13.025 7.394 245.036 245.036 0 016.864 12.998zM411.313 122.905a7.478 7.478 0 006.023 3.032 7.489 7.489 0 006.011-11.947 260.972 260.972 0 00-9.664-12.26 7.489 7.489 0 10-11.479 9.622 245.704 245.704 0 019.109 11.553zM445.505 187.666a240.07 240.07 0 014.389 14.036 7.493 7.493 0 007.209 5.476 7.49 7.49 0 007.217-9.506 255.837 255.837 0 00-4.662-14.911 7.492 7.492 0 00-9.529-4.624 7.49 7.49 0 00-4.624 9.529zM162.069 30.355c.534 0 1.076-.058 1.619-.177a242.566 242.566 0 0114.45-2.725 7.49 7.49 0 00-2.327-14.797 257.147 257.147 0 00-15.347 2.895 7.488 7.488 0 00-5.701 8.925 7.492 7.492 0 007.306 5.879zM334.589 55.305a243.384 243.384 0 0112.618 7.582 7.456 7.456 0 004.043 1.19 7.488 7.488 0 004.056-13.789 259.048 259.048 0 00-13.396-8.049 7.489 7.489 0 10-7.321 13.066zM118.789 44.152a7.48 7.48 0 002.914-.593 241.76 241.76 0 0113.714-5.313 7.488 7.488 0 004.571-9.553 7.487 7.487 0 00-9.553-4.571 256.902 256.902 0 00-14.566 5.643 7.49 7.49 0 002.92 14.387zM78.728 65.594c1.414 0 2.844-.4 4.113-1.236a244.526 244.526 0 0112.526-7.717 7.49 7.49 0 00-7.466-12.984 259.043 259.043 0 00-13.298 8.193 7.488 7.488 0 004.125 13.744zM462.373 222.055a7.489 7.489 0 00-6.288 8.522c.361 2.388.689 4.811.978 7.202a7.49 7.49 0 008.333 6.536 7.49 7.49 0 006.537-8.333 265.21 265.21 0 00-1.038-7.64c-.617-4.089-4.445-6.901-8.522-6.287zM94.002 207.717a7.49 7.49 0 00-7.489-7.489H72.131a7.49 7.49 0 000 14.978h14.382a7.49 7.49 0 007.489-7.489zM110.851 234.526H96.469a7.49 7.49 0 000 14.978h14.381a7.49 7.49 0 00.001-14.978zM76.558 302.005H62.176a7.49 7.49 0 000 14.978h14.381a7.49 7.49 0 00.001-14.978zM230.538 87.384h-14.382a7.49 7.49 0 000 14.978h14.382a7.49 7.49 0 000-14.978zM280.043 375.941a7.488 7.488 0 00-7.489-7.489h-14.382a7.49 7.49 0 000 14.978h14.382a7.49 7.49 0 007.489-7.489zM241.076 396.162h-14.382a7.49 7.49 0 000 14.978h14.382a7.49 7.49 0 000-14.978z" />
                                <Path  fill={(selectedCategory.includes("Tours")) ? "white":"#a5a5a5"} d="M504.055 270.954a27.193 27.193 0 00-20.054-7.93c-19.606.632-38.389 8.666-52.439 22.212.493-5.979.747-12.007.747-18.074 0-16.059-1.748-31.987-5.282-47.668-5.917-26.25-16.805-51.324-31.91-73.591a216.775 216.775 0 00-25.641-31.112 218.313 218.313 0 00-24.049-20.888c-12.662-9.484-27.154-17.972-41.103-24.209-27.665-12.37-57.874-18.685-88.168-18.685-57.737 0-112.018 22.484-152.843 63.309a215.13 215.13 0 00-11.286 12.187C18.477 165.621 0 215.575 0 267.163c0 62.386 26.448 120.779 72.91 161.856 21.395 18.985 46.657 33.767 73.852 42.961 22.315 7.544 45.844 11.336 69.395 11.336 35.551 0 69.775-8.557 100.371-24.64l15.417 33.918a16.897 16.897 0 0012.365 9.632c5.286.959 11.071-.788 14.959-4.677l11.196-11.196a16.86 16.86 0 004.93-11.167l1.357-29.418 29.034-26.358 35.553 53.795a16.828 16.828 0 0012.394 7.494c4.9.495 10.066-1.284 13.644-4.862l11.194-11.193a16.942 16.942 0 004.736-14.606l-14.042-88.028 16.167-14.361c16.176-14.37 25.853-35.015 26.552-56.641a27.206 27.206 0 00-7.929-20.054zM331.563 102.362c44.518 31.223 74.441 78.922 83.132 132.164H291.136a16.743 16.743 0 01-11.917-4.937 16.742 16.742 0 01-4.936-11.917c0-9.293 7.56-16.853 16.853-16.853h29.902c8.494 0 16.485-3.305 22.508-9.313 6.011-6.013 9.323-14.006 9.323-22.508 0-17.552-14.28-31.831-31.831-31.831h-13.82c-4.65 0-9.02-1.809-12.311-5.1a17.256 17.256 0 01-5.098-12.298c0-9.599 7.81-17.408 17.409-17.408h24.345zM216.157 468.337c-39.221 0-75.853-11.286-106.827-30.776h51.301c9.683 0 18.789-3.772 25.639-10.621 6.849-6.85 10.621-15.951 10.621-25.628 0-19.988-16.266-36.249-36.26-36.249H134.08a10.138 10.138 0 01-7.216-2.989 10.152 10.152 0 01-2.989-7.227c0-5.627 4.578-10.205 10.205-10.205h97.725c11.344 0 22.01-4.419 30.036-12.443 8.024-8.025 12.443-18.695 12.443-30.046 0-23.423-19.056-42.479-42.479-42.479h-38.686c-15.615 0-28.318-12.703-28.318-28.318v-2.387c0-6.934 2.696-13.443 7.596-18.335 4.898-4.898 11.413-7.596 18.345-7.596 10.575 0 20.511-4.12 27.968-11.591 7.481-7.467 11.601-17.403 11.601-27.978 0-21.824-17.75-39.579-39.568-39.579h-51.049a7.49 7.49 0 000 14.978h51.049c13.559 0 24.591 11.036 24.591 24.601 0 6.569-2.558 12.74-7.213 17.387-4.637 4.646-10.808 7.204-17.377 7.204-10.933 0-21.209 4.255-28.932 11.978-7.73 7.717-11.987 17.991-11.987 28.93v2.387c0 23.873 19.422 43.296 43.296 43.296h38.686c15.164 0 27.501 12.337 27.501 27.501 0 7.35-2.861 14.26-8.057 19.455s-12.101 8.057-19.444 8.057h-97.725c-13.886 0-25.182 11.297-25.182 25.182 0 6.734 2.619 13.061 7.376 17.817 4.757 4.757 11.08 7.376 17.807 7.376h26.551c11.735 0 21.282 9.542 21.282 21.271 0 5.676-2.214 11.016-6.234 15.037a21.142 21.142 0 01-15.048 6.235H88.418c-46.708-38.404-73.44-94.899-73.44-155.42 0-46.871 16.389-92.293 46.216-128.294h43.465a7.49 7.49 0 000-14.978H75.102c36.335-35.78 86.153-57.905 141.055-57.905 32.432 0 63.088 7.726 90.243 21.418-17.481.437-31.569 14.781-31.569 32.365 0 8.658 3.373 16.791 9.491 22.895 6.114 6.114 14.245 9.481 22.896 9.481h13.82c9.293 0 16.853 7.561 16.853 16.853a16.74 16.74 0 01-4.93 11.911 16.775 16.775 0 01-11.923 4.932h-29.902c-17.551 0-31.831 14.28-31.831 31.831 0 8.502 3.311 16.495 9.323 22.508 6.014 6.012 14.007 9.323 22.508 9.323h125.416c.513 5.819.78 11.708.78 17.658 0 12.891-1.238 25.496-3.566 37.719l-.741.834-38.629-6.162a7.49 7.49 0 00-2.36 14.79l29.021 4.63-35.339 38.971-55.695-36.808a1.857 1.857 0 01-.849-1.406 1.863 1.863 0 01.55-1.547l11.194-11.193a1.927 1.927 0 011.655-.537l14.661 2.339a7.49 7.49 0 002.36-14.79l-14.662-2.339a16.943 16.943 0 00-14.604 4.737l-11.194 11.193a16.83 16.83 0 00-4.862 13.643 16.83 16.83 0 007.494 12.395l53.841 35.583-26.366 29.043-29.418 1.357a16.857 16.857 0 00-11.164 4.93l-11.198 11.197a16.898 16.898 0 004.955 27.325l16.421 7.464c-25.237 11.427-53.224 17.809-82.68 17.809zm251.826-14.284l-11.193 11.192a1.874 1.874 0 01-1.547.552 1.862 1.862 0 01-1.405-.85l-36.809-55.695L456 373.914l12.52 78.484a1.922 1.922 0 01-.537 1.655zm7.504-117.601l-27.862 24.75-83.243 75.568a7.49 7.49 0 00-2.448 5.2l-1.501 32.525c-.021.478-.22.928-.56 1.267l-11.196 11.196c-.585.587-1.246.61-1.696.53-.45-.082-1.059-.337-1.401-1.092l-16.64-36.609a7.499 7.499 0 00-3.719-3.719l-36.609-16.64c-.755-.343-1.01-.952-1.092-1.402s-.056-1.11.529-1.696l11.198-11.197a1.912 1.912 0 011.265-.559l32.526-1.501a7.488 7.488 0 005.199-2.448l100.319-111.103c11.652-13.117 28.391-20.964 45.927-21.53a12.017 12.017 0 018.98 3.552 12.022 12.022 0 013.551 8.98c-.564 17.536-8.411 34.275-21.527 45.928z" />
                                </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Tours</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                     <Pressable onPress={()=>{
                             if(selectedCategory.includes("Event")){
                                setSelectedCategory((prev)=>{
                                    return prev.filter((item,_)=>item!=="Event");
                                })
                            }
                            else{
                                setSelectedCategory((prev)=>{
                                    return [...prev,"Event"];
                                })
                            }
                        }}>
                        <Surface style={{backgroundColor:(selectedCategory.includes("Event")) ? "#f23545":"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                                <Svg
                                width={EStyleSheet.value("25rem")}
                                height={EStyleSheet.value("25rem")}
                                viewBox="0 0 512.002 512.002"

                                xmlns="http://www.w3.org/2000/svg"

                                >
                                <Path  fill={(selectedCategory.includes("Event")) ? "white":"#a5a5a5"} d="M168.544 153.008c-5.721-.165-10.854 2.826-13.551 7.542-.58 1.011 5.349-11.655-153.594 330.125a15 15 0 0020.055 19.866c344.59-164.244 321.442-153.16 322.622-153.914a14.95 14.95 0 006.531-9.263c.545-2.38.392-3.86.392-11.364.001-100.724-81.798-182.697-182.455-182.992zm-9.475 69.771c16.389 61.937 64.512 111.098 125.843 128.957L46.182 465.522zm24.125-39.029c74.721 7.403 133.814 68.794 137.612 144.503-74.72-7.403-133.814-68.794-137.612-144.503z" />
                                <Path  fill={(selectedCategory.includes("Event")) ? "white":"#a5a5a5"} d="M150.71 373.071c-1.88-9.017-10.864-13.917-19.06-11.42-8.398 2.677-12.27 11.103-10 18.71 2.796 8.579 11.253 12.205 18.71 9.99 7.95-2.599 11.706-10.039 10.35-17.28zM174.71 301.071c-1.842-8.831-10.618-13.939-19.07-11.42-8.496 2.769-12.229 11.205-9.99 18.71 2.797 8.583 11.254 12.205 18.71 9.99 7.902-2.583 11.715-9.992 10.35-17.28zM214.93 350.521c-.889-8.567-8.79-14.937-17.86-13.23-8.106 1.69-13.341 9.343-11.78 17.64 1.672 8.058 9.292 13.343 17.64 11.78 7.955-1.658 12.749-8.901 12-16.19zM492.362 129.449l-12.007 3.002A41.336 41.336 0 00449 172.61v16.399c0 7.571-7.24 13.041-14.525 10.956-19.986-5.71-41.232 4.391-49.42 23.496l-14.842 34.631c-3.263 7.614.264 16.433 7.878 19.696 7.615 3.263 16.433-.264 19.696-7.878l14.842-34.631c2.254-5.259 8.104-8.04 13.604-6.468C452.689 236.368 479 216.539 479 189.009V172.61c0-5.238 3.549-9.784 8.631-11.054l12.007-3.002c8.037-2.01 12.923-10.154 10.914-18.19-2.009-8.037-10.152-12.924-18.19-10.915zM416.653 88.237l19.034-38.067a25.603 25.603 0 0119.764-13.983c3.024-.376-11.141 1.62 43.705-6.341 8.198-1.19 13.88-8.801 12.689-16.999-1.189-8.198-8.8-13.878-16.999-12.689L451.569 6.44a55.54 55.54 0 00-42.715 30.314L389.82 74.82c-4.374 8.747-13.166 14.181-22.945 14.181-33.873 0-59.879 30.031-55.095 63.525l1.371 9.597c1.069 7.481 7.486 12.88 14.831 12.88 9.166 0 16.156-8.105 14.868-17.124l-1.371-9.596c-2.208-15.457 9.8-29.282 25.396-29.282 21.216 0 40.291-11.788 49.778-30.764zM210.073 117.572c2.346 5.865 7.979 9.433 13.932 9.433 10.567 0 17.869-10.709 13.923-20.575-3.706-9.263 3.061-19.429 13.154-19.429h3.622c21.838 0 40.635-16.303 43.724-37.921l4.422-30.958c1.172-8.201-4.527-15.799-12.728-16.97-8.193-1.171-15.798 4.526-16.97 12.728l-4.422 30.958c-.991 6.934-7.021 12.164-14.025 12.164h-3.622c-31.183-.001-52.623 31.536-41.01 60.57zM337.291 26.931c1.669 8.044 9.279 13.345 17.64 11.78 8.182-1.706 13.321-9.41 11.78-17.64-1.852-8.882-10.659-13.927-19.07-11.42-7.942 2.588-11.711 10.049-10.35 17.28zM398.35 155.642c-2.969-9.119-12.496-12.694-20.09-9.49-8.007 3.382-11.172 12.34-8.11 19.59 3.393 8.042 12.375 11.158 19.59 8.11 7.161-3.029 10.835-10.754 8.61-18.21zM486.35 83.642c-2.965-9.108-12.491-12.696-20.09-9.49-7.992 3.375-11.177 12.327-8.11 19.59 3.359 7.96 12.296 11.191 19.59 8.11 7.198-3.045 10.823-10.795 8.61-18.21zM454.71 285.071c-1.842-8.831-10.618-13.939-19.07-11.42-8.52 2.777-12.221 11.232-9.99 18.71 2.815 8.637 11.385 12.211 18.7 9.99 7.733-2.473 11.756-9.826 10.36-17.28zM286.35 131.642c-2.982-9.159-12.545-12.673-20.09-9.49-8.062 3.405-11.149 12.394-8.11 19.59 3.393 8.042 12.375 11.158 19.59 8.11 7.147-3.024 10.839-10.739 8.61-18.21zM193.291 18.931c1.681 8.102 9.337 13.334 17.64 11.78 8.121-1.694 13.332-9.35 11.78-17.64-1.839-8.817-10.605-13.943-19.07-11.42-7.912 2.579-11.717 10.018-10.35 17.28z" />
                                </Svg>
                        </Surface>
                        </Pressable>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem"),fontFamily:"QuicksandMedium"}}>Event</Text>
                    </View>
                </View>
                <View style={{justifyContent:"flex-end",alignItems:"center",paddingBottom:EStyleSheet.value("2.5rem"),height:EStyleSheet.value("30rem")}}>
                    <View style={{backgroundColor:"#ebebeb",height:EStyleSheet.value("8rem"),width:EStyleSheet.value("50rem")}}></View>
                </View>
            </Animated.View>
            </PanGestureHandler>
            <Animated.FlatList
            keyExtractor={(item,index)=>`searchresult-${index}`}
            data={list}
            renderItem={({item,index})=>{
                return (
                    <Pressable onPress={()=>{
                        props.navigation.navigate("DetailPlace", {item:item,image:item.image,category:item.category,name:item.place_name});
                    }}>
                        <Surface style={{marginTop:(index===0) ? EStyleSheet.value("60rem"):undefined,elevation:2,marginHorizontal:EStyleSheet.value("20rem"),backgroundColor:"white",borderRadius:EStyleSheet.value("10rem"),marginBottom:EStyleSheet.value("20rem"),height:EStyleSheet.value("170rem")}}>
                            <ImageLoader resizeMode="cover" source={{uri:item.image}} style={{borderRadius:EStyleSheet.value("10rem"),position:"absolute",width:"100%",height:"100%"}}></ImageLoader>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['transparent', 'rgba(0,0,0,0.7)']}
                                style={{position:'absolute',bottom:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("10rem"),height:EStyleSheet.value('100rem')}}
                            />
                            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:EStyleSheet.value("20rem"),paddingTop:EStyleSheet.value("15rem")}}>
                                <Feather name="heart" size={EStyleSheet.value("27rem")} color="white" />
                            </View>
                            <View style={{flex:1,zIndex:15,justifyContent:"flex-end",paddingVertical:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                    <View>
                                        <Text style={{color:"white",fontSize:EStyleSheet.value("13rem"),fontFamily:"QuicksandMedium"}}>{item.category}</Text>
                                        <Text style={{fontFamily:"HeeboBold",color:"white",fontSize:EStyleSheet.value("15rem")}}>{item.place_name}</Text>
                                    </View>
                                    <View style={{justifyContent:"flex-end"}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </Pressable>
                )
            }}
            />
        </View>
    )
}