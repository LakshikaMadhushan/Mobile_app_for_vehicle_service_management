/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MainApp from './mainApp';
import {name as appName} from './app.json';
import {SpinnerProvider} from "./src/const/context/SpinnerContext";
import React from "react";

AppRegistry.registerComponent(appName, () => MainApp);
