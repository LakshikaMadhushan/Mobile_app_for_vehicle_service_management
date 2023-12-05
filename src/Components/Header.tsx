import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import backIcon from "../assests/icons/back.png"


const Header = () => {
    return (
        <View style={styles.mainContainer}>
                <Image width={20} source={backIcon}/>
                <Text>DashBoard</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer : {
        display : 'flex',
        flexDirection : "row"

    }

})