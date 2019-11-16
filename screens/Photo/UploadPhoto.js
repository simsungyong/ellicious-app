import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import {Text,Image,ScrollView,Modal,TouchableOpacity, TextInput,Picker, Platform,StyleSheet, TouchableHighlight} from 'react-native';
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line } from '../../components/Color';
import {FontAwesome} from "@expo/vector-icons";
import Stars from 'react-native-stars';
import {Icon} from 'native-base';
import Hr from "hr-native";
import { useQuery } from "react-apollo-hooks";
import { CATEGORY_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import axios from 'axios'

const UploadCon = styled.TouchableOpacity`
  alignItems: center;
  justifyContent: center;
`;
const Button = styled.View`
  width: 80;
  height: 80;
  border-radius: 40px;
  border: 10px solid ${mainPink};
`;

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

const SubTitleCon = styled.View`
  padding : 5px;
  justifyContent: center;
`;
const SubTitle = styled.Text`
  font-size : 25px
  margin-right : 10px
  color : ${PointPink}
  font-weight : 200
  ;
`;

const View = styled.View`
  flex-direction: row;
`;
const ViewModal = styled.View`
`;
const Restaurant = styled.View`
  alignItems: flex-end;
  justifyContent: center;
  margin-right : 5px
  flex : 1

`;

const RestaurantCon = styled.View`
  flex : 1
  flex-direction: row;
`;
const RatingCon = styled.View`
flex : 1
flex-direction: row;
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
`;
const StoreName = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 20px;
`;
const StoreAddress = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 10px;
`;

const styles=StyleSheet.create({
  myStarStyle: {
    
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    //starSize:50
  },
  myEmptyStarStyle: {
    //starSize:50
  }
});

export const seeCategory = gql`
  {
    seeCategory {
      ...CategoryParts
    }
  }
  ${CATEGORY_FRAGMENT}`


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

  const handleSubmit=async()=>{
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: type.toLowerCase(),
      uri: photo.uri
    });
    try {
      const {
        data: { location }
      } = await axios.post("http//3.134.176.171:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      console.log(location);
      setFileUrl(location);
  }catch (e){
    console.log(e);
  }
}

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

      <RestaurantCon>
        <SubTitleCon>
          <SubTitle> 음식점 </SubTitle>
        </SubTitleCon>
        <Restaurant>
          <StoreName>{storeName}</StoreName>
          <StoreAddress>{storeAdr}</StoreAddress>
        </Restaurant>
      </RestaurantCon>

      <Hr lineStyle={{ backgroundColor : Line}} />

      <RatingCon>
        <SubTitleCon>
          <SubTitle> 별 점 </SubTitle>
        </SubTitleCon>
        <Rating>
          <Stars
            half={true}
            default={2.5}
            update={(val)=>setStarValue(val)}
            spacing={8}
            count={5}
            //starSize={50}
            fullStar = {<FontAwesome name={'star'} size={35 }style={[styles.myStarStyle]}/>}
            //fullStar = {<Image source={require('../../assets/star.png')} style={{height:50,width:50}}/>}
            emptyStar={<FontAwesome name={'star-o'} size={35} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
            halfStar={<FontAwesome name={'star-half-full'} size={35} style={[styles.myStarStyle]}/>}/>
        </Rating> 
      </RatingCon>   
      <Hr lineStyle={{ backgroundColor : Line}} />

      <RatingCon>
        <SubTitleCon>
            <SubTitle> Category </SubTitle>
        </SubTitleCon>
        <Restaurant>
          <TouchableOpacity onPress={()=>togglePicker(isModalPick)}>
          <StoreName>{selectCate ? <Text>{pickedName}</Text> : 'select'}</StoreName>
          </TouchableOpacity>
        </Restaurant>
      </RatingCon>
      <Hr lineStyle={{ backgroundColor : Line}} />

      <MoreInfoCon>
        <SubTitleConMI>
          <SubTitle> More Information </SubTitle>
        </SubTitleConMI>
        <TextInput
            placeholder="@직원 친절도"
            style = {marginLeft=30} />
      </MoreInfoCon>
      <UploadCon onPress={handleSubmit}>
        <Button/>
      </UploadCon>
      
      
      <Modal visible={isModalPick} transparent={true} animationType="slide" onRequestClose={()=>console.log(cancle)}>
        <ViewModal style={{margin:20, padding:20,
          backgroundColor:'#efefef',
          bottom:20,
          left:20,
          right:20,
          alignItems: 'center',
          position: 'absolute'}}>
            <Text style={{fontWeight:'bold', marginBottom:10}}>카테고리</Text>
            {data && data.seeCategory.map((value, index)=>{
              return <TouchableHighlight key={index } onPress={()=>pickValue(value.id, value.categoryName)} style={{paddingTop:4, paddingBottom:4}}>
                <Text>{value.categoryName}</Text>
              </TouchableHighlight>
            })}
            <TouchableHighlight onPress={()=>togglePicker(isModalPick)} style={{paddingTop:4, paddingBottom:4}}>
              <Text style={{color:'#999'}}>Cancel</Text>
            </TouchableHighlight>
          </ViewModal>
      </Modal>

      

    </Container>
  );
}


/*<Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          colorTheme={'blue'}
          popupTitle='Select item'
          title='Select item'
          data={mockData}
          searchPlaceHolderText	='카테고리 검색'
          cancelButtonText='취소'
          selectButtonText='선택'
          onSelect={data => {setSelectCate(data)}}
          onRemoveItem={data => {setSelectCate(data);}} 
          />
        <Text>
          업로드!
        </Text>*/