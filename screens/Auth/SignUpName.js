import React, { useState }  from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert,StyleSheet, TouchableOpacity } from "react-native";
import AuthButton from "../../components/AuthConfirmButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_ACCOUNT, ID_CHECK, CHECK_USERNAME,CONFIRM_SECRET} from "./AuthQueries";
import { TINT_COLOR, PointPink, BG_COLOR } from '../../components/Color'
import firebase from 'firebase';
import { useLogIn } from "../../AuthContext";


const Container = styled.View`
  flex: 1;
  background-color : ${BG_COLOR}
`;
const TitleCon = styled.View`
flex : 1;
justifyContent: center;
alignItems: center;
`;
const Title = styled.Text`
fontSize : 30px;
`;

const SubTitleCon = styled.View`
flex : 1
justifyContent: center;
alignItems: flex-start;
margin-left : 5px;
`;
const SubTitle = styled.Text`
margin-left : 10px;
font-Size : 28px;
color: ${TINT_COLOR};
font-weight : 800;
`;

const View = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex : 2;
 
`;

const InfoCon = styled.View`
  justify-content: center;
  align-items: center;
  flex : 3;

`;


export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const logIn = useLogIn();
  

  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      password: fNameInput.value,
      // email: emailInput.value
      cellPhone: lNameInput.value
    }
  });
  
  const handleLogin = async () => {
    // const { value: email } = emailInput;
    // const { value: password } = passwordInput;
    // const { value: id } = idInput;

    // const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (email === "") {
    //   return Alert.alert("Email can't be empty");
    // } else if (!email.includes("@") || !email.includes(".")) {
    //   return Alert.alert("Please write an email");
    // } else if (!emailRegex.test(email)) {
    //   return Alert.alert("That email is invalid");
    // }
    
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

 
  const handleSubmit=()=>{
    if (fNameInput.value === "" || fNameInput.value===undefined) {
      return Alert.alert("이름을 입력하세요");
    }
    else if (lNameInput.value === "" ||lNameInput.value === undefined) {
      return Alert.alert("성을 입력하세요");
    }else{
      navigation.navigate("SignUpPhone",{fName: fNameInput.value, lName: lNameInput.value})
    }
  }
 
    

  


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <Container>
        <TitleCon>
          <Title>회원가입</Title>
        </TitleCon>
        <SubTitleCon>
          <SubTitle>이름을 입력해 주세요.</SubTitle>
        </SubTitleCon>
        
        <InfoCon>
          
          
          <AuthInput
            {...fNameInput}
            /*placeholder="First name"*/
            autoCapitalize="words"
            label = "First Name (ex 길동)"
          />
          <AuthInput
            {...lNameInput}
            placeholder="Last name"
            autoCapitalize="words"
            label = "Last Name (ex 홍)"
          />
        </InfoCon>
        <View>
          <AuthButton loading = {loading} onPress={handleLogin} text="확 인" />
        </View>

      </Container>
    </TouchableWithoutFeedback>
  );
};

