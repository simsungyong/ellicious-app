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
`; /* 로고 이미지 크기 비율 설정 */

const Text = styled.Text`
  color: ${TINT_COLOR};
  margin-top: 20px;
  font-weight: 600;
  margin-right : 10px;
`;

const Touchable = styled.TouchableOpacity``;

const SignUpCon = styled.View`
  flex-direction : row;
`;

const LoginLink = styled.View`
`;

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
      <Image 
        style={{height:'100%',width:'100%',resizeMode:'contain'}}
        source={{uri:'https://user-images.githubusercontent.com/52433798/68116995-87ed2900-ff3f-11e9-8b01-3cbb7dacea60.png'}}
      />
    </TitleCon>
    <Middle/>
    <ButtonContainer>
      <AuthButton
        text={"Login"}
        onPress={() => navigation.navigate("Login")}
      />
      <SignUpCon>
       <Text>계정이 없으신가요?</Text>
        <Touchable onPress={() => navigation.navigate("Signup")}>
            <LoginLink>
              <LoginLinkText>회원가입</LoginLinkText>
            </LoginLink>
        </Touchable>
      </SignUpCon>
    </ButtonContainer>
    <Bottom/>
  </Container>
);