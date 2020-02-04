import React, { useState,useEffect } from "react";
import {Image,ScrollView,FlatList,TouchableOpacity, RefreshControl, Platform, TouchableHighlight, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, } from 'react-native';
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import Post from "../../components/Post";
import {BG_COLOR, BG_POST_COLOR} from "../../components/Color";
import { POST_FRAGMENT } from "../../fragments";
import SearchAccountBox from '../../components/SearchComponents/SearchAccountBox'
import InfiniteScroll from 'react-infinite-scroll-component';


/*export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;  
*/

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

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notificationStatus, setStatus] = useState(false);
  const [check, setCheck] = useState(false)
  const {loading, data, refetch, fetchMore} = useQuery(FEED_QUERY,{
    variables: {
      pageNumber: 0,
      items: 15
    }
  });  //useQuery함수안에는 refetch 함수 담겨있다 .
  const {loading:loading2, data:data2, refetch:refetch2} = useQuery(RECOMMEND,{
    skip: check,
    variables: {
      pageNumber: 0,
      items: 15
    }
  });
  const ask = async()=>{
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      setStatus(status);
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(notificationStatus)
      console.log(status)
      };

  const recommendCheck= async()=>{
    setCheck(true);
    try{
      if(!loading2){
        console.log(data2)
      }
    }catch(e){
      console.log(e)
    }finally{
      setCheck(false); 
    }
   
     
  }


  const refresh = async() =>{
    try{
      setRefreshing(true);
      await refetch();
      
    }catch (e){
      console.log(e);
    }finally{
      setRefreshing(false);
    }
  };

  const onLoadMore = async() =>{
    fetchMore({
      variables:{
        pageNumber: data.seeFeed.length,
        items: 5
      },
      updateQuery: (prev, {fetchMoreResult})=>{
        if(!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
        });
      }
    })
  }
  useEffect(() => {
    ask();
    
  }, []);
  return (
    <Container>
      {loading ? <Loader/> : (
      <FlatList
        data={data.seeFeed}
        onRefresh={refresh}
        onEndReachedThreshold={1.5}
        refreshing={refreshing}
        onEndReached={onLoadMore}
        keyExtractor={item=>item.id}
        renderItem={({item})=>{
          return (
            <Post {...item}/>
          )
        }}
        ListEmptyComponent={()=>{
          recommendCheck();
          return(
            <Container>
              
              {loading2 ? (
                <Loader />
              ) : (
                data2 &&
                data2.recommendUser &&
                data2.recommendUser.map(user => 
              <SearchAccountBox key={user.id} {...user} />
              )
              )
                }
            <TouchableOpacity onPress={refresh}>
              <Text>완료</Text>
            </TouchableOpacity>
          </Container>
          )
        }
      }
        />
        )}
    </Container>
    

  );
}


/*
<ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
        {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
      </ScrollView>*/