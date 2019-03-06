import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePick from 'react-native-datepicker';

export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <DatePick
                    style={this.props.style}
                    date={this.state.date}
                    mode={this.props.mode}
                    placeholder={this.props.placeholder}
                    format={this.props.format}
                    showIcon={this.props.showIcon}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
            </View>
        )
    }
}

// style={styles.dates}
// date={this.state.date}
// mode="date"
// placeholder="select date"
// format="YYYY-MM-DD"
// showIcon={false}
// onDateChange={(date) => {this.setState({date: date})}}

const styles = StyleSheet.create({
    dates: {
        marginTop: 20,
        width: 300,
    },
    container: {
        alignItems: 'center'
    }
})