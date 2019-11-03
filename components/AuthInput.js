import React, { Component } from "react";
import { View, StatusBar, TextInput, Text } from 'react-native';
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import {PointPink, TINT_COLOR} from './Color'

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#aaa' : PointPink,
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Text style={labelStyle}>
          {label}
        </Text>
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


const Container = styled.View`
  margin-bottom: 10px;
`;



class AuthInputClass extends Component {
  state = {
    value: '',
  };

  handleTextChange = (newText) => this.setState({ value: newText });

  render() {
    return (
      <View style={{ flex: 1, padding: 30 }}>
        <StatusBar hidden />
        <FloatingLabelInput
          label="Email"
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}

const AuthInput = ({
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType = "done",
    onChange,
    onSubmitEditing = () => null,
    autoCorrect = true
  }) => (
    <Container>
      <AuthInputClass
        onChangeText={onChange}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        value={value}
      />
    </Container>
  );

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
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