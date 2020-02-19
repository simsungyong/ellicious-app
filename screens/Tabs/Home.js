import React, { useState, useEffect } from "react";
import { Image, ScrollView, FlatList, TouchableOpacity, RefreshControl, Platform, Touchable, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, } from 'react-native';
//scrollview는 요소가 많은 경우 최적화 잘안된다~-> flatList가 좋다
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { POST_FRAGMENT } from "../../fragments";
import { SafeAreaView } from "react-navigation";
import { Query } from "react-apollo";
import {Card} from 'native-base'
import Post from '../../components/Post';
import Swiper from "react-native-swiper";
import constants from "../../constants";
import { withNavigation } from "react-navigation";
import Star from '../../components/Star';
import moment from "moment";
import { IconColor, StarColor, TINT_COLOR,BG_POST_COLOR, Grey, PointPink, BG_COLOR, LightGrey, Line } from '../../components/Color';



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

const Header =styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;  
  padding : 5px;
`;
const Store = styled.View`
  margin-top : 10px;
  margin-bottom : 10px;
  align-items: center;
`;
const StoreInfo = styled.View`
  align-items: center;
  padding : 5px;
`;
const UserInfo = styled.View`
  margin-left: 10px;
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

const Home =({navigation}) => {
  const [isloading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastLength, setLastLength] = useState();
  const [feedData, setFeedData] = useState();
  const [tokenMutation] = useMutation(EDIT_USER);
  const { loading, data, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pageNumber: 0,
      items:10
    },
  });  //useQuery함수안에는 refetch 함수 담겨있다 .
  
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
    if(data.seeFeed.length < 5){
      console.log("피드길이는 10이하")
      return
    }
    fetchMore({
      variables:{
        pageNumber: data.seeFeed.length,
        items: 3
      },
      updateQuery: (prev, {fetchMoreResult})=>{
        console.log(fetchMoreResult.seeFeed.length)
        if(!fetchMoreResult || fetchMoreResult.seeFeed.length === 0){
          return;
        }
        return {
            seeFeed:prev.seeFeed.concat(fetchMoreResult.seeFeed)
        }
        
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
  )}
    
      
      // <Card>
      //   <Container>
      //     <Header>
      //       <TouchableOpacity
      //         onPress={() =>
      //           navigation.navigate("UserDetail", { id: item.user.id, username:item.user.username })
      //         }
      //       >
      //         {item.user.avatar==null ? 
      //         <Image
      //           style={{height: 40, width: 40, borderRadius:15}}
      //           source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
      //         />
      //       :
      //         <Image
      //           style={{height: 40, width: 40, borderRadius:15}}
      //           source={{uri: item.user.avatar}}
      //         />
      //       }
      //       </TouchableOpacity>
        
      //       <UserInfo>
      //         <TouchableOpacity
      //           onPress={() =>
      //             navigation.navigate("UserDetail", { id: item.user.id, username:item.user.username })
      //           }
      //         >
      //           <Bold>{item.user.username}</Bold>
      //         </TouchableOpacity>
      //         <Timebox>{moment(item.createdAt).startOf('hour').fromNow()}</Timebox>
      //       </UserInfo>
            
      //     </Header>
      //     <Swiper 
      //       showsPagination={false}
      //       style={{height: constants.width/1}}>
      //         {item.files.map(file=>(
      //           <Image
      //             style={{width: constants.width, height:constants.width/1}}
      //             key={file.id}
      //              source={{uri: file.url}}/>
      //         ))}
      //     </Swiper>
          
      //     <StoreInfo>
      //       <Store>
      //       <TouchableOpacity onPress={() => navigation.navigate("StoreDetail", { storeName:item.storeName, placeId:item.placeId })}>
      //         <StoreName>{item.storeName}</StoreName>
      //       </TouchableOpacity>
      //       <Star rating={item.rating} size={25} color={StarColor}/>
      //       </Store>
      //     </StoreInfo>
      //   </Container>
      //   </Card>
  



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
          //EndReachedThreshold={0.001}
          refreshing={refreshing}
          //onEndReached={onLoadMore}
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

export default withNavigation(Home);

/*
<ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
        {loading ? (<Loader/>): (data && data.seeFeed && data.seeFeed.map(post=> <Post key={post.id}{...post} />))}
      </ScrollView>*/