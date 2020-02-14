import React, { useState }  from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import AuthButton from "../../components/AuthConfirmButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_ACCOUNT, ID_CHECK, CHECK_USERNAME } from "./AuthQueries";
import { TINT_COLOR, PointPink, BG_COLOR, Grey } from '../../components/Color'
import firebase from 'firebase';

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
const Text = styled.Text`
margin-left : 10px;
font-Size : 17px;
color: ${Grey};

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
  
  const cellPhoneInput = useInput("");
  // const [checkPhone, setCheckPhone] = useState(false);
  const fName = navigation.getParam("fName");
  const lName = navigation.getParam("lName");

  
  const handleSubmit=()=>{
    if (cellPhoneInput.value === "" || cellPhoneInput.value ===undefined) {
      Alert.alert("번호써라ㅡㅡ");
    }else{
      navigation.navigate("SignUpID", {fName,lName, phoneNum: cellPhoneInput.value});
    }
   
  }

  
  
  const confirmPhone = async () => {
    if(cellPhoneInput.value=="") {
      return Alert.alert("핸드폰 번호를 입력하세요");
    } else if(cellPhoneInput.value.length !== 11) {
      return Alert.alert("잘못된 형식입니다.");
    } else {
      try {
        setCheckPhone(true);
        if(userAccount) {
          if(!userAccount.checkAccount) {
            setConfirmAccount(true)
          } else {
            return Alert.alert("이미 존재하는 핸드폰 번호입니다.");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setCheckPhone(false)
      }
    }
  }

  

 


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <Container>
        <TitleCon>
          <Title>회원가입</Title>
        </TitleCon>
        <SubTitleCon>
          <SubTitle>휴대폰 번호를 입력해 주세요.</SubTitle>
          <Text>본인 인증을 위해 필요합니다.</Text>
        </SubTitleCon>
        
        <InfoCon>
          <AuthInput
              {...cellPhoneInput}
              placeholder="cellphone number"
              returnKeyType="send"
              autoCorrect={false}
              keyboardType="number-pad"
              label = "CellPhone"
            />
            
        </InfoCon>
        <View>
          <AuthButton onPress={handleSubmit} text="확 인" />
        </View>

      </Container>
    </TouchableWithoutFeedback>
  );
};

/* 
          

*/