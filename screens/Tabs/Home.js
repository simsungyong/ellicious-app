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


export const EDIT_USER = gql`
  mutation editUser($notifyToken: String) {
    editUser(notifyToken:$notifyToken){
      id
    }
  }
`;

export const FEED_QUERY = gql`
  query seeFeed($pageNumber: Int!, $items: Int!){
    seeFeed(pageNumber: $pageNumber, items: $items){
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`

export const RECOMMEND = gql`
  query recommendUser($pageNumber: Int!, $items: Int!){
    recommendUser(pageNumber: $pageNumber, items: $items){
      username
      id
      avatar
      firstName
      bio
    }
  }
  `
const Bold = styled.Text`
font-weight: 600;
margin-bottom : 5px;
font-size : 15px;
margin-right : 5px;
`;
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.View`
background-color : ${BG_POST_COLOR};
padding-left: 2px;
padding-right : 2px;
`;

const Text = styled.Text``;


const StoreInfo = styled.View`
  align-items: center;
  padding : 5px;
  `;

const Timebox = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;
const StoreName = styled.Text`
  font-size: 24px;
  font-weight: 800;
  margin-bottom : 5px;
  color : ${TINT_COLOR};
`;

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
  const [onReachedEnd, setOnReachedEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [lastLength, setLastLength] = useState();
  const [feedData, setFeedData] = useState();


  const [tokenMutation] = useMutation(EDIT_USER);
  const { loading, data, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pageNumber: 0,
      items: 3
    },
  });
  ;
  // const {loading:loading2, data:data2, refetch:refetch2} = useQuery(RECOMMEND,{
  //   skip: check,
  //   variables: {
  //     pageNumber: 0,
  //     items: 15
  //   }
  // });

  const ask = async () => {
    const { status: existingStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    try {
      await tokenMutation({
        variables: {
          notifyToken: token
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  // const recommendCheck= async()=>{
  //   setCheck(true);
  //   try{
  //     if(!loading2){
  //       console.log(data2)
  //     }
  //   }catch(e){
  //     console.log(e)
  //   }finally{
  //     setCheck(false); 
  //   }


  // }




  const onLoadMore = async () => {
    setIsLoading(true)
    try {
      await fetchMore({
        variables: {
          pageNumber: data.seeFeed.length,
          items: 3
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.seeFeed.length == 0) {
            setIsEnd(true)
          } 
          // else if (fetchMoreResult.seeFeed.length < 3) {
          //   setIsEnd(true)
          //   setFeedData(prev.seeFeed.concat(fetchMoreResult.seeFeed))
          //   return {
          //     seeFeed: prev.seeFeed.concat(fetchMoreResult.seeFeed)
          //   } 
          // } 
          else {
            setFeedData(prev.seeFeed.concat(fetchMoreResult.seeFeed))
            return {
              seeFeed: prev.seeFeed.concat(fetchMoreResult.seeFeed)
            }
          }

        }
      });
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    ask();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      await setFeedData(data.seeFeed)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }

  if (data && feedData == undefined) {
    getData()
  }

  return (
    <>
      {!loading ?
          <HomePresenter
            feedData={data.seeFeed}
            // feedData={feedData}
            refetch={refetch}
            onLoadMore={onLoadMore}
            isLoading={isLoading}
            isEnd={isEnd}
          />: 
        <Loader />
      }
    </>
  )
}

export default React.memo(withNavigation(Home));