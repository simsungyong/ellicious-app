import React, { useState } from "react";
import { StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { mainPink, TINT_COLOR, LightGrey } from "./Color";
import { useLogOut } from "../AuthContext";

const Container = styled.TouchableOpacity``;
const Text = styled.Text`
    
`;
const ViewO = styled.View`
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
                <ViewO>
                    <BG style={styles.CircleShapeView}>
                        <MaterialCommunityIcons
                            color={TINT_COLOR}
                            size={24}
                            name={"logout"}
                        />
                    </BG>
                </ViewO>
            </Container>
            
            <Modal
            visible={isModalPick}
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
                            {"로그아웃 하시겠습니까?"}
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
                                onPress={() => {logout()}}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => setIsModalPick(false)}>
                                <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
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