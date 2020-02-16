import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { PointPink, mainPink, TINT_COLOR } from "./Color";
import {ALARM} from "../screens/Alarm/Alarms";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`
  margin-left : 10px;
  margin-right : 8px;
  margin-top : 1px;
`;

const AlarmsLink = ({ navigation }) => {
  const {loading, data, refetch} = useQuery(ALARM)
  const [newAl, setNewAl] = useState(0);

  useEffect(() => {
    if(data) {
      setNewAl(data.getAlarm.filter(data => data.check == false).length)
    }
  }, [data]);

  return (
    <Container onPress={() => navigation.navigate("AlarmNavigation")}>
    <View>
      <MaterialCommunityIcons
        color={TINT_COLOR}
        size={24}
        name={"bell-ring-outline"}
      />
      <Text>{newAl}</Text>
    </View>
  </Container>
  )
};

export default withNavigation(AlarmsLink);