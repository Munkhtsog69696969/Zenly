import React from "react";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Image, Button } from 'react-native';

//web 681171150142-21aevqsiobpevtioabgaf9c26ug7j77m.apps.googleusercontent.com
//ios 681171150142-3ps6mkcvlat7b2b620gv8l0k71749lo6.apps.googleusercontent.com
//android 681171150142-9oj6imsagclrltunmcqffgdg4aiag1rk.apps.googleusercontent.com

import * as  WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession()

import { useState , useEffect } from 'react';

export const Auth=()=>{
    const [user,setUser]=useState(null);

    const [request,response,promptAsync]=Google.useAuthRequest({
        androidClientId:"681171150142-9oj6imsagclrltunmcqffgdg4aiag1rk.apps.googleusercontent.com",
        iosClientId:"681171150142-3ps6mkcvlat7b2b620gv8l0k71749lo6.apps.googleusercontent.com",
        webClientId:"681171150142-21aevqsiobpevtioabgaf9c26ug7j77m.apps.googleusercontent.com"
    });
    async function handleGoogleSignIn(){
        const user=await AsyncStorage.getItem("@user");
        // if(!user){
            if(response?.type=="success"){
            await getUserInfoFromGoogle(response.authentication.accessToken);
            }
        // }else{
        //     setUser(JSON.parse(user));
        // }
    }

    const getUserInfoFromGoogle=async(token)=>{
        try{
            const response=await fetch("https://www.googleapis.com/userinfo/v2/me",{
            headers:{
                Authorization:`Bearer ${token}`
            }
            });
            const user=await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUser(user);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        handleGoogleSignIn();
    },[response]);

    console.log(user)

    return(
        <View>
            <Button title='Sign in with google' onPress={promptAsync}/>
        </View>
    )
}