import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView, Text } from "react-native";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
  query seeUser($id: String!){
    seeUser(id: $id) {
      ...UserParts
      }
    }
    ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { id: navigation.getParam("id") }
  });
  console.log(data);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};