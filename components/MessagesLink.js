import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import {AntDesign} from "@expo/vector-icons"
import { PointPink, mainPink } from "./Color";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`
  margin-right : 10px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <View>
      <AntDesign
        color={mainPink}
        size={22}
        name={"message1"}
      />
    </View>
  </Container>
));