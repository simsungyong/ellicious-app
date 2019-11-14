import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Platform } from "@unimodules/core";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import MapViews from "./MapViews";
import FollowButton from '../components/FollowButton'
import Hr from "hr-native";
import { LightPink, Grey, IconColor } from "./Color";

const Container = styled.View`
  flex : 1;
`;
const PostCon = styled.View`
  flex-direction: row;
  height : ${constants.height /2}
`;
const Profile = styled.View`
  flex-direction: row;
  padding : 5px;
  flex : 1;
`;
const ProfileImage = styled.View`
  alignItems: center;
  justifyContent: center;
`;
const InfoCon = styled.View`

`;
const NameCon = styled.View`
  flex : 1;
  alignItems: center;
  justifyContent: center;
  padding : 10px;
`;
const NameBox = styled.View`
  flex-direction: row;
  margin-bottom : 5px;
  margin-left : 10px;
  alignItems: center;
  justifyContent: center;
`;
const View = styled.View`
  flex : 1;
`;

const FollowCon = styled.View`
  alignItems: center;
  justifyContent: space-around;
  flex-direction: row;
  background-color : ${LightPink};
  padding : 10px;
`;

const Bold = styled.Text`
  font-weight: 600;
  font-size : 20;
`;
const Text = styled.Text`
  color : ${Grey}
`;

const FollowPick = styled.View`
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  margin-left : 10px;
`;

const UserProfile = ({
  id,
  avatar,
  username,
  firstName,
  isSelf,
  isFollowing,
  bio,
  posts
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid(i => !i);
  return (
    <Container>
      <Profile>
        <Set>
          <AntDesign  
            color={Grey}
            size={20}
            name={"setting"}
            />
        </Set>
          <ProfileImage>
            <Image 
              style={{height: 80, width: 80, borderRadius:30}}
              source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
          </ProfileImage>
        
          <NameCon>
            <NameBox>
              <Bold>{username}</Bold>
              <Text>{bio}</Text>
            </NameBox>
          </NameCon>

          <FollowCon>
            <FollowPick>
              <Text>Following </Text>
              <Bold>100</Bold>
            </FollowPick>
            <FollowPick>
              <Text>Follower </Text>
              <Bold>100</Bold>
            </FollowPick>
            <FollowPick>
              <Text>My Pick </Text>
              <Bold>100</Bold>
            </FollowPick>
          </FollowCon>
      </Profile>

      <PostCon>
        {isGrid ? (
          posts && posts.map(p =>
            <SquarePhoto key={p.id} {...p} />
          )
        ) : (
          <MapViews />
        )}
        <View/>
      </PostCon>

    </Container>
  )
};

UserProfile.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  fullName: PropTypes.string,
  isFollowing: PropTypes.bool,
  isSelf: PropTypes.bool,
  bio: PropTypes.string,
  // following: PropTypes.string.isRequired,
  // followers: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired
        }).isRequired,
        files: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
          })
        ).isRequired,
        isLiked: PropTypes.bool,
        isPicked: PropTypes.bool,
        rating: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
              id: PropTypes.string.isRequired,
              username: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired,
        caption: PropTypes.string.isRequired,
        storeLocation: PropTypes.string,
        storeName: PropTypes.string,
        likeCount: PropTypes.number,
        pickCount: PropTypes.number,
        createdAt: PropTypes.string.isRequired,
        // category: PropTypes.shape({
        //     id: PropTypes.string.isRequired,
        //     categoryName: PropTypes.string.isRequired
        // })
    })
  )
};

export default UserProfile;
