//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage} from 'react-native';
import Query from '@Components/Function/Query';

// create a component
class ViewSearch extends Component {
    mounted = false

    constructor(props){
        super(props)

        this.state = {
            dataMeter : null
        }

        console.log('Props',props.meterId)
    }

    componentDidMount(){
        this.mounted = true
        this.getData(this.props.meterId)
    }

    componentWillUnmount(){
        this.mounted = false
    }

    loadData = async() =>{
        const data = await AsyncStorage.getItem('@SaveDataMeter')
        if(data){
            const datas =  JSON.parse(data)
            this.setState({dataMeter:datas})
        }
        
    }

    getData = async(data)=>{
        const dataAsync = await AsyncStorage.getItem('@SaveDataMeter')
        if(dataAsync){
            let dataJson = JSON.parse(dataAsync)
            const resultQuery = Query(dataJson, data => data.meterId)
            const result = resultQuery.get(data);
            console.log('result',result);
            if(result){
                const x = result[0]
        
                const datas = {
                meterId : x.meterId,
                cpName : x.cpName,
                csName : x.csName,
                unitNo : x.unitNo
                }
            
                console.log('data',x);
            
                if(this.mounted){
                    this.setState({dataMeter:datas})
                }
            }
        }
    }

    render() {
        const data = this.state.dataMeter
        return (
            <View style={styles.container}>
                {
                    data ? 
                    <View style={styles.list} >
                        <View style={{flexDirection : 'row',justifyContent:'space-between'}}>
                            <Text>{data.meterId}</Text>
                            <Text>{data.unitNo}</Text>
                        </View>
                        <View style={{flexDirection : 'row',justifyContent:'space-between'}}>
                            <Text>{data.cpName}</Text>
                            <Text>{data.csName}</Text>
                        </View>
                    </View>
                    :
                    <Text>Data Kosong</Text>
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    list :{
        marginHorizontal : 10,
        marginVertical: 10,
    }
});

//make this component available to the app
export default ViewSearch;
