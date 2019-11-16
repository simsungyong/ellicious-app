import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Platform } from "@unimodules/core";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import MapViews from "./MapViews";
import FollowButton from '../components/FollowButton'
import Hr from "hr-native";
import { LightPink, Grey, TINT_COLOR } from "./Color";

const Container = styled.View`
  flex : 1;
`;
const PostCon = styled.View`
  flex-direction: row;
  height : ${constants.height /1.65}
`;
const Profile = styled.View`
  padding : 5px;
  flex : 1;
`;
const Top = styled.View`
  flex : 1;
  flex-direction: row;
`;
const ProfileImage = styled.View`
    
`;

const ImageCon = styled.View`
flex-direction: row;
`;


const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;


const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding-vertical: 5px;
  border: 1px solid ${styles.lightGreyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
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
  background-color : ${LightPink}
  height : 40px;
`;
const View = styled.View`
  flex : 1;
`;
const Bottom = styled.View`
  flex-direction: row;
`;

const FollowCon = styled.View`
  margin-top : 10px;
  alignItems: center;
  justifyContent: center;

`;

const BioCon = styled.View`
  alignItems: flex-end;
  flex : 1;
`;

const Bold = styled.Text`
  font-weight: 600;
  font-size : 15;
`;
const BoldName = styled.Text`
  font-weight: 600;
  font-size : 20;
  margin-left : 5px;
  color : ${TINT_COLOR}
`;

const Following = styled.View``;
const Follower = styled.View``;
const Bio = styled.Text`
  font-size : 15;
`;

const Text = styled.Text`
  color : ${Grey}
`;

const FollowPick = styled.View`
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  margin-left : 5px;
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
    <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.black : styles.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.black : styles.darkGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      
      </ButtonContainer>
      <ImageCon>
      {isGrid ? (
        posts && posts.map(p =>
          <SquarePhoto key={p.id} {...p} />
        )
      ) : (
        <MapViews />
      )}
      </ImageCon>
      <Profile>
        <Top>
          <ProfileImage>
            <Image 
              style={{height: 80, width: 80, borderRadius:30}}
              source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
          </ProfileImage>
        
          <NameCon>
            <NameBox>
              <BoldName>{username}</BoldName>
              <View/>
            </NameBox>
          </NameCon>
        </Top>


        <Bottom>
          <FollowCon>
            <FollowPick>
              <Text>Full Name </Text>
              <Bold>{fullName}</Bold>
            </FollowPick>
              
            <FollowPick>
              <Text>Following </Text>
              <Bold>{followingCount}</Bold>
            </FollowPick>
            <FollowPick>
              <Text>Follower </Text>
              <Bold>{followersCount}</Bold>
            </FollowPick>
            <FollowPick>
              <Text>게시물 </Text>
              <Bold>{postsCount}</Bold>
            </FollowPick>
          </FollowCon>
          <BioCon>
            <Bio>{bio}</Bio>
          </BioCon>
        </Bottom>
      </Profile>
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