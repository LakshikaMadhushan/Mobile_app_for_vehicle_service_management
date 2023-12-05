import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState, useEffect} from "react";
import DatePicker from "../Components/DatePicker";

import GroupIcon from "../assests/dashBoardIcons/Group.png"
import Count from "../assests/dashBoardIcons/Count.png"
import ServiceCost from "../assests/dashBoardIcons/ServiceCost.png"
import Union from "../assests/dashBoardIcons/Union.png"
import Last from "../assests/dashBoardIcons/LastServiceDate.png"
import PartCost from "../assests/dashBoardIcons/PartCost.png"
import {Button} from "react-native-paper";
import * as dashBoardService from '../service/dashboardServices'
import {useSpinner} from "../const/context/SpinnerContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashBoard = ({ navigation } : {navigation : any}) => {
   const [startDate, setStartDate] = useState('')
   const [endsDate, setEndsDate] = useState('')
    const [userId, setUserId] = useState('')

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userId');
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    const [state, setState] = useState({
        partCost : 0,
        serviceCost : 0,
        serviceCount : 0,
        lastServiceDate : '',
        vehicleCount: 0,
        vehicleNo : ''

    })

    const {showSpinner, hideSpinner } = useSpinner();

    const setStartDateFun = (value : string) => {
        setStartDate(value)
    }
    const setEndsDateFun = (value : string) => {
        setEndsDate(value)
    }

    useEffect(()=>{
        getId()
    },[])

    useEffect(() => {
        // Update the document title using the browser API
        // showSpinner()
        // let tempUserId : string = ""
        // AsyncStorage.getItem("userId").then((res => {
        //     setUserId(res)
        //     tempUserId = res
        // }))
        updateDashboardDetails(userId);
    }, [userId]);



    const updateDashboardDetails = (userId) => {
        const obj = {
            userId : userId
        }
        dashBoardService.getDashBoardStatus(obj).then(res => {
            console.log(res)
            setState({
                ...state,
                partCost : res.body.partCost,
                serviceCost : res.body.serviceCost,
                serviceCount : res.body.serviceCount,
                lastServiceDate : res.body.lastServiceDate ? res.body.lastServiceDate : '',
                vehicleCount: res.body.vehicleCount,
                vehicleNo : res.body.vehicleNo ? res.body.vehicleNo : ''
            })
            hideSpinner()
        }).catch(error => {
            hideSpinner()
            console.log(error)
        })
    }

    const getId = async() => {
        // let tempUserId : string = ""
        await AsyncStorage.getItem("userId").then((res => {
            setUserId(res)
            // tempUserId = res
        }))
    }

   return(
       <SafeAreaView style={styles.safeAreaContainer}>
           <ScrollView style={styles.scrollingView}>

               <View style={styles.datePickerView}>

                   {/*<DatePicker placeHolder={"Select Start Date"} title={"Start on"} setValue={setStartDateFun}/>*/}
                   {/*<DatePicker placeHolder={"Select End Date"} title={"Ends on"} setValue={setEndsDateFun}/>*/}
               </View>

               {/*<View style={{marginBottom : 20}}>*/}
               {/*</View>*/}

               <View style={styles.body}>


                   <View style={styles.itemContainer}>
                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={GroupIcon}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 80}}>{state.serviceCount}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Service Count
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={Count}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 80}}>{state.vehicleCount}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Vehicle Count
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={ServiceCost}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 50}}>{"Rs "+state.serviceCost}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Service cost
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={Union}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 50}}>{"Rs "+state.partCost}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Parts cost
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={Last}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 50}}>{state.vehicleNo}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Last Service Vehicle
                                   </Text>
                               </View>
                           </View>
                       </View>

                       <View style={styles.cardContainer}>
                           <View style={styles.cardInnerContainer}>
                               <View style={{display : "flex", flexDirection : 'row' , marginBottom : 30}}>
                                   <Image source={PartCost}/>
                                   <Text style={{color : 'white', fontWeight : 'bold', alignSelf : 'flex-end', marginLeft : 50}}>{state.lastServiceDate}</Text>
                               </View>
                               <View>
                                   <Text style={{color : 'white', fontWeight : 'bold', fontSize : 15}}>
                                       Last Service Date
                                   </Text>
                               </View>
                           </View>
                       </View>


                   </View>

                   <View style={{marginTop : '30%'}}>
                       <Button style={{borderRadius: 10, width: '100%', paddingVertical : 10, backgroundColor : '#29AC8D', marginTop : '10%'}} mode="contained"
                               onPress={() => updateDashboardDetails(userId)}

                       >
                           Refresh
                       </Button>
                   </View>




               </View>




           </ScrollView>
       </SafeAreaView>


   )
};

export default DashBoard

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
    },

    scrollingView : {
        height : '100%',
         padding : 10
    },
    contentContainer : {
        width : "100%",
        height : "100%",
        //backgroundColor : 'green',
        display : "flex"
    },

    datePickerView : {
     display : 'flex',
        flexDirection : "row",
        justifyContent : "space-between"
    },

    itemContainer : {
        display : "flex" ,
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : 'space-between'
    },

    cardContainer : {
        width : 160,
        height : 100,
        backgroundColor : '#29AC8D',
        borderRadius : 20,
        padding : 10,
        marginTop : 20,
       // marginBottom : 20
    },

    cardInnerContainer : {
        display : 'flex',
        flexDirection : 'column',
        height : "auto",
        justifyContent : 'space-between',
       // backgroundColor : 'red',
        width : 'auto'
    },

    body : {
        flexGrow : 1,
        display : 'flex',
        flexDirection : "column",
        marginTop: '20%'

    }



})
