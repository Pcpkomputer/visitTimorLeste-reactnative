import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Keyboard, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"

import DashboardScreen from './screen/DashboardScreen';
import MyTripScreen from './screen/MyTripScreen';
import EssentialsScreen from './screen/EssentialsScreen';
import SearchScreen from './screen/SearchScreen';

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


const Tab = createBottomTabNavigator();

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


export default function App() {


  const [loaded] = useFonts({
    HeeboMedium: require('./assets/fonts/Heebo-Medium.ttf'),
    HeeboBold: require('./assets/fonts/Heebo-Bold.ttf'),
  });


  let [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", ()=>{
      setKeyboardShow(true);
    });
    Keyboard.addListener("keyboardDidHide", ()=>{
      setKeyboardShow(false);
    });

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow");
      Keyboard.removeListener("keyboardDidHide");
    };
  }, []);

  if(loaded){
    return (
      <NavigationContainer>
        <Tab.Navigator 
        tabBarOptions={{
          keyboardHidesTabBar:true
        }}
        tabBar={({ state, descriptors, navigation, keyboardHidesTabBar })=>{
          const focusedOptions = descriptors[state.routes[state.index].key].options;


          if (focusedOptions.tabBarVisible === false) {
            return null;
          }

          return (
            <View style={{...shadow,display:(keyboardShow) ? "none":"flex",backgroundColor:"white",height:EStyleSheet.value("58rem"),flexDirection:'row'}}>
               {
                 state.routes.map((route,index)=>{

                   console.log(route);

                   const isFocused = state.index === index;

                   if(route.name==="Discover"){
                        return (
                          <Pressable
                            onPress={()=>{
                                const event = navigation.emit({
                                  type: 'tabPress',
                                  target: route.key,
                                  canPreventDefault: true,
                                });
                      
                                if (!isFocused && !event.defaultPrevented) {
                                  navigation.navigate(route.name);
                                }
                            }}
                            style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Svg 
                                style={{marginTop:EStyleSheet.value('2rem')}}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={EStyleSheet.value("25rem")} height={EStyleSheet.value("25rem")}>
                                    <Path fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M392 150.704c-5.943 0-11.872.447-17.715 1.311-33.076-19.855-74.721-30.717-118.285-30.717-43.564 0-85.21 10.863-118.286 30.717A121.054 121.054 0 00120 150.703c-66.168 0-120 53.832-120 120s53.832 120 120 120c59.355 0 108.774-43.319 118.324-100h35.352c9.55 56.681 58.97 100 118.324 100 66.168 0 120-53.832 120-120s-53.832-119.999-120-119.999zm-272 200c-44.112 0-80-35.888-80-80s35.888-80 80-80c43.365 0 80 34.996 80 80 0 44.112-35.888 80-80 80zm153.687-100.002h-35.375c-5.328-31.484-23.103-59.898-49.725-78.451 20.582-7.16 43.571-10.954 67.413-10.954 23.843 0 46.831 3.794 67.412 10.954a120.145 120.145 0 00-49.725 78.451zM392 350.704c-44.112 0-80-35.888-80-80 0-44.527 36.16-80 80-80 44.112 0 80 35.888 80 80s-35.888 80-80 80z" />
                                </Svg>
                                <Text style={{fontSize:EStyleSheet.value('11rem'),color:(isFocused) ? "#d1222c":"#8b8b8b"}}>Discover</Text>
                          </Pressable>
                        )
                   }
                   else if(route.name==="MyTrip"){
                        return (
                          <Pressable
                          onPress={()=>{
                              const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                              });
                    
                              if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                              }
                          }}
                          style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                              <Svg
                                  style={{marginTop:EStyleSheet.value('4rem')}}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={EStyleSheet.value("20rem")} 
                                  height={EStyleSheet.value("20rem")}
                                  viewBox="0 0 437.775 437.774"
                              >
                                  <Path fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M316.722 29.761c66.852 0 121.053 54.202 121.053 121.041 0 110.478-218.893 257.212-218.893 257.212S0 266.569 0 150.801c0-83.217 54.202-121.04 121.041-121.04 40.262 0 75.827 19.745 97.841 49.976 22.017-30.231 57.588-49.976 97.84-49.976z" />
                              </Svg>
                              <Text style={{fontSize:EStyleSheet.value('11rem'),color:(isFocused) ? "#d1222c":"#8b8b8b",marginTop:EStyleSheet.value('3rem')}}>My Trip</Text>
                          </Pressable>
                        )
                   }
                   else if(route.name==="Essentials"){
                        return (
                          <Pressable
                          onPress={()=>{
                              const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                              });
                    
                              if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                              }
                          }}
                          style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                              <Svg
                                  style={{marginTop:EStyleSheet.value('4rem')}}
                                  viewBox="0 0 512 512"
                                  width={EStyleSheet.value("23rem")} 
                                  height={EStyleSheet.value("23rem")}
                                  xmlns="http://www.w3.org/2000/svg"
                                  >
                                  <Path  fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M75 312c8.284 0 15-6.716 15-15V197c0-8.284-6.716-15-15-15s-15 6.716-15 15v100c0 8.284 6.716 15 15 15zM195 312c8.284 0 15-6.716 15-15V197c0-8.284-6.716-15-15-15s-15 6.716-15 15v100c0 8.284 6.716 15 15 15zM135 312c8.284 0 15-6.716 15-15V197c0-8.284-6.716-15-15-15s-15 6.716-15 15v100c0 8.284 6.716 15 15 15z" />
                                  <Path  fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M467 342h-71v-25.5c0-16.817 13.682-30.5 30.5-30.5 27.294 0 49.5-22.206 49.5-49.5S453.794 187 426.5 187h-10C350.056 187 296 241.056 296 307.5V342h-26V167c0-24.813-20.187-45-45-45h-35V30h5c8.284 0 15-6.716 15-15s-6.716-15-15-15H75c-8.284 0-15 6.716-15 15s6.716 15 15 15h5v92H45c-24.813 0-45 20.187-45 45v270c0 23.123 17.532 42.219 40 44.716V497c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h112.58c6.192 17.459 22.865 30 42.42 30h242c24.813 0 45-20.187 45-45v-80c0-24.813-20.187-45-45-45zm-45 30v110H270V372zm-96-64.5c0-49.902 40.598-90.5 90.5-90.5h10c10.752 0 19.5 8.748 19.5 19.5s-8.748 19.5-19.5 19.5c-33.36 0-60.5 27.141-60.5 60.5V342h-40zM110 30h50v92h-50zM30 437V167c0-8.271 6.729-15 15-15h180c8.271 0 15 6.729 15 15v175h-15c-17.49 0-32.67 10.036-40.114 24.646A44.72 44.72 0 00165 362h-60c-24.813 0-45 20.187-45 45v45H45c-8.271 0-15-6.729-15-15zm150 15H90v-45c0-8.271 6.729-15 15-15h60c8.271 0 15 6.729 15 15zm30 15v-80c0-8.271 6.729-15 15-15h15v110h-15c-8.271 0-15-6.729-15-15zm272 0c0 8.271-6.729 15-15 15h-15V372h15c8.271 0 15 6.729 15 15z" />
                                  <Path  fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M325 442h42c8.284 0 15-6.716 15-15s-6.716-15-15-15h-42c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                              </Svg>
                              <Text style={{fontSize:EStyleSheet.value('11rem'),color:(isFocused) ? "#d1222c":"#8b8b8b",marginTop:EStyleSheet.value('3rem')}}>Essentials</Text>
                          </Pressable>
                        )
                   }
                   else if(route.name==="Search"){
                        return (
                          <Pressable
                          onPress={()=>{
                              const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                              });
                    
                              if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                              }
                          }}
                          style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                              <Svg
                                  style={{marginTop:EStyleSheet.value('4rem')}}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 56.966 56.966"
                                  width={EStyleSheet.value("23rem")} 
                                  height={EStyleSheet.value("23rem")}
                                  >
                                  <Path fill={(isFocused) ? "#d1222c":"#8b8b8b"} d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" />
                              </Svg>
                              <Text style={{fontSize:EStyleSheet.value('11rem'),color:(isFocused) ? "#d1222c":"#8b8b8b",marginTop:EStyleSheet.value('3rem')}}>Search</Text>
                          </Pressable>
                        )
                   }
                   else if(route.name==="Profile"){
                        return (
                          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                              <Svg
                              viewBox="0 0 512 512"
                              style={{marginTop:EStyleSheet.value('4rem')}}
                              xmlns="http://www.w3.org/2000/svg"
                              width={EStyleSheet.value("23rem")} 
                              height={EStyleSheet.value("23rem")}
                              >
                              <Path fill={(isFocused) ? "#d1222c":"#8b8b8b"}  d="M437.02 74.98C388.668 26.63 324.379 0 256 0 187.617 0 123.332 26.629 74.98 74.98 26.63 123.332 0 187.617 0 256c0 68.379 26.629 132.668 74.98 181.02C123.332 485.37 187.617 512 256 512c68.379 0 132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256c0-68.383-26.629-132.668-74.98-181.02zM128.34 442.387c10.707-61.649 64.129-107.121 127.66-107.121 63.535 0 116.953 45.472 127.66 107.12C347.312 467.36 303.336 482 256 482s-91.313-14.64-127.66-39.613zm46.262-218.52c0-44.887 36.515-81.398 81.398-81.398s81.398 36.515 81.398 81.398c0 44.883-36.515 81.399-81.398 81.399s-81.398-36.516-81.398-81.399zm235.043 197.711c-8.075-28.7-24.11-54.738-46.586-75.078a159.444 159.444 0 00-46.36-29.27c30.5-19.894 50.703-54.312 50.703-93.363 0-61.426-49.976-111.398-111.402-111.398S144.602 162.44 144.602 223.867c0 39.051 20.203 73.469 50.699 93.363a159.483 159.483 0 00-46.36 29.266c-22.472 20.34-38.511 46.379-46.586 75.078C57.883 380.274 30 321.336 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 65.34-27.883 124.277-72.355 165.578zm0 0" />
                              </Svg>
                              <Text style={{fontSize:EStyleSheet.value('11rem'),color:(isFocused) ? "#d1222c":"#8b8b8b",marginTop:EStyleSheet.value('3rem')}}>Profile</Text>
                          </View>
                        )
                   }
                 })
               }
            </View>
          )
        }}>
          <Tab.Screen name="Discover" component={DashboardScreen} />
          <Tab.Screen name="MyTrip" component={MyTripScreen} />
          <Tab.Screen name="Essentials" component={EssentialsScreen} />
          <Tab.Screen 
          tabBarOptions={{
            keyboardHidesTabBar:true
          }}
          name="Search" component={SearchScreen} />
          <Tab.Screen name="Profile" component={DashboardScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  else{
    return null;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
