import {Text} from "react-native";
import React from "react";
import App from "./App"
import {SpinnerProvider} from "./src/const/context/SpinnerContext";
import {ToastProvider} from 'react-native-toast-notifications'

const MainApp = () => {
    return (
        <ToastProvider>
            <SpinnerProvider>
                <App/>
            </SpinnerProvider>
        </ToastProvider>
    )
}
export default MainApp
