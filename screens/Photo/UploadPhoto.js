import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {Text,Image,ScrollView,TouchableOpacity, TextInput, Platform,StyleSheet} from 'react-native';
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line } from '../../components/Color';
import {FontAwesome} from "@expo/vector-icons";
import Stars from 'react-native-stars';
import {Icon} from 'native-base';
import Hr from "hr-native";

/*
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
  background-color : pink;
  margin-bottom : 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
*/

const Container = styled.View`
  flex : 1;
  padding : 10px;
`;

const Top = styled.View`
  flex-direction: row;
  margin-bottom : 10px;
`;

const ImageBox = styled.View`
margin-left : 3px;
`;
const TextCon = styled.View``;

const SubTitleCon = styled.View`
  padding : 5px;
  justifyContent: center;
`;
const SubTitle = styled.Text`
  font-size : 25px
  margin-right : 10px
  color : ${PointPink}
  font-weight : 200
  ;
`;

const View = styled.View`
  flex-direction: row;
`;
const Restaurant = styled.View`
  alignItems: flex-end;
  justifyContent: center;
  margin-right : 5px
  flex : 1
`;
const RestaurantCon = styled.View`
  flex : 1
  flex-direction: row;
`;
const RatingCon = styled.View`
flex : 1
flex-direction: row;
`;
const Rating = styled.View`
  alignItems: flex-end;
  justifyContent: center;
  flex : 1

`;
const SubTitleConMI = styled.View`
  padding : 5px;
  justifyContent: center;
`;
const MoreInfoCon = styled.View`
  flex : 6;
`;
const StoreName = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 20px;
`;

export default ({navigation}) => {
  const [loading, setIsLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const storeName = navigation.getParam("name");
  const storeAdr = navigation.getParam("formatted_address");


  return(
    <Container>
      <Top>
        <ImageBox>
          <Image
            source={{ uri: photo.uri }}
            style={{ 
              height: 100, 
              width: 100, 
              marginRight: 20,
              borderRadius:20
            }}
          />
        </ImageBox>

        <TextCon>
          <TextInput
            placeholder="글쓰기..."/>
        </TextCon>
      </Top> 

      <Hr lineStyle={{ backgroundColor : Line}} />

      <RestaurantCon>
        <SubTitleCon>
          <SubTitle> 음식점 </SubTitle>
        </SubTitleCon>
        <Restaurant>
          <StoreName>{storeName}</StoreName>
        </Restaurant>
      </RestaurantCon>

      <Hr lineStyle={{ backgroundColor : Line}} />

      <RatingCon>
        <SubTitleCon>
          <SubTitle> 별 점 </SubTitle>
        </SubTitleCon>
        <Rating>
          <FontAwesome
            color={StarColor}
            size={28}
            name={"star"}
          />
        </Rating> 
      </RatingCon>   

      <Hr lineStyle={{ backgroundColor : Line}} />

      <MoreInfoCon>
        <SubTitleConMI>
          <SubTitle> More Information </SubTitle>
        </SubTitleConMI>
        <TextInput
            placeholder="@직원 친절도"
            style = {marginLeft=30} />
      </MoreInfoCon>
    </Container>
  );
}