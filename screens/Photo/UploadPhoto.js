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
  const photo = navigation.getParam("photo");
  const handleSelected = () => {
    navigation.navigate("Map");
  };
  return(
    <View>
        <Container>
          <Image
            source={{ uri: photo.uri }}
            style={{ height: 80, width: 80, marginRight: 30 }}
          />
          </Container>
          <Button onPress={handleSelected}>
              <Text>go amp</Text>
          </Button>
    </View>
  );
}