import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {Image,ScrollView,TouchableOpacity, TextInput, Platform,StyleSheet} from 'react-native';
import { TINT_COLOR,IconColor, PointPink, BG_COLOR } from '../../components/Color';
import { Ionicons} from "@expo/vector-icons";
import Stars from 'react-native-stars';
import {Icon} from 'native-base';



const Text = styled.Text`
  font-size:7px;
`;
const View = styled.View`
  background-color : ${BG_COLOR}
  flex: 1;
`;

const TextBox = styled.Text`
  margin-left : 20px;
  font-Size : 20px;
  color: #FE642E;
  margin-bottom : 5px;
`;

const storeTextBox = styled.Text`
  margin-left : 20px;
  font-Size : 10px;
  color: #FE642E;
  margin-bottom : 5px;
`;


const TextCon = styled.View`
  flex:2;
`;

const ImageBox = styled.View`
  flex:1;
`;

const styles = StyleSheet.create({
  myStarStyle: {
    color: '#FACC2E',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    //textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
});

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

export default ({navigation}) => {
  const [loading, setIsLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const storeName = navigation.getParam("name");
  const storeAdr = navigation.getParam("formatted_address");


  return(
    <View>
        <Container>
          <ImageBox>
          <Image
            source={{ uri: photo.uri }}
            style={{ 
              height: 100, 
              width: 100, 
              marginRight: 30,
              }}
          />
          </ImageBox>
          <TextCon>
            <TextInput
              placeholder="글쓰기..."/>
            </TextCon>
          </Container>
          <Container>
            <ImageBox>
              <TextBox>음식점</TextBox>
            </ImageBox>
            <ImageBox>
              <Text>{storeName}</Text>
              <Text>{storeAdr}</Text>
            </ImageBox>
              <TextCon alignItems="flex-end">
                <Ionicons
                color={IconColor}
                size={25}
                name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"}
              />
              </TextCon>
          </Container>
          <Container>
            <ImageBox>
              <TextBox>별점</TextBox>
            </ImageBox>
            <TextCon alignItems="flex-end">
                <Stars
                    default={4}
                    count={5}
                    half={true}
                    starSize={5}
                    fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                    emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                    halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                  />
            </TextCon>
          </Container>
          <Container>
          <TextBox>More Information</TextBox>
          </Container>
          
    </View>
  );
}