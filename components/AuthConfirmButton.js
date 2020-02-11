import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { BG_COLOR, mainPink, mainBlue, TINT_COLOR } from './Color'

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${mainPink} ;
  padding: 14px;
  margin: 0px 50px;
  width: ${constants.width};
  margin-top : 30px;
`;

const Text = styled.Text`
  color: ${BG_COLOR};
  text-align: center;
  font-weight: 600;
  font-size : 27
`;

const AuthButton = ({ text, onPress, loading = false }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>} 
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;