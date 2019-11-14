import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { gql } from "apollo-boost";
// import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import MessageRooms from "../../components/MessageRooms";

export const Messages = gql`
  {
    seeRooms {
      id
      participants {
        id
        username
      }
    }
  }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(Messages);
  console.log(data)
  if(!loading) {
    console.log(data.seeRooms[0])
  }
  return (
    <ScrollView>
      <Text>hello world</Text>
      {loading ? <Loader /> : data && data.seeRooms && data.seeRooms.map(room =>
        <MessageRooms key={room.id} {...room} />)}
    </ScrollView>
  );
};