import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import axios from 'axios';
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { ScrollView, Text, TextInput, Alert, TouchableOpacity, StyleSheet, AsyncStorage, Modal, View } from "react-native";
import { PointPink, mainPink, TINT_COLOR, Grey } from "../components/Color";
import { withNavigation } from "react-navigation";
import constants from "../constants";
import { FontAwesome } from '@expo/vector-icons';
import { ME } from '../screens/Tabs/Profile/Profile';
import firebase from 'firebase';
import User from '../User';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Loader from "../components/Loader";


export const EDIT_USER = gql`
  mutation editUser($newAvatar: String, $bio: String, $username: String, $lastName: String, $firstName: String) {
    editUser(avatar: $newAvatar bio: $bio username: $username, firstName: $firstName, lastName: $lastName){
      id
    }
  }
`;

const Container = styled.View`
flex : 1;
padding : 15px;
`;

const EditImage = styled.View`
  height : 30%;
  alignItems: center;
  justifyContent: center;
`;
const ImageCon = styled.View`
`;

const Image = styled.Image`
  width: 95;
  height: 95;
  borderRadius:30;
  position : relative;
`;
const EditButton = styled.TouchableOpacity`
alignItems: center;
justifyContent: center;
`;

const EditInfo = styled.View`
  flex : 2.5;
  alignItems: center;
  justifyContent: center;
  
`;
const EditName = styled.View`
`;

const Button = styled.TouchableOpacity`
  right : 0px;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  position: absolute;
  
`;
const EditProfile = ({
  navigation
}) => {
  const [loading, setLoading] = useState(false);
  const id = navigation.getParam("id");
  const username = navigation.getParam("username");
  const avatar = navigation.getParam("avatar");
  const firstName = navigation.getParam("firstName");
  const lastName = navigation.getParam("lastName");
  const bio = navigation.getParam("bio");
  const email = navigation.getParam("email");
  const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
  const [isavatar, setavatar] = useState(avatar);
  const bioInput = useInput();
  const usernameInput = useInput();
  const firstnameInput = useInput();
  const lastnameInput = useInput();
  const emailInput = useInput();
  const [editProfilePictureMutation] = useMutation(EDIT_USER, {
    refetchQueries: () => [{ query: ME }]
  });



  const changePicture = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert("갤러리 접근 허용을 하지 않으시면 사용할 수 없습니다")
        return;
      }
    } catch (e) {
      console.log(e);
    };

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result)

      if (!result.cancelled) {
       setavatar(result.uri);
       setbottomModalAndTitle(false); 
      }
 
    } catch (E) {
      console.log(E);
    }

  }


  const handleSubmit = async () => {
    setLoading(true);
    let finalAvatarUri = isavatar;

    if(avatar !== isavatar){
      const formData = new FormData();
      formData.append("file", {
      name: "profileIamge",
      type: "image/jpeg",
      uri: isavatar
    });
    try {
      const {
        data: {temp}
      } = await axios.post("http://13.125.147.101:4000/api/upload", formData, {
        headers:{
          "content-type" : "multipart/form-data"
        }
      });
      finalAvatarUri = temp[0];
    } catch (e) {
      console.log(e)
    } 
};    

    

    let newbio = bio;
    let newusername = username;
    let newfirstname = firstName;
    let newlastname = lastName;

    if (bioInput.value) {
      newbio = bioInput.value;
    }
    if (usernameInput.value) {
      newusername = usernameInput.value;
    }
    if (firstnameInput.value) {
      newfirstname = firstnameInput.value;
    }
    if (lastnameInput.value) {
      newlastname = lastnameInput.value;
    }


    try {
      await editProfilePictureMutation({
        variables: {
          newAvatar: finalAvatarUri,
          bio: newbio,
          username: newusername,
          firstName: newfirstname,
          lastName: newlastname
        }
      });
      firebase.database().ref('users').child(id).update({ ID: newusername })
      await AsyncStorage.setItem('username', newusername);
      if (isavatar !== null) {
        await AsyncStorage.setItem('avatar', finalAvatarUri);
      }
      User.username = await AsyncStorage.getItem('username');
      User.avatar = await AsyncStorage.getItem('avatar');
      
    } catch (e) {
      console.log(e)
      Alert.alert("같은 UserName이 존재합니다.")
    } finally{
      setLoading(false);
      navigation.goBack();
    }
  }

  return (
    <Container>
      <EditImage>
        <ImageCon>
          {avatar == null ?
            <Image
              source={require("../assets/defaultIcons.png")}
            />
            :
            <Image
              source={{ uri: isavatar }}
            />
          }

          <Button onPress={() => setbottomModalAndTitle(true)}>
            <FontAwesome
              name={'camera'}
              color={Grey}
              position={'absolute'}
              size={25}
            />
          </Button>

        </ImageCon>
        <EditButton>
          <TextInput
            style={styles.EditId}
            onChangeText={usernameInput.onChange}
            placeholder={username}
            placeholderTextColor={TINT_COLOR} >
            {username}
          </TextInput>
        </EditButton>
      </EditImage>

      <ScrollView>
        <EditInfo>
          <EditName>
            <Text style={{ fontSize: 17, color: PointPink, marginTop: 13 }}>성</Text>
            <TextInput
              style={{
                height: 26,
                width: constants.width - 30,
                fontSize: 20,
                color: TINT_COLOR,
                borderBottomWidth: 1,
                borderBottomColor: mainPink,
              }}
              onChangeText={lastnameInput.onChange}
              placeholderTextColor={Grey}
            >
              {lastName}
            </TextInput>
          </EditName>
          <EditName>
            <Text style={{ fontSize: 17, color: PointPink, marginTop: 13 }}>이름</Text>
            <TextInput
              style={{
                height: 26,
                width: constants.width - 30,
                fontSize: 20,
                color: TINT_COLOR,
                borderBottomWidth: 1,
                borderBottomColor: mainPink,
              }}
              onChangeText={firstnameInput.onChange}
              placeholderTextColor={Grey}
            >
              {firstName}
            </TextInput>
          </EditName>
          <EditName>
            <Text style={{ fontSize: 17, color: PointPink, marginTop: 13 }}>이메일</Text>
            <TextInput
              style={{
                height: 26,
                width: constants.width - 30,
                fontSize: 20,
                color: TINT_COLOR,
                borderBottomWidth: 1,
                borderBottomColor: mainPink,
              }}
              onChangeText={emailInput.onChange}
              placeholderTextColor={Grey}
            >
              {email}
            </TextInput>
          </EditName>
          <EditName>
            <Text style={{ fontSize: 17, color: PointPink, marginTop: 13 }}>소개</Text>
            <TextInput
              style={{
                height: 26,
                width: constants.width - 30,
                fontSize: 20,
                color: TINT_COLOR,
                borderBottomWidth: 1,
                borderBottomColor: mainPink,
              }}
              onChangeText={bioInput.onChange}
              placeholder={"자기소개를 입력하세요"}
              placeholderTextColor={Grey}
            >
              {bio}
            </TextInput>
          </EditName>
        </EditInfo>

        <TouchableOpacity onPress={() => handleSubmit()}>
          { loading ? <Loader/> : 
          <Text style={{ fontSize: 17, color: PointPink, marginTop: 13 }}>완 료</Text>
}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={bottomModalAndTitle}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
              style={{ fontSize: 16, alignSelf: 'center', marginTop: 40, flex: 7, alignItems: 'center', justifyContent: 'center' }}
            >
              {"프로필 사진을 업데이트 하시겠습니까?"}
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
                onPress={changePicture}>
                <Text style={{ color: 'white', fontSize: 15 }}>앨범에서 업로드</Text>
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

  );
}


