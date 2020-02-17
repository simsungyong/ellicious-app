import React, {Component} from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {mainPink} from "./Color";
import styled from "styled-components";

const Button = styled.View`
    alignItems: center;
    justifyContent: center;
    borderRadius: 5;
    background-color : #3897f0
    width : 70;
    height : 30;
`;

  export default class CustomButton extends Component{
    constructor(props){
      super(props);
    }

    render(){
      return (
        <TouchableOpacity>
            <Button>
                <Text>Following</Text>
            </Button>
        </TouchableOpacity>
      )
    }
  }
  
 