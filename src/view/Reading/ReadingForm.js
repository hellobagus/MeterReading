//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,AsyncStorage,Image } from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import DatePicker from "../components/Datepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import TextInputs from "../components/InputText/TextInput";
import MeterPhoto from "../components/Uploadimage"
import Query from '@Components/Function/Query';

// create a component
class ReadingForm extends Component {

mounted = false;

  constructor(props){
    super(props)

    this.state = {
      meterId : '',
      cpName : '',
      csName : '',
      unitNo : '',
      meterType : '',
      meteran : '',
      dataMeter : null,

      dataPict : []
    }

    this.saveImage = this.saveImage.bind(this)
  }

  componentDidMount(){
    this.mounted = true;
    this.getData(this.props.meterId)
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  getData = async(data)=>{
    const dataAsync = await AsyncStorage.getItem('@DataMeter')
    let dataJson = JSON.parse(dataAsync)
    const result = Query(dataJson, data => data.meter_id)
    const x = result.get(data)[0]

    const datas = {
      meterId : x.meter_id,
      cpName : x.debtor_name,
      csName : x.email_addr,
      unitNo : x.lot_no,
      meterType : x.meter_type,
      dataMeter  :{
        ...x
      },
    }

    console.log('data',datas);

    if(this.mounted){
      this.setState(datas)
    }
  }

  clickSave = ()=>{
    const x = this.state
    const data = {
      meterId : x.meterId,
      cpName : x.cpName,
      csName : x.csName,
      unitNo : x.unitNo,
      meterType : x.meterType,
      meteran : x.meteran,
      dataMeter : x.dataMeter,
      readingDate : new Date(),
      dataPict : x.dataPict
    }

    this.saveData(data)
  }

  saveData = async(data) =>{
    console.log(data)
    const dataAsync = await AsyncStorage.getItem('@SaveDataMeter')
    if(dataAsync !== null){
      const ds = JSON.parse(dataAsync)
      const datas = ds.filter(item => item.meterId !== data.meterId);

      const dataArray = []
      dataArray.push(...datas, data)
      console.log('dataArray',dataArray);
      this._storeData('@SaveDataMeter',JSON.stringify(dataArray))
    } else {
      const dataArray = []
      dataArray.push(data)
      console.log(JSON.stringify(dataArray))
      this._storeData('@SaveDataMeter',JSON.stringify(dataArray))
    }
    

    
    // const dataJson = JSON.stringify(data)
    // this._storeData('@SaveDataMeter',dataJson)

  }

  saveImage(data){
    this.setState(state => ({
      dataPict: [...state.dataPict, data]
    }),()=>{
      console.log('SaveImage',this.state.dataPict);
    });
  }
  
  _storeData = async (name,data) =>{
    try {
        await AsyncStorage.setItem(name,data)
    } catch (error) {
        console.log('ErrorStoreData', error)
    }
  }

  render() {
    let data = this.state

    return (
        <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Reading Date</Text>
        <DatePicker style={styles.dates} />
        <Text style={styles.text}>Meter ID</Text>
        <TextInputs style={styles.inputText} value={data.meterId} onChangeText={(val)=>this.setState({meterId:val})} placeholder="Meter ID" />
        <Text style={styles.text}>Company Name</Text>
        <TextInputs style={styles.inputText} value={data.cpName} onChangeText={(val)=>this.setState({cpName:val})} placeholder="PT. Ifca" />
        <Text style={styles.text}>Customer Name</Text>
        <TextInputs style={styles.inputText} value={data.csName} onChangeText={(val)=>this.setState({csName:val})} placeholder="Andi" />
        <Text style={styles.text}>Unit No.</Text>
        <TextInputs style={styles.inputText} value={data.csName} onChangeText={(val)=>this.setState({meterId:val})} placeholder="Unit 1" />
        <Text style={styles.text}>Meteran</Text>
        <TextInputs style={styles.inputText} value={data.meteran} onChangeText={(val)=>this.setState({meteran:val})} placeholder="Meteran" />
        <Text style={styles.text}>Meter Photo</Text>
        <MeterPhoto image={this.saveImage} />
        <TouchableOpacity style={styles.button} onPress={()=>this.clickSave()}>
          <Text style={styles.textscan}>Save</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
    width: dimensions.fullWidth
  },
  dates: {
    marginTop: margin.sm,
    width: wp("85%")
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
  inputText: {
    flexDirection: "row",
    marginTop: margin.sm,
    backgroundColor: "#E2E1E0",
    width: wp("85%"),
    alignSelf: "center"
  },
  button: {
    width: null,
    height: hp('10%'),
      borderRadius: 5,
      backgroundColor: "#6f9fed",
      justifyContent: "center",
      alignItems : "center",
      margin: margin.lg
  },
});

//make this component available to the app
export default ReadingForm;
