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
import { TINT_COLOR, BG_POST_COLOR, Grey,LightGrey } from '../../components/Color';
import Section from '../../components/Section';
import RecommendItem from '../../components/RecommendItem';

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
      isFollowing
      avatar
      followersCount
      firstName
      isSelf
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
  margin-top : 20px;
  flex: 1;
`;
const HView = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;
const Container = styled.View`
background-color : ${LightGrey};
padding-left: 1px;
padding-right : 1px;
`;



const Text = styled.Text``;

const TextLink = styled.Text`
color : red;
font-size: 18px;
`;

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
  const [isEnd, setIsEnd] = useState(false);
  const [lastLength, setLastLength] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // const [top10, setTop10] = useState(true);


  const [tokenMutation] = useMutation(EDIT_USER);
  const { loading, data, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pageNumber: 0,
      items: 6
    },
  });
  ;
  const {loading:loading2, data:data2, refetch:refetch2} = useQuery(RECOMMEND,{
    variables: {
      pageNumber: 0,
      items: 10
    }
  });

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

  const refresh = async () => {
    await setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };


  const onLoadMore = async () => {
    console.log("reload");
    setIsLoading(true)
    try {
      await fetchMore({
        variables: {
          pageNumber: data.seeFeed.length,
          items: 5
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.seeFeed.length == 0) {
            setIsEnd(true)
          }
          else {
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


  return (
    <Container>
      {!loading2 ?
        <Section title="Top10 엘리셔">{data2.recommendUser
            .filter(user=>user.isSelf==false)
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

      {data ? data.seeFeed.length > 0 ?
        <HomePresenter
          feedData={data.seeFeed}
          // feedData={feedData}
          refetch={refetch}
          onLoadMore={onLoadMore}
          isLoading={isLoading}
          isEnd={isEnd}
          refreshing={refreshing}
          refresh={refresh}
        /> : 
        <ScrollView refreshControl = {
          <RefreshControl
          refreshing={refreshing} onRefresh={() => {refresh()}}
          />
        }>
          <View>
            <Text>아직도 게시물이 없으세요?</Text>
            <HView>
              <TouchableOpacity onPress={() => navigation.navigate("PhotoNavigation")}>
                <TextLink>여기</TextLink>
              </TouchableOpacity>
              <Text>를 눌러 게시물을 추가해보세요</Text>
            </HView>
          </View>
        </ScrollView>
        :
        <Loader />
      }
    </Container>
  )
}

export default React.memo(withNavigation(Home));