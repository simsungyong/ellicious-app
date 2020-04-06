import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert, Modal, TouchableOpacity, View } from "react-native";
import AuthButton from "../../components/AuthConfirmButton";
import PNButton from "../../components/PNConfirmButton";
import AuthInput from "../../components/AuthInput";
import AuthInputPN from "../../components/AuthInputPN";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import {ID_CHECK, REQUEST_SECRET } from "./AuthQueries";
import { BG_COLOR, Grey, mainPink } from '../../components/Color';

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


const ViewO = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex : 2;
 
`;
const InfoCon = styled.View`
justify-content: center;
align-items: center;
  flex : 3;
`;

const Text = styled.Text`
margin-left : 10px;
font-Size : 20px;
color: ${Grey};
`;



const ConfirmPN = styled.View`
flex-direction : row;
align-items: center;
justify-content: space-between;
`;

export default ({ navigation }) => {
  const phoneNumInput = useInput("");
  const confirmSecretInput = useInput("");
  const [checkPhone, setCheckPhone] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);

  const { data: userAccount } = useQuery(ID_CHECK, {
    variables: {
      cellPhone: phoneNumInput.value
    },
    skip: checkPhone
  });

  const [requestSecret] = useMutation(REQUEST_SECRET)

  const handleSecret = async () => {
    setLoading(true);
    const { value: phoneNum } = phoneNumInput;

    if (phoneNum === "" || phoneNum === undefined) {
      setLoading(false);
      return Alert.alert("전화번호를 입력해주세요");
    } else if (phoneNum.length !== 11) {
      setLoading(false);
      return Alert.alert("잘못된 형식입니다.");
    } else {
      try {
        setCheckPhone(true);

        if (userAccount) {
          if (!userAccount.checkAccount) {
            Alert.alert("해당번호로 계정을 찾을 수가 없습니다.")
          } else {
            const { data } = await requestSecret({variables: {phoneNum}})
            if(data) {
              setAuth(true)
              Alert.alert("인증번호 전송 완료")
              setSecretCode(data.requestSecret)
            }
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setCheckPhone(false);
        setLoading(false);
      }
    }
  };


  const handleSubmit = async() => {
    if (!auth) {
      return Alert.alert("회원 인증 절차를 해주시기 바랍니다.")
    }else if (phoneNumInput.value === "" || phoneNumInput.value === undefined) {
      return Alert.alert("전화번호를 입력하세요");
    } else if (confirmSecretInput.value === "" || confirmSecretInput.value === undefined) {
      return Alert.alert("인증번호를 입력하세요");
    } else {
      if(confirmSecretInput.value === secretCode) {
        setbottomModalAndTitle(true)
      } else {
        return Alert.alert("인증번호가 다릅니다")
      }
    }
  }






  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TitleCon>
          <Title>비밀번호 찾기</Title>
        </TitleCon>

        <InfoCon>

          <ConfirmPN>
            <AuthInputPN
              {...phoneNumInput}
              autoCapitalize="words"
              label="전화번호"

            />
            <PNButton loading={loading} onPress={handleSecret} text="인증번호 받기" />
          </ConfirmPN>

          <AuthInput
            {...confirmSecretInput}
            autoCapitalize="words"
            label="인증번호 입력"
          />

        </InfoCon>

        <ViewO>
          <AuthButton loading={loading} text="확 인" onPress={handleSubmit} />
        </ViewO>

        <Modal
          visible={bottomModalAndTitle}
        >
          <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.50)'
                }}
            >
                <View style={{
                    width: 300,
                    height: 150,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    
                }}>

                   
                    <Text
                        style={{ fontSize: 16, alignSelf: 'center', marginTop: 40, flex: 7, alignItems:'center', justifyContent: 'center'}}
                    >
                        {"비밀번호를 재설정 하시겠습니까?"}
                    </Text>
                    <View
                        style={{
                            alignSelf: 'baseline',
                            backgroundColor: mainPink,
                            width: 300,
                            flex: 4,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => {navigation.navigate("ResetPassword", {phoneNum: phoneNumInput.value}); setbottomModalAndTitle(false)}}>
                                <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setbottomModalAndTitle(false)}>
                            <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </Modal>



        
      </Container>
    </TouchableWithoutFeedback>
  );
};



