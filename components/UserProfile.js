import React, { useState } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import MapViews from "./MapViews";
import { LightPink, Grey, TINT_COLOR, PointPink, mainPink, LightGrey, Line } from "./Color";
import { LinearGradient } from "expo-linear-gradient";
import Hr from "hr-native";

const Container = styled.View`
  flex : 1;
`;
const Profile = styled.View`
  padding : 5px;
  flex : 1;
  height : ${constants.height /4.3}
`;
const Header = styled.View`
  position : relative;
  justify-content : flex-end;
`;
const Top = styled.View`
  flex-direction: row;
  alignItems: flex-end;
  
`;
const View=styled.View`
flex : 1;
`;
const ProfileImage = styled.View`
  margin-left : 10px;
`;

const ImageCon = styled.View`
flex-direction: row;
margin-top : 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
  padding-vertical: 5px;

`;
//border: 1px solid ${styles.lightGreyColor};

const Button = styled.View`
width: ${constants.width / 2};
  align-items: center;
  alignItems: center;
 justifyContent: center;
 padding : 5px;
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
const UserProfile = ({
  id,
  avatar,
  username,
  fullName,
  categories,
  firstName,
  isSelf,
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
      
      <Profile>
       <View/>
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
          </Con>
        </Top>
      </Profile>
     

    <ButtonContainer>
      <TouchableOpacity onPress={toggleGrid}>
        <Button>
          <TopButton>게시물</TopButton>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleGrid}>
        <Button>
          <TopButton>맛지도</TopButton>
        </Button>
      </TouchableOpacity>
    </ButtonContainer>

    <Hr lineStyle={{ backgroundColor : Line }}/>

    <ScrollView>
    <ImageCon>
      {isGrid ? (
        posts && posts.map(p =>
          <SquarePhoto key={p.id} {...p} />
        )
      ) : (
        <MapViews />
      )}
    </ImageCon>
    </ScrollView>
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