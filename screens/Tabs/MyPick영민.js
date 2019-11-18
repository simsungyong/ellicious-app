import React from "react";
import { Image, ScrollView, ScrollViewComponent} from "react-native";
import styled from "styled-components";
import Hr from "hr-native";
import { Line, StarColor, TINT_COLOR, LightGrey } from "../../components/Color";
import { FontAwesome } from "@expo/vector-icons";


const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.View`
flex : 1;
`;
const Text = styled.Text``;
const Map = styled.View`
  justify-content: center;
  align-items: center;
  flex:6;
  background-color : pink;
`;
const Info = styled.View`
  flex : 4;
  flex-direction : row;
`;
const CategoryCon = styled.View`
flex : 1
background-color : ${LightGrey}
`;
const PostCon = styled.View`
flex : 3;
padding : 3px;
`;
const Post = styled.View`
flex-direction : row;
`;

const StoreInfo = styled.View`
padding : 3px;
`;
const Rating = styled.Text``;
const StoreName=styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom : 3px;
  color : ${TINT_COLOR};
`;
const StoreLocation=styled.Text`
margin-bottom : 3px;
`;

export default () => (
  <Container>
    <Map>
      <Text>맛지도</Text>
    </Map>
    <Hr lineStyle={{ backgroundColor : Line }} />
    <Info>
      <CategoryCon>
        <ScrollView>
          <Text>카테고리 선택</Text>
        </ScrollView>
      </CategoryCon>
      <PostCon>
        <ScrollView>
        <Post>
        <Image 
            style={{height: 70, width: 70, borderRadius:'5%'}}
            source={{uri: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2145B44554E0A4AC0F"}}/>
        <StoreInfo>
          <StoreName>쪼매 매운 떡볶이</StoreName>
          <StoreLocation>공릉동 어딘가</StoreLocation>
          <Rating>
            <FontAwesome
                  color={StarColor}
                  size={15}
                  name={"star"}
                />
          </Rating>
        </StoreInfo>
        </Post>
        </ScrollView>
      </PostCon>
    </Info>
  </Container>
);