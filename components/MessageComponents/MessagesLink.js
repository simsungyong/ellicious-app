import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import {AntDesign} from "@expo/vector-icons"
import { PointPink, mainPink, TINT_COLOR } from "../Color";
import User from '../../User';
import firebase from 'firebase';
import { AsyncStorage } from "react-native";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
const View =styled.View`

`;


class MessagesLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMs : 0
    }
    //console.log(this.state.meName)
  }


  componentDidMount=async()=>{
    let id = await AsyncStorage.getItem("userId")
    let people =[]
    if(id){
      let dbRef = firebase.database().ref('users/' + id + '/friends').orderByChild('isRead');
      dbRef.on("value", (val) => {
        val.forEach((item) => {
          if(item.val().isRead === false){
            people.push(item.val())
          }
        })
        this.setState({
            newMs: people.length
      })
      people= []
  })
}
}

  render(){
    return (
      <Container onPress={() => this.props.navigation.navigate("MessageNavigation")}>
    <View>
      <AntDesign
        color={TINT_COLOR}
        size={22}
        name={"message1"}
      />
    <Text>{this.state.newMs}</Text>
    </View>
  </Container>
    )
  }
}


export default withNavigation(MessagesLink);
