import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import {mainPink, TINT_COLOR, PointPink, BG_COLOR } from "../../components/Color";

const Container = styled.View`
  justify-content: center;
  flex: 1;
  background-color : ${BG_COLOR}
  padding : 10px;
`;
const Top = styled.View`
  flex: 2;
`;

const TitleCon = styled.View`
  flex: 3;
`;

const Subtitle = styled.Text `
  font-Family: "elli";
  font-Size : 40px;
  color: #646464;
  flexDirection: row;
  margin-left: 35px;
  align-items: flex-start;
`;

const Title = styled.Text `
  font-Family: "elli";
  font-Size : 80px;
  color: ${PointPink};
`;
const Middle = styled.View`
  flex: 3;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 2;
`;
const View = styled.View`
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  margin-left : 30px;
`; /* 로고 이미지 크기 비율 설정 */

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${TINT_COLOR};
  margin-top: 20px;
  font-weight: 600;
`;

const Bottom =styled.View`
  flex: 1;
  background-color : ${BG_COLOR}
`;

export default ({ navigation }) => (
  <Container>
    <Top/>
    <TitleCon>
      <Subtitle>It's so</Subtitle>
      <View>
        <Title>Ellicious</Title>
      </View>
    </TitleCon>
    <Middle/>
    <ButtonContainer>
      <AuthButton
        text={"Login"}
        onPress={() => navigation.navigate("Login")}
      />
      <Touchable onPress={() => navigation.navigate("Signup")}>
        <LoginLink>
          <LoginLinkText>Create New Account</LoginLinkText>
        </LoginLink>
      </Touchable>
    </ButtonContainer>
    <Bottom/>
  </Container>
);