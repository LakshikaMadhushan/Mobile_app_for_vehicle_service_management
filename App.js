/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
    useColorScheme,
    Button,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PaperProvider, TextInput} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer} from 'react-native-paper';
import Login from './src/screens/Login';
import DashBoard from './src/screens/DashBoardScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Link from "@react-navigation/native/src/Link";
import Profile from "./src/screens/Profile";
import VehicalService from "./src/screens/VehicalServiceScreen";
import VehicalServiceDetails from "./src/screens/VehicalServiceDetails";
import VehicalServiceCost from "./src/screens/VehicalServiceCost";
import Spinner from "react-native-loading-spinner-overlay";
import {useSpinner} from "./src/const/context/SpinnerContext";

const Stack = createNativeStackNavigator();
const App: () => Node = () => {

    // const navigation = useNavigation();
    const {loading} = useSpinner();

    const drawer = useRef < DrawerLayoutAndroid > (null);
    const [drawerPosition, setDrawerPosition] = useState < 'left' | 'right' > (
        'left'
    );

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={[styles.paragraph, {marginBottom: 10}]}>Menu</Text>


            <View style={{display: 'flex', flexDirection: 'column', margin: 10, alignItems: 'center'}}>


                <View style={{
                    backgroundColor: '#219a9a', width: 250, height: 40, marginBottom: 30, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Link onPress={() => drawer.current?.closeDrawer()} to={{screen: 'Profile'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Profile</Text>
                    </Link>
                </View>

                <View style={{
                    backgroundColor: '#219a9a', width: 250, height: 40, marginBottom: 30, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Link onPress={() => drawer.current?.closeDrawer()} to={{screen: 'DashBoard'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>DashBoard</Text>
                    </Link>
                </View>

                <View style={{
                    backgroundColor: '#219a9a', width: 250, height: 40, marginBottom: 30, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Link onPress={() => drawer.current?.closeDrawer()} to={{screen: 'VehicalService'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Vehical Service</Text>
                    </Link>
                </View>

                <View style={{
                    backgroundColor: '#219a9a', width: 250, height: 40, marginBottom: 30, display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Link onPress={() => drawer.current?.closeDrawer()} to={{screen: 'VehicalServiceCost'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Vehical Service Cost</Text>
                    </Link>
                </View>


            </View>


        </View>
    );

    const changeDrawerPosition = () => {
        if (drawerPosition === 'left') {
            setDrawerPosition('right');
        } else {
            setDrawerPosition('left');
        }
    };


    return (

            <NavigationContainer>
                <PaperProvider>


                    <DrawerLayoutAndroid
                        ref={drawer}
                        drawerWidth={300}
                        drawerPosition={drawerPosition}
                        renderNavigationView={navigationView}>

                        <Stack.Navigator initialRouteName={"Login"}
                                         screenOptions={{
                                             headerRight: () => (
                                                 <Link to={{screen: 'Profile'}}>
                                                     <Avatar.Image size={45}
                                                                   source={require('./src/assests/profileIcons/avatar.jpg')}/>
                                                 </Link>
                                             ),
                                         }}


                        >

                            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                            <Stack.Screen name="Profile" component={Profile}/>
                            <Stack.Screen name="DashBoard" component={DashBoard} options={{
                                headerLeft: () => (
                                    <View style={{marginRight: 20}}>
                                        <Icon
                                            size={20}
                                            name="bars"
                                            color="black"
                                            backgroundColor="white"
                                            onPress={() => drawer.current?.openDrawer()}
                                        >
                                        </Icon>
                                    </View>


                                ),
                            }}/>

                            <Stack.Screen name="VehicalService" component={VehicalService} options={{

                                title: 'Vehical Service',
                                headerLeft: () => (
                                    <View style={{marginRight: 20}}>
                                        <Icon
                                            size={20}
                                            name="bars"
                                            color="black"
                                            backgroundColor="white"
                                            onPress={() => drawer.current?.openDrawer()}
                                        >
                                        </Icon>
                                    </View>


                                ),
                            }}/>

                            <Stack.Screen name="VehicalServiceCost" component={VehicalServiceCost} options={{

                                title: 'Vehical Service Cost',
                                headerLeft: () => (
                                    <View style={{marginRight: 20}}>
                                        <Icon
                                            size={20}
                                            name="bars"
                                            color="black"
                                            backgroundColor="white"
                                            onPress={() => drawer.current?.openDrawer()}
                                        >
                                        </Icon>
                                    </View>


                                ),
                            }}/>

                            <Stack.Screen name="VehicalDetails" component={VehicalServiceDetails} options={{
                                title: 'Vehical Details'
                            }}/>


                            {/*<Stack.Screen name="DashBoard" component={DashBoard} options={{*/}
                            {/*  headerLeft: () => (*/}
                            {/*      <View style={{marginRight : 20}}>*/}
                            {/*        <Icon*/}
                            {/*            size={20}*/}
                            {/*            name="bars"*/}
                            {/*            color="black"*/}
                            {/*            backgroundColor="white"*/}
                            {/*            onPress={() => drawer.current?.openDrawer()}*/}
                            {/*        >*/}
                            {/*        </Icon>*/}
                            {/*      </View>*/}


                            {/*  ),*/}
                            {/*}}/>*/}
                        </Stack.Navigator>


                    </DrawerLayoutAndroid>

                </PaperProvider>

                {
                    <Spinner
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />
                }

            </NavigationContainer>



    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },


    container: {
        backgroundColor: 'blue',
        height: '100%',
        width: '100%'
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});

export default App;
