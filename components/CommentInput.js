import React from "react";
import { Image, Platform, StyleSheet,TextInput } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const CommentInput = ({
  placeholder,
  autoFocus,
  value,
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true
  })=>{
    
    console.log(value);
    return (
      <TextInput 
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          autoCorrect={autoCorrect}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChange}
          returnKeyType={returnKeyType}
          keyboardType = "default"
          autoCapitalize='none'/>
        )
    }


CommentInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
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
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool.isRequired
};

export default CommentInput;