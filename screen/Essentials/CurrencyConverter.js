import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

//var fx = require("../../utils/money");

import {ip} from '../../utils/env';

export default function CurrencyConverter(){

let [originValue, setOriginValue] = useState("");
let [convertedValue, setConvertedValue ] = useState("");

let [currencies, setCurrencies] = useState([
    {
        lang:"USD",
        name:"United States America",
        flag:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
        origin:1
    },
    {
        lang:"IDR",
        name:"Indonesia",
        flag:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAIVBMVEX////OESfOESbq6urssrfMAA3NFirMABTfpKnr7+/a2tqcCwSUAAABf0lEQVR4nO3SwQ3CMAAEQSeGJNB/wYgXMlsAPGYqOK1uHBurYxz7tvOx7cdQ5Nv2bvLrs/4VTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqTejc576zOcd1YXeMxWD3G/PWEvzM1CU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9Kk5nhOVs8XvjdzZbCXb9MAAAAASUVORK5CYII=",
        origin:15000
    }
])

let [showFiltered, setShowFiltered] = useState(false);
let [textFiltered, setTextFiltered] = useState("");
let [filteredCurrencies, setFilteredCurrencies] = useState([]);

    let [selectedCurrencies, setSelectedCurrencies] = useState(-1);

    useEffect(()=>{
        setConvertedValue("");
        setOriginValue("");
    },[selectedCurrencies])


    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
           <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Currency Converter</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                <View style={{backgroundColor:"white",overflow:"hidden",borderTopLeftRadius:EStyleSheet.value("20rem"),borderTopRightRadius:EStyleSheet.value("20rem")}}>
                    <LinearGradient

                            // Background Linear Gradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['#760508', '#e83037']}
                            style={{position:'absolute',zIndex:10,width:"100%",height:"100%"}}
                        />
                    <View style={{flexDirection:"row",zIndex:100,justifyContent:"space-around",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <ImageBackground source={{uri:selectedCurrencies!==-1 ? currencies[selectedCurrencies].flag:null}} style={{backgroundColor:"whitesmoke",height:EStyleSheet.value("50rem"),width:EStyleSheet.value("70rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                
                            </ImageBackground>
                            <Text style={{marginLeft:EStyleSheet.value("10rem"),color:"white",fontWeight:"bold"}}>{(selectedCurrencies===-1) ? "...":currencies[selectedCurrencies].lang}</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <ImageBackground source={require("../../assets/flag.jpeg")} style={{backgroundColor:"whitesmoke",height:EStyleSheet.value("50rem"),width:EStyleSheet.value("70rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                
                            </ImageBackground>
                            <Text style={{marginLeft:EStyleSheet.value("10rem"),color:"white",fontWeight:"bold"}}>TL</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#e8e8e8",borderBottomLeftRadius:EStyleSheet.value("20rem"),borderBottomRightRadius:EStyleSheet.value("20rem"),flexDirection:"row",padding:EStyleSheet.value("10rem")}}>
                    <View style={{flex:1,borderRightWidth:1,borderColor:"grey",paddingRight:EStyleSheet.value("10rem")}}>
                        <TextInput 
                        onChangeText={(text)=>{
                            let result = parseInt(text)/currencies[selectedCurrencies].origin;
                            if(isNaN(result)){
                                setOriginValue("");
                            }else{
                                setOriginValue(text);
                                setConvertedValue(result.toString());
                            }
                        }}
                        value={originValue}
                        editable={selectedCurrencies!==-1 ? true:false}
                        style={{fontSize:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem")}} placeholder=""></TextInput>
                        <Text style={{color:"grey",marginBottom:EStyleSheet.value("5rem")}}>{selectedCurrencies===-1 ? "...":currencies[selectedCurrencies].name}</Text>
                    </View>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("10rem")}}>
                        <TextInput value={convertedValue} editable={false} style={{color:"black",fontSize:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem")}} placeholder=""></TextInput>
                        <Text style={{color:"grey",marginBottom:EStyleSheet.value("5rem")}}>Timor Leste Dollar</Text>
                    </View>
                </View>
                <View style={{marginTop:EStyleSheet.value("30rem")}}>
                    <Text style={{fontSize:EStyleSheet.value("20rem"),fontFamily:"HeeboBold"}}>Currencies</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("45rem"),backgroundColor:"#e8e8e8"}}>
                    <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:EStyleSheet.value("45rem")}}>
                    <FontAwesome name="search" size={EStyleSheet.value("17rem")} color="black" />
                    </View>
                    <TextInput 
                    onChangeText={(text)=>{
                        setTextFiltered(text);
                        if(text.length===0){
                            setShowFiltered(false);
                        }else{
                            let filter = currencies.filter((item,index)=>{
                                let regex = new RegExp(`${text}`,'i');
                                return item.name.match(regex);
                            })
                            console.log(filter);
                            setFilteredCurrencies(filter);
                            setShowFiltered(true);
                        }
                    }}
                    value={textFiltered}
                    placeholder="Country" style={{width:"100%",paddingHorizontal:EStyleSheet.value("0rem")}}></TextInput>
                </View>
                <View style={{flex:1,height:EStyleSheet.value("350rem"),marginBottom:EStyleSheet.value("20rem")}}>
                    <FlatList
                    keyExtractor={(item,index)=>`currencies-${index}`}
                    data={showFiltered ? filteredCurrencies:currencies}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>{
                                setSelectedCurrencies(index);
                            }}
                            style={{flexDirection:"row",marginBottom:(currencies.length-1===index) ? EStyleSheet.value("10rem"):null,borderBottomWidth:0.5,borderColor:"grey",paddingHorizontal:EStyleSheet.value("10rem"),alignItems:"center",marginTop:(index===0) ? EStyleSheet.value("20rem"):null,paddingVertical:EStyleSheet.value("8rem")}}>
                                <ImageBackground source={{uri:item.flag}} imageStyle={{borderRadius:EStyleSheet.value("5rem")}} style={{backgroundColor:"whitesmoke",overflow:"hidden",width:EStyleSheet.value("70rem"),height:EStyleSheet.value("50rem")}}>
                                </ImageBackground>
                                <View style={{marginLeft:EStyleSheet.value("10rem")}}>
                                    <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                                    <Text style={{marginTop:EStyleSheet.value("5rem"),fontWeight:"bold"}}>{item.lang}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
