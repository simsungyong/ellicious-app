import React, { useState, useEffect } from "react";
import { Image, ScrollView, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { POST_FRAGMENT } from "../../fragments";
import HomePresenter from './HomePresenter';
import { withNavigation } from "react-navigation";
import {LightGrey } from '../../components/Color';
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
flex:1;
padding-right : 1px;
`;



const Text = styled.Text``;

const TextLink = styled.Text`
color : red;
font-size: 18px;
`;


const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const [tokenMutation] = useMutation(EDIT_USER);
  const { loading, data, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pageNumber: 0,
      items: 15
    },
  });
  
  const {loading:loading2, data:data2, refetch:refetch2} = useQuery(RECOMMEND,{
    variables: {
      pageNumber: 0,
      items: 10
    }
  });

  const ask = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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
        <Section title="Top10 엘리셔" >{data2.recommendUser
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

      {!loading ? data && data.seeFeed.length > 0 ?
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
          refreshing={refreshing} onRefresh={refresh}
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