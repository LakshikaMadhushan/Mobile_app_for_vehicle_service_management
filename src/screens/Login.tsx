import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image} from "react-native";
import React, {useState, useEffect} from "react";
import Logo from "../assests/icons/logo_Icon.png"
import {Button, Divider, TextInput} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import * as authService from '../service/authService'
import {useSpinner} from "../const/context/SpinnerContext"
import { useToast } from "react-native-toast-notifications";
import {tokens} from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import {getItem} from "../service/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
import get = Reflect.get;

function Login({ navigation } : {navigation : any}){
    const [text, setText] = React.useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(false)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const { loading, showSpinner, hideSpinner } = useSpinner();
    const toast = useToast();

    const saveToken = async (key,token) => {
        try {
            await AsyncStorage.setItem(key, token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const getToken = async (key) => {
        try {
            await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    useEffect(() => {
          getToken("token").then(r => {
               console.log(r)
          })
    }, [])

    const loginHandler = async () => {
        // showSpinner()
        // await getItem().then(respose => {console.log(respose)})
        // if (userName === '' || password === '') {
        //     toast.show("please enter userName and password", {
        //         type : "danger",
        //         placement : "top"
        //
        //     });
        //     hideSpinner()
        //     return
        // }

        const data = {
            // username: "lakshikamadhushan3@gmail.com",
            // password: "password",
            username: userName,
            password: password,
            grant_type: "password"
            // expiresInMins: 60, // optional
        }
        if(userName=="" || password==""){
            toast.show( "Please Enter User Name And Password", {
                type : "danger",
                placement : "top"
            });
        }


        showSpinner()
        await authService.loginUser(data).then(respose => {

            if (respose.access_token) {

                try {
                    const decodedToken = jwtDecode(respose.access_token);

                    saveToken("userId", String(decodedToken.user_id))

                } catch (error) {
                    console.error('Error decoding token:', error);
                }


                saveToken("token",respose.access_token)

                toast.show("Login Successfully", {
                    type : "success",
                    placement : "top",
                    animationType : "zoom-in",
                    duration : 2000

                });
               navigation.navigate("DashBoard")
            } else {
                toast.show(respose.msg, {
                    type : "danger",
                    placement : "top"

                });
            }
            hideSpinner()
        }).catch((err) => {
            hideSpinner()
            console.log(err)

        })

    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
            <View style={styles.container}>
                <Image source={Logo}/>
            </View>

                <View style={{flex: 2, gap: 5, width : '100%', padding: 10, alignItems : 'center', borderRadius: 5}}>
                    <TextInput

                        style={{width: '100%', borderColor : '#29AC8D'}}
                        label="Email"
                        value={userName}
                        mode='outlined'
                        onChangeText={text => setUserName(text)}
                    />
                    <TextInput
                        value={password}
                        style={{width: '100%'}}
                        mode="outlined"
                        label="Password"
                        placeholder="Type something"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={isPasswordSecure}
                        right={<TextInput.Icon
                            icon={isPasswordSecure ? "eye-off" : "eye"}
                            onPress={() => isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true)}
                        />
                        }
                    />

                    <Button style={{borderRadius: 5, width: '100%', backgroundColor : '#29AC8D', marginTop : '10%'}} mode="contained"
                            onPress={() => loginHandler()}

                    >
                        SignIn
                    </Button>
                    <Text>forgot password ?</Text>
                    <View style={{width : '100%', display : 'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <View style={{width : '45%', height : 1, backgroundColor : 'black'}}>
                        </View>
                        <Text>Or</Text>
                        <View style={{width : '45%', height : 1, backgroundColor : 'black'}}>
                        </View>
                    </View>
                    <View style={{display : 'flex', flexDirection : "row", marginTop : '30%'}}>
                        <Text>Don’t have an account? </Text>
                        <Text style={{color :'#29AC8D'}}>Contact our service center</Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
};
export default Login;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor : 'white'
    },
    container : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : "center",
        backgroundColor : 'white',
        paddingTop : '25%',
        paddingBottom : '25%'
    }

})
