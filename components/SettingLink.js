import React, { useState } from "react";
import { Alert, StyleSheet, AsyncStorage } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PointPink, mainPink, TINT_COLOR, LightGrey } from "./Color";
import Modal, { ModalTitle, ModalContent, ModalFooter, ModalButton } from 'react-native-modals';
import { useLogOut } from "../AuthContext";

const Container = styled.TouchableOpacity``;
const Text = styled.Text`
    
`;
const View = styled.View`
  margin-left : 10px;
  margin-right : 8px;
  margin-top : 1px;
`;
const BG = styled.View`
justify-content: center;
align-items: center;
`;


const SettingLink = ({ navigation }) => {
    const [isModalPick, setIsModalPick] = useState(false);
    const logOut = useLogOut()
    const logout = async() => {
        setIsModalPick(false);
        await logOut();
    }

    return (
        <>
            <Container onPress={() => setIsModalPick(true)}>
                <View>
                    <BG style={styles.CircleShapeView}>
                        <MaterialCommunityIcons
                            color={TINT_COLOR}
                            size={24}
                            name={"logout"}
                        />
                    </BG>
                </View>
            </Container>
            <Modal
                visible={isModalPick}
                onTouchOutside={() => setIsModalPick(false)}
                width={0.8}
                onSwipeOut={() => setIsModalPick(false)}
            >
                <ModalContent>
                    <Text>로그아웃 하시겠습니까?</Text>
                </ModalContent>

                <ModalFooter>
                    <ModalButton onPress={() => logout()} text="확인" />

                    <ModalButton onPress={() => setIsModalPick(false)} text="취소" />

                </ModalFooter>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({

    CircleShapeView: {
        width: 38,
        height: 38,
        borderRadius: 34 / 2,
        backgroundColor: LightGrey
    },
    Text: {
        width: 16,
        height: 16,
        borderRadius: 7,
        backgroundColor: "#f53b3b",
        position: 'absolute',
    }

});

export default withNavigation(SettingLink);