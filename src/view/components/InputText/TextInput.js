import React, {Component} from 'react';
import { View, Picker, StyleSheet, TextInput, Text } from 'react-native';

export default class InputText extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TextInput
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    keyboardType={this.props.keyboardType}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    numberOfLines={this.props.numberOfLines}
                    onKeyPress={this.props.onKeyPress}
                    onScroll={this.props.onScroll}
                    maxLength={this.props.maxLength}
                    multiline={this.props.multiline}
                >
                </TextInput>
            </View>
        );
    }
}