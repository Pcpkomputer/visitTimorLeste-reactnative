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
            title: "10 Days Itinerary For Timor Leste",
            image: "https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/content_entry5adf77af6eabcc00190b75b6/5b8cff41ad4bdc07deb7c937/files/10-days-itinerary-timor-leste-main-image-op.webp",
            content:`
                <p>Timor Leste is probably one of the least traveled country in Southeast Asia getting only around 60,000 travelers per year. The majority of those travelers are on a visa run from Indonesia, and they often stay just in Dili which is a shame as the country shines on its own when you started to go out of the capital city.</p>
                <p>In August 2018, I decided to spend 10 days traveling in Timor Leste trying my best to get off the beaten path as much as possible and even though I had mixed feelings about traveling East, I had the greatest time exploring Atauro and the mountain region of the country, so here is a 10 days guide to exploring Timor-Leste cities, culture, and stunning countrysides.</p>
            `,
            dateposted:"21 May 2021"
        },
        {
            title: "Visiting Timor-Leste: The Country No One Knows Exists",
            image: "https://www.gonomad.com/wp-content/uploads/2019/11/Timor-Leste-Beach.jpeg",
            content:`
            <p>When I told my family and friends I had received a competitive national fellowship to do research in Timor-Leste for the summer, I was met unilaterally with the same HUH?? Even my fellow International Relations majors, “What country is that in, again?” or my favorite “Oh cool, Thailand is awesome”.</p>
            <p>Unsurprisingly, I found if people didn’t even know what Timor-Leste is, it definitely was not on the mainstream tourism radar.</p>
            <p>Thus, trip planning was painstaking. Practically no information exists on the internet about what it’s like to visit Timor-Leste.</p>
            <p>
            Curious about where to go and what to see and where to stay? Forget about it. Is this country even safe for women? No results found.</p>
            <p>The country, located in the far East of the Indonesian archipelago, shares an island with West Timor, still a part of Indonesia.</p>
            `,
            dateposted:"22 May 2021"
        },
        {
            title: "Timor-Leste: what it's like to travel in a land without tourists",
            image: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/8/4/1438652721405/5881875275_4946fa6ab6_o-2060x1236.jpeg?width=620&quality=85&auto=format&fit=max&s=a1aed2e18a755da344cb79a91013a759",
            content:
            `
            <p>Timor-Leste, also known as East Timor, is not too far from Australia yet feels like a completely different world. And as one of the world’s newest countries (Timor-Leste became the first new sovereign state of the 21st century on 20 May 2002 when it achieved independence from Indonesia) its tourism industry is still in its infancy. Clashes between security services and groups challenging the government mean travel to much of the eastern side of the country is discouraged by both the Timor-Leste and Australian authorities.</p>
            <p>I was curious about who was on their way to Timor-Leste and why. Three rows of Australian teenagers behind us were heading to Dili, the country’s capital, to volunteer at an orphanage in a project organised by Father Chris Riley’s Youth off the Streets organisation. At Dili airport, the Australian guy beside me waiting for his bags was visiting his girlfriend, who was there volunteering for the Red Cross. Also by the carousel, a large group of foreigners gathered around a man holding up a sign with a mining company’s name emblazoned in bold type across it.</p>
            `,
            dateposted:"23 May 2021"
        }
    ])

    let [whatsnew, setWhatsnew] = useState([
        {
            title:"ACCOMODATIONS",
            image:"https://www.timorleste.tl/wp-content/uploads/formidable/2/11816750.jpg"
        },
        {
            title:"ATTRACTIONS",
            image:"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRjlbKYdcHYxqYAfQ-M8FlshRbbwYdj8uz9V3Glxt4ky0KxZBRh-BW8vrRjPwcK8DgYCSBdb-e8cGzgzxvjv0p2Kg"
        },
        {
            title:"FOOD & BEVERAGES",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Timor-cafe-Batar_daan.jpg/220px-Timor-cafe-Batar_daan.jpg"
        },
        {
            title:"BARS & CLUBS",
            image:"data:image/jpeg;base64,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"
        },
        {
            title:"MALL & SHOPS",
            image:"https://www.suarakarya.id/timthumb.php?src=https://cdn.suarakarya.id/2019031612422612-38-44-images.jpg&w=720&a=t"
        }
    ])

    let [localrecommendation, setLocalRecommendation] = useState([
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
            image:"https://lh3.googleusercontent.com/proxy/tv-2r9sqpdvQ-aq3rg4Au8IUo5RyzDDu6PGeS9fO4xJo6hghbHySqnXJTj2qc_duaYc53LW55ncI90N8iLutWhW1ZZIYaR2J8bI2KdfZmbf_lIchPRvKEg",
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
            image:"https://lh3.googleusercontent.com/proxy/tv-2r9sqpdvQ-aq3rg4Au8IUo5RyzDDu6PGeS9fO4xJo6hghbHySqnXJTj2qc_duaYc53LW55ncI90N8iLutWhW1ZZIYaR2J8bI2KdfZmbf_lIchPRvKEg",
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
                                data={localrecommendation}
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
                        data={[1,2,3]}
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
                                        <ImageLoader source={{uri:"https://cdn.idntimes.com/content-images/community/2019/09/dili-christo-rei-timor-leste-1-b2fd341713d3f3f151e6fba4eb19d094.jpeg"}} style={{position:"absolute",width:'100%',height:'100%',borderRadius:EStyleSheet.value('5rem')}}></ImageLoader>
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <View style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,backgroundColor:'#f23545',width:EStyleSheet.value('50rem'),borderRadius:EStyleSheet.value('5rem'),height:EStyleSheet.value('8rem')}}></View>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,color:'white',fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem'),fontSize:EStyleSheet.value('25rem'),width:'100%',textAlign:'center'}}>Dili</Text>
                                            <Text style={{paddingHorizontal:EStyleSheet.value('20rem'),zIndex:11,color:"white",fontFamily:"QuicksandMedium",marginTop:EStyleSheet.value('3rem'),fontSize:EStyleSheet.value('13rem'),width:EStyleSheet.value("300rem"),textAlign:'center'}}>City of Peace, is the capital, largest city, chief port, and commercial centre of East Timor (Timor-Leste)</Text>
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
                        data={localrecommendation}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={EStyleSheet.value('320rem')}
                        contentContainerStyle={{paddingBottom:EStyleSheet.value('10rem')}}
                        disableIntervalMomentum={ true } 
                        snapToAlignment={"center"}
                        renderItem={({item,index})=>{
                            return (
                                <Pressable onPress={()=>{
                                    props.navigation.navigate("DetailPlace", {item:item});
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