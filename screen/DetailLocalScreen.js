import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, useWindowDimensions, Animated, Text, Pressable, View, TouchableOpacity, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ImageLoader from '../components/ImageLoader';

import {ip} from '../utils/env';


const FirstRoute = (props) => {

    let [recommendation ,setRecommendation] = useState([]);

    let fetchRecommendation = async()=>{
        let request = await fetch(`${ip}/api/getrecommendationbyiduser/${props.route.params.item.id_user}`);
        let json = await request.json();
        setRecommendation(json);
    }

    useEffect(()=>{
        fetchRecommendation();
    },[])

    return (
        <View style={{ flex:1, backgroundColor: 'white', paddingHorizontal:EStyleSheet.value("15rem") }}>
            <FlatList
            contentContainerStyle={{paddingHorizontal:EStyleSheet.value("5rem")}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,index)=>`${index}-recommendationlocal`}
            data={recommendation}
            renderItem={({item,index})=>{
                return (
                    <Pressable
                    onPress={()=>{
                        props.navigation.navigate("DetailLocalRecommendation",{item:{
                            ...item,
                            image:`${ip}/static/image/user/${item.toursimage}`,
                            category:item.category_name.toUpperCase(),
                            place_name:item.toursname,
                            avatar:`${ip}/static/image/user/${item.avatar}`,
                            user_name:item.name,
                            comment:item.quote
                        }});
                    }}
                    >
                        <Surface style={{marginTop:(index)===0 ? EStyleSheet.value("20rem"):null,elevation:2,marginBottom:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("20rem")}}>
                            <View style={{backgroundColor:"whitesmoke",overflow:"hidden",justifyContent:"flex-end",borderTopRightRadius:EStyleSheet.value("20rem"),borderTopLeftRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("190rem")}}>
                                <ImageLoader source={{uri:`${ip}/static/image/tours/${item.toursimage}`}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('5rem')}}></ImageLoader>
                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['transparent','rgba(0,0,0,0.8)']}
                                    style={{position:'absolute',bottom:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                                />
                                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),zIndex:12,paddingVertical:EStyleSheet.value("10rem")}}>
                                    <Text style={{fontSize:EStyleSheet.value("18rem"),color:"white"}}>{item.toursname}</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                <Text style={{fontFamily:"QuicksandBold",fontSize:EStyleSheet.value("15rem")}}>"{item.quote}"</Text>
                            </View>
                        </Surface>
                    </Pressable>
                )
            }}
            >
            </FlatList>
        </View>
      );
}
  
  const SecondRoute = () => (
    <View style={{ height:500, backgroundColor: 'white' }}>
    </View>
  );
  

export default function DetailLocalScreen(props){


    const renderScene = SceneMap({
        first: ()=>{
           return (
            <FirstRoute route={props.route} navigation={props.navigation}/>
           )
        },
        second: SecondRoute,
      });
    

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Recommendation' },
    ]);


    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{position:"absolute",backgroundColor:"whitesmoke",width:"100%",height:EStyleSheet.value("250rem")}}>
                <ImageLoader source={{uri:"http://"}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('5rem')}}></ImageLoader>
            </View>
            
            <ScrollView>
                
                <View style={{marginBottom:EStyleSheet.value("0rem"),zIndex:100,marginTop:EStyleSheet.value("250rem")}}>
                    <ImageBackground source={{uri:props.route.params.item.avatar}} style={{overflow:"hidden",position:"absolute",top:EStyleSheet.value("-50rem"),left:(Dimensions.get("screen").width/2)-EStyleSheet.value("50rem"),backgroundColor:"whitesmoke",borderWidth:2,borderColor:"white",width:EStyleSheet.value("100rem"),height:EStyleSheet.value("100rem"),borderRadius:999}}>
                        
                    </ImageBackground>
                </View>
                <View style={{backgroundColor:"white",position:"relative"}}>
                    <View style={{height:EStyleSheet.value("60rem"),backgroundColor:"white"}}>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:EStyleSheet.value("22rem")}}>{props.route.params.item.user_name}</Text>
                        <Text style={{fontSize:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("5rem")}}>{props.route.params.item.type}</Text>
                        <Text style={{fontSize:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("5rem")}}>{props.route.params.item.minitype}</Text>
                    </View>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("5rem")}}>
                        <Text style={{fontSize:EStyleSheet.value("16rem")}}>ABOUT ME</Text>
                        <Text style={{marginTop:EStyleSheet.value("10rem")}}>
                            {props.route.params.item.aboutme}
                        </Text>
                    </View>
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
                        style={{height:500}}
                        initialLayout={{ width: layout.width }}
                    />
                </View>
             
            </ScrollView>
        </View>
    )
}