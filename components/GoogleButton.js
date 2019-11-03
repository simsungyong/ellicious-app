import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import { Google, TINT_COLOR } from './Color'

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${Google};
  padding: 10px;
  margin: 0px;
  border-radius: 4px;
  width: ${constants.width / 3};
  margin-top : 30px;
`;

const Text = styled.Text`
  color: ${TINT_COLOR};
  text-align: center;
  font-weight: 600;
`;

const GoogleButton = ({ text, onPress, loading = false }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>} 
    </Container>
  </Touchable>
);

GoogleButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default GoogleButton;