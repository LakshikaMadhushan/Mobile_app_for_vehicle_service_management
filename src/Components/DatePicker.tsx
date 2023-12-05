import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from 'react-native-date-picker'
import React, {useState} from "react";


type propsTypes ={
    placeHolder : string,
    title : string,
    setValue : (value : any) => void
}

const DatePickerComponent = ({placeHolder, title, setValue} : propsTypes) => {

    const moment = require('moment');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [newDate, setNewDate] = useState('')

    const onChange = (selectedDate : any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setNewDate(currentDate)
        setValue(moment(currentDate).format('YYYY/MM/DD'))
    };

    const showMode = (currentMode : any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
                <DatePicker
                modal
                open={show}
                date={date}
                onConfirm={(date) => {
                onChange(date)
            }}
                onCancel={() => {
                setShow(false)
            }}
                />


            <TouchableOpacity onPress={showDatepicker}>
                <View style={{
                    position : 'relative',

                    paddingTop : 10
                }}>

                    <Text style={{
                        position : "absolute",
                        top : 0,
                        margin : 0,
                        padding : 0,
                        marginLeft : 12,
                        backgroundColor : 'white',
                        zIndex : 10,
                    }}>{title}</Text>

                    <View style={{
                        display : 'flex',
                        alignItems : 'center',
                        borderRadius : 10,
                        padding : 5,
                        borderColor : 'gray',
                        borderWidth : 1,
                        width : 150

                    }}>
                        <Text style={{
                            fontWeight : "bold",
                            fontSize : 15,
                            color : 'black'
                        }}>{newDate ? moment(newDate).format('YYYY/MM/DD'): <Text style={{color : 'gray'}}>{placeHolder} </Text> }</Text>

                    </View>

                </View>



            </TouchableOpacity>
        </View>
    )
}

export default DatePickerComponent
