import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import DatePicker from "../Components/DatePicker";

import GroupIcon from "../assests/dashBoardIcons/Group.png"
import searchIcon from "../assests/icons/search.png"
import {Button, Card, Paragraph, Searchbar, TextInput, Title} from "react-native-paper";


const PersonalInformation = ({ navigation } : {navigation : any}) => {
    const [startDate, setStartDate] = useState('')
    const [endsDate, setEndsDate] = useState('')

    const setStartDateFun = (value : string) => {
        setStartDate(value)
    }
    const setEndsDateFun = (value : string) => {
        setEndsDate(value)
    }


    return(
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.scrollingView}>


                <Card style={{backgroundColor : 'white', borderRadius : 0}}>
                    <Card.Content>
                        <View style={styles.headerCard} >

                            <View>
                                <Searchbar
                                    inputStyle={{color : 'white'}}
                                    style={styles.searchInput}
                                    placeholder="Search"
                                    //onChangeText={onChangeSearch}
                                    //value={searchQuery}
                                />
                            </View>
                            <View style={styles.datePickerView}>

                                <DatePicker placeHolder={"Select Start Date"} title={"Start on"} setValue={setStartDateFun}/>
                                <DatePicker placeHolder={"Select End Date"} title={"Ends on"} setValue={setEndsDateFun}/>
                            </View>

                        </View>
                    </Card.Content>
                </Card>



                {/*<View style={{marginBottom : 20}}>*/}
                {/*</View>*/}

                <View style={styles.body}>


                    <View style={{marginTop : '30%'}}>
                        <Button style={{borderRadius: 10, width: '100%', paddingVertical : 10, backgroundColor : '#29AC8D', marginTop : '10%'}} mode="contained"
                                onPress={() => navigation.navigate('DashBoard')}>
                            Search
                        </Button>
                    </View>




                </View>




            </ScrollView>
        </SafeAreaView>


    )
}

export default PersonalInformation

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
        flexDirection : "column"
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



})