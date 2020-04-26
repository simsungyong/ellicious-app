import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { Text, Image, ScrollView, TouchableOpacity, TextInput, View, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { TINT_COLOR, IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line, LightPink } from '../../components/Color';
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Stars from 'react-native-stars';
import Hr from "hr-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { CATEGORY_FRAGMENT, CATEGORYINFO_FRAGMENT } from "../../fragments";
import axios from 'axios';
import constants from "../../constants";
import useInput from '../../hooks/useInput';
import { FEED_QUERY } from "../Tabs/Home";
import { ME } from '../Tabs/Profile/Profile';
import User from '../../User';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const GET_CATEGORYINFO = gql`
  query seeCategory($userId: String){
    seeCategory(userId: $userId) {
      ...CategoryInfo
      }
    }
    ${CATEGORYINFO_FRAGMENT}
`;

const UPLOAD = gql`
  mutation upload($caption: String, $storeName: String!, $files: [String!], $storeLocation: String!, $rating: Float!, $storeLat: Float, $storeLong: Float, $placeId: String, $category: String!, $details:[String!]){
          upload(caption: $caption, storeName: $storeName, storeLocation: $storeLocation, files: $files, rating: $rating, storeLat: $storeLat, storeLong: $storeLong, placeId: $placeId, category: $category, details:$details){
              id
              storeName
              rating
              caption
              details
              category{
                categoryName
              }
            }
}
`;

const Container = styled.View`
  flex : 1;
  padding : 10px;
`;
const Top = styled.View`
  flex-direction: row;
  margin-bottom : 10px;
`;

const ImageBox = styled.TouchableOpacity`
margin-left : 3px;
flex-direction: row;

`;
const TextCon = styled.View`
flex:1;
`;

const InfoCon = styled.View`
  flex : 1
  flex-direction: row;
  margin-horizontal : 10px;
  margin-top:7px;
  margin-bottom : 7px;
`;

const SubTitleCon = styled.View`
  padding : 5px;
  justifyContent: center;
`;
const SubTitle = styled.Text`
  font-size : 25px
  margin-right : 10px
  color : ${PointPink}
  font-weight : 200;
`;

const Restaurant = styled.View`
  alignItems: flex-end;
  justifyContent: center;
  margin-right : 5px
  flex : 1
`;

const ImagePlus = styled.View`
alignItems: center;
justifyContent: center;
`;

const StoreName = styled.Text`
  font-weight: 400;
  margin-bottom : 5px;
  font-size : 18px;
`;
const StoreAddress = styled.Text`
  font-weight: 300;
  margin-bottom : 5px;
  font-size : 10px;
`;

const Rating = styled.View`
  alignItems: flex-end;
  justifyContent: center;
  flex : 1

`;

const SubTitleConMI = styled.View`
  padding : 5px;
  justifyContent: center;
`;
const MoreInfoCon = styled.View`
  flex : 6;
  margin-horizontal : 10px;
  margin-top:7px;
  margin-bottom : 7px;
`;

const UploadButton = styled.TouchableOpacity`
  margin-vertical : 5px;
  height: 40;
  border-radius: 7;
  background-color : ${LightPink};
  flex : 1;
  justifyContent: center;
  alignItems: center;
`;

const CategoryName = styled.Text`
fontWeight : 200;
font-size : 20;
margin-bottom : 7;
margin-top : 10px;
`;

const ButtonCon = styled.View`
flex-direction : row;
alignItems: center;
justifyContent: center;
`;

const UploadBt = styled.View`
margin-top: 50px;
flex-direction : row;
alignItems: center;
justifyContent: center;
`;

const Button = styled.TouchableOpacity`
  alignItems: center;
  justifyContent: center;
  borderRadius: 7;
  padding : 5px;
  margin : 4px;
  background-color: ${props => props.backgroundColor};
  width : ${constants.width / 3.7};
`;
export const CREATE_CATEGORY = gql`
  mutation createCategory($categoryName:String!){
    createCategory(categoryName: $categoryName){
      id
    }
  }
`

const seeCategory = gql`
  query seeCategory($userId: String){
    seeCategory(userId: $userId){
      ...CategoryParts
    }
  }
  ${CATEGORY_FRAGMENT}`
  ;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default ({ navigation }) => {
  const [keys, setKey] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  const keyword = ['주차가능', '가성비', '서비스 좋음', '24시간', '자리넓음', '혼밥가능', '애견동반가능', '또 오고싶어', '단체석 구비', '예약가능', '연인과 함께', '가족과 함께'];
  const details = [];
  const captionInput = useInput();
  //const photo = navigation.getParam("photo");
  const [photo, setPhoto] = useState([]);
  const [isPhoto, setFeed] = useState();
  const storeName = navigation.getParam("name");
  const storeAdr = navigation.getParam("formatted_address");
  const placeId = navigation.getParam("place_id");
  const storeLat = navigation.getParam("storeLat")
  const star = navigation.getParam("star")
  const storeLong = navigation.getParam("storeLong")
  const { loading, data } = useQuery(seeCategory);
  const [isloading, setIsLoading] = useState(false);
  const [starValue, setStarValue] = useState(star);
  const [isModalPick, setModalPick] = useState(false);
  const [selectCate, setSelectCate] = useState();
  const [pickedName, setPickedName] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const categoryInput = useInput();
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: () => [{ query: seeCategory }, { query: GET_CATEGORYINFO, variables: { userId: User.userId } }]
  });
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{
      query: FEED_QUERY, variables: {
        pageNumber: 0,
        items: 15
      }
    }, { query: ME }, { query: GET_CATEGORYINFO, variables: { userId: User.userId } }]
  });


  const confirmPermissions = async() => {
    try{
      const {status: cameraStatus} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      let finalStatus = cameraStatus;
  
      if(cameraStatus !== "granted"){
        const {status} = await Permissions.askAsync( Permissions.CAMERA_ROLL);
        finalStatus = status
      }
  
      if(finalStatus !== "granted") {
        Alert.alert("앨범에 대한 접근 권한이 필요합니다. 설정에서 앱에 관련된 접근권한을 변경해주세요");
        return;
      }
      addPhoto();
  
      
    } catch(e){
      console.log(e);
    }
  }

  const addPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result.uri);
        setPhoto([...photo, result.uri])
      }

    } catch (E) {
      console.log(E);
    } finally {
    }

  }



  const handleSubmit = async () => {
    if (captionInput.value === undefined || captionInput.value === '') {
      Alert.alert("게시글을 입력해주세요")
      return;
    }
    if (starValue === undefined) {
      Alert.alert("점수를 입력해주세요")
      return;
    } 
    if (selectCate === undefined) {
      Alert.alert('카테고리를 지정 해주세요')
      return;
    }
    if(!photo[0]){
      Alert.alert('사진이 필요해요!')
      return;
    }

    for (let i = 0; i < 12; i++) {
      if (keys[i]) {
        details.push(keyword[i])
      }
    }

    const formData = new FormData();
    photo.forEach((element) => {
      formData.append("file", {
        name: "feedPhoto",//element.filename || `filename${i}.jpg`,
        type: "image/jpeg",
        uri: element
      });
    });

    try {
      setIsLoading(true);
      const {
        data: { temp }
      } = await axios.post("http://13.125.147.101:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });


      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          caption: captionInput.value,
          files: temp,
          storeName,
          placeId,
          storeLat,
          storeLong,
          rating: starValue,
          category: selectCate,
          storeLocation: storeAdr,
          details
        }
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }

    } catch (e) {
      console.log(e)
      Alert.alert("can't upload ", "Try later");
    } finally {
      setIsLoading(false);
    }


  };


  const handleKey = async (i) => {
    keys[i] = !keys[i]
    await setKey([...keys])

  }

  const togglePicker = (p) => {
    setModalPick(!p)
  }

  const nameValue = (newValue) => {
    setPickedName(newValue)
  }
  const pickValue = (newValue, categoryName) => {
    setSelectCate(newValue);
    nameValue(categoryName);
    togglePicker(isModalPick);
  }

  const handleCreate = async () => {
    if (categoryInput.value === undefined) {
      Alert.alert("한 글자는 쓰지?");
    }
    else {
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
        await togglePicker(isModalPick);
        categoryInput.setValue("")
      }
    }
  }
  return (
    <DismissKeyboard>
      <Container>
        <Top>
          <ImageBox onPress={confirmPermissions}>
            {photo[0] ? <Image
              source={{ uri: photo[photo.length - 1] }}
              style={{
                height: constants.width / 5,
                width: constants.width / 5,
                marginRight: 15,
                borderRadius: 15
              }}
            /> : <ImagePlus

              style={{
                height: constants.width / 5,
                width: constants.width / 5,
                borderWidth: 3,
                marginRight: 15,
                borderRadius: 15
              }}
            ><Entypo name={'plus'} size={35} /></ImagePlus>}

          </ImageBox>

          <TextCon>

            <TextInput
              onChangeText={captionInput.onChange}
              value={captionInput.value}
              multiline={true}
              placeholder="글쓰기..."
              placeholderTextColor={TINT_COLOR}
              maxLength={235}
            />

          </TextCon>
        </Top>

        <Hr lineStyle={{ backgroundColor: Line }} />

        <InfoCon>
          <SubTitleCon>
            <SubTitle> 음식점 </SubTitle>
          </SubTitleCon>
          <Restaurant>
            <StoreName>{storeName.length > 15 ? `${storeName.substring(0, 14)}...` : storeName}</StoreName>
            <StoreAddress>{storeAdr}</StoreAddress>
          </Restaurant>
        </InfoCon>

        <Hr lineStyle={{ backgroundColor: Line }} />

        <InfoCon>
          <SubTitleCon>
            <SubTitle> 별 점 </SubTitle>
          </SubTitleCon>
          <Rating>
            <Stars
              half={true}
              default={starValue}
              update={(val) => setStarValue(val)}
              spacing={6}
              count={5}
              fullStar={<FontAwesome name={'star'} size={25} color={StarColor} />}
              //fullStar = {<Image source={require('../../assets/star.png')} style={{height:50,width:50}}/>}
              emptyStar={<FontAwesome name={'star-o'} size={25} color={Grey} />}
              halfStar={<FontAwesome name={'star-half-full'} size={25} color={StarColor} />} />
          </Rating>
        </InfoCon>

        <Hr lineStyle={{ backgroundColor: Line }} />

        <InfoCon>
          <SubTitleCon>
            <SubTitle> Category </SubTitle>
          </SubTitleCon>
          <Restaurant>
            <TouchableOpacity onPress={() => togglePicker(isModalPick)}>
              <StoreName>
                {selectCate ? <Text>{pickedName}</Text> : 'Select'}
              </StoreName>
            </TouchableOpacity>
          </Restaurant>
        </InfoCon>
        <Hr lineStyle={{ backgroundColor: Line }} />

        <MoreInfoCon>
          <SubTitleConMI>
            <SubTitle> More Information </SubTitle>
          </SubTitleConMI>
          <ButtonCon>
            <ScrollView>
              <ButtonCon>
                <Button onPress={() => handleKey(0)} backgroundColor={keys[0] ? mainPink : LightGrey}><Text>주차가능</Text></Button>
                <Button onPress={() => handleKey(1)} backgroundColor={keys[1] ? mainPink : LightGrey}><Text>가성비</Text></Button>
                <Button onPress={() => handleKey(2)} backgroundColor={keys[2] ? mainPink : LightGrey}><Text>서비스 좋아</Text></Button>
              </ButtonCon>

              <ButtonCon>
                <Button onPress={() => handleKey(3)} backgroundColor={keys[3] ? mainPink : LightGrey}><Text>24시간</Text></Button>
                <Button onPress={() => handleKey(4)} backgroundColor={keys[4] ? mainPink : LightGrey}><Text>자리넓어</Text></Button>
                <Button onPress={() => handleKey(5)} backgroundColor={keys[5] ? mainPink : LightGrey}><Text>혼밥가능</Text></Button>
              </ButtonCon>

              <ButtonCon>
                <Button onPress={() => handleKey(6)} backgroundColor={keys[6] ? mainPink : LightGrey}><Text>애견동반가능</Text></Button>
                <Button onPress={() => handleKey(7)} backgroundColor={keys[7] ? mainPink : LightGrey}><Text>또 오고싶어</Text></Button>
                <Button onPress={() => handleKey(8)} backgroundColor={keys[8] ? mainPink : LightGrey}><Text>단체석 구비</Text></Button>
              </ButtonCon>

              <ButtonCon>
                <Button onPress={() => handleKey(9)} backgroundColor={keys[9] ? mainPink : LightGrey}><Text>예약가능</Text></Button>
                <Button onPress={() => handleKey(10)} backgroundColor={keys[10] ? mainPink : LightGrey}><Text>연인과 함께</Text></Button>
                <Button onPress={() => handleKey(11)} backgroundColor={keys[11] ? mainPink : LightGrey}><Text>가족과 함께</Text></Button>
              </ButtonCon>



            </ScrollView>
          </ButtonCon>
          <UploadBt>
            <UploadButton backgroundColor={mainPink} onPress={handleSubmit}>{isloading ? (
              <ActivityIndicator color="white" />
            ) : (
                <Text>UPLOAD</Text>
              )}</UploadButton>
          </UploadBt>
        </MoreInfoCon>


        <Modal
          visible={isModalPick}
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
                  {data && data.seeCategory.map((value, index) => {
                    return <TouchableOpacity
                      style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingTop: 4 }}
                      key={index} onPress={() => pickValue(value.id, value.categoryName)}>
                      <CategoryName>{value.categoryName}</CategoryName>
                    </TouchableOpacity>
                  })}
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
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => {
                      togglePicker(isModalPick)
                      setNewCategory(true)
                    }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>카테고리 추가하기</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => togglePicker(isModalPick)}>
                    <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={newCategory}
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
                  onPress={() => handleCreate()}>
                  <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => { setNewCategory(false); togglePicker(isModalPick); }}>
                  <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>
      </Container>
    </DismissKeyboard>
  );
}





