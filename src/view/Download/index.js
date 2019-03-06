import React, { Component } from "react";
import { View,Text,StyleSheet,Picker } from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Download extends Component {
    constructor(props){
        super(props)

        this.state = {
            tower : '',
            dataTower : [{name: 'Angsa', id:'1'},{name:'Kuda',id:'2'}]
        }
    }

    componentDidMount(){
        this.getTower()
    }

    getTower = () => {
        let email = this.state.email;

        fetch('http://35.198.219.220:2121/alfaAPI/c_product_info/getData/IFCAMOBILE',{
            method : "GET",
        })
        .then((response) => response.json())
        .then((res)=>{
            if(res.Error === false){
                let resData = res.Data
                console.log('resDataTower',resData);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    loadOffice() {
        return this.state.dataTower.map((data,key) => (
          <Picker.Item key={key} label={data.name} value={data.id} />
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={this.state.tower}
                    mode={this.props.model}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ tower: itemValue })
                    }
                    >
                    {this.loadOffice()}
                    </Picker>
                </View>
            </View>
        );
    }
}
export default Download;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor : '#fff'
    },
    picker: {
        marginTop: 24,
        backgroundColor: "#FFF",
        width: wp('80%'),
        alignSelf: "center",
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
    },
});