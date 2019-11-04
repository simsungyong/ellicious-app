import React, { useState }  from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { TINT_COLOR, PointPink } from '../../components/Color'
import { SocialIcon } from 'react-native-elements';

const Container = styled.View`
  flex: 1;
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
  font-Size : 50px;
  color: ${TINT_COLOR};
  margin-bottom : 5px;
`;
const InfoCon = styled.View`
  justify-content: center;
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
        borderWidth: 0.5,
        borderColor: TINT_COLOR,
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
          <SocialIcon type="facebook" onPress={() => {alert('Facebook Login');}} />
          <SocialIcon type="google" onPress={() => {alert('Google Login');}} />
        </OtherSignUP>
        <View/>
      </Container>
    </TouchableWithoutFeedback>
  );
};