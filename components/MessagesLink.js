import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import {AntDesign} from "@expo/vector-icons"
import { PointPink, mainPink, TINT_COLOR } from "./Color";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`

`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <View>
      <AntDesign
        color={TINT_COLOR}
        size={22}
        name={"message1"}
      />
    </View>
  </Container>
));