import React, { useState }  from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { TINT_COLOR, PointPink, BG_COLOR } from '../../components/Color'
import { SocialIcon } from 'react-native-elements';
import * as Facebook from "expo-facebook";

const Container = styled.View`
  flex: 1;
  background-color : ${BG_COLOR}
`;
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex : 1;
`;
const Title = styled.View`
  flex:1;
  
`;
const Text = styled.Text`
  margin-left : 20px;
  font-Size : 40px;
  color: ${TINT_COLOR};
  margin-bottom : 5px;
`;
const InfoCon = styled.View`
  justify-content: center;
  align-items: center;
  flex : 5;
`;

const OtherSignUP = styled.View`
  flex-direction : row;
  margin-top : 10px;
  justify-content: center;
  flex:1;
`;

const styles = StyleSheet.create({
  lineStyle:{
        borderWidth: 1,
        borderColor: '#919191',
        margin:10,
   }
 });

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });
  const handleSingup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need first name");
    }
    if (lName === "") {
      return Alert.alert("I need last name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username or email is already used", "Log in instead");
      navigation.navigate("Login", { email });
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
        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);
        const [username] = email.split("@");
        usernameInput.setValue(username);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <Container>
        <View/>
        <Title>
          <Text>회원가입</Text>
          <View style = {styles.lineStyle} />
        </Title>
        <InfoCon>
          <AuthInput
            {...fNameInput}
            /*placeholder="First name"*/
            autoCapitalize="words"
            label = "이름"
          />
          <AuthInput
            {...lNameInput}
            placeholder="Last name"
            autoCapitalize="words"
            label = "성"
          />
          <AuthInput
            {...emailInput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="send"
            autoCorrect={false}
            label = "Email"
          />
          <AuthInput
            {...usernameInput}
            placeholder="Username"
            returnKeyType="send"
            autoCorrect={false}
            label = "User Name"
          />
        </InfoCon>
        <View>
          <AuthButton loading={loading} onPress={handleSingup} text="회원가입" />
        </View>
        <OtherSignUP>
          <SocialIcon type="facebook" onPress={fbLogin} />
          <SocialIcon type="google" onPress={() => {alert('Google Login');}} />
        </OtherSignUP>
        <View/>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* 
          

*/