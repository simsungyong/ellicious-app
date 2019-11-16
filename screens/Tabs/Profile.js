import React, { useEffect } from "react";
import { ScrollView, Text} from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";


export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}`
export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);
  return (
    <>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </>
  );
};