import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from './screen/DashboardScreen';


const Tab = createBottomTabNavigator();

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default function App() {

  const [loaded] = useFonts({
    HeeboMedium: require('./assets/fonts/Heebo-Medium.ttf'),
    HeeboBold: require('./assets/fonts/Heebo-Bold.ttf'),
  });

  if(loaded){
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={()=>{
          return (
            <View style={{backgroundColor:"red",height:EStyleSheet.value("50rem")}}>
                <Text>123</Text>
            </View>
          )
        }}>
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
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
