import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Animated, Pressable, ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions, TextInput, Dimensions,ScrollView, ImageBackground, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { Surface, TouchableRipple} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";

export default function CreateAccountScreen(props){

    let [passwordHidden, setPasswordHidden] = useState(true);
    let [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

    let [canPress, setCanPress] = useState(false);

    let [signupLoading, setSignupLoading] = useState(false);

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [emailAddress, setEmailAddress] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    useEffect(()=>{
        try {
            if(firstName.length===0){
                throw new Error("First name is required");
            }
            if(lastName.length===0){
                throw new Error("Last name is required");
            }
            if(emailAddress.length===0){
                throw new Error("Email address is required");
            }
            if(validateEmail(emailAddress)===false){
                throw new Error("Invalid email address");
            }
            if(password.length===0){
                throw new Error("Password is required");
            }
            if(confirmPassword.length===0){
                throw new Error("Confirm password is required");
            }
            if(confirmPassword!==password){
                throw new Error("Confirmation password not match");
            }
            setCanPress(true);
        } catch (error) {
            setCanPress(false);
        }
    },[firstName, lastName, emailAddress, password, confirmPassword])

    return (
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:EStyleSheet.value('10rem'),zIndex:100}}></View>
            <View style={{paddingTop:EStyleSheet.value('58rem'),zIndex:100,paddingHorizontal:EStyleSheet.value('20rem'),paddingBottom:EStyleSheet.value('10rem')}}>
                <View style={{backgroundColor:'#f23545',height:EStyleSheet.value('5rem'),width:EStyleSheet.value('35rem')}}></View>
                <Text style={{fontSize:EStyleSheet.value('20rem'),fontFamily:"HeeboBold",marginTop:EStyleSheet.value('5rem')}}>PROFILE</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                <Text style={{fontSize:EStyleSheet.value("18rem"),fontWeight:"bold"}}>Create an Account</Text>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                <Text>Or <Text style={{color:"#f23545"}}>Sign In Here</Text> if you already have an account.</Text>
            </View>
            <View style={{marginTop:EStyleSheet.value("10rem"),paddingBottom:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                    <TextInput 
                    onChangeText={(text)=>{
                        setFirstName(text);
                    }}
                    placeholder="First Name" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                </Surface>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                    <TextInput 
                    onChangeText={(text)=>{
                        setLastName(text);
                    }}
                    placeholder="Last Name" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                </Surface>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                    <TextInput 
                    onChangeText={(text)=>{
                        setEmailAddress(text);
                    }}
                    placeholder="Email Address" style={{height:EStyleSheet.value("53rem")}}></TextInput>
                </Surface>
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),flexDirection:"row",paddingLeft:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                    <TextInput 
                    secureTextEntry={passwordHidden}
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                    placeholder="Password" style={{flex:1,height:EStyleSheet.value("53rem")}}></TextInput>
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
                <Surface style={{borderRadius:EStyleSheet.value("5rem"),flexDirection:"row",paddingLeft:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("12rem"),backgroundColor:"#f4f4f4",width:"100%"}}>
                    <TextInput 
                     secureTextEntry={confirmPasswordHidden}
                    onChangeText={(text)=>{
                        setConfirmPassword(text);
                    }}
                    placeholder="Confirm Password" style={{flex:1,height:EStyleSheet.value("53rem")}}></TextInput>
                      <View style={{width:EStyleSheet.value("55rem"),justifyContent:"center",alignItems:"center"}}>
                        {
                            (confirmPasswordHidden) ? 
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{
                                setConfirmPasswordHidden(!confirmPasswordHidden);
                            }}
                            >
                                <Entypo name="eye-with-line" size={24} color="grey" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>{
                                setConfirmPasswordHidden(!confirmPasswordHidden);
                            }}
                            >
                                <Entypo name="eye" size={24} color="grey" />
                            </TouchableOpacity>
                        }
                    </View>
                </Surface>
                <View style={{marginTop:EStyleSheet.value("20rem"),overflow:"hidden",marginBottom:EStyleSheet.value("20rem")}}>
                   {
                       (signupLoading) ?
                       <View
                       style={{width:"100%",justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                         <ActivityIndicator color="white"/>
                       </View>
                       :
                       (canPress) ?
                       <Pressable 
                       onPress={()=>{
                           alert("register");
                       }}
                        android_ripple={{color:"white",borderless:false}}
                       style={{width:"100%",justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                           <Text style={{color:"white",fontWeight:"bold"}}>SIGN UP</Text>
                       </Pressable>
                       :
                       <View 
                       style={{width:"100%",opacity:0.5,justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),backgroundColor:"#f5333c"}}>
                           <Text style={{color:"white",fontWeight:"bold"}}>SIGN UP</Text>
                       </View>
                   }
                </View>
            </View>
            
        </ScrollView>
    )
}