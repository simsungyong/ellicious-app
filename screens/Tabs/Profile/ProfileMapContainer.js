import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { IconColor, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../../../components/Loader';
import useInput from '../../../hooks/useInput';
import { CATEGORYINFO_FRAGMENT, CATEGORY_FRAGMENT } from '../../../fragments';
import ProfileMapPresenter from '../../Tabs/Profile/ProfileMapPresenter';
import styled from "styled-components";
import { PointPink, mainBlue, mainPink, LightGrey, Blue, Grey } from "../../../components/Color";
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
const ModalNameContainer = styled.TouchableOpacity`
    align-items: center;  
    flex:5
`;
const ModalDelContainer = styled.TouchableOpacity`
    align-items: center;  
    flex:1;
`;
const Delete = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color : ${PointPink};
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

const ProfileMapContainer = ({ navigation, userId }) => {

    const [mapIdx, setIndex] = useState(0);
    const [confirm, setConform] = useState(false);
    const [isModal, setModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [delIdx, setDelIdx] = useState(0);

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
                await setNewCategory(false);
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
                        <ScrollView height={200}>
                            {loading ? null : data.seeCategory.map((category, index) => (
                                <ModalContainer key={index}>
                                    <TouchableOpacity 
                                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                                        onPress={() => handleIndex(index)}>
                                       <Text style={{ color: Blue, fontSize: 20 }}>{category.categoryName}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            setDelIdx(index)
                                            setModal(false)
                                            setDelModal(true)
                                        }}>
                                        <Text style={{ color: Grey, fontSize: 15 }}>삭제</Text>
                                    </TouchableOpacity>
                                </ModalContainer>
                            ))}
                        </ScrollView>
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
                            <TouchableOpacity
                                style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                            //onPress={handleSubmit}
                            >
                                {isloading ? <Loader /> : <Text style={{ color: 'white', fontSize: 15 }}>카테고리 추가</Text>}

                            </TouchableOpacity>

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

    const modalEdit=(
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
                            style={{ fontSize: 13, alignSelf: 'center', marginTop: 40, flex: 7, alignItems:'center', justifyContent: 'center'}}
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
                                  {isloading ? <Loader/> : <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>}
                                    
                            </TouchableOpacity>
    
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => setDelModal(false)}>
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
                            </View>
                        </>
                    )}
                </>
            )}
        </View>
    )
}
export default ProfileMapContainer;


{/* <Modal
                                    visible={modalAndTitle}
                                    onTouchOutside={() => setmodalAndTitle(false)}
                                    width={0.8}
                                    onSwipeOut={() => setmodalAndTitle(false)}
                                >
                                    <ModalContent>
                                        <ScrollView height={200}>
                                            {data.seeCategory.map((category, index) => (
                                                <ModalContainer key={index}>
                                                    <ModalNameContainer>
                                                        <ModalButton
                                                            text={category.categoryName}
                                                            onPress={() => handleIndex(index)}
                                                        />
                                                    </ModalNameContainer>
                                                    {User.userId === userId ? 
                                                    <ModalDelContainer>
                                                        <ModalButton
                                                            text={"삭제"}
                                                            textStyle={{ color: PointPink }}
                                                            onPress={() => {
                                                                setDelIdx(index)
                                                                setDelCategory(true)
                                                            }}
                                                        />
                                                    </ModalDelContainer>
                                                    : null }
                                                    <Modal
                                                        visible={delCategory}
                                                        onTouchOutside={() => setDelCategory(false)}
                                                        width={0.8}
                                                        onSwipeOut={() => setDelCategory(false)}
                                                    >
                                                        <ModalContent>
                                                            <Text>
                                                                삭제하시면 카테고리에 포함 되어있던 포스트가 모두 사라집니다. 그래서 삭제하시겠습니까?
                                                            </Text>
                                                        </ModalContent>

                                                        <ModalFooter>
                                                            {!isloading ? (
                                                                <ModalButton
                                                                    text="확인"
                                                                    onPress={() => 
                                                                        handleDelete(data.seeCategory[delIdx].id)
                                                                    }
                                                                />) : <Loader />}
                                                            <ModalButton
                                                                text="취소"
                                                                onPress={() => setDelCategory(false)}
                                                            />
                                                        </ModalFooter>
                                                    </Modal>
                                                </ModalContainer>
                                            ))}
                                        </ScrollView>
                                    </ModalContent>
                                    {User.userId === userId ? 
                                    <ModalFooter>
                                        <ModalButton
                                            text="카테고리 추가"
                                            onPress={() => setNewCategory(true)}
                                        />
                                        <ModalButton
                                            text="확인"
                                            onPress={() => setmodalAndTitle(false)}
                                        />
                                    </ModalFooter>
                                    :
                                    null
                                    }
                                </Modal>
                                <Modal
                                    visible={newCategory}
                                    onTouchOutside={() => setNewCategory(false)}
                                    width={0.8}
                                    onSwipeOut={() => setNewCategory(false)}
                                >
                                    <ModalContent>
                                        <TextInput
                                            onChangeText={categoryInput.onChange}
                                            placeholder={"새 카테고리 이름"}
                                            placeholderTextColor={TINT_COLOR}
                                        />

                                    </ModalContent>

                                    <ModalFooter>
                                        {!isloading ? (
                                            <ModalButton
                                                text="확인"
                                                onPress={handleCreate}
                                            />) : <Loader />}
                                        <ModalButton
                                            text="취소"
                                            onPress={() => setNewCategory(false)}
                                        />
                                    </ModalFooter>
                                </Modal> */}