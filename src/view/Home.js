//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, AsyncStorage,ProgressBarAndroid } from 'react-native';
import { color, fonts, padding, dimensions } from '@Assets/styles/base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux'
import * as Progress from 'react-native-progress';
import Query from '@Components/Function/Query';
// create a component

class Home extends Component {
    state={
        click: false,
        progress : 0,
        showProgress : false,
        indeterminate : false
    }
    componentDidMount(){
    }

    animate() {
        let progress = 0;
        this.setState({progress, showProgress:true,indeterminate:true });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += 0.01;
            if (progress > 1) {
                this.setState({progress:0, showProgress : false});

            }
            this.setState({ progress});
          }, 1);
        }, 1500);
      }

    clickDownload = () =>{
        this.setState({indeterminate : true,showProgress:true,progress : 0.3})
        fetch('http://35.198.219.220:2121/alfaAPI/c_meter_utility/getDataMu/IFCAPB',{
            method : "GET",
        })
        .then((response) => response.json())
        .then((res)=>{
            console.log('data meter',res)
            if(!res.Error){
                this._storeData('@DataMeter',JSON.stringify(res.Data)) 
                this.setState({progress:1, showProgress:false, indeterminate:false},()=>{
                    alert("downloaded");
                })              
            } else {
                console.log('Pesan Error', res.Pesan)
            }
        }).catch((error) => {
            console.log(error);
        });
        // Actions.download();
        // this.setState({click:true})
    }

    clickProject() {
        Actions.project();
        this.setState({click:true})
    }
    clickSearch() {
        Actions.filterSearch();
        this.setState({click:true})
    }
    clickReading() {
        Actions.reading();
        this.setState({click:true});
    }
    clickUploadAll() {
        Actions.uploadAll();
        this.setState({click:true})
    }

    getData = async(data)=>{
        const dataAsync = await AsyncStorage.getItem('@DataMeter')
        let dataJson = JSON.parse(dataAsync)

        const result = Query(dataJson, data => data.meter_id)

        console.log(result.get(data))
        alert("Last Read : "+result.get(data)[0].last_read)
        
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }
  
    render() {
        return (
            <View style={styles.container}>
               <Image 
                style={styles.iconlogo}
                source={require('@Assets/images/logo.png')}/>
               <TouchableOpacity style={styles.download} onPress={()=>this.clickDownload()}>
               <Image 
                style={styles.icondonwload} 
                source={require('@Assets/images/download.png')}/>
                  <Text style={styles.textdownload}>Download</Text>
                  {this.state.showProgress ? 
                  <ProgressBarAndroid styleAttr="Horizontal"  progress={this.state.progress} indeterminate={this.state.indeterminate} width={200} />
                  :
                  null
                  }
               </TouchableOpacity>
               <View style={styles.menu}>
                  <TouchableOpacity style={styles.reading}
                  onPress={() => this.clickReading ()}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/reading.png')}/>
                   <Text style={styles.text}>Reading</Text>     
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickProject()}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/group.png')}/>
                   <Text style={styles.text}>Summary</Text>     
                  </TouchableOpacity>
               </View>
               <View style={styles.menu}>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickSearch()}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/search.png')}/>
                   <Text style={styles.text}>Seacrh</Text>     
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickUploadAll()}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/upload.png')}/>
                   <Text style={styles.text}>Upload</Text>     
                  </TouchableOpacity>
               </View>
            </View>
        );
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        flex :1,
        paddingLeft: padding.sm,
        paddingRight: padding.sm,
        width: dimensions.fullWidth,
        backgroundColor: '#FFFFFF',
    },
    icondonwload: {
        height: 55,
        width: 55,
        alignItems: 'center',
    },
    iconlogo: {
        height: 55,
        width: 55,
        alignItems:'flex-end',
        marginBottom: 16,
        marginTop: 32
    },
    menu: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 16
    },
    reading: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 10,
        elevation: 10,
        width: wp('43%'),
        height: hp('25%'),
        alignItems:'center',
        justifyContent: 'center',
    },
    download: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        width: null,
        height: null,
        alignItems:'center',
        justifyContent: 'center',
    },
    textdownload: {
        fontSize: fonts.sm,
        fontWeight: '300',
    },
    text: {
        fontSize: fonts.sm,
        fontWeight: '300',
        marginTop: 8
    }
});
//make this component available to the app
export default Home;
