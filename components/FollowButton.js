import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
  } from 'react-native';
import mainPink from "./Color"
  
  export default class CustomButton extends Component{
    constructor(props){
      super(props);
    }
  
    render(){
      return (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.title}>Follow</Text>
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: mainPink,
    },
    title: {
      fontSize: 15,
    },
  });