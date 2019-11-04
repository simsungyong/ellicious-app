import React, { Component } from "react";
import { View, StatusBar, Text, Animated } from 'react-native';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import {PointPink, TINT_COLOR} from './Color'

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };
  
  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, value, ...props } = this.props;
    console.log(value);
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
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
          {...props}
          style={{ height: 26, fontSize: 20, color: TINT_COLOR, borderBottomWidth: 1, borderBottomColor: PointPink }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
        
      </View>
    );
  }
}



class AuthInputClass extends Component {
  state = {
    value: '',
  };

  handleTextChange = (newText) => this.setState({ value: newText });
  
  render() {
    const {label} = this.props;
    return (
      <View style={{ flex: 1, padding: 30 }}>
        <StatusBar hidden />
        <FloatingLabelInput
          label={label}
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}

const Container = styled.View`
  margin-bottom: 10px;
`;


const AuthInput = ({
    value,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType = "done",
    onChange,
    label,
    onSubmitEditing = () => null,
    autoCorrect = true
  }) => (
    
    <Container>
      <AuthInputClass
        onChangeText={onChange}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
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
