import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { Facebook, TINT_COLOR } from './Color'

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${Facebook};
  padding: 10px;
  margin: 0px 2px;
  border-radius: 4px;
  width: ${constants.width / 3};
  margin-top : 30px;
`;

const Text = styled.Text`
  color: ${TINT_COLOR};
  text-align: center;
  font-weight: 600;
`;

const FacebookButton = ({ text, onPress, loading = false }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>} 
    </Container>
  </Touchable>
);

FacebookButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default FacebookButton;