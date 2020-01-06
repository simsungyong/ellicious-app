import React, { useState, Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, Button } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import MapViews from "./MapView/MapViews";
import { LightPink, Grey, TINT_COLOR, PointPink, mainPink, LightGrey, Line } from "./Color";
import { LinearGradient } from "expo-linear-gradient";
import Hr from "hr-native";
import MapView from "react-native-maps";
import TopBarNav from 'top-bar-nav';
import ProfileMapContainer from "../screens/Tabs/Profile/ProfileMapContainer";

const Container = styled.View`
  flex : 1;
`;
const Profile = styled.View`
  padding : 5px;

`;

const Top = styled.View`
  flex-direction: row;
  alignItems: flex-end;
`;
const View=styled.View`
flex:1
`;

const ViewBox=styled.View`
height : 30;
`;
const ProfileImage = styled.View`
  margin-left : 10px;
`;

const ImageCon = styled.View`
flex-direction: row;
margin-top : 5px;
flex : 1
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
  padding-vertical: 5px;

`;
//border: 1px solid ${styles.lightGreyColor};

const FollowButton =styled.TouchableOpacity`
  width: 50px;
  height: 25px;
  background-color: ${props=>props.backgroundColor};
  border-radius: 7px;
  `;

const NameCon = styled.View`
  flex : 1;
  alignItems: center;
  justifyContent: center;

`;
const NameBox = styled.View`
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  height : 40px;
`;

const FollowCon = styled.View`
  alignItems: center;
  margin-right : 5px;
  justifyContent: flex-end;
  flex-direction: row;
  flex : 1;
`;

const Bold = styled.Text`
  font-weight: 600;
  font-size : 15;
  color : ${TINT_COLOR}
`;
const BoldName = styled.Text`
  font-weight: 300;
  font-size : 30;
  margin-left : 5px;
  color : ${TINT_COLOR}
`;

const Text = styled.Text`
  color : ${Grey}
`;
const TopButton = styled.Text`
  font-weight: 300;
  font-size : 20;
  color : ${PointPink}
`;
const FollowPick = styled.View`
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  margin-left : 5px;
`;

const Con = styled.View`
flex-direction : column
flex : 1;
`;

const Post = styled.View`
flex-direction : row;
`;

const Scene = ({ index, posts, userId }) => (
  
    <View >
      {(index == 1) ? (
        
        <ProfileMapContainer userId={userId}/>
       
      ) : (
        <ScrollView>
        <Post>{
        posts && posts.map(p =>
          <SquarePhoto key={p.id} {...p} />
        )}
        </Post>
        </ScrollView>
      )}
    </View>
);

const ROUTES = {
  Scene
};

const ROUTESTACK = [
  { text: <TopButton>게시물</TopButton>, title: 'Scene' }, 
  { text: <TopButton>맛지도</TopButton>, title: 'Scene' }, 
];
const Style = StyleSheet.create ({
  underlineStyle: {
    height: 3.6,
    backgroundColor: mainPink,
    width: constants.width / 2
  }
})
const UserProfile = ({
  id,
  avatar,
  username,
  fullName,
  categories,
  firstName,
  isSelf,
  isFollowing,
  followersCount,
  followingCount,
  postsCount,
  categoryCount,
  followers,
  following,
  bio,
  posts
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid(i => !i);


  return (
    <Container>
      <ViewBox/>
      <Profile>
        <Top>
          <ProfileImage>
            <Image 
              style={{height: 80, width: 80, borderRadius:30}}
              source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
          </ProfileImage>
          <Con>
          <NameCon>
            <NameBox>
            <View/>
              <BoldName>{username}</BoldName>
            </NameBox>
          </NameCon>
          <FollowCon>
            <FollowPick>
              <Text>게시물 </Text>
              <Bold>{postsCount}</Bold>
            </FollowPick>
            <FollowPick>
              <Text>Follower </Text>
              <Bold>{followersCount}</Bold>
            </FollowPick>
            <FollowPick>
            <Text>Following </Text>
              <Bold>{followingCount}</Bold>
            </FollowPick>
          </FollowCon>
          <FollowButton backgroundColor={isFollowing ? LightGrey :"blue" }>
            <Text style={{color:"black"}}>팔로우</Text>
          </FollowButton>
          </Con>
          
        </Top>
      </Profile>
      
      <TopBarNav
          routeStack={ROUTESTACK}
          renderScene={(route, i) => {
            let Component = ROUTES[route.title];
            return <Component index={i} posts={posts} userId={id}/>;
          }}
          headerStyle={{ paddingTop: 20 }}
          inactiveOpacity={1}
          fadeLabels={true}
          underlineStyle={Style.underlineStyle}
        />
    </Container>
  )
};

UserProfile.propTypes = {
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      isSelf: PropTypes.bool.isRequired,
      bio: PropTypes.string,
      postsCount: PropTypes.number.isRequired,
      followersCount: PropTypes.number.isRequired,
      followingCount: PropTypes.number.isRequired,
      categoryCount: PropTypes.number.isRequired,
      isFollowing: PropTypes.bool.isRequired,
      followers:PropTypes.arrayOf(
        PropTypes.shape({
          username:PropTypes.string.isRequired,
          avatar:PropTypes.string,
          isFollowing:PropTypes.bool.isRequired,
        })
      ),
      following:PropTypes.arrayOf(
        PropTypes.shape({
          username:PropTypes.string.isRequired,
          avatar:PropTypes.string,
          isFollowing:PropTypes.bool.isRequired,
        })
      ),
      posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            likeCount: PropTypes.number.isRequired,
            pickCount: PropTypes.number.isRequired,
            commentCount: PropTypes.number.isRequired,
            files: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
              })
            ).isRequired
        })
      ),
    category: PropTypes.arrayOf(
      PropTypes.shape({
      id: PropTypes.string,
      categoryName: PropTypes.string,
    })
    )

};

export default UserProfile;