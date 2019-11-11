import React, { useState } from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Platform } from "@unimodules/core";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

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
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}
        />
        <HeaderColumn>
          {/* <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats> */}
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{username}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
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
      {posts &&
        posts.map(p =>
          isGrid ? (
            <SquarePhoto key={p.id} {...p} />
          ) : (
            <Post key={p.id} {...p} />
          )
        )}
    </View>
  )
};

UserProfile.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  firstName: PropTypes.string,
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
        isLiked: PropTypes.bool.isRequired,
        isPicked: PropTypes.bool.isRequired,
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
        createdAt: PropTypes.string.isRequired,
        category: PropTypes.shape({
            id: PropTypes.string.isRequired,
            categoryName: PropTypes.string.isRequired
        })
    })
  )
};

export default UserProfile;