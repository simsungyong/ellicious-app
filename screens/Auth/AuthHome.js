import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import {mainPink, BG_COLOR } from "../../components/Color";

const Container = styled.View`
  justify-content: center;
  flex: 1;
  background-color : ${mainPink}
  padding : 10px;
`;
const Top = styled.View`
  flex: 1;
  background-color : ${mainPink}
`;

const TitleCon = styled.View`
  flex: 6;
  background-color : ${mainPink}
`;

const Subtitle = styled.Text `
  font-Family: "elli";
  font-Size : 27px;
  color: ${BG_COLOR};
  margin-left:3px;
`;

const Title = styled.Text `
  font-Family: "elli";
  font-Size : 65px;
  color: ${BG_COLOR};
`;
const Middle = styled.View`
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 2;
  background-color : ${mainPink}
`;

const Text = styled.Text`
  color: ${BG_COLOR}};
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
  color: ${BG_COLOR}};
  margin-top: 20px;
  font-weight: 800;
`;

export default ({ navigation }) => {
  
  const [loading, setLoading] = useState(false);


  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
      <Top/>
      <TitleCon>
        <Title>Ellicious</Title>
        <Subtitle>맛있는 일상의 시작</Subtitle>
      </TitleCon>
      <Middle/>
      

      <ButtonContainer>
        <AuthButton loading={loading} onPress={() => navigation.navigate("SignUpName")} text="회원가입하기" />
        
       <SignUpCon>
        <Text>이미 회원이신가요?</Text>
          <Touchable onPress={()=>navigation.navigate("Login")}>
              <LoginLink>
                <LoginLinkText>Login</LoginLinkText>
              </LoginLink>
          </Touchable>
        </SignUpCon>
      </ButtonContainer>
      
    </Container>
    </TouchableWithoutFeedback>

  )
  
};