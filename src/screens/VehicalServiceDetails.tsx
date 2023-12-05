import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState, useEffect} from "react";
import DatePicker from "../Components/DatePicker";

import GroupIcon from "../assests/dashBoardIcons/Group.png"
import searchIcon from "../assests/icons/search.png"
import {Button, Card, Paragraph, Searchbar, TextInput, Title} from "react-native-paper";
import * as vehicleServiceDetails from '../service/vehicleServiceDetails'

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

const VehicalServiceDetails = ({route, navigation } : {route : any, navigation : any}) => {
    const [startDate, setStartDate] = useState('')
    const [endsDate, setEndsDate] = useState('')
    const [data, setData] = useState([])

    const { serviceId, cost} = route.params;

    console.log("service Id", serviceId)
    console.log("cost", cost)


    useEffect(() => {
           vehicleServiceDetails.serviceDetailsGetByServiceId(serviceId).then(res => {
               console.log(res)
               setData(res.body)
           })
    }, [])

    const setStartDateFun = (value : string) => {
        setStartDate(value)
    }
    const setEndsDateFun = (value : string) => {
        setEndsDate(value)
    }

    return(
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.scrollingView}>
                <View style={styles.body}>

                    <Text style={{fontSize : 20, fontWeight : 'bold', marginBottom : 10}}>Details List</Text>
                    {
                        data.map((item, index) => (

                            <TouchableOpacity key={index}>
                            <Card style={styles.itemCard}>

                                <Card.Content>
                                    <View style={{display : 'flex', flexDirection : 'row'}}>
                                        <View style={{backgroundColor : '#29AC8D', borderRadius : 10, width : 50, height : 50, display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style={{color : 'white', fontWeight : 'bold', fontSize : 30}}>
                                                {
                                                   index + 1
                                                }
                                            </Text>
                                        </View>

                                        <View style={{display : 'flex', flexDirection : 'column'}}>

                                        <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center'}}>
                                            <Text style={{fontSize : 20, fontWeight : 'bold', marginLeft : 20}}>{item.itemName}</Text>
                                           <View style={{display : 'flex', flexDirection : 'row'}}>
                                               <Text style={{marginLeft : 20}}>
                                                   <Text style={{fontWeight : 'bold'}}>Type : </Text> {item.type}
                                               </Text>
                                           </View>
                                        </View>
                                        <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center'}}>
                                            <Text style={{fontSize : 20, fontWeight : 'bold', marginLeft : 20}}>Rs {item.cost}</Text>

                                        </View>
                                        </View>




                                    </View>
                                </Card.Content>
                            </Card>
                            </TouchableOpacity>
                        ))
                    }

                    <View style={{width : '100%'}}>
                        <Text style={{fontSize : 20, fontWeight : 'bold', textAlign : "right"}}>Total : Rs {cost}.00</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default VehicalServiceDetails

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
        marginTop : 20
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
