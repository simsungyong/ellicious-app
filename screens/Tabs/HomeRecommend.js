import React, { useState, useEffect } from "react";
import { Image, ScrollView, FlatList, TouchableOpacity, RefreshControl, Platform, Touchable, Alert, Button, Keyboard, TouchableWithoutFeedback, } from 'react-native';
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { POST_FRAGMENT } from "../../fragments";
import HomePresenter from './HomePresenter';
import { withNavigation } from "react-navigation";
import { TINT_COLOR, BG_POST_COLOR } from '../../components/Color';
import Section from '../../components/Section';
import RecommendItem from '../../components/RecommendItem';


export const RECOMMEND = gql`
  query recommendUser($pageNumber: Int!, $items: Int!){
    recommendUser(pageNumber: $pageNumber, items: $items){
      username
      id
      avatar
      firstName
      bio
      isSelf
      followersCount
    }
  }
  `


const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [refreshing, setRefreshing] = useState(false);


  const {loading, data, refetch} = useQuery(RECOMMEND,{
    // skip: check,
    variables: {
      pageNumber: 0,
      items: 10
    }
  });

  console.log(data.recommendUser)

  
//   const recommendCheck= async()=>{
//     setCheck(true);
//     try{
//       if(!loading2){
//         console.log(data2)
//       }
//     }catch(e){
//       console.log(e)
//     }finally{
//       setCheck(false); 
//     }

 
 
  return (
    <>
      {!loading ?
        <Section title="Top10 엘리셔">{data.recommendUser
            .map(user=>(
                <RecommendItem
                    key={user.id}
                    id={user.id}
                    avatar={user.avatar}
                    followersCount={user.followersCount}
                    username={user.username}/>
            ))}</Section>:
        <Loader />
      }
    </>
  )
}

export default React.memo(withNavigation(Home));