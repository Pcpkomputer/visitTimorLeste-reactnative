import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Text, View, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 

export default function EssentialsScreen(props){


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

    
    return (
        <View style={{flex:1,backgroundColor:"white"}}>

            <Animated.View style={{...shadow,transform:[{translateY:iTranslateYTopBar}],backgroundColor:'white',zIndex:100,opacity:iTopBarFade,justifyContent:'center',alignItems:'center',position:'absolute',width:'100%',marginTop:EStyleSheet.value('0rem'),height:EStyleSheet.value('86rem')}}>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginBottom:EStyleSheet.value('8rem'),marginTop:EStyleSheet.value('33rem')}}>Essentials</Text>
            </Animated.View>

            <ScrollView 
            scrollEventThrottle={16}
            onScroll={(e)=>{
                      topBarFade.setValue(e.nativeEvent.contentOffset.y);
                      // console.log(iTranslateYTopBar);
            }}
            style={{flex:1,backgroundColor:"white"}}>
                <View style={{height:EStyleSheet.value('28rem')}}></View>
                <View style={{marginTop:EStyleSheet.value('58rem'),paddingHorizontal:EStyleSheet.value('20rem'),marginBottom:EStyleSheet.value('20rem')}}>
                    <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                    <Text style={{fontSize:EStyleSheet.value('27rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Essentials</Text>
                </View>
                <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <View style={{flexDirection:'row',marginBottom:EStyleSheet.value("30rem")}}>
                        <View style={{flex:1,marginRight:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>Handy Tips</Text>
                            </View>
                        </View>
                        <View style={{flex:1,marginLeft:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>Currency Conventer</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:EStyleSheet.value("30rem")}}>
                        <View style={{flex:1,marginRight:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>Money Changer</Text>
                            </View>
                        </View>
                        <View style={{flex:1,marginLeft:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>Wireless</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginBottom:EStyleSheet.value("30rem")}}>
                        <View style={{flex:1,marginRight:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>Useful Contacts</Text>
                            </View>
                        </View>
                        <View style={{flex:1,marginLeft:EStyleSheet.value("3rem")}}>
                            <View style={{backgroundColor:"#e8e8e8",justifyContent:'center',alignItems:'center',borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("170rem")}}>
                                <Text>555</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("5rem")}}>
                                <Text style={{fontFamily:"HeeboBold"}}>About</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}