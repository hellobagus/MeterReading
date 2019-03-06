import React, { Component } from "react";
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from "react-native-router-flux";

class FilterSearch extends Component {

    constructor(props){
        super(props)

        this.state = {
            txtSearch : ''
        }
    }

    search = () => {
        console.log('Filter Search', this.state.txtSearch);
        Actions.viewSearch({meterId : this.state.txtSearch})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Meter ID</Text>
                <View style={styles.read}>
                    <TextInput
                    editable={true}
                    selectTextOnFocus={true}
                    value={this.state.txtSearch}
                    onChangeText = {(val)=>this.setState({txtSearch : val})}
                    />
                </View>
                <TouchableOpacity onPress={()=>this.search()}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default FilterSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: margin.sm,
        fontSize: fonts.sm,
        fontWeight: "300",
        marginLeft: margin.sm
    },
    read: {
        marginTop: 24,
        backgroundColor: "#FFF",
        width: wp('80%'),
        alignSelf: "center",
        borderRadius: 5,
    },
});