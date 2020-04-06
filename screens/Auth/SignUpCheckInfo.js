import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthConfirmButton";
import AuthInput from "../../components/AuthInput";
import { TINT_COLOR, BG_COLOR, Grey } from '../../components/Color'

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
  const fName = navigation.getParam("fName");
  const lName = navigation.getParam("lName");
  const phoneNum = navigation.getParam('phoneNum');
  const username = navigation.getParam('username')
  const handleSubmit=()=>{
   
      navigation.navigate("SignUpPW", {fName,lName,phoneNum,username})
    
  }
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <Container>
        <TitleCon>
          <Title>회원가입</Title>
        </TitleCon>
        <SubTitleCon>
          <SubTitle>정보를 확인해 주세요.</SubTitle>
        </SubTitleCon>
        
        <InfoCon>
          
          <AuthInput
            value={fName}
            autoCapitalize="words"
            label = "First Name (ex 길동)"
            editable={false}
          />
          <AuthInput
            value={lName}
            autoCapitalize="words"
            label = "Last Name (ex 홍)"
            editable={false}
                      />

            <AuthInput
              value={phoneNum}
              returnKeyType="send"
              autoCorrect={false}
              keyboardType="number-pad"
              label = "CellPhone"
              editable={false}
                          />
            <AuthInput
            value={username}
            autoCapitalize="words"
            label = "UserName (ex GD_HONG)"
            editable={false}
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