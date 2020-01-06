import React from "react";
import { ScrollView, View, Button, Text } from "react-native";
import { gql } from "apollo-boost";
// import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import MessageRooms from "../../components/MessageComponents/MessageRooms";
import { mainPink } from "../../components/Color";

export const Messages = gql`
  {
    seeRooms {
      id
      participants {
        id
        username
        firstName
        avatar
      }
    }
  }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(Messages);
  if(!loading) {
    console.log(data.seeRooms)
  }
  return (
    <View>
      <ScrollView>
        {loading ? <Loader /> : data && data.seeRooms && data.seeRooms.map(room =>
          <MessageRooms key={room.id} {...room} />)}
      </ScrollView>
      <Button title="대화상대 추가"  onPress={() => navigation.navigate("MessageRoom")}></Button>
    </View>
  );
};