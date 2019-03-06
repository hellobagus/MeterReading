//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Picker, TextInput, TouchableOpacity, Modal } from "react-native";
import { Actions } from "react-native-router-flux";
import DatePick from "react-native-datepicker";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import nbStyles from './Style';
import Icon from 'react-native-vector-icons/FontAwesome'



// create a component
class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      office: [
        { id: 1, name: "Electric", selectedOffice: "" },
        { id: 2, name: "Water" },
        { id: 3, name: "Air" }
      ],
    //   date: new Date(),
      dataqr: "E-ARHA-01",
      modalVisible: false,
      

    };
  }

  

  componentWillReceiveProps(props){
    this.setState({dataqr : props.meterId})
  }

  clickReadingScan() {
    Actions.readingScan();
    this.setState({click:true})
  }
  clickReadingForm() {
    Actions.readingForm({meterId : this.state.dataqr});
    this.setState({click:true})
  }
  clickReadCode() {
    Actions.readCode();
    this.setState({click:true})
  }
  onSuccess(e) { 
    this.setState({
      dataqr: this.state.dataqr + ", " + e.data,
      status: "Coba Lagi"
    });
  }
  setModalVisible(visible) {
      this.setState({ modalVisible: visible});
  }

  loadOffice() {
    return this.state.office.map((offc,key) => (
      <Picker.Item key={key} label={offc.name} value={offc.id} />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Choose Type</Text>
        <View style={styles.read}>
          <Picker
            selectedValue={this.state.selectedOffice}
            mode={this.props.model}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedOffice: itemValue })
            }
          >
            {this.loadOffice()}
          </Picker>
        </View>
        <Text style={styles.text}>Meter ID</Text>
        <View style={styles.read}>
            <TextInput
            editable={true}
            selectTextOnFocus={true}
            value={this.state.dataqr}
            onChangeText={(val)=>this.setState({dataqr:val})}
            />
        </View>
        <TouchableOpacity
        style={styles.scan}
        onPress={()=>this.clickReadingScan()}
        >
        <Text style={styles.textscan}>Scan QRCode</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.scan}
        onPress={()=>this.clickReadCode()}
        >
        <Text style={styles.textscan}>Scan Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.clickReadingForm()}
        >
        <Text style={styles.textscan}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddeaff",
    paddingLeft: padding.sm,
       paddingRight: padding.sm,
       width: dimensions.fullWidth,
  },
  read: {
    marginTop: 24,
    backgroundColor: "#FFF",
    width: wp('80%'),
    alignSelf: "center",
    borderRadius: 5,
   
  },
  dates: {
    marginTop: margin.sm,
    paddingLeft: padding.sm,
    paddingRight: padding.sm
  },
  text: {
    marginTop: margin.sm,
    fontSize: fonts.sm,
    fontWeight: "300",
    marginLeft: margin.sm
  },
  textscan: {
     fontSize: fonts.sm,
    fontWeight: "700",
    color: "#fff"
  },
  scan: {
    width: null,
    height: hp('10%'),
      borderRadius: 5,
      backgroundColor: "#FFC864",
      justifyContent: "center",
      alignItems : "center",
      marginTop:30,
      marginLeft: margin.sm,
      marginRight: margin.sm
  },
  button: {
    width: null,
    height: hp('10%'),
      borderRadius: 5,
      backgroundColor: "#6f9fed",
      justifyContent: "center",
      alignItems : "center",
      marginTop:30,
      marginLeft: margin.sm,
      marginRight: margin.sm
  },
});

//make this component available to the app
export default Reading;
