import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import FacebookButton from "../../components/FacebookButton";
import GoogleButton from "../../components/GoogleButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import {BG_COLOR, PointPink, TINT_COLOR} from "../../components/Color"
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  justify-content: center;
  flex: 1;
  background-color : ${BG_COLOR}
  padding: 10px;
`;

const TitleCon = styled.View`
  justify-content: center;
  align-items: center;
  flex : 4;
`;

const Title = styled.Text `
    font-Family: "elli";
    font-Size : 60px;
    justifyContent: space-around;
    color: ${PointPink};
`;

const InfoCon = styled.View`
  justify-content: center;
  align-items: center;
  flex : 2;
`;

const Middle = styled.View`
flex : 1;
`;

const LoginButtonCon = styled.View`
justify-content: center;
align-items: center;
flex : 2;
`;

const OtherLoginCon = styled.View`
  justify-content: center;
  flex-direction : row;
`;
const OtherCon = styled.View`
justify-content: center;
flex-direction : row;
`;
const Bottom = styled.View`
flex : 0.5;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${TINT_COLOR};
  margin-top: 20px;
  font-weight: 500;
  margin-left: 8px;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please write an email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("Account not found");
        navigation.navigate("Signup", { email: value });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
    <TitleCon>
        <Title>Ellicious</Title>
    </TitleCon>
    <InfoCon>
       <AuthInput
            {...emailInput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
          /> 
        <AuthInput
            {...emailInput}
            placeholder="Password"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
          />
    </InfoCon>
    <Middle/>
    <LoginButtonCon>
        <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
        <OtherLoginCon>
            <FacebookButton loading={loading} onPress={handleLogin} text="Facebook" />
            <GoogleButton loading={loading} onPress={handleLogin} text="Google" />
          </OtherLoginCon>
    </LoginButtonCon>
    <OtherCon>
        <Touchable onPress={() => navigation.navigate("Signup")}>
            <LoginLink>
                <LoginLinkText>SingUp</LoginLinkText>
            </LoginLink>
        </Touchable>
        <Touchable onPress={() => navigation.navigate("Signup")}>
            <LoginLink>
                <LoginLinkText>ID&Password 찾기</LoginLinkText> 
            </LoginLink>
        </Touchable>
    </OtherCon>
    <Bottom/>
</Container>
    </TouchableWithoutFeedback>
  );
};