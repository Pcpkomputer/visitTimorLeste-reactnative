import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList, PanGestureHandler, TextInput, State, ScrollView } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";


export default function SearchScreen(props){

    const translateY = useRef(new Animated.Value(0)).current;
      
    let shadow = {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    }


    let [favourite, setFavourite] = useState([
      
    ]);


    let [categoryContainerWidth, setCategoryContainerWidth] = useState(0);

    let [lastOffsetY, setLastOffsetY] = useState(0);

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('28rem'),zIndex:100}}></View>
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
                onHandlerStateChange={(event)=>{


                    if (event.nativeEvent.oldState === State.ACTIVE) {
                        

                        if(lastOffsetY+event.nativeEvent.translationY<=0 && lastOffsetY+event.nativeEvent.translationY>=-220){
                            setLastOffsetY(lastOffsetY+event.nativeEvent.translationY);
                            translateY.setOffset(lastOffsetY+event.nativeEvent.translationY);
                            translateY.setValue(0);
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
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Promotions</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Attractions</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Accomodations</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Food & Beverages</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Bars & Clubs</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Mall & Shops</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Tours</Text>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),width:EStyleSheet.value("85rem"),justifyContent:"center",alignItems:"center"}}>
                        <Surface style={{backgroundColor:"white",elevation:2,justifyContent:"center",alignItems:"center",borderRadius:999,width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem")}}>
                            <Text>123</Text>
                        </Surface>
                        <Text numberOfLines={1} style={{marginTop:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("10rem")}}>Event</Text>
                    </View>
                </View>
                <View style={{justifyContent:"flex-end",alignItems:"center",paddingBottom:EStyleSheet.value("2.5rem"),height:EStyleSheet.value("30rem")}}>
                    <View style={{backgroundColor:"#ebebeb",height:EStyleSheet.value("8rem"),width:EStyleSheet.value("50rem")}}></View>
                </View>
            </Animated.View>
            </PanGestureHandler>
            <Animated.FlatList
            keyExtractor={(item,index)=>`searchresult-${index}`}
            data={[1,2,3,4,5,6,7,8,9,10,11,12,13]}
            renderItem={({item,index})=>{
                return (
                    <Surface style={{marginTop:(index===0) ? EStyleSheet.value("60rem"):undefined,elevation:2,marginHorizontal:EStyleSheet.value("20rem"),backgroundColor:"white",borderRadius:EStyleSheet.value("10rem"),marginBottom:EStyleSheet.value("20rem"),height:EStyleSheet.value("170rem")}}>
                        <Image resizeMode="cover" source={{uri:"https://www.tracktraceit.com/serialization/images/food%20and%20baverages.jpg"}} style={{borderRadius:EStyleSheet.value("10rem"),position:"absolute",width:"100%",height:"100%"}}></Image>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent', 'rgba(0,0,0,0.7)']}
                            style={{position:'absolute',bottom:0,zIndex:10,width:"100%",height:EStyleSheet.value('100rem')}}
                        />
                        <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:EStyleSheet.value("20rem"),paddingTop:EStyleSheet.value("15rem")}}>
                            <Feather name="heart" size={EStyleSheet.value("27rem")} color="white" />
                        </View>
                        <View style={{flex:1,zIndex:15,justifyContent:"flex-end",paddingVertical:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <View>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("13rem")}}>Food & Bevereges</Text>
                                    <Text style={{fontFamily:"HeeboBold",color:"white",fontSize:EStyleSheet.value("15rem")}}>Rivera Forliona</Text>
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
                )
            }}
            />
        </View>
    )
}