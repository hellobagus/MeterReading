import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Home from './view/Home';
import Launch from './view/Launch';

import Download from './view/Download';

import Reading from './view/Reading/Reading';
import ReadingScan from './view/Reading/ReadScan';
import ReadingForm from './view/Reading/ReadingForm';
import ReadCode from './view/Reading/ReadCode';


import Project from './view/Sumarry/Project';
import Air from './view/Sumarry/Air';
import Electricity from './view/Sumarry/Electricity';
import Water from './view/Sumarry/Water';

import BarcodeSeacrh from './view/ScanSearch/BarcodeSeacrh';
import FilterSearch from './view/ScanSearch/FilterSearch';
import ViewSearch from './view/ScanSearch/ViewSearch';

import SeeAll from './view/Upload/SeeAll';
import UploadAll from './view/Upload/UploadAll';
import TypeProject from './view/Sumarry/Type';
import SumaryView from './view/Sumarry/SumaryView';



const GLOBAL = require('./config/Services');

class Routes extends Component {
    
    render() {
        return (
            <Router>
                <Scene key='root'  headerLayoutPreset="center">
                <Scene key='launch' component={Launch} hideNavBar={true} title=""/>
                <Scene key='home' component={Home} hideNavBar={true} title=""/>
                <Scene key='download' component={Download} title="Download"/>
                <Scene key='reading' component={Reading} NavBar={true} title="Reading"/>
                <Scene key='readingScan' component={ReadingScan} NavBar={true} title=""/>
                <Scene key='readCode' component={ReadCode} NavBar={true} title=""/>
                <Scene key='readingForm' component={ReadingForm} NavBar={true} title="Reading Form"/>
                <Scene key='project' component={Project} NavBar={true} title="Project"/>
                <Scene key='air' component={Air} hideNavBar={true} title=""/>
                <Scene key='electricity' component={Electricity} hideNavBar={true} title=""/>
                <Scene key='typeproject' component={TypeProject} NavBar={true} title="Type"/>
                <Scene key='sumaryview' component={SumaryView} NavBar={true} title=""/>
                <Scene key='water' component={Water} hideNavBar={true} title=""/>
                <Scene key='barcodeSeacrh' component={BarcodeSeacrh}   NavBar={true} title=""/>
                <Scene key='filterSearch' component={FilterSearch} NavBar={true} title="Filter Search"/>
                <Scene key='viewSearch' component={ViewSearch} NavBar={true} title="View Search"/>
                <Scene key='seeAll' component={SeeAll} hideNavBar={true} title=""/>
                <Scene key='uploadAll' component={UploadAll} NavBar={true} title="Upload"/>
                </Scene>
            </Router>

        );
    }

}


export default Routes;