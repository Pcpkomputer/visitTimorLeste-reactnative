import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Text, Pressable, View, TouchableOpacity, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

import ImageLoader from '../components/ImageLoader';

import {ip} from '../utils/env';


export default function DashboardScreen(props){

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

    let [selectedFragment, setSelectedFragment] = useState("discover");

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

    let fetchWeeklySpotlights = async ()=>{
        try {
            let result = await fetch(`${ip}/api/spotlights`);
            let json = await result.json();
            let preprocessed = json.map((item,index)=>{
                return {
                    ...item,
                    title:item.spotlights_title,
                    image:`${ip}/static/image/spotlights/${item.image}`,
                    content:item.spotlights_content,
                    dateposted:item.date_posted,
                }
            })
            setWeeklySpotlight(preprocessed);
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        fetchWeeklySpotlights();
    },[])

    let [weeklySpotlight, setWeeklySpotlight] = useState([
    ])


    let fetchWhatsNew = async ()=>{
        try {
            let result = await fetch(`${ip}/api/category`);
            let json = await result.json();
            if(json.success){
                let preprocessed = json.data.map((item,index)=>{
                    return {
                        ...item,
                        title:item.category_name.toUpperCase(),
                        image:`${ip}/static/image/category/${item.image}`
                    }
                });
                setWhatsnew(preprocessed);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        fetchWhatsNew();
    },[])

    let [whatsnew, setWhatsnew] = useState([
    ])

    let fetchLocalRecommendation = async()=>{
        try {
            let result = await fetch(`${ip}/api/localreview`);
            let json = await result.json();
            if(json.success){
               let preprocessed = json.data.map((item,index)=>{
                   return {
                       ...item,
                       image:`${ip}/static/image/tours/${item.toursimage}`,
                       category:item.category_name.toUpperCase(),
                       place_name:item.toursname,
                       comment:item.quote,
                       avatar:`${ip}/static/image/user/${item.avatar}`,
                       whyshouldvisit:item.whyshouldvisit,
                       specialtip:item.specialtip,
                       user_name:item.fullname
                   }
               });
               setLocalRecommendation(preprocessed);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        fetchLocalRecommendation();
    },[])

    let [localrecommendation, setLocalRecommendation] = useState([
    ])

    let fetchPrecinct = async ()=>{
        try {
            let result = await fetch(`${ip}/api/precinct`);
            let json = await result.json();
            if(json.success){
                let preprocessed = json.data.map((item,index)=>{
                    return {
                        ...item,
                        precinct_name:item.precinct_name,
                        precinct_minidescription:item.mini_description,
                        precinct_image:`${ip}/static/image/precinct/${item.image}`,
                    }
                });
                setPrecinct(preprocessed);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        fetchPrecinct();
    },[])

    let [precinct, setPrecinct] = useState([
    ])

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
              setWhatsIn(preprocessed.slice(0.5));
            
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        fetchWhatsIn();
    },[])

    let [whatsIn, setWhatsIn] = useState([
    ])


    return (
        <View style={{flex:1,backgroundColor:'white'}}>

           {
               (selectedFragment==="discover") &&
               <Animated.View style={{...shadow,transform:[{translateY:iTranslateYTopBar}],backgroundColor:'white',zIndex:100,opacity:iTopBarFade,justifyContent:'center',alignItems:'center',position:'absolute',width:'100%',marginTop:EStyleSheet.value('0rem'),height:EStyleSheet.value('86rem')}}>
                    <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value('8rem'),marginTop:EStyleSheet.value('33rem')}}>Discover <Text style={{color:"#f23545"}}>Timor Leste</Text></Text>
                </Animated.View>
           }


            <ScrollView
            scrollEventThrottle={16}
            onScroll={(e)=>{
                    topBarFade.setValue(e.nativeEvent.contentOffset.y);
            }}
            >
            

                <View style={{height:EStyleSheet.value('28rem')}}></View>
                <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('30rem')}}>
                    <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                    <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Discover <Text style={{color:"#f23545"}}>Timor Leste</Text></Text>
                </View>
                <View style={{marginBottom:EStyleSheet.value('25rem')}}>
                    <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('17rem'),paddingHorizontal:EStyleSheet.value('20rem')}}>Weekly Spotlights</Text>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item,index)=>{`WeeklySpotlight-${index}`}}
                        data={weeklySpotlight}
                        horizontal={true}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable onPress={()=>{
                                    props.navigation.navigate("DetailWeeklySpotlight",{item:item});
                                }}>
                                    <Surface style={{marginLeft:(index===0) ? EStyleSheet.value('20rem'):undefined,elevation:4,backgroundColor:'whitesmoke',overflow:"hidden",marginRight:EStyleSheet.value('15rem'),width:EStyleSheet.value('300rem'),borderRadius:EStyleSheet.value('10rem'),height:EStyleSheet.value("350rem")}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('100rem')}}
                                        />
                                        <ImageLoader source={{uri:item.image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}/>
                                        <Text style={{fontFamily:"HeeboBold",padding:EStyleSheet.value('20rem'),zIndex:11,color:'white',paddingRight:EStyleSheet.value('15rem'),fontSize:EStyleSheet.value('20rem')}}>{item.title}</Text>
                                    </Surface>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
                </View>
                <View style={{marginBottom:EStyleSheet.value('25rem')}}>
                    <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('17rem'),paddingHorizontal:EStyleSheet.value('20rem')}}>What's New</Text>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item,index)=>{`Whatisnew-${index}`}}
                        data={whatsnew}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={EStyleSheet.value('320rem')}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        disableIntervalMomentum={ true } 
                        snapToAlignment={"center"}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable
                                onPress={()=>{
                                    props.navigation.navigate("DetailWhatsNew", {item:item});
                                }}
                                >
                                    <Surface source={{uri:item.image}} imageStyle={{borderRadius:EStyleSheet.value('10rem')}} style={{elevation:4,overflow:"hidden",backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value('20rem'):undefined,width:EStyleSheet.value('150rem'),height:EStyleSheet.value('100rem'),marginRight:EStyleSheet.value('10rem'),borderRadius:EStyleSheet.value('10rem')}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.7)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                                        />
                                        <ImageLoader source={{uri:item.image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}></ImageLoader>
                                        <Text style={{fontSize:EStyleSheet.value('11rem'),fontFamily:"QuicksandMedium",zIndex:11,marginHorizontal:EStyleSheet.value('10rem'),color:'white',marginTop:EStyleSheet.value('8rem')}}>TIMO<Text style={{color:'#f23545'}}>REDISCOVERS</Text></Text>
                                        <Text style={{marginTop:EStyleSheet.value('1rem'),fontFamily:"QuicksandBold",zIndex:11,fontSize:EStyleSheet.value('12rem'),marginHorizontal:EStyleSheet.value('10rem'),color:'white'}}>{item.title} PROMOTIONS</Text>
                                    </Surface>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
                </View>
                <View style={{marginBottom:EStyleSheet.value('25rem')}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('17rem'),paddingHorizontal:EStyleSheet.value('20rem')}}>Local Recommendations</Text>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            props.navigation.navigate("SeeAllLocalRecommendation",{localrecommendation:localrecommendation});
                        }}
                        >
                            <Text style={{marginRight:EStyleSheet.value('20rem'),color:"#f23545",fontFamily:"QuicksandMedium"}}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <View style={{flex:1}}>
                            <Carousel
                                layout={"default"}
                                data={localrecommendation.slice(0,5)}
                                renderItem={({item,index})=>{
                                    return (
                                        <Pressable
                                        onPress={()=>{
                                            props.navigation.navigate("DetailLocalRecommendation",{item:item});
                                        }}
                                        >
                                            <Surface style={{marginBottom:EStyleSheet.value('10rem'),backgroundColor:'white',marginLeft:EStyleSheet.value("-10rem"),marginRight:EStyleSheet.value("-10rem"),elevation:4,overflow:"hidden",borderRadius:EStyleSheet.value('8rem')}}>
                                                <View resizeMode="stretch" source={{uri:item.image}} style={{backgroundColor:'whitesmoke',width:'100%',height:EStyleSheet.value('240rem'),justifyContent:"flex-end"}}>
                                                    <ImageLoader source={{uri:item.image}} style={{backgroundColor:'whitesmoke',width:'100%',height:EStyleSheet.value('240rem'),paddingVertical:EStyleSheet.value('20rem'),justifyContent:"flex-end"}}/>
                                                    <View style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11}}>
                                                        <Text style={{fontSize:EStyleSheet.value('14rem'),fontFamily:"QuicksandMedium",color:'white'}}>{item.category}</Text>
                                                        <Text style={{fontSize:EStyleSheet.value('20rem'),fontWeight:'bold',color:'white',marginBottom:EStyleSheet.value("20rem")}}>{item.place_name}</Text>
                                                    </View>
                                                    <LinearGradient
                                                        // Background Linear Gradient
                                                        colors={['transparent','rgba(0,0,0,0.7)']}
                                                        style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('150rem')}}
                                                    />
                                                </View>
                                                <View style={{backgroundColor:'white',paddingBottom:EStyleSheet.value('15rem')}}>
                                                    <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),paddingVertical:EStyleSheet.value('10rem')}}>"{item.comment}"</Text>
                                                </View>
                                                <View style={{paddingHorizontal:EStyleSheet.value('10rem'),flexDirection:'row',marginBottom:EStyleSheet.value('10rem'),height:EStyleSheet.value('70rem'),alignItems:'center'}}>
                                                    <Image source={{uri:item.avatar}} style={{width:EStyleSheet.value('50rem'),height:EStyleSheet.value('50rem'),backgroundColor:"whitesmoke",borderRadius:999}}>
                                                    </Image>
                                                    <View style={{justifyContent:'center',height:'100%',alignItems:'center'}}>
                                                        <Text style={{marginRight:EStyleSheet.value('50rem'),fontWeight:'bold',marginLeft:EStyleSheet.value('10rem')}} numberOfLines={1}>{item.user_name}</Text>
                                                    </View>
                                                </View>
                                            </Surface>
                                        </Pressable>
                                        )
                                }}
                                sliderWidth={Dimensions.get("screen").width}
                                itemWidth={EStyleSheet.value("322rem")}
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:EStyleSheet.value('25rem')}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('17rem'),paddingHorizontal:EStyleSheet.value('20rem')}}>Precinct Guides</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <FlatList
                        keyExtractor={(item,index)=>`precintguides-${index}`}
                        data={precinct}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        showsHorizontalScrollIndicator={false}  
                        snapToAlignment={"center"}
                        horizontal={true}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable
                                onPress={()=>{
                                    props.navigation.navigate("DetailPrecinctGuides", {item:item});
                                }}
                                >
                                    <Surface style={{elevation:3,marginRight:[1,2,3,4,5,6,7,8,9,10,11].length-1===index ? EStyleSheet.value('20rem'):EStyleSheet.value('10rem'),justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value('5rem'),backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,height:EStyleSheet.value('400rem'),width:EStyleSheet.value('280rem')}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.5)', 'transparent']}
                                            style={{position:'absolute',top:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                                        />
                                        <ImageLoader source={{uri:item.precinct_image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('5rem')}}></ImageLoader>
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <View style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,backgroundColor:'#f23545',width:EStyleSheet.value('50rem'),borderRadius:EStyleSheet.value('5rem'),height:EStyleSheet.value('8rem')}}></View>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('30rem'),zIndex:11,color:'white',fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem'),fontSize:EStyleSheet.value('25rem'),textAlign:'center'}}>{item.precinct_name}</Text>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,color:"white",fontFamily:"QuicksandMedium",marginTop:EStyleSheet.value('3rem'),fontSize:EStyleSheet.value('13rem'),width:EStyleSheet.value("300rem"),textAlign:'center'}}>{item.precinct_minidescription}</Text>
                                            <LinearGradient
                                            // Background Linear Gradient
                                            colors={['transparent','rgba(0,0,0,0.8)', 'transparent']}
                                            style={{position:'absolute',top:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                                            />
                                        </View>
                                    </Surface>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
                </View>
                <View style={{marginBottom:EStyleSheet.value('25rem')}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontFamily:"HeeboBold",fontSize:EStyleSheet.value('17rem'),paddingHorizontal:EStyleSheet.value('20rem')}}>What's in Timor Leste</Text>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            props.navigation.navigate("Search");
                        }}
                        >
                        <Text style={{marginRight:EStyleSheet.value('20rem'),color:"#f23545"}}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item,index)=>{`Whatisnew-${index}`}}
                        data={whatsIn}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={EStyleSheet.value('320rem')}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        disableIntervalMomentum={ true } 
                        snapToAlignment={"center"}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable onPress={()=>{
                                    props.navigation.navigate("DetailPlace", {item:item,image:item.image,category:item.category,name:item.place_name});
                                }}>
                                    <Surface source={{uri:item.image}} imageStyle={{borderRadius:EStyleSheet.value('10rem')}} style={{elevation:4,overflow:"hidden",backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value('20rem'):undefined,width:EStyleSheet.value('150rem'),height:EStyleSheet.value('100rem'),marginRight:EStyleSheet.value('10rem'),borderRadius:EStyleSheet.value('10rem')}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.7)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                                        />
                                        <ImageLoader source={{uri:item.image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}></ImageLoader>
                                        <Text style={{fontSize:EStyleSheet.value('13rem'),fontFamily:"QuicksandMedium",zIndex:11,marginHorizontal:EStyleSheet.value('12rem'),color:'white',marginTop:EStyleSheet.value('10rem')}}>{item.category}</Text>
                                        <Text style={{marginTop:EStyleSheet.value('1rem'),zIndex:11,fontSize:EStyleSheet.value('13rem'),fontWeight:'bold',marginHorizontal:EStyleSheet.value('12rem'),color:'white'}}>{item.place_name}</Text>
                                    </Surface>
                                </Pressable>
                            )
                        }}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* <BottomBar selectedFragment={selectedFragment}/> */}
        </View>
    )
}