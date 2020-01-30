import React, { useState } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET } from "./AuthQueries";
import { Alert } from "react-native";
import {mainPink, TINT_COLOR, PointPink, BG_COLOR } from "../../components/Color";
import { SocialIcon } from 'react-native-elements';
import useInput from "../../hooks/useInput";
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';
import { useLogIn } from "../../AuthContext";


const Container = styled.View`
  justify-content: center;
  flex: 1;
  background-color : ${BG_COLOR}
  padding : 10px;
`;
const Top = styled.View`
  flex: 1;
`;

const TitleCon = styled.View`
  flex: 2;
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
`;

const InfoCon = styled.View`
  flex : 2;
  justify-content: center;
  align-items: center;
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
const LoginButtonCon = styled.View`
justify-content: center;
align-items: center;
flex : 2;
`;

const OtherLoginCon = styled.View`
  flex-direction : row;
  margin-top : 10px;
`;
const Bottom =styled.View`
  flex: 1;
  background-color : ${BG_COLOR}
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const passwordInput = useInput("")
  const usernameInput = useInput("");
  const logIn = useLogIn();

  const [loading, setLoading] = useState(false);

  // const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
  //   variables: {
  //     username: usernameInput.value,
  //     email: emailInput.value,
  //     firstName: fNameInput.value,
  //     lastName: lNameInput.value
  //   }
  // });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      password: passwordInput.value,
      email: emailInput.value
    }
  });

  // const [requestSecretMutation] = useMutation(LOG_IN, {
  //   variables: {
  //     email: emailInput.value
  //   }
  // });


  const handleLogin = async () => {
    const { value: email } = emailInput;
    const { value: password } = passwordInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
      return Alert.alert("Email can't be empty");
    } else if (!email.includes("@") || !email.includes(".")) {
      return Alert.alert("Please write an email");
    } else if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    
    try {
      setLoading(true);
      // const {
      //   data: { requestSecret }
      // } = await requestSecretMutation();

      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();


      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("계정 또는 비밀번호를 확인해주세요");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1849127108565501",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        const { email, first_name, last_name } = await response.json();
        console.log(email)
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: "884516426746-mt2la4o92f6u7fgvr5opglt0conrebjl.apps.googleusercontent.com",
        androidClientId: "884516426746-360kefsq27dgm0au8i1d52ff9bobgrkd.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        console.log(email)
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
    <Top/>
    <TitleCon>
      <Image 
        style={{height:'100%',width:'100%',resizeMode:'contain'}}
        source={{uri:'https://user-images.githubusercontent.com/52433798/68202438-17114400-0007-11ea-9e3c-31ef780daeef.png'}}
      />
    </TitleCon>
    <Middle/>
    <ButtonContainer>
      <AuthInput
        {...emailInput}
        autoCapitalize="words"
        label = "email"
      />
      <AuthInput
        {...passwordInput}
        autoCapitalize="words"
        label = "password"
      />
      <AuthButton loading={loading} onPress={handleLogin} text="Login" />

        <LoginButtonCon>
            <OtherLoginCon>
              <SocialIcon type="facebook" onPress={fbLogin} />
              <SocialIcon type="google" onPress={googleLogin} />
            </OtherLoginCon>
        </LoginButtonCon>

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
  )
  
};