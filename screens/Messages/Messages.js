import React, { useState, useEffect } from "react";
import { ScrollView, View, Button, Text, RefreshControl, Alert, TouchableOpacity } from "react-native";
import { gql } from "apollo-boost";
// import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { mainPink } from "../../components/Color";
import firebase from 'firebase';
import User from '../../User'
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { SortBy } from "expo-media-library";




export default class Messages extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Message"
    }
  }
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      chatting: [],
      dbRef : firebase.database().ref('users/' + User.userId + '/friends')
    }
    //console.log(this.state.meName)
  }

  componentWillUnmount(){
    this.state._isMounted = false;
  }

  componentDidMount() {
    this.state._isMounted = true;
    this.state.dbRef.orderByChild('recentTime').on("value", (val) => {
      let people = [];
      val.forEach((item) => {
        people.push(item.val())
      })

      //people.userId = val.key;
      if(this.state._isMounted === true){
        this.setState((prevState) => {
          return {
            chatting: people
          }
        })
      }
    })
  }
  // checkRead=(userId)=>{
  //     firebase.database().ref('users/' + User.userId + '/friends/' + userId).update({isRead:true});
  // }
  convertTime = (time) => {
    let now = new Date();
    let d = new Date(time);
    let result;
    if(now.getDay()===d.getDay()){
      result = "오늘 ";
    }else if(now.getDay()-d.getDay()===1){
      result = "어제 "
    }else{
      result = (d.getMonth()+1)+"월 "+(d.getDate()-1)+"일 "
    }
    result += (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return result;
  }
  // test() {
  //   let dbRef = firebase.database().ref('users').orderByChild('friends');
  //   dbRef.on("value", (val) => {

  //     val.forEach((item) => {
  //       if(item.val().ID === "yong_ari"){
  //         console.log(item.val());
  //       }
  //     })
  //     //   let test = firebase.database().ref('messages/' + User.userId).child(item.key).limitToLast(1);
  //     //   test.on("child_added", (value) => {

  //     //   })
  //     })
  //   }


  renderRow = ({ item }) => {

    return (
      <TouchableOpacity style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
        onPress={() => this.props.navigation.navigate('MessageDetail', { userId: item.userId, username: item.ID })}>
        
        {item.isRead ?
        <>
        <Text style={{ fontSize: 15}}>{item.ID}</Text>
          <Text style={{ fontSize: 13 }}>{item.recentMessage}</Text>
          <Text style={{ fontSize: 10 }}>{this.convertTime(item.recentTime)}</Text>
        </>
          :
          <>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>{item.ID}</Text>
          <Text style={{ fontSize: 13, fontWeight: "700" }}>{item.recentMessage}</Text>
          <Text style={{ fontSize: 10, fontWeight: "700" }}>{this.convertTime(item.recentTime)}</Text>
          </>
        }

        



      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView>
        <FlatList
          inverted
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