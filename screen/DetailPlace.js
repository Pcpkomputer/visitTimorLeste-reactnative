import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect, useMemo} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions,Animated, ScrollView, ImageBackground, Keyboard, Pressable, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { Surface} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import { SimpleLineIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import ImageLoader from '../components/ImageLoader';

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


  export default function DetailPlace(props){

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


    
        let [whatsIn, setWhatsIn] = useState([
            {
                image:"https://dtceasttimor.com/wp-content/uploads/2018/08/SENHORA-RAMELAU-1200x800.jpg",
                category:"ATTRACTIONS",
                place_name:"Gunung Ramelau",
                comment:"The scenery looks so good.",
                avatar:"",
                whyshouldvisit:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                specialtip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                user_name:"Suzy"
            },
            {
                image:"https://i.pinimg.com/originals/de/fb/f2/defbf248014a47062919b4d6096f46ab.jpg",
                category:"ATTRACTIONS",
                place_name:"JACO",
                comment:"Feel the breezy wind.",
                avatar:"",
                whyshouldvisit:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                specialtip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                user_name:"Jacob"
            },
            {
                image:"https://media-cdn.tripadvisor.com/media/photo-s/08/35/43/60/immaculate-conception.jpg",
                category:"ATTRACTIONS",
                place_name:"Katedral Dili",
                comment:"Nice katedral.",
                avatar:"",
                whyshouldvisit:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                specialtip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                user_name:"Thomas"
            },
    ])

      let [detailScheduleOpened, setDetailScheduleOpened] = useState(false);

      let [actualDescriptionHeight, setActualDescriptionHeight] = useState(0);

      let [descriptionExpanded, setDescriptionExpanded] = useState(false);

      const descHeight = useRef(new Animated.Value(0)).current

      let [firstLoaded, setFirstLoaded] = useState(false);

      let halfDescriptionHeight = useMemo(()=>{
            descHeight.setValue(actualDescriptionHeight/2);
            return actualDescriptionHeight/2;
      },[actualDescriptionHeight])

      return (
          <View style={{flex:1,backgroundColor:"white"}}>

            <Animated.View style={{...shadow,transform:[{translateY:iTranslateYTopBar}],backgroundColor:'white',zIndex:100,opacity:iTopBarFade,justifyContent:'center',alignItems:'center',position:'absolute',width:'100%',marginTop:EStyleSheet.value('0rem'),height:EStyleSheet.value('86rem')}}>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value('8rem'),marginTop:EStyleSheet.value('33rem')}}>{props.route.params.item.place_name}</Text>
            </Animated.View>

            <ScrollView
              scrollEventThrottle={16}
              onScroll={(e)=>{
                      topBarFade.setValue(e.nativeEvent.contentOffset.y);
              }}
            >
                <View source={{uri:props.route.params.item.image}} style={{backgroundColor:"whitesmoke",position:"absolute",zIndex:1,height:EStyleSheet.value("330rem"),width:"100%"}}>
                        <ImageLoader source={{uri:props.route.params.item.image}} style={{backgroundColor:"whitesmoke",position:"absolute",zIndex:1,height:EStyleSheet.value("330rem"),width:"100%"}}/>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(0,0,0,0.5)', 'transparent']}
                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                        />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent','white']}
                            style={{position:'absolute',bottom:0,zIndex:10,width:"100%",height:EStyleSheet.value('30rem')}}
                        />
                </View>

                <View style={{height:EStyleSheet.value("260rem"),zIndex:2,paddingBottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"flex-end"}}>
                    <View style={{width:EStyleSheet.value("60rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),borderRadius:999}}>
                            <View style={{width:"100%",position:"absolute",height:"100%",borderRadius:999,backgroundColor:"black",opacity:0.4}}>
                            </View>
                            <Svg 
                                style={{marginTop:EStyleSheet.value('2rem')}}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={EStyleSheet.value("30rem")} height={EStyleSheet.value("30rem")}>
                                <Path fill="white" d="M392 150.704c-5.943 0-11.872.447-17.715 1.311-33.076-19.855-74.721-30.717-118.285-30.717-43.564 0-85.21 10.863-118.286 30.717A121.054 121.054 0 00120 150.703c-66.168 0-120 53.832-120 120s53.832 120 120 120c59.355 0 108.774-43.319 118.324-100h35.352c9.55 56.681 58.97 100 118.324 100 66.168 0 120-53.832 120-120s-53.832-119.999-120-119.999zm-272 200c-44.112 0-80-35.888-80-80s35.888-80 80-80c43.365 0 80 34.996 80 80 0 44.112-35.888 80-80 80zm153.687-100.002h-35.375c-5.328-31.484-23.103-59.898-49.725-78.451 20.582-7.16 43.571-10.954 67.413-10.954 23.843 0 46.831 3.794 67.412 10.954a120.145 120.145 0 00-49.725 78.451zM392 350.704c-44.112 0-80-35.888-80-80 0-44.527 36.16-80 80-80 44.112 0 80 35.888 80 80s-35.888 80-80 80z" />
                            </Svg>
                    </View>
                </View>
                <View style={{zIndex:2,paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Surface style={{elevation:4,backgroundColor:"white",borderRadius:EStyleSheet.value("15rem"),padding:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("15rem")}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{color:"#d1222c",fontFamily:"QuicksandBold"}}>ATTRACTION</Text>
                            <View style={{flexDirection:"row"}}>
                                <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                            </View>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("8rem")}}>
                            <Text style={{fontSize:EStyleSheet.value("19rem"),fontFamily:"HeeboBold"}}>{props.route.params.item.place_name}</Text>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("5rem")}}>
                            <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>1 Dili Road Timor Leste 3515</Text>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("20rem"),flexDirection:"row",flexWrap:"wrap"}}>
                            
                                <View style={{marginHorizontal:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("5rem"),width:EStyleSheet.value("50rem")}}>
                                    <Surface style={{elevation:2,justifyContent:"center",alignItems:"center",width:EStyleSheet.value("50rem"),height:EStyleSheet.value("50rem"),backgroundColor:"white",borderRadius:999}}>
                                        <Ionicons name="ios-heart-outline" size={24} color="black" />
                                    </Surface>
                                    <Text style={{textAlign:"center",fontSize:EStyleSheet.value("11rem"),marginTop:EStyleSheet.value("8rem")}}>Fave</Text>
                                </View>
                    
                        </View>
                    </Surface>
                </View>
                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("20rem")}}>
                    
                    {
                        (detailScheduleOpened) ? 
                        <Pressable
                        onPress={()=>{
                            setDetailScheduleOpened(false);
                        }}>
                        
                        <Surface style={{elevation:1,backgroundColor:"white",flexDirection:"row",borderRadius:EStyleSheet.value("15rem"),paddingVertical:EStyleSheet.value("12rem"),paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <View style={{flex:1,marginTop:EStyleSheet.value("3rem")}}>
                                <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                    </View>
                                </View>
                                <View style={{marginTop:EStyleSheet.value("8rem")}}>
                                    <Text style={{fontSize:EStyleSheet.value("12rem"),lineHeight:EStyleSheet.value("20rem"),fontFamily:"QuicksandMedium"}}>Opening hours may vary due to extraordinary circumstances.</Text>
                                </View>
                            </View>
                            <View>
                                <Pressable  onPress={()=>{
                                    setDetailScheduleOpened(false);
                                }}>
                                    <Ionicons name="chevron-up" size={24} color="black" />
                                </Pressable>
                            </View>
                        </Surface>
                        </Pressable>
                        :
                    <Pressable
                    onPress={()=>{
                        setDetailScheduleOpened(true);
                    }}>
                    <Surface style={{elevation:1,backgroundColor:"white",flexDirection:"row",borderRadius:EStyleSheet.value("15rem"),paddingVertical:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("15rem")}}>
                        <View style={{flex:1,justifyContent:"center",marginTop:EStyleSheet.value("5rem")}}>
                            <View style={{flexDirection:"row",marginBottom:EStyleSheet.value("5rem")}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Sunday</Text>
                                </View>
                                <View style={{flex:2}}>
                                    <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>12:00 AM - 11:59 PM</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Pressable
                            onPress={()=>{
                                setDetailScheduleOpened(true);
                            }}
                            >
                                <Ionicons name="chevron-down" size={24} color="black" />
                            </Pressable>
                        </View>
                    </Surface>
                    </Pressable>
                    }
                    <View onLayout={(e)=>{
                        if(!firstLoaded){            
                             setActualDescriptionHeight(e.nativeEvent.layout.height);
                             setFirstLoaded(true);
                        }
                       
                    }} style={{marginTop:EStyleSheet.value("20rem"),paddingBottom:EStyleSheet.value("10rem")}}>
                        <Pressable 
                        onPress={()=>{
                            if(!descriptionExpanded){
                                setDescriptionExpanded(true);
                                Animated.spring(descHeight,{
                                    toValue:actualDescriptionHeight,
                                    duration:10000,
                                    useNativeDriver:false
                                }).start()
                            }
                            else{
                                setDescriptionExpanded(false);
                                Animated.spring(descHeight,{
                                    toValue:actualDescriptionHeight/2,
                                    duration:10000,
                                    useNativeDriver:false
                                }).start()
                            }
                            
                        }}
                        style={{position:"absolute",right:EStyleSheet.value("15rem"),bottom:EStyleSheet.value("12rem"),zIndex:100,paddingHorizontal:EStyleSheet.value("8rem"),paddingVertical:EStyleSheet.value("3rem")}}>
                            <Text style={{zIndex:11,textShadowColor:"white",fontSize:EStyleSheet.value("12rem"),textShadowRadius:5,color:"#d1222c"}}>{descriptionExpanded ? "Less":"More"}</Text>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={[ 'rgba(255,255,255,0.5)','white','white','white']}
                                style={{position:'absolute',top:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                            />
                        </Pressable>
                        <Animated.View style={{overflow:"hidden",height:(firstLoaded) ? descHeight:null}}>
                            <Text style={{lineHeight:EStyleSheet.value("20rem"),textAlign:"auto",fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor iet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Text>
                        </Animated.View>
                        <View style={{position:"absolute",bottom:0,height:EStyleSheet.value("30rem"),width:"100%"}}>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={[ 'transparent','white','white','white','white','white']}
                                style={{position:'absolute',top:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginTop:EStyleSheet.value("15rem"),marginBottom:EStyleSheet.value("0rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Text style={{fontFamily:"HeeboBold"}}>Reviews</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("10rem")}}>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={{paddingVertical:EStyleSheet.value("5rem")}}
                        keyExtractor={(item,index)=>`reviews-${index}`}
                        data={[1,2,3,4,5]}
                        renderItem={({item,index})=>{
                            return (
                                <Surface style={{marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,padding:EStyleSheet.value("15rem"),elevation:3,borderRadius:EStyleSheet.value("10rem"),width:EStyleSheet.value("280rem"),backgroundColor:"white",marginRight:EStyleSheet.value("15rem"),paddingBottom:EStyleSheet.value("20rem")}}>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={{backgroundColor:"whitesmoke",width:EStyleSheet.value("50rem"),borderRadius:999,height:EStyleSheet.value("50rem")}}>
                                        </View>
                                        <View style={{flex:1,justifyContent:"flex-end",paddingHorizontal:EStyleSheet.value("10rem")}}>
                                            <Text style={{fontWeight:"bold"}}>LL Low</Text>
                                        </View>
                                        <View style={{flexDirection:"row"}}>
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="#eba83a" />
                                            <Entypo name="star" size={EStyleSheet.value('14rem')} color="whitesmoke" />
                                        </View>
                                    </View>
                                    <View style={{marginTop:EStyleSheet.value("10rem")}}>
                                        <Text style={{fontSize:EStyleSheet.value("12rem"),fontFamily:"QuicksandMedium"}}>Lorem ipsum</Text>
                                    </View>
                                </Surface>
                            )
                        }}
                        />
                    </View>
                </View>
                <View style={{marginTop:EStyleSheet.value("15rem"),marginBottom:EStyleSheet.value("20rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Text style={{fontFamily:"HeeboBold"}}>What's in Timor Leste</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("15rem")}}>
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
                                        props.navigation.replace("DetailPlace");
                                    }}>
                                        <Surface source={{uri:item.image}} imageStyle={{borderRadius:EStyleSheet.value('10rem')}} style={{elevation:4,overflow:"hidden",backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value('25rem'):undefined,width:EStyleSheet.value('150rem'),height:EStyleSheet.value('100rem'),marginRight:EStyleSheet.value('10rem'),borderRadius:EStyleSheet.value('10rem')}}>
                                            <LinearGradient
                                                // Background Linear Gradient
                                                colors={['rgba(0,0,0,0.65)', 'transparent']}
                                                style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                                            />
                                            <Image source={{uri:item.image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}></Image>
                                            <Text style={{fontSize:EStyleSheet.value('13rem'),zIndex:11,marginHorizontal:EStyleSheet.value('15rem'),color:'white',marginTop:EStyleSheet.value('10rem'),fontFamily:"QuicksandMedium"}}>{item.category}</Text>
                                            <Text style={{marginTop:EStyleSheet.value('2rem'),zIndex:11,fontSize:EStyleSheet.value('13rem'),fontWeight:'bold',marginHorizontal:EStyleSheet.value('15rem'),color:'white'}}>{item.place_name}</Text>
                                        </Surface>
                                    </Pressable>
                                )
                            }}
                            />
                    </View>
                </View>
            </ScrollView>
          </View>
      )
  }