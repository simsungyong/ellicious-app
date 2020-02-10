import React, { useState, useEffect } from "react";
import { ScrollView, View, Button, Text, RefreshControl, Alert } from "react-native";
import { gql } from "apollo-boost";
// import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import MessageRooms from "../../components/MessageComponents/MessageRooms";
import { mainPink } from "../../components/Color";
import firebase from 'firebase';

export const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants {
        id
        username
        firstName
        avatar
        isSelf
      }
    }
  }
`;


export default ({ navigation }) => {
  const dbRef = firebase.database().ref('users')
  dbRef.on('value', (val) => {
  })

  
  const [refreshing, setRefreshing] = useState(false);

    const { loading, data, refetch } = useQuery(SEE_ROOMS);

    const refresh = async () => {
      try {
        setRefreshing(true);
        await refetch();

      } catch (e) {
        console.log(e);
      } finally {
        setRefreshing(false);
      }
    };

    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
        {loading ? <Loader /> : (
          <View>
            {
              data && data.seeRooms && data.seeRooms.map(room =>
                <MessageRooms key={room.id} {...room} />)
            }
            <Button title="대화상대 추가" onPress={() => navigation.navigate("MessageRoom")}></Button>
          </View>
        )}
      </ScrollView>
    );
  



};