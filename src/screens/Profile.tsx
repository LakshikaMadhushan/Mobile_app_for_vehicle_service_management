import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image} from "react-native";
import React, {useState, useEffect} from "react";
import {Button, TextInput} from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import EmailIcon from "../assests/profileIcons/Email.png"
import PhoneIcon from "../assests/profileIcons/phone.png"
import CameraIcon from "../assests/profileIcons/camera.png"
import * as profileService from '../service/profileService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSpinner} from "../const/context/SpinnerContext"
import { useToast } from "react-native-toast-notifications";
import {getProfile} from "../service/profileService";


function Profile(){
    const [text, setText] = React.useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(false)
    const [userId, setUserId] = useState('')
    const [data, setData] = useState([])

    const [headerEmail, setHeaderEmail] = useState()
    const [headerName, setHeaderName] = useState()
    const [headerContact, setHeaderContact] = useState()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [nic, setNic] = useState('')
    const [status, setStatus] = useState('')

    const {showSpinner, hideSpinner } = useSpinner();
    const toast = useToast();

    useEffect(()=>{
        getId()
    },[])

      useEffect(() => {
          // let tempUserId : string = ""
          //   AsyncStorage.getItem("userId").then((res => {
          //       setUserId(res)
          //       tempUserId = res
          //    }))
          loadProfileDetails(userId)


      }, [userId])

    const getId = async() => {
        // let tempUserId : string = ""
        await AsyncStorage.getItem("userId").then((res => {
            setUserId(res)
            // tempUserId = res
        }))
    }

    const loadProfileDetails = (userId) => {
          showSpinner()
        profileService.getProfile(userId).then((res) => {
            hideSpinner()


            setName(res?.body?.name ? res?.body?.name : '')
            setEmail(res?.body?.email ?  res?.body?.email : '')
            setNic(res?.body?.nic ?  res?.body?.nic : '')
            setMobile(res?.body?.mobileNumber ? res?.body?.mobileNumber : '')
            setStatus(res?.body?.status ? res?.body?.status : '')

            setHeaderEmail(res?.body?.email ?  res?.body?.email : '')
            setHeaderName(res?.body?.name ? res?.body?.name : '')
            setHeaderContact(res?.body?.mobileNumber ? res?.body?.mobileNumber : '')



        })

    }

    const onChangeHandler = (type, value) => {
          switch (type) {
              case "name" :
                  setName(value);
                  break;

              case "email" :
                  setEmail(value)
                  break;

              case "mobile" :
                  setMobile(value)
                  break;
              case "nic" :
                  setNic(value)
                  break;
          }
    }

    const updateProfileDetails = () => {
          const obj = {
              name : name,
              customerEmail : email,
              nic : nic,
              mobileNumber : mobile,
              customerId : userId
          }
          showSpinner()
          profileService.updateProfile(obj).then((res) => {
               console.log(res)
              hideSpinner()
              toast.show(res.message, {
                  type : "success",
                  placement : "top",
                  animationType : "zoom-in",
                  duration : 2000

              });

          }).then(() => {
                  loadProfileDetails(userId)
          })
    }


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>

                <View style={styles.profileContainer}>
                    <View style={{marginRight : 20}}>
                        <Avatar.Image size={86} source={require('../assests/profileIcons/avatar.jpg')} />
                    </View>

                    <View style={styles.profileDetailsContainer}>
                          <Text style={{fontWeight : "bold", fontSize : 25, marginBottom : 10}}>{headerName}</Text>
                          <View style={{display : "flex", flexDirection : "row", marginBottom: 5}}>
                              <Image style={{width : 20, height : 20, marginRight : 10}} source={EmailIcon}/>
                              <Text>{headerEmail}</Text>
                          </View>
                        <View style={{display : "flex", flexDirection : "row"}}>
                            <Image style={{width : 20, height : 20, marginRight : 10}} source={PhoneIcon}/>
                            <Text>{headerContact}</Text>
                        </View>
                    </View>

                </View>


                <View style={styles.detailsContainer}>



                    <View style={styles.items}>
                        <TextInput
                            label="First Name"
                            value={name}
                            onChangeText={text => onChangeHandler("name", text)}
                        />
                    </View>

                    <View style={styles.items}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => onChangeHandler("email", text)}
                        />
                    </View>

                    <View style={styles.items}>
                        <TextInput
                            label="Mobile"
                            value={mobile}
                            onChangeText={text => onChangeHandler("mobile", text)}
                        />
                    </View>

                    <View style={styles.items}>
                        <TextInput
                            label="Nic"
                            value={nic}
                            onChangeText={text => onChangeHandler("nic", text)}
                        />
                    </View>

                    <View style={styles.items}>
                        <TextInput
                            label="Status"
                            disabled
                            value={status}
                            //onChangeText={text => setText(text)}
                        />
                    </View>

                    <View style={styles.items}>
                        <Button onPress={() => updateProfileDetails()} style={{borderRadius: 5, width: '100%', display : "flex", justifyContent : 'center', height : 60, backgroundColor : '#29AC8D'}} mode="contained"


                        >
                            Update
                        </Button>


                    </View>




                </View>

            </ScrollView>

        </SafeAreaView>
    )
};
export default Profile;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor : 'white'
    },
    profileContainer : {
        padding : 20,
        display : 'flex',
        flexDirection : 'row',

    },
    profileDetailsContainer : {
        display : "flex",
        flexDirection :"column",

    },
    detailsContainer : {
        margin : 20
    },
    items : {
        marginBottom : 30
    }

})
