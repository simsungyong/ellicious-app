import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-left : 5px;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <Text>Alarms</Text>
  </View>
);