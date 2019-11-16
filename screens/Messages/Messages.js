import React from "react";
import { ScrollView, View, Button } from "react-native";
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
    <View>
      <ScrollView>
        {loading ? <Loader /> : data && data.seeRooms && data.seeRooms.map(room =>
          <MessageRooms key={room.id} {...room} />)}
      </ScrollView>
      <Button title="대화상대 추가" onPress={() => navigation.navigate("MessageRoom")}></Button>
    </View>
  );
};