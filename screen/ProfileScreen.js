import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useContext, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image, AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

import {GlobalContext} from '../App';

import {ip} from '../utils/env';

export default function ProfileScreen(props){

    let height = useWindowDimensions().width;

    let globalContext = useContext(GlobalContext);

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    let [passwordHidden, setPasswordHidden] = useState(true);
    
    let [emailError, setEmailError] = useState(false);
    let [msgEmailError, setMsgEmailError] = useState("");

    let [passwordError, setPasswordError] = useState(false);
    let [msgPasswordError, setMsgPasswordError] = useState("");


    let [signinLoading, setSignInLoading] = useState(false);


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <LinearGradient
                // Background Linear Gradient
                colors={['white', 'white','rgba(255,255,255,0.9)', 'transparent']}
                style={{position:'absolute',zIndex:10,width:"100%",height:EStyleSheet.value('270rem')}}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent','rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
                style={{position:'absolute',bottom:0,zIndex:10,width:"100%",height:EStyleSheet.value('130rem')}}
            />
            <Image resizeMode="cover" source={{uri:"https://storage.googleapis.com/fastwork-static/35f5ee39-b1b2-4643-9e67-449518aa17c8.jpg"}} style={{position:"absolute",width:Dimensions.get("screen").width,height:Dimensions.get("screen").height,opacity:0.7}}></Image>
            <ScrollView style={{flex:1,zIndex:12}}>
                <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
                <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                    <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                    <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>PROFILE</Text>
                </View>
                <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{fontSize:EStyleSheet.value('21rem'),color:"black",fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>Welcome to your Visit Timor Leste Account</Text>
                </View>
                <View style={{marginTop:EStyleSheet.value("33rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontFamily:"QuicksandBold"}}>Don't have an account?</Text>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            props.navigation.navigate("CreateAccount");
                        }}
                        >
                            <Text style={{marginLeft:EStyleSheet.value("5rem"),color:"#f23545",fontFamily:"QuicksandBold"}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <Surface style={{borderColor:(emailError) ? "#f5333c":undefined,borderWidth:(emailError) ? 1:undefined,elevation:3,borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"white",width:"100%"}}>
                        <TextInput 
                        editable={!signinLoading}
                        onChangeText={(text)=>setEmail(text)}
                        placeholder="Email Address" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                    </Surface>
                    {
                        (emailError) &&
                        <Text style={{marginTop:EStyleSheet.value("5rem"),color:"#f5333c",fontFamily:"QuicksandBold"}}>{msgEmailError}</Text>
                    }
                    <Surface style={{borderColor:(passwordError) ? "#f5333c":undefined,borderWidth:(passwordError) ? 1:undefined,flexDirection:'row',elevation:3,borderRadius:EStyleSheet.value("5rem"),paddingLeft:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"white",width:"100%"}}>
                        <TextInput 
                        editable={!signinLoading}
                        onChangeText={(text)=>setPassword(text)}
                        secureTextEntry={passwordHidden} placeholder="Password" style={{height:EStyleSheet.value("53rem"),flex:1,paddingRight:EStyleSheet.value("10rem")}}></TextInput>
                        <View style={{width:EStyleSheet.value("55rem"),justifyContent:"center",alignItems:"center"}}>
                            {
                                (passwordHidden) ? 
                                <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>{
                                    setPasswordHidden(!passwordHidden);
                                }}
                                >
                                    <Entypo name="eye-with-line" size={24} color="grey" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>{
                                    setPasswordHidden(!passwordHidden);
                                }}
                                >
                                    <Entypo name="eye" size={24} color="grey" />
                                </TouchableOpacity>
                            }
                        </View>
                    </Surface>
                    {
                        (passwordError) &&
                        <Text style={{marginTop:EStyleSheet.value("5rem"),color:"#f5333c",fontFamily:"QuicksandBold"}}>{msgPasswordError}</Text>
                    }
                    <View
                    style={{marginTop:EStyleSheet.value("25rem"),overflow:"hidden",justifyContent:"center",alignItems:"center",alignSelf:"center",width:EStyleSheet.value("310rem"),backgroundColor:"#f5333c",borderRadius:EStyleSheet.value("30rem")}}>
                        <Pressable 
                        disabled={signinLoading}
                        onPress={async ()=>{

                            
                           let checkEmail = (email)=>{
                                 try {
                                    if(email.length===0){
                                        throw ({type:"email",msg:"Email cannot be empty"});
                                    }
                                    if(validateEmail(email)===false){
                                        throw ({type:"email",msg:"Invalid email address"});
                                    }
                                    if(email.length>50){
                                        throw ({type:"email",msg:"Email address length must be less than 50 character"});
                                    }
                                    return true;

                                } catch (error) {
                                        setEmailError(true);
                                        setMsgEmailError(error.msg);
                                        return false;
                                }
                            }

                           let checkPassword = (password)=>{
                                try {
                                    if(password.length===0){
                                        throw ({type:"email",msg:"Password cannot be empty"});
                                    }
                                    if(password.length>80){
                                        throw ({type:"email",msg:"Password length must be less than 80 character"});
                                    }
                                    return true;

                                } catch (error) {
                                        setPasswordError(true);
                                        setMsgPasswordError(error.msg);
                                        return false;
                                }
                           }

                           let _email = checkEmail(email);
                           let _password = checkPassword(password);

                           (_email) && setEmailError(false);
                           (_password) && setPasswordError(false);
                           
                           if(_email && _password){
                                setSignInLoading(true);

                                let request = await fetch(`${ip}/api/loginaccount`,{
                                    method:"POST",
                                    headers:{
                                        "content-type":"application/json"
                                    },
                                    body:JSON.stringify({
                                        email:email,
                                        password:password
                                    })
                                });
                                let response = await request.json();
                                
                                if(response.success){
                                    let data = response.data;
                                    let token = response.token;
                                    
                                    globalContext.setCredentials({
                                        data:data,
                                        token:token
                                    });
                                    
                                    await AsyncStorage.setItem("credentials",JSON.stringify({
                                        data:data,
                                        token:token
                                    }));
                                }
                                else{
                                    alert(response.msg);
                                }

                                setSignInLoading(false);
                                
                           }

                        }}
                        android_ripple={{color:"white",borderless:false}} style={{justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("18rem"),width:"100%"}}>
                            {
                                (signinLoading) ?
                                <ActivityIndicator color="white"/>
                                :
                                <Text style={{color:"white"}}>SIGN IN</Text>
                            }
                        </Pressable>                   
                    </View>
                    {/* <View style={{justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("25rem")}}>
                        <Text style={{color:"#f5333c",fontFamily:"QuicksandMedium"}}>Forgot Password</Text>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}