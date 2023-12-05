import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState, useEffect} from "react";
import DatePicker from "../Components/DatePicker";

import GroupIcon from "../assests/dashBoardIcons/Group.png"
import searchIcon from "../assests/icons/search.png"
import {Button, Card, Paragraph, Searchbar, TextInput, Title} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as vehicleService from '../service/vehicleService'
import {useSpinner} from "../const/context/SpinnerContext"
import { useToast } from "react-native-toast-notifications";




type ItemArrayType = {
    vehicalNumber : string,
    date : string,
    mileage : string,
    service : string,
    price : string
}

const items : ItemArrayType[] = [
    {
        vehicalNumber : 'BBW8364',
        date : '2023-03-03',
        mileage : '6000km',
        service : 'Full service',
        price : 'Rs 10000.00'
    },
    {
        vehicalNumber : 'BBW8364',
        date : '2023-03-03',
        mileage : '6000km',
        service : 'Full service',
        price : 'Rs 10000.00'
    },
    {
        vehicalNumber : 'BBW8364',
        date : '2023-03-03',
        mileage : '6000km',
        service : 'Full service',
        price : 'Rs 10000.00'
    }

]

const VehicalService = ({ navigation } : {navigation : any}) => {
    const [startDate, setStartDate] = useState('')
    const [endsDate, setEndsDate] = useState('')
    const [userId, setUserId] = useState('')
    const [data, setData] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);

    const {showSpinner, hideSpinner } = useSpinner();
    const toast = useToast();

    const setStartDateFun = (value : string) => {
        const formattedDate = value.replace(/\//g, '-');
        setStartDate(formattedDate);
    }
    const setEndsDateFun = (value : string) => {
        const formattedDate = value.replace(/\//g, '-');
        setEndsDate(formattedDate);
    }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userId');
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    const serviceFilter = (startDate , endDate, userId) => {
        console.log(startDate+" AAAAAAAAAAAAAAA"+endDate)
        const data : any = {
            userId : userId,
            start : startDate,
            end : endDate
        }
         showSpinner();
        vehicleService.serviceGetFilterByUserId(data).then((res) => {

            if (res.status === 0 ) {
                setData(res.body)
                console.log(res.body)
            } else {
                toast.show(res.message, {
                    type : "danger",
                    placement : "top",
                    animationType : "zoom-in",
                    duration : 2000

                });
            }
            hideSpinner();
        }).catch(err => {
            toast.show(err, {
                type : "danger",
                placement : "top",
                animationType : "zoom-in",
                duration : 2000

            });
              hideSpinner();
        })
    }

    // useEffect(() => {
    //    getToken().then(res => {
    //        setUserId(res)
    //    })
    // }, [])



    useEffect(()=>{
        getId()
    },[])

    useEffect(() => {
        // let tempUserId : string = ""
        //   AsyncStorage.getItem("userId").then((res => {
        //       setUserId(res)
        //       tempUserId = res
        //    }))
        serviceFilter(null,null,userId)


    }, [userId])

    const getId = async() => {
        // let tempUserId : string = ""
        await AsyncStorage.getItem("userId").then((res => {
            setUserId(res)
            // tempUserId = res
        }))
    }
    const handleClearDates = () => {
        setStartDate('');
        setEndsDate('');
    };





    return(
        <SafeAreaView style={styles.safeAreaContainer}>
                <Card style={{backgroundColor : 'white', borderRadius : 0}}>
                    <Card.Content>
                        <View style={styles.headerCard} >


                            <View style={styles.datePickerView}>

                                <DatePicker  placeHolder={"Select Start Date"}  title={"Start on"} setValue={setStartDateFun}/>
                                <DatePicker  placeHolder={"Select End Date"}  title={"Ends on"} setValue={setEndsDateFun}/>


                            </View>

                            <View>
                                <Button  mode="contained" style={{backgroundColor : '#29AC8D'}} onPress={() => serviceFilter(startDate, endsDate,userId)}>
                                    Search
                                </Button>
                            </View>

                            <View style={{marginTop : 20 }}>
                                <Button  mode="contained" style={{backgroundColor : '#e06c60'}}
                                         onPress={() => {
                                             handleClearDates();
                                             setRefreshKey((prevKey) => prevKey + 1);
                                             serviceFilter(null, null, userId); // Call the serviceFilter function

                                         }}
                                >
                                         {/*onPress={() =>  serviceFilter(null,null,userId)}>*/}
                                    Clear
                                </Button>
                            </View>

                        </View>
                    </Card.Content>
                </Card>

            <ScrollView style={styles.scrollingView}>

                <View style={styles.body}>

                    {
                      data.map((item, index) => (
                          <TouchableOpacity key={index} onPress={() => navigation.navigate('VehicalDetails', { serviceId: item.serviceId , cost : item.cost})}>
                           <Card style={styles.itemCard}>

                              <Card.Content>
                                  <View>
                                      <Text style={{fontSize : 20, fontWeight : 'bold', marginLeft : 20}}>{item.numberPlate}</Text>
                                      <View style={{marginLeft : '29%', marginTop : 10}}>
                                          <Text style={{fontWeight : '600'}}><Text style={{fontWeight : 'bold'}}>Service Date : </Text> {item.serviceDate}</Text>
                                          <Text style={{fontWeight : '600'}}><Text style={{fontWeight : 'bold'}}>Technician : </Text> {item.technicianName}</Text>
                                          <Text style={{fontWeight : '600'}}><Text style={{fontWeight : 'bold'}}>Service Type : </Text> {item.type}</Text>
                                          <Text style={{fontWeight : '600'}}><Text style={{fontWeight : 'bold'}}>Cost : </Text> Rs.{item.cost}</Text>
                                      </View>

                                  </View>
                              </Card.Content>
                           </Card>
                          </TouchableOpacity>

                      ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default VehicalService

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
        justifyContent : "space-between",
        marginBottom : 20
    },

    itemContainer : {
        display : "flex" ,
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : 'space-between'
    },

    cardContainer : {
        width : 170,
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
        marginTop : 50
    },

    searchInput : {
        width : '100%' ,
        height : 50 ,
        backgroundColor : '#29AC8D',
        display : "flex",
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
       paddingHorizontal : 20,
        borderRadius : 20,
        color : 'white'
    },
    headerCard : {
        marginBottom : 10,
    }

    ,

    itemCard : {
        marginBottom : 20,
        backgroundColor : 'white',

    }



})