const styles = StyleSheet.create({
  EditCage: {
    height: 24,
    //width: constants.width-20, 
    marginTop: 15,
    fontSize: 17
  },
  EditId: {
    fontSize: 25,
    fontWeight: "200",
    marginTop: 7
  },
  header: {
    height: 100,
  },
  editbox: {
    marginTop: 60,
    alignItems: 'center'
  },
  editImage: {
    fontSize: 16,
    color: mainPink,
    fontWeight: "600"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

export default withNavigation(EditProfile);


/*
{category
            .map(tag => (
            <EditCageDetail key={tag.id}>
              <TextInput
                style={styles.EditCage}
                placeholder = {tag.categoryName}
                placeholderTextColor={TINT_COLOR}
              />
              <View />
              <TouchableOpacity>
                <Text style={{fontSize : 17, color : PointPink, marginTop : 13, marginRight : 13}}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize : 17, color : PointPink, marginTop : 13}}>삭제</Text>
              </TouchableOpacity>
            </EditCageDetail>
            ))} */
/* <EditCage>
          <Text style={{fontSize : 17, color : PointPink, marginTop : 13}}>카테고리</Text>
          <TouchableOpacity onPress={handleCategory}>
            <AntDesign name={'pluscircleo'} size={17}/>
          </TouchableOpacity>
          {addCategory ? (
            <TextInput
            style={{fontSize:17}}
            placeholder={"카테고리 이름"}
            onChangeText={addedCategory.onChange}/>
          ) : null
          }

          </EditCage> */