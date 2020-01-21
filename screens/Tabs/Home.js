import React, { useState } from "react";
import { ScrollView, RefreshControl , FlatList,SafeAreaView} from "react-native";
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import Post from "../../components/Post";
import {BG_COLOR, BG_POST_COLOR} from "../../components/Color";
import { POST_FRAGMENT } from "../../fragments";
import InfiniteScroll from 'react-infinite-scroll-component';

/*
export const FEED_QUERY = gql`
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
  const {loading, data, refetch, fetchMore} = useQuery(FEED_QUERY,{
    variables: {
      pageNumber: 0,
      items: 15
    }
  });  //useQuery함수안에는 refetch 함수 담겨있다 .
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

  return (
    
      loading ? <Loader/> : (
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
        }}/>
        )
    
    



    /*
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
        {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
      </ScrollView>
    </Container>
  */
  );
}