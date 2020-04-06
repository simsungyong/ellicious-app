import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { IconColor, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../../../components/Loader';
import useInput from '../../../hooks/useInput';
import { CATEGORYINFO_FRAGMENT, CATEGORY_FRAGMENT } from '../../../fragments';
import ProfileMapPresenter from '../../Tabs/Profile/ProfileMapPresenter';
import styled from "styled-components";
import { PointPink, mainBlue, mainPink, TINT_COLOR, LightGrey, Blue, Grey } from "../../../components/Color";
import User from "../../../User";

const seeCategory = gql`
  query seeCategory($userId: String){
    seeCategory(userId: $userId){
      ...CategoryParts
    }
  }
  ${CATEGORY_FRAGMENT}`
    ;

const Touchable = styled.TouchableOpacity`
    margin-bottom : 20px;
    margin-right : 10px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    subContainer: {
        marginTop: 10,
        marginRight: 10,
        alignItems: 'flex-end'
    }
})

const ModalContainer = styled.View`
  padding: 5px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
    
  padding : 5px;
`;


const region = {
    latitude: 37.6247855,
    longitude: 127.0773206,
    latitudeDelta: 0.057864195044303443,
    longitudeDelta: 0.0640142817690068,
};

const GET_CATEGORYINFO = gql`
  query seeCategory($userId: String){
    seeCategory(userId: $userId) {
      ...CategoryInfo
      }
    }
    ${CATEGORYINFO_FRAGMENT}
`;

const DELETE_CATEGORY = gql`
mutation editCategory($id: String!){
    editCategory(id: $id, action: DELETE){
        id
    }
}
    `

export const CREATE_CATEGORY = gql`
  mutation createCategory($categoryName:String!){
    createCategory(categoryName: $categoryName){
      id
    }
  }
`

const ProfileMapContainer = ({ navigation, userId, isSelf }) => {

    const [mapIdx, setIndex] = useState(0);
    const [confirm, setConform] = useState(false);
    const [isModal, setModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [delIdx, setDelIdx] = useState(0);
    const [addMoadl, setAddModal] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const categoryInput = useInput();
    const { loading, data, refetch } = useQuery(GET_CATEGORYINFO, {
        variables: { userId: userId }
    });
    const [createCategory] = useMutation(CREATE_CATEGORY, {
        refetchQueries: () => [{ query: GET_CATEGORYINFO, variables: { userId: userId } }, { query: seeCategory }]
    });

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        refetchQueries: () => [{ query: GET_CATEGORYINFO, variables: { userId: userId } }, { query: seeCategory }]
    });


    const handleIndex = async (index) => {
        await setModal(false)
        await setConform(true)
        await setIndex(index)
        await setConform(false)
    }

    const handleDelete = async (id) => {
        await setIsLoading(true);
        try {
            await deleteCategory({
                variables: {
                    id: id
                }
            });
        } catch (e) {
            console.log(e);
        } finally {
            await setIsLoading(false);
            await setDelModal(false);
            await setModal(true);
        }
    }


    const handleCreate = async () => {
        console.log(categoryInput.value)
        if (categoryInput.value === undefined) {

            Alert.alert("한 글자는 쓰지?");
        } else {
            await setIsLoading(true);
            try {
                await createCategory({
                    variables: {
                        categoryName: categoryInput.value
                    }
                });
            } catch (e) {
                console.log(e)
            } finally {
                await setIsLoading(false);
                await setAddModal(false);
                await setModal(true)
                categoryInput.setValue("")
            }
        }
    }

    const modal = (
        <Modal

            visible={isModal}
            transparent={true}
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
                    height: 250,
                    backgroundColor: 'white',
                    borderRadius: 20,
                }}>
                    <View
                        style={{
                            alignSelf: 'baseline',
                            backgroundColor: 'white',
                            width: 300,
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                    >
                        {
                            loading ? null : data.seeCategory.length > 0 ? (
                                <ScrollView height={200}>
                                    {data.seeCategory.map((category, index) => (
                                        <ModalContainer key={index}>
                                            <TouchableOpacity
                                                style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                                                onPress={() => handleIndex(index)}>
                                                <Text style={{ color: Blue, fontSize: 20 }}>{category.categoryName}</Text>
                                            </TouchableOpacity>
                                            {isSelf ? (<TouchableOpacity
                                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                                onPress={() => {
                                                    setDelIdx(index)
                                                    setModal(false)
                                                    setDelModal(true)
                                                }}>
                                                <Text style={{ color: Grey, fontSize: 15 }}>삭제</Text>
                                            </TouchableOpacity>) : null}
                                            
                                        </ModalContainer>
                                    ))}
                                </ScrollView>
                            ) : <ModalContainer justifyContent={'center'} height={200}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>등록된 맛지도가 없어요!</Text>
                                    </View>
                                </ModalContainer>

                        }
               
                        <View
                            style={{
                                alignSelf: 'baseline',
                                backgroundColor: mainPink,
                                width: 300,
                                height: 50,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                flexDirection: 'row'
                            }}
                        >   
                        {isSelf ? (<TouchableOpacity
                            style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => {
                                setModal(false)
                                setAddModal(true);
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 15 }}>카테고리 추가</Text>

                        </TouchableOpacity>) : null
                        }
                            

                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => setModal(false)}
                            >
                                <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </Modal>
    )

    const modalEdit = (
        <Modal
            visible={delModal}
            transparent={true}
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
                        style={{ fontSize: 13, marginLeft: 7, marginRight: 7,alignSelf: 'center', marginTop: 40, flex: 7, alignItems: 'center', justifyContent: 'center' }}
                    >
                        {"삭제하시면 카테고리에 포함 되어있던 포스트가 모두 사라집니다. 그래도 삭제하시겠습니까?"}
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
                            onPress={() =>
                                handleDelete(data.seeCategory[delIdx].id)
                            }>
                            {isloading ? <Loader /> : <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>}

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setDelModal(false)
                                setModal(true)
                            }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </Modal>
    )

    const modalAdd = (
        <Modal
            visible={addMoadl}
            transparent={true}
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
                    height: 100,
                    backgroundColor: 'white',
                    borderRadius: 20,

                }}>

                    <TextInput
                        style={{ fontSize: 15, alignSelf: 'center', flex: 2, alignItems: 'center', justifyContent: 'center', width: 200 }}
                        onChangeText={categoryInput.onChange}
                        placeholder={"새 카테고리 이름"}
                        placeholderTextColor={TINT_COLOR}
                    />

                    <View
                        style={{
                            alignSelf: 'baseline',
                            backgroundColor: mainPink,
                            width: 300,
                            flex: 1,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                            onPress={handleCreate}>
                            {isloading ? <Loader /> : <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>}

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setAddModal(false)
                                setModal(true)
                            }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </Modal>
    )





    return (
        <View style={styles.container}>
            {loading ? <Loader /> : (
                <>
                    {confirm ? <Loader /> : (
                        <>
                            <ProfileMapPresenter marker={data.seeCategory[mapIdx] ? data.seeCategory[mapIdx] : null} region={region} navigation={navigation} />
                            <View style={styles.subContainer}>
                                <Touchable onPress={() => setModal(true)}>
                                    <MaterialCommunityIcons
                                        color={IconColor}
                                        size={25}
                                        name={"dots-horizontal"}
                                    />
                                </Touchable>
                                {modal}
                                {modalEdit}
                                {modalAdd}
                            </View>
                        </>
                    )}
                </>
            )}
        </View>
    )
}
export default ProfileMapContainer;

