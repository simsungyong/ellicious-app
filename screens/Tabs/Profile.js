import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const MyProfile = gql`
  {
    myProfile {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(MyProfile);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.myProfile && <UserProfile {...data.myProfile} />}
    </ScrollView>
  );
};