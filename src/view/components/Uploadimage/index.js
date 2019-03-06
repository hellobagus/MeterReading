import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker';

// const options = {
//     title: 'Select Picture',
//     takePhotoButtonTitle: 'Take a Photo',
//     chooseFromLibraryButtonTitle: 'Choose from Gallery',
//     quality: 1
// };

export default class MeterPhoto extends Component {

    state = {
        photos: [],
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
            storageOptions :{
                path : 'MeterRiding'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.uri){
                // this.setState({ photo:response })
                this.setState(state => ({
                        photos: [...state.photos, response]
                }),()=>{
                    this.props.image(response)
                });
            }
            console.log('Response Photo',response);
        });
    };

    render(){
        const { photos } = this.state;
        return(
            <View style={styles.container}>
            {photos.map(photo => (
                <Image 
                    key={photo.uri}
                    source={{ uri: photo.uri }}
                    style={{ width: 300, height: 300 }}
                />
            ))}
            {photos.length <= 5 && (
                <React.Fragment>
                    <TouchableOpacity style={styles.button} onPress={this.handleChoosePhoto.bind(this)}>
                        <Text style={styles.text}>Upload Photo</Text>
                    </TouchableOpacity>
                </React.Fragment>
            )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width: 250,
        height: 50,
        backgroundColor: '#37BEB7',
        borderRadius: 30 ,
        justifyContent:'center',
        marginTop: 10
    },
    text: {
        fontSize:20,
        alignSelf: 'center',
        color: 'white'
    },
    images:{
        width: 200,
        height: 200,
        marginTop: 30,
    }
})