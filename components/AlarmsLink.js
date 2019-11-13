import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { PointPink, mainPink } from "./Color";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`
  margin-left : 10px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("AlarmNavigation")}>
    <View>
      <MaterialCommunityIcons
        color={mainPink}
        size={23}
        name={"bell-ring-outline"}
      />
    </View>
  </Container>
));