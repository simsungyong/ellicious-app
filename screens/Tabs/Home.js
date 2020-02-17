import React, { useState, useEffect } from "react";
import { Image, ScrollView, FlatList, TouchableOpacity, RefreshControl, Platform, TouchableHighlight, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, } from 'react-native';
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import Post from "../../components/Post";
import { BG_COLOR, BG_POST_COLOR } from "../../components/Color";
import { POST_FRAGMENT } from "../../fragments";
import { SafeAreaView } from "react-navigation";
import { Query } from "react-apollo";
import {Card} from 'native-base'
import Swiper from "react-native-swiper";
import constants from "../../constants";



// export const FEED_QUERY = gql`
//   {
//     seeFeed {
//       ...PostParts
//     }
//   }
//   ${POST_FRAGMENT}
// `;  

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
  const [isloading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationStatus, setStatus] = useState(false);
  const [check, setCheck] = useState(false);
  const [feedData, setFeedData] = useState();
  const [tokenMutation] = useMutation(EDIT_USER);

  const { loading, data, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pageNumber: 0,
      items:6
    },
  });  //useQuery함수안에는 refetch 함수 담겨있다 .

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
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  


  const onLoadMore = async() =>{
    console.log("end")
    fetchMore({
      variables:{
        pageNumber: data.seeFeed.length,
        items: 3
      },
      updateQuery: (prev, {fetchMoreResult})=>{
        
        if(!fetchMoreResult || fetchMoreResult.seeFeed.length === 0){
          return prev;
        }
        
        return {
            seeFeed:prev.seeFeed.concat(fetchMoreResult.seeFeed)
        }
        // if(!fetchMoreResult) return prev;
        // return Object.assign({}, prev, {
        //   seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
        // });
      }
    })
  }

  useEffect(() => {
    ask();
  }, []);


  // useEffect(() => {
  //   ask();
  // }, []);

  
  

  // useEffect(() => {
  //   if (!check) return;

  //   const onLoadMore = async () => {
  //     fetchMore({
  //       variables: {
  //         pageNumber: data.seeFeed.length,
  //         items: 3
  //       },
  //       updateQuery: (prev, { fetchMoreResult }) => {
  //         if (!fetchMoreResult) return prev;
  //         return Object.assign({}, prev, {
  //           seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
  //         });
  //       }
  //     })
  //   }

  //   setFeedData(onLoadMore);

  // })

  const renderRow=(item)=>{
    return(
      <Post {...item}/>
    )
  }



  return (
    // <ScrollView
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
    //     }>
    //     {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
    //   </ScrollView>
    <SafeAreaView style={Container}>
      {loading ? <Loader/> : (
        <FlatList
          data={data.seeFeed}
          onRefresh={refresh}
          EndReachedThreshold={1}
          refreshing={refreshing}
         onEndReached={onLoadMore}
          keyExtractor={item =>item.id}
          renderItem={({ item }) => 
            renderRow(item)
          }
        //   ListEmptyComponent={()=>{
        //     recommendCheck();
        //     return(
        //       <Container>

        //         {loading2 ? (
        //           <Loader />
        //         ) : (
        //           data2 &&
        //           data2.recommendUser &&
        //           data2.recommendUser.map(user => 
        //         <SearchAccountBox key={user.id} {...user} />
        //         )
        //         )
        //           }
        //       <TouchableOpacity onPress={refresh}>
        //         <Text>완료</Text>
        //       </TouchableOpacity>
        //     </Container>
        //     )
        //   }
        // }
        />
        )}
</SafeAreaView>

  );
}


/*
<ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
        {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
      </ScrollView>*/