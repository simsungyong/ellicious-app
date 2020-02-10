import React, { useState, useEffect } from "react";
import { ScrollView, View, Button, Text, RefreshControl, Alert, TouchableOpacity } from "react-native";
import { gql } from "apollo-boost";
// import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import MessageRooms from "../../components/MessageComponents/MessageRooms";
import { mainPink } from "../../components/Color";
import firebase from 'firebase';
import User from '../../User'
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { SortBy } from "expo-media-library";




export default class Messages extends React.Component {
  state = {
    chatting: []
  }
  componentDidMount() {
    let dbRef = firebase.database().ref('users/' + User.userId + '/friends');
    dbRef.on("child_added", (val) => {
      let people = val.val()
      people.userId = val.key;
      this.setState((prevState) => {
        return {
          chatting: [...prevState.chatting, people]
        }
      })
    })
  }

  test() {
    let dbRef = firebase.database().ref('messages/' + User.userId).orderByChild('time');
    let user;
    dbRef.on("value", (val) => {
      val.forEach((item) => {
        let test = firebase.database().ref('messages/' + User.userId).child(item.key).limitToLast(1);
        test.on("child_added", (value) => {

        })
      })
    })
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
        onPress={() => this.props.navigation.navigate('MessageDetail', { userId: item.userId, username: item.ID })}>
        <Text style={{ fontSize: 20 }}>{item.ID}</Text>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.chatting}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.userId}
        />
        <View>

          <Button title="대화상대 추가" onPress={() => this.props.navigation.navigate("MessageRoom")}></Button>

             
        </View>
      </SafeAreaView >
    )
  }
  // const dbRef = firebase.database().ref('users/'+User.userId+'friends')
  // dbRef.on('child_added', (val) => {
  //   console.log(val)
  // })
  // console.log(User.username)

  // const [refreshing, setRefreshing] = useState(false);


  //   const refresh = async () => {
  //     try {
  //       setRefreshing(true);
  //       await refetch();

  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setRefreshing(false);
  //     }
  //   };

  //   return (
  //     <ScrollView>

  //         <View>

  //           <Button title="대화상대 추가" onPress={() => navigation.navigate("MessageRoom")}></Button>
  //         </View>
  //     </ScrollView>
  //   );


  //this.props.navigation.navigate("MessageRoom")}>

};