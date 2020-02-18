import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import AuthButton from "../../components/AuthConfirmButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_ACCOUNT, ID_CHECK, CHECK_USERNAME } from "./AuthQueries";
import { TINT_COLOR, PointPink, BG_COLOR, Grey } from '../../components/Color'
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton } from 'react-native-modals';

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
  const [checkPhone, setCheckPhone] = useState(false);
  const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
  const fName = navigation.getParam("fName");
  const lName = navigation.getParam("lName");

  const { data: userAccount } = useQuery(ID_CHECK, {
    variables: {
      cellPhone: cellPhoneInput.value
    },
    skip: checkPhone
  });


  const handleSubmit = async () => {
    if (cellPhoneInput.value == "" || cellPhoneInput.value === undefined) {
      return Alert.alert("핸드폰 번호를 입력하세요");
    } else if (cellPhoneInput.value.length !== 11) {
      return Alert.alert("잘못된 형식입니다.");
    } else {
      try {
        setCheckPhone(true);
        if (userAccount) {
          if (!userAccount.checkAccount) {
            navigation.navigate("SignUpID", { fName, lName, phoneNum: cellPhoneInput.value });
          } else {
            setbottomModalAndTitle(true)
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
            label="CellPhone"
          />

        </InfoCon>
        <View>
          <AuthButton onPress={handleSubmit} text="확 인" />
        </View>

        <Modal.BottomModal
          visible={bottomModalAndTitle}
          onTouchOutside={() => setbottomModalAndTitle(false)}
          height={0.25}
          width={0.8}
          onSwipeOut={() => setbottomModalAndTitle(false)}
        >
          <ModalContent>
            <Text>이미 존재하는 핸드폰 번호입니다.</Text>
            <Text>비밀번호를 찾으러 이동하시겠습니까?</Text>
          </ModalContent>
          <ModalFooter>
            <ModalButton
              text="OK"
              onPress={() => {navigation.navigate("FindPW"); setbottomModalAndTitle(false) }}
            />
            <ModalButton
              text="CANCEL"
              onPress={() => setbottomModalAndTitle(false)}
            />
          </ModalFooter>
        </Modal.BottomModal>

      </Container>
    </TouchableWithoutFeedback>
  );
};