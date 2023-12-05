import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import * as vehicleCostService from '../service/vehicleCostService'
import {useSpinner} from "../const/context/SpinnerContext"

type ItemArrayType = {
    vehicalNumber : string,
    date : string,
    mileage : string,
    service : string,
    price : string
}

type SPartType = {
    title : string,
    price : string,
    description : string

}

const sPart : SPartType[]  = [
    {
        title : 'Break Liner',
        price : 'Rs20000',
        description : 'test desc'
    },
    {
        title : 'test Title 02',
        price : 'Rs30000',
        description : 'test desc  02 '
    },
    {
        title : 'test Title 03',
        price : 'Rs30000',
        description : 'test desc  03 '
    },

]

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

const VehicalServiceCost = ({ navigation } : {navigation : any}) => {

    const {showSpinner, hideSpinner } = useSpinner();

    const [startDate, setStartDate] = useState('')
    const [endsDate, setEndsDate] = useState('')
    const [tab, setTab] = useState(1);

    const [data, setData] = useState([])
    const [msData, setMsData] = useState([])

    const setStartDateFun = (value : string) => {
        setStartDate(value)
    }
    const setEndsDateFun = (value : string) => {
        setEndsDate(value)
    }

    const loadAllSparePart = () => {
        showSpinner()
        vehicleCostService.getItem().then((res) => {
             console.log(res.body)
            setData(res.body)
            setTab(1)
            hideSpinner()
        })
    }

    const loadAllMechanicService = () => {
        showSpinner()
        vehicleCostService.MechanicServiceGetAll().then((res) => {
            console.log(res.body)
            setMsData(res.body)
            setTab(2)
            hideSpinner()
        })
    }

    return(
        <SafeAreaView style={styles.safeAreaContainer}>

            <ScrollView style={styles.scrollingView}>

                <View>
                    <View style={styles.buttonGroupContainer}>
                        <TouchableOpacity onPress={() => loadAllSparePart()}  style={{width : "50%"}}>
                         <View style={{width : '100%', height : 50, backgroundColor : `${tab === 1 ? '#29AC8D' : 'white'}`, borderTopLeftRadius : 5, borderBottomLeftRadius : 5,
                         display : 'flex', alignItems : 'center', justifyContent : 'center'}}
                         >
                             <Text style={{fontSize : 15, fontWeight : 'bold', color : `${tab === 1 ? 'white' : 'black'}`}}>Spare Parts</Text>

                         </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => loadAllMechanicService()}  style={{width : "50%"}}>
                         <View style={{width : '100%', height : 50, backgroundColor : `${tab === 2 ? '#29AC8D' : 'white'}`, borderBottomRightRadius : 5, borderTopRightRadius : 5,
                             display : 'flex', alignItems : 'center', justifyContent : 'center'}}
                            onPress={() => setTab(2)}
                         >
                             <Text style={{fontSize : 15, fontWeight : 'bold', color : `${tab === 2 ? 'white' : 'black'}`}}>Mechanic Service</Text>
                         </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.body}>

                    {tab === 1 &&
                      data.map((item, index) => (
                          <TouchableOpacity key={index} onPress={() => navigation.navigate('VehicalDetails')} style={{marginBottom : 20}}>

                                  <View style={{display : 'flex', flexDirection : 'row'}}>

                                      <View style={{display : 'flex', flexDirection : 'column'}}>

                                          <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center'}}>

                                              <View style={{width : '100%'}}>

                                                  <View style={{display : 'flex', flexDirection: 'row'}}>
                                                      <Text style={{color : 'black', fontWeight : 'bold', fontSize : 20}}>
                                                          {
                                                              index + 1
                                                          }
                                                      </Text>
                                                      <Text style={{fontSize : 20, fontWeight : 'bold', marginLeft : 15}}>{item.itemName}</Text>
                                                      {/*<View style={{display : 'flex', flexDirection : 'row'}}>*/}
                                                      {/*    <Text style={{marginLeft : 20}}>Price : </Text>*/}
                                                      {/*    <Text>Rs. {item.sellingPrice}</Text>*/}
                                                      {/*</View>*/}
                                                  </View>

                                                  <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center', marginLeft : 10}}>

                                                      <Text style={{marginLeft : 15}}>Price : </Text>
                                                      <Text>Rs. {item.sellingPrice}</Text>
                                                  </View>

                                                  <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center', marginLeft : 10}}>
                                                      <Text style={{marginLeft : 15}}>Brand : </Text>
                                                      <Text style={{fontSize : 15, fontWeight : '600', marginLeft : 15}}>{item.brand}</Text>

                                                  </View>


                                                  <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center', marginLeft : 10}}>
                                                      <Text style={{fontSize : 15, fontWeight : '600', marginLeft : 15}}>{item.itemStatus}</Text>

                                                  </View>

                                              </View>

                                          </View>

                                          <Separator/>

                                      </View>




                                  </View>

                          </TouchableOpacity>
                      ))
                    }

                    {tab === 2 &&
                    msData.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('VehicalDetails')} style={{marginBottom : 20}}>

                            <View style={{display : 'flex', flexDirection : 'row'}}>

                                <View style={{display : 'flex', flexDirection : 'column'}}>

                                    <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center'}}>

                                        <View style={{width : '100%'}}>



                                            <View style={{display : 'flex', flexDirection: 'row' , alignItems : 'center'}}>
                                                <Text style={{color : 'black', fontWeight : 'bold', fontSize : 20}}>
                                                    {
                                                        index + 1
                                                    }
                                                </Text>
                                                <Text style={{fontSize : 20, fontWeight : 'bold', marginLeft : 20}}>{item.name}</Text>
                                                <Text>                    </Text>
                                                <View style={{display : 'flex', flexDirection : 'row'}}>
                                                    <Text style={{marginLeft : 20}}>Rs . {item.price}</Text>
                                                </View>
                                            </View>

                                            <View style={{flexGrow : 1, display : 'flex' , flexDirection : 'row', flexWrap : 'wrap', paddingLeft : 5, alignItems : 'center', marginLeft : 10}}>
                                                <Text style={{fontSize : 15, fontWeight : '600', marginLeft : 15}}>{item.vehicleType}</Text>

                                            </View>

                                        </View>

                                    </View>

                                    <Separator/>

                                </View>




                            </View>

                        </TouchableOpacity>
                    ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default VehicalServiceCost

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonGroupContainer : {
        display : 'flex' ,
        flexDirection : 'row',
        borderRadius : 10,
        borderWidth : 2,
        borderColor : '#29AC8D'
    },

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
        marginTop : 50,
        alignItems : 'center'
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
