import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useContext, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, MaterialIcons, Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";
import ImageLoader from '../components/ImageLoader';

import {GlobalContext} from '../App';

import {ip} from '../utils/env';

export default function EditProfileDetailScreen(props){

    let [readyToClick, setReadyToClick] = useState(false);
    let [buttonLoading, setButtonLoading] = useState(false);
 
    let globalContext = useContext(GlobalContext);

    let [firstname, setFirstName] = useState(globalContext.credentials.data.first_name);
    let [lastname, setLastName] = useState(globalContext.credentials.data.last_name);

    useEffect(()=>{
        try {
            if(firstname.length===0){
                throw new Error();
            }
            if(lastname.length===0){
                throw new Error();
            }
            setReadyToClick(true);
        } catch (error) {
            setReadyToClick(false);
        }
    },[firstname,lastname])

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>PROFILE SETTINGS</Text>
                </View>
            </View>
           <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("5rem")}}>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                        <TextInput 
                        editable={buttonLoading ? false:true}
                        onChangeText={(text)=>{
                            setFirstName(text);
                        }}
                        value={firstname}
                        placeholder="First Name" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                </Surface>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                        <TextInput 
                        editable={buttonLoading ? false:true}
                        onChangeText={(text)=>{
                            setLastName(text);
                        }}
                        value={lastname}
                        placeholder="Last Name" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                </Surface>
             {
                 (readyToClick) ?
                 (buttonLoading) ?
                 <View style={{width:"100%",opacity:0.5,marginTop:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                    <ActivityIndicator color="white"/>
                </View>
                :
                 <Pressable 
                 onPress={async ()=>{
                    setButtonLoading(true);

                    let request = await fetch(`${ip}/api/updatedetailaccount`,{
                        method:"POST",
                        headers:{
                            "content-type":"application/json",
                            "authorization":`Bearer ${globalContext.credentials.token}`
                        },
                        body:JSON.stringify({
                            first_name:firstname,
                            last_name:lastname
                        })
                    });

                    let response = await request.json();

                    if(response.success){
                        await globalContext.refreshCredentials(globalContext.credentials.data.email,globalContext.credentials.data.password);
                        props.navigation.goBack();
                    }   
                    else{
                        alert(response.msg);
                    }
  
                 }}
                  android_ripple={{color:"white",borderless:false}}
                 style={{width:"100%",marginTop:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                     <Text style={{color:"white",fontWeight:"bold"}}>Save</Text>
            </Pressable>
                :
                <View style={{width:"100%",opacity:0.5,marginTop:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                     <Text style={{color:"white",fontWeight:"bold"}}>Save</Text>
                </View>
             }
           </View>
        </ScrollView>
    )
}