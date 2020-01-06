import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import {Text,Image,ScrollView,Modal,TouchableOpacity, TextInput,Picker, Platform,StyleSheet, TouchableHighlight, Alert} from 'react-native';
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line, LightPink } from '../../components/Color';
import {FontAwesome, EvilIcons} from "@expo/vector-icons";
import Stars from 'react-native-stars';
import {Icon} from 'native-base';
import Hr from "hr-native";
import { useQuery } from "react-apollo-hooks";
import { CATEGORY_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import axios from 'axios';
import constants from "../../constants";


const Container = styled.View`
  flex : 1;
  padding : 10px;
`;
const Top = styled.View`
  flex-direction: row;
  margin-bottom : 10px;
`;

const ImageBox = styled.View`
margin-left : 3px;
`;
const TextCon = styled.View``;

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

const StoreName = styled.Text`
  font-weight: 400;
  margin-bottom : 5px;
  font-size : 20px;
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

const View = styled.View`
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
  background-color : green
`;

const UploadCon = styled.TouchableOpacity`
  alignItems: center;
  justifyContent: center;
`;
const UploadButton = styled.View`
  width: 80;
  height: 80;
  border-radius: 40px;
  border: 10px solid ${mainPink};
`;

const ViewModal = styled.View`
backgroundColor: white;
bottom:1;
height : ${constants.height / 2.5};
left:2px;
right:2px;
alignItems: center
position: absolute
border-top-left-radius : 30px;
border-top-right-radius : 30px;
border-color : ${Grey};
border-width : 1px;
`;
const ViewText = styled.Text`
fontWeight : 300;
font-size : 25;
margin-bottom : 10;
color : ${PointPink}
`;
const CategoryName = styled.Text`
fontWeight : 200;
font-size : 20;
margin-bottom : 7;
margin-top : 10px;
`;

const ButtonCon = styled.View`
flex-direction : row;
`;
const Button = styled.View`
  alignItems: center;
  justifyContent: center;
  borderRadius: 5;
  background-color : ${LightGrey}
  padding : 5px;
  margin : 2px;
  height : 10px;
`;
export const seeCategory = gql`
  
  query seeCategory($userId: String){
    seeCategory(userId: $userId){
      ...CategoryParts
    }
  }
  ${CATEGORY_FRAGMENT}`
  ;


export default ({navigation}) => {
  const { loading, data } = useQuery(seeCategory);
  const [starValue, setStarValue] = useState(2.5);
  const [isModalPick, setModalPick] = useState(false);
  const [selectCate, setSelectCate] = useState();
  const [pickedName, setPickedName] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const photo = navigation.getParam("photo");
  const storeName = navigation.getParam("name");
  const storeAdr = navigation.getParam("formatted_address");

  if(!loading){
    //console.log(data);
  }
  const handleSubmit=async()=>{
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: photo.uri
    });
    
    try {
      const {
        data: {path}
      } = await axios.post("http://192.168.0.135:4000/api/upload", formData, {
        headers:{
          "content-type" : "multipart/form-data"
        }
      });
    } catch (e) {
      Alert.alert("can't upload ", "Try later");
    }   
};

  const togglePicker=(p)=>{
    setModalPick(!p)
  }

  const nameValue = (newValue)=>{
    setPickedName(newValue)
  }
  const pickValue=(newValue,categoryName)=>{
    setSelectCate(newValue);
    nameValue(categoryName);
    togglePicker(isModalPick);
  }
  return(
    <Container>
      <Top>
        <ImageBox>
          <Image
            source={{ uri: photo.uri }}
            style={{ 
              height: 100, 
              width: 100, 
              marginRight: 20,
              borderRadius:20
            }}
          />
        </ImageBox>

        <TextCon>
          <TextInput
            placeholder="글쓰기..."/>
        </TextCon>
      </Top> 

      <Hr lineStyle={{ backgroundColor : Line}} />

      <InfoCon>
        <SubTitleCon>
          <SubTitle> 음식점 </SubTitle>
        </SubTitleCon>
        <Restaurant>
          <StoreName>{storeName}</StoreName>
          <StoreAddress>{storeAdr}</StoreAddress>
        </Restaurant>
      </InfoCon>

      <Hr lineStyle={{ backgroundColor : Line}} />

      <InfoCon>
        <SubTitleCon>
          <SubTitle> 별 점 </SubTitle>
        </SubTitleCon>
        <Rating>
          <Stars
            half={true}
            default={2.5}
            update={(val)=>setStarValue(val)}
            spacing={6}
            count={5}
            //starSize={50}
            fullStar = {<FontAwesome name={'star'} size={25} color={StarColor}/>}
            //fullStar = {<Image source={require('../../assets/star.png')} style={{height:50,width:50}}/>}
            emptyStar={<FontAwesome name={'star-o'} size={25} color={Grey}/>}
            halfStar={<FontAwesome name={'star-half-full'} size={25} color={StarColor}/>}/>
        </Rating> 
      </InfoCon>   

      <Hr lineStyle={{ backgroundColor : Line}} />

      <InfoCon>
        <SubTitleCon>
          <SubTitle> Category </SubTitle>
        </SubTitleCon>
        <Restaurant>
          <TouchableOpacity onPress={()=>togglePicker(isModalPick)}>
          <StoreName>
            {selectCate ? <Text>{pickedName}</Text> :'Select'} 
          </StoreName>
          </TouchableOpacity>
        </Restaurant>
      </InfoCon>
      <Hr lineStyle={{ backgroundColor : Line}} />

      <MoreInfoCon>
        <SubTitleConMI>
          <SubTitle> More Information </SubTitle>
        </SubTitleConMI>
        <ButtonCon>
        <TouchableOpacity>
          <Button>
            <Text>주차가능</Text>
          </Button>
        </TouchableOpacity>
        </ButtonCon>
      </MoreInfoCon>
      
      <UploadCon onPress={handleSubmit}>
        <UploadButton/>
      </UploadCon>

      <Modal visible={isModalPick} transparent={true} animationType="slide" onRequestClose={()=>console.log(cancle)}>
        <ViewModal style={{padding:10}}>
          
            <ViewText>카테고리</ViewText>
            <Hr lineStyle={{ backgroundColor : Line}}/>

            {data && data.seeCategory.map((value, index)=>{
              return <TouchableHighlight key={index } onPress={()=>pickValue(value.id, value.categoryName)} style={{paddingTop:4, paddingBottom:4}}>
                <CategoryName>{value.categoryName}</CategoryName>
              </TouchableHighlight>
            })}
            
            <View/>
            <TouchableHighlight onPress={()=>togglePicker(isModalPick)} style={{paddingTop:4, paddingBottom:4}}>
              <Text style={{color:mainPink, fontSize:17}}>카테고리 추가하기</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=>togglePicker(isModalPick)} style={{paddingTop:4, paddingBottom:4}}>
              <Text style={{color:Grey}}>Cancle</Text>
            </TouchableHighlight>

          </ViewModal>
      </Modal>
    </Container>
  );
}
const styles = StyleSheet.create({
  button: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  backgroundColor :LightGrey,
  padding : 5,
  margin : 2,
  height : 100,
  width : 100
  }
})



/*<Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          colorTheme={'blue'}
          popupTitle='Select item'
          title='Select item'
          data={mockData}
          searchPlaceHolderText   ='카테고리 검색'
          cancelButtonText='취소'
          selectButtonText='선택'
          onSelect={data => {setSelectCate(data)}}
          onRemoveItem={data => {setSelectCate(data);}} 
          />
        <Text>
          업로드!
        </Text>*/


