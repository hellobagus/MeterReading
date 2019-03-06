import React, { Component } from "react";
import { View,Text,StyleSheet,FlatList,AsyncStorage,Image,TouchableOpacity } from "react-native";
import Styles from './Style';
import moment from "moment"
import RNFetchBlob from 'rn-fetch-blob';

class UploadAll extends Component {

    constructor(props){
        super(props)

        this.state = {
            dataMeter : []
        }
    }

    componentDidMount(){
        this.getData()
    }
    
    getData = async() =>{
        const data = await AsyncStorage.getItem('@SaveDataMeter')
        const dataJson = JSON.parse(data)
        console.log('dataJson',dataJson);

        this.setState({dataMeter : dataJson})
    }
    
    uploadAll = ()=>{
        this.state.dataMeter.map((data) =>{
            this.uploadData(data)
        })
    }

    uploadData = (data) =>{
        const dm = data.dataMeter
        
        const formData = {
            entity : dm.entity_cd,
            project : dm.project_no.trim(),
            type : data.meterType,
            meter_id : data.meterId,
            readDate : moment(data.readingDate).format('YYYY-MM-DD'),
            lot_no : dm.lot_no,
            curr_read : data.meteran,
            curr_read_high : null
        }

        console.log('formData',formData);

        fetch('http://35.198.219.220:2121/alfaAPI/c_meter_utility/saveDataMu/IFCAPB',{
          method : "POST",
          body :JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((res)=>{
            console.log('response', res)
            if(data.dataPict.length !== 0){
                this.uploadPhoto(data)
            } else {
                alert(res.Pesan)
                this.delete(formData.meter_id)
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    delete(key) {
        const data = this.state.dataMeter.filter(item => item.meterId !== key);
        this.setState({dataMeter:data},()=>{
            this._storeData('@SaveDataMeter',JSON.stringify(this.state.dataMeter))
        });
    }

    uploadPhoto = (data) =>{

        console.log('data',data);
        const dm = data.dataMeter

        const datas = {
            cons : 'IFCAPB',
            entity : dm.entity_cd,
            project : dm.project_no.trim(),
            meterType : data.meterType,
            meterId : data.meterId,
            lotNo : dm.lot_no,
            readDate : moment(data.readingDate).format('YYYY-MM-DD'),
            debtorAcct : dm.debtor_acct
        }

        console.log('dataData',datas);

        const dataPict = data.dataPict

        dataPict.map((images,index)=>{
            let fileName =  'Meter_' + moment(new Date).format('MMDDYYYY') + '_ticket_' + (index+1) +'.jpg';
            let fileImg = RNFetchBlob.wrap(images.uri);

            const frmData = {
                data : datas,
                seq_no_pict : index
            } 

            RNFetchBlob.fetch('POST', 'http://35.198.219.220:2121/alfaAPI/c_meter_utility/saveAttachment/IFCAPB', {
                'Content-Type' : 'multipart/form-data',
            }, [
                { name : 'photo', filename : fileName, data: fileImg},
                { name : 'data', data: JSON.stringify(frmData)},
            ])
            .then((response) => response.json())
            .then((resp) => {
                console.log('resp', resp)
                if(!resp.Error){
                    if((index+1) === dataPict.length){
                       this.delete(datas.meterId)
                    }
                }
                
            })
        })
       
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }

    renderItem =({item,index})=>{
        console.log('Render Item ',item);
        return(
            <View key={index} style={Styles.listView}>
                
                <View style={Styles.view}>
                    <Text>Reading Date : {moment(item.readingDate).format('DD MMMM YYYY')}</Text>
                    <Text>Meter ID : {item.meterId}</Text>
                    <Text>Company Name : {item.cpName}</Text> 
                    {item.dataPict.map((pict,key)=>
                        <View key={key}>
                            <Image style={{width:100,height:100}} source={{uri:pict.uri}} />
                        </View>
                    )}
                    <TouchableOpacity onPress={()=>this.uploadData(item)}>
                        <Text>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.dataMeter.length == 0 ? 
                    <Text>Kosong</Text>
                    :
                    <View>
                    <TouchableOpacity onPress={()=>this.uploadAll()}>
                        <Text> Upload All </Text>
                    </TouchableOpacity>
                    <FlatList 
                    data={this.state.dataMeter} 
                    renderItem={(item,index)=>this.renderItem(item,index)}
                    keyExtractor={(item,index)=>item.meterId}
                    />
                    </View>

                }
            </View>
        );
    }
}
export default UploadAll;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});