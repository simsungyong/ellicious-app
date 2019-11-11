import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const MyProfile = gql`
  {
    myProfile {
      user {
        id
        avatar
        username
        firstName
        isSelf
        isFollowing
        bio
        posts {
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
          pickCount
          comments {
            id
            text
            user {
              id
              username
              avatar
            }
          }
          createdAt
        }
      }
    }
  }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(MyProfile);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.myProfile && <UserProfile {...data.myProfile.user} />}
    </ScrollView>
  );
};