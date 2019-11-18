import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { PointPink, mainPink, TINT_COLOR } from "./Color";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`
  margin-left : 10px;
  margin-right : 8px;
  margin-top : 1px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("AlarmNavigation")}>
    <View>
      <MaterialCommunityIcons
        color={TINT_COLOR}
        size={24}
        name={"bell-ring-outline"}
      />
    </View>
  </Container>
));