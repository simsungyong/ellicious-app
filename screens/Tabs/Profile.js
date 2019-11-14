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
        bio
        following{
          id
        }
        followers{
          id
        }
      }
      posts {
        id
        caption
        rating
        storeLocation
        storeName
        user {
          id
          }
        files {
          id
          url
          }
        likeCount
        pickCount
        }
      categories{
        id
        }
      picks{
        id
        }
      }
    }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(MyProfile);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.myProfile && <UserProfile {...data.myProfile} />}
    </ScrollView>
  );
};