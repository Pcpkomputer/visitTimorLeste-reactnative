import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DashboardScreen(props){
    return (
        <View style={{flex:1}}>
            <View style={{height:EStyleSheet.value('28rem')}}></View>
            <Text>123 oke</Text>
        </View>
    )
}