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

    let [weeklySpotlight, setWeeklySpotlight] = useState([
        {
            title: "5 Less Well-Known Museums To Visit",
            image: "https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"
        },
        {
            title: "5 Less Well-Known Museums To Visit",
            image: "https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"
        },
        {
            title: "5 Less Well-Known Museums To Visit",
            image: "https://insightasean.com/wp-content/uploads/2020/05/religious-tourism-pact-signed-in-timor-leste.jpg"
        }
    ])

    let [whatsnew, setWhatsnew] = useState([
        {
            title:"ACCOMODATION PROMOTION",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            title:"ACCOMODATION PROMOTION",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            title:"ACCOMODATION PROMOTION",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            title:"ACCOMODATION PROMOTION",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            title:"ACCOMODATION PROMOTION",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        }
    ])

    let [localrecommendation, setLocalRecommendation] = useState([
        {
            image:"https://media.gettyimages.com/photos/grill-seafood-picture-id1079470588?s=612x612",
            category:"FOOD & BEVEREGES",
            place_name:"Punjab Grill",
            comment:"Indian fine dining",
            avatar:"https://i.mydramalist.com/pOqyQc.jpg",
            user_name:"Padangs"
        },
        {
            image:"https://media.gettyimages.com/photos/grill-seafood-picture-id1079470588?s=612x612",
            category:"FOOD & BEVEREGES",
            place_name:"Punjab Grill",
            comment:"Indian fine dining",
            avatar:"https://i.mydramalist.com/pOqyQc.jpg",
            user_name:"Padangs"
        },
        {
            image:"https://media.gettyimages.com/photos/grill-seafood-picture-id1079470588?s=612x612",
            category:"FOOD & BEVEREGES",
            place_name:"Punjab Grill",
            comment:"Indian fine dining",
            avatar:"https://i.mydramalist.com/pOqyQc.jpg",
            user_name:"Padangs"
        }
    ])


    let [whatsIn, setWhatsIn] = useState([
        {
            category:"Atrraction",
            place_name:"Merlion Park",
            image:"data:image/jpeg;base64,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"
        },
        {
            category:"Food & Beverages",
            place_name:"Rixera Foliona",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            category:"Atrraction",
            place_name:"Merlion Park",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            category:"Food & Beverages",
            place_name:"Rixera Foliona",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            category:"Atrraction",
            place_name:"Merlion Park",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
        {
            category:"Food & Beverages",
            place_name:"Rixera Foliona",
            image:"https://images.japancentre.com/page_elements/image1s/1513/original/sushi-bars-best-japanese-food.jpg?1470240553"
        },
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
                    console.log(iTranslateYTopBar);
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
                                    props.navigation.navigate("DetailWeeklySpotlight");
                                }}>
                                    <Surface style={{marginLeft:(index===0) ? EStyleSheet.value('20rem'):undefined,elevation:4,backgroundColor:'whitesmoke',overflow:"hidden",marginRight:EStyleSheet.value('15rem'),width:EStyleSheet.value('300rem'),borderRadius:EStyleSheet.value('10rem'),height:EStyleSheet.value("350rem")}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('100rem')}}
                                        />
                                        <ImageLoader source={{uri:"https://p0.pikist.com/photos/632/815/universe-tree-sky-silhouette-landscape-cosmos-atmosphere-mystical.jpg"}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}/>
                                        <Text style={{fontFamily:"HeeboBold",padding:EStyleSheet.value('20rem'),zIndex:11,color:'white',paddingRight:EStyleSheet.value('15rem'),fontSize:EStyleSheet.value('20rem')}}>5 Less Well-Known Museums To Visit</Text>
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
                                    props.navigation.navigate("DetailWhatsNew");
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
                                        <Text style={{marginTop:EStyleSheet.value('1rem'),fontFamily:"QuicksandBold",zIndex:11,fontSize:EStyleSheet.value('12rem'),marginHorizontal:EStyleSheet.value('10rem'),color:'white'}}>ACCOMODATION PROMOTIONS</Text>
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
                            props.navigation.navigate("SeeAllLocalRecommendation");
                        }}
                        >
                            <Text style={{marginRight:EStyleSheet.value('20rem'),color:"#f23545",fontFamily:"QuicksandMedium"}}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:EStyleSheet.value('15rem')}}>
                        <View style={{flex:1}}>
                            <Carousel
                                layout={"default"}
                                data={localrecommendation}
                                renderItem={({item,index})=>{
                                    return (
                                        <Pressable
                                        onPress={()=>{
                                            props.navigation.navigate("DetailLocalRecommendation");
                                        }}
                                        >
                                            <Surface style={{marginBottom:EStyleSheet.value('10rem'),backgroundColor:'white',marginLeft:EStyleSheet.value("-10rem"),marginRight:EStyleSheet.value("-10rem"),elevation:4,overflow:"hidden",borderRadius:EStyleSheet.value('8rem')}}>
                                                <View resizeMode="stretch" source={{uri:item.image}} style={{backgroundColor:'whitesmoke',width:'100%',height:EStyleSheet.value('240rem'),justifyContent:"flex-end"}}>
                                                    <ImageLoader source={{uri:item.image}} style={{backgroundColor:'whitesmoke',width:'100%',height:EStyleSheet.value('240rem'),paddingVertical:EStyleSheet.value('20rem'),justifyContent:"flex-end"}}/>
                                                    <View style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11}}>
                                                        <Text style={{fontSize:EStyleSheet.value('14rem'),fontFamily:"QuicksandMedium",color:'white'}}>FOOD & BEVEREGES</Text>
                                                        <Text style={{fontSize:EStyleSheet.value('20rem'),fontWeight:'bold',color:'white',marginBottom:EStyleSheet.value("20rem")}}>Punjab Grill</Text>
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
                        data={[1,2,3,4,5,6,7,8,9,10,11]}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        showsHorizontalScrollIndicator={false}  
                        snapToAlignment={"center"}
                        horizontal={true}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable
                                onPress={()=>{
                                    props.navigation.navigate("DetailPrecinctGuides");
                                }}
                                >
                                    <Surface style={{elevation:3,marginRight:[1,2,3,4,5,6,7,8,9,10,11].length-1===index ? EStyleSheet.value('20rem'):EStyleSheet.value('10rem'),justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value('5rem'),backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value("20rem"):undefined,height:EStyleSheet.value('400rem'),width:EStyleSheet.value('280rem')}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.5)', 'transparent']}
                                            style={{position:'absolute',top:0,zIndex:10,width:"100%",borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value('80rem')}}
                                        />
                                        <Image source={{uri:"https://images0.westend61.de/0001040218pw/japan-kyoto-gion-alley-and-temple-at-sunset-EPF00487.jpg"}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('5rem')}}></Image>
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <View style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,backgroundColor:'#f23545',width:EStyleSheet.value('50rem'),borderRadius:EStyleSheet.value('5rem'),height:EStyleSheet.value('8rem')}}></View>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,color:'white',fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem'),fontSize:EStyleSheet.value('25rem'),width:'100%',textAlign:'center'}}>CHINATOWN</Text>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,color:"white",fontFamily:"QuicksandMedium",marginTop:EStyleSheet.value('3rem'),fontSize:EStyleSheet.value('13rem'),width:'100%',textAlign:'center'}}>Immerse yourself in timeless experiences</Text>
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
                        <Text style={{marginRight:EStyleSheet.value('20rem'),color:"#f23545"}}>See All</Text>
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
                                    props.navigation.navigate("DetailPlace");
                                }}>
                                    <Surface source={{uri:item.image}} imageStyle={{borderRadius:EStyleSheet.value('10rem')}} style={{elevation:4,overflow:"hidden",backgroundColor:'whitesmoke',marginLeft:(index===0) ? EStyleSheet.value('20rem'):undefined,width:EStyleSheet.value('150rem'),height:EStyleSheet.value('100rem'),marginRight:EStyleSheet.value('10rem'),borderRadius:EStyleSheet.value('10rem')}}>
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={['rgba(0,0,0,0.7)', 'transparent']}
                                            style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('80rem')}}
                                        />
                                        <Image source={{uri:item.image}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('10rem')}}></Image>
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