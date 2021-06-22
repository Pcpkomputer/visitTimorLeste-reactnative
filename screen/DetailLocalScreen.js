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

const FirstRoute = () => (
    <View style={{ flex:1, backgroundColor: 'white', paddingHorizontal:EStyleSheet.value("15rem") }}>
        <FlatList
        contentContainerStyle={{paddingHorizontal:EStyleSheet.value("5rem")}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index)=>`${index}-recommendationlocal`}
        data={[1,2,3,4,5]}
        renderItem={({item,index})=>{
            return (
                <Surface style={{marginTop:(index)===0 ? EStyleSheet.value("20rem"):null,elevation:2,marginBottom:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("20rem")}}>
                    <View style={{backgroundColor:"whitesmoke",borderTopRightRadius:EStyleSheet.value("20rem"),borderTopLeftRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("190rem")}}>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Text style={{fontFamily:"QuicksandBold",fontSize:EStyleSheet.value("15rem")}}>"Great food, central, and accessible"</Text>
                    </View>
                </Surface>
            )
        }}
        >
        </FlatList>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ height:500, backgroundColor: 'white' }}>
        <Text>123</Text>
    </View>
  );
  

export default function DetailLocalScreen(props){


    const renderScene = SceneMap({
        first: FirstRoute,
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
                <Text>555</Text>
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