import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {Image,ScrollView,TouchableOpacity} from 'react-native';


const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;

export default ({navigation}) => {
  const [loading, setIsLoading] = useState(false);
  return(
    <View>
        <Text>Map</Text>
    </View>
  );
}