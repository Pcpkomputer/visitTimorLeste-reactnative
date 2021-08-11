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
import { Fontisto, Entypo } from '@expo/vector-icons'; 

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ImageLoader from '../../components/ImageLoader';

import HTML from "react-native-render-html";
import { FlatList } from 'react-native-gesture-handler';

import {ip} from '../../utils/env';

let nav = null;
let listrecommendation = [];
let listlocals = [];

const FirstRoute = (props) => 

{
    let [listrecommendation_, setListRecommendation_] = useState(listrecommendation);
    return (

 

    <View style={{ flex: 1, backgroundColor: 'white',paddingHorizontal:EStyleSheet.value("15rem"),paddingTop:EStyleSheet.value("15rem") }}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={listrecommendation_}
        contentContainerStyle={{padding:EStyleSheet.value("5rem")}}
        keyExtractor={(item,index)=>`localreccomendation-${index}`}
        renderItem={({item,index})=>{
            return (
                <Pressable
                onPress={()=>{
                    props.navigation.navigate("DetailLocalRecommendation",{item:item});
                    // setListRecommendation_([]);
                }}
                >
                    <Surface style={{marginBottom:EStyleSheet.value("20rem"),overflow:"hidden",backgroundColor:"white",elevation:3,borderRadius:EStyleSheet.value("5rem")}}>
                        <View
                        source={{uri:item.image}}
                        style={{height:EStyleSheet.value("180rem"),backgroundColor:"whitesmoke",justifyContent:"flex-end"}}>
                            <ImageLoader  source={{uri:item.image}}
                            style={{height:EStyleSheet.value("180rem"),backgroundColor:"whitesmoke",justifyContent:"flex-end"}}></ImageLoader>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['transparent','rgba(0,0,0,0.7)']}
                                style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                            />
                            <Text style={{zIndex:11,color:"white",fontFamily:"QuicksandMedium",marginHorizontal:EStyleSheet.value("10rem"),marginBottom:EStyleSheet.value("3rem")}}>{item.category}</Text>
            <Text style={{marginHorizontal:EStyleSheet.value("10rem"),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value("15rem"),color:"white",zIndex:11,fontSize:EStyleSheet.value("16rem")}}>{item.place_name}</Text>
                        </View>
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("15rem")}}>
                            <Text style={{fontFamily:"QuicksandBold"}}>"{item.comment}"</Text>
                        </View>
                        <View style={{marginVertical:EStyleSheet.value("15rem"),flexDirection:"row",marginTop:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                            <ImageBackground 
                            source={{uri:item.avatar}}
                            style={{overflow:"hidden",width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem"),backgroundColor:"whitesmoke",borderRadius:999}}>
                            </ImageBackground>
                            <View style={{marginLeft:EStyleSheet.value("10rem"),justifyContent:"center"}}>
                                <Text style={{fontFamily:"HeeboBold"}}>{item.user_name}</Text>
                            </View>
                        </View>
                    </Surface>
                </Pressable>
            )
        }}
        />
    </View>
  )};
  
  const SecondRoute = (props) => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("20rem")}}>
            <FlatList
            keyExtractor={(item,index)=>`locals-${index}`}
            data={listrecommendation}
            renderItem={({item,index})=>{
                return (
                    <Pressable 
                    onPress={()=>{
                        props.navigation.navigate("DetailLocal", {item:item});
                    }}
                    style={{flexDirection:"row",marginBottom:EStyleSheet.value("20rem")}}>
                        <ImageBackground source={{uri:item.avatar}} style={{overflow:"hidden",backgroundColor:"whitesmoke",width:EStyleSheet.value("80rem"),borderRadius:999,height:EStyleSheet.value("80rem")}}>
                        </ImageBackground>
                        <View style={{flex:1,justifyContent:"center",borderBottomWidth:0.5,borderColor:"grey",paddingHorizontal:EStyleSheet.value("12rem")}}>
                            <Text style={{fontFamily:"HeeboBold"}}>{item.user_name}</Text>
                            <Text style={{fontSize:EStyleSheet.value("12rem"),color:"grey"}}>{item.minitype}</Text>
                        </View>
                        <View style={{borderBottomWidth:0.5,borderColor:"grey",justifyContent:"center",alignItems:"center"}}>
                            <Entypo name="chevron-thin-right" size={24} color="grey" />
                        </View>
                    </Pressable>
                )
            }}
            />
        </View>
    </View>
  );

  const renderScene = SceneMap({
    first: ()=><FirstRoute navigation={nav} listrecommendation={listrecommendation}/>,
    second: ()=><SecondRoute navigation={nav}/>,
  });
  
  

export default function SeeAllLocalRecommendation(props){

    nav = props.navigation;
    listrecommendation = props.route.params.localrecommendation;

    useEffect(()=>{
        console.log(props.route.params.localrecommendation);
    },[])

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'RECOMMENDATIONS' },
      { key: 'second', title: 'LOCALS' },
    ]);
    

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('28rem')}}></View>
            <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('20rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Local <Text style={{color:"#f23545"}}>Recommendation</Text></Text>
            </View>
            <View style={{flex:1}}>
                <TabView
                    renderTabBar={props => {
                        return (
                            <TabBar 
                            renderLabel={({ route, focused, color }) => (
                                <Text style={{ color,fontSize:EStyleSheet.value("13rem"), fontFamily:"HeeboBold"}}>
                                  {route.title}
                                </Text>
                              )}
                            indicatorStyle={{backgroundColor:"#f23545",height:EStyleSheet.value("2.8rem")}}
                            tabStyle={{width:EStyleSheet.value("auto"),paddingHorizontal:EStyleSheet.value("12rem"),height:EStyleSheet.value("55rem")}}
                            pressColor="white"
                            contentContainerStyle={{
                                shadowOpacity:0,
                                shadowColor:"rgba(0,0,0,0)",
                                borderBottomWidth:0
                            }}
                            style={{
                                backgroundColor:"white",
                                shadowOpacity:0,
                                shadowColor:"rgba(0,0,0,0)",
                                borderBottomWidth:0,
                                elevation:0,
                                marginHorizontal:EStyleSheet.value("25rem")
                            }}
                            activeColor="#f23545"
                            inactiveColor="black"
                            {...props} />
                        )
                    }}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
    )
}