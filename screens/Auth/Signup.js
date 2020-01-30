import React, { useState }  from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_ACCOUNT, ID_CHECK } from "./AuthQueries";
import { TINT_COLOR, PointPink, BG_COLOR } from '../../components/Color'

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
  const idInput = useInput("");
  const usernameInput = useInput("");
  const cellPhoneInput = useInput("");
  const passwordInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      id: idInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      cellPhone: cellPhoneInput.value
    }
  });

  const { data: userAccount } = useQuery(ID_CHECK, {
    variables: {
      account: idInput.value
    },
    skip: check
  });

  const confirmID = async () => {
    if(idInput.value=="") {
      return Alert.alert("아이디를 입력하세요");
    } else {
      try {
        setCheck(true);
        if(userAccount) {
          if(!userAccount.checkAccount) {
            setConfirmAccount(true)
          } else {
            return Alert.alert("이미 존재하는 아이디입니다.");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setCheck(false)
      }
    }
  }

  const handleSingup = async () => {
    const { value: id } = idInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: password } = passwordInput;
    const { value: username } = usernameInput;
    const { value: cellPhoneInput } = cellPhoneInput;
    if(!confirmAccount) {
      return Alert.alert("아이디를 확인하세요");
    }
    if (id === "") {
      return Alert.alert("I need id");
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
    if (cellPhoneInput === "") {
      return Alert.alert("Invalid cellphone number");
    }


    // try {
    //   setLoading(true);
    //   const {
    //     data: { createAccount }
    //   } = await createAccountMutation();
    //   if (createAccount) {
    //     Alert.alert("Account created", "Log in now!");
    //     navigation.navigate("AuthHome", { email });
    //   }
    // } catch (e) {
    //   console.log(e);
    //   Alert.alert("Username or email is already used", "Log in instead");
    //   navigation.navigate("AuthHome", { email });
    // } finally {
    //   setLoading(false);
    // }
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
          <View flexDirection="row">
            <AuthInput
              {...idInput}
              placeholder="ID"
              keyboardType="email-address"
              returnKeyType="send"
              autoCorrect={false}
              label = "ID"
            />
            {confirmAccount ? null : 
            (
              <TouchableOpacity onPress={() => confirmID()}>
              <Text>확인</Text>
              </TouchableOpacity>
            )}
            
          </View>
          <AuthInput
            {...passwordInput}
            placeholder="Password"
            keyboardType="email-address"
            returnKeyType="send"
            autoCorrect={false}
            label = "Password"
          />
          <AuthInput
            {...cellPhoneInput}
            placeholder="cellphone number"
            returnKeyType="send"
            autoCorrect={false}
            keyboardType="number-pad"
            label = "CellPhone"
          />
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
        <View/>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* 
          

*/