import React, { useState } from "react";
import { ScrollView, RefreshControl , FlatList,SafeAreaView} from "react-native";
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import Post from "../../components/Post";


const FEED_QUERY = gql`
  {
    seeFeed {
      id
      caption
      rating
      storeLocation
      storeName
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      isPicked
      pickCount
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data, refetch} = useQuery(FEED_QUERY);  //useQuery함수안에는 refetch 함수 담겨있다 .
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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
      }>
      {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
    </ScrollView>
  );
};