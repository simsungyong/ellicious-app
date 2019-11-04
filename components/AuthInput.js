import React, { useState, useEffect } from "react";
import { View, StatusBar, TextInput, Animated } from 'react-native';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import {PointPink, TINT_COLOR} from './Color'

const FloatingLabelInput = ({label, onChangeText,value})=>{
  
  const [focus, setFocus] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  console.log(label);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus( false );

  useEffect( ()=>{
    Animated.timing(animation, {
      toValue: (focus|| value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  },[focus]);

  const labelStyle = {
      position: 'absolute',
      left: 0,
      top: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', PointPink],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </ Animated.Text>
        <TextInput
          onChangeText={onChangeText}
          style={{ height: 26,width: constants.width/1.5, fontSize: 20, color: TINT_COLOR, borderBottomWidth: 1, borderBottomColor: PointPink }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          autoCapitalize='none'
          label={label}
          value={value}
        />
        
      </View>
    );
  
}

const AuthInputClass =({value,label,onChangeText}) => {
  
    return (
      <View style={{padding: 8 }}> 
        <StatusBar hidden />
        <FloatingLabelInput
          label={label}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
//padding으로 입력창 사이 간격 조절

const Container = styled.View`
`;

const AuthInput = ({
    value,
    //placeholder,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType = "done",
    onChange,
    label=null,
    onSubmitEditing = () => null,
    autoCorrect = true
  }) => (
    
    <Container>
      <AuthInputClass
        onChangeText={onChange}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
       // placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        value={value}
        label={label}
      />
    </Container>
  );

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default AuthInput;