import React, { useState } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { mainPink, LightGrey } from "../Color";
import { FEED_QUERY } from '../../screens/Tabs/Home';
import { GET_USER } from '../../screens/UserDetail';

const SEE_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      isFollowing
    }
  }
`;

const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

const FollowButton =styled.TouchableOpacity`
  width: 70px;
  height: 27px;
  background-color: ${props=>props.backgroundColor};
  border-radius: 7px;
  alignItems: center;
  justifyContent: center;
  `;

const Container = styled.View`
  flex : 1;
  flex-direction: row;
`;
const UserInfo = styled.View`
`;

const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;
const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
`;
const Profile = styled.View`
  margin-right : 5px;
`;
const View = styled.View`
  flex : 1;
`;
const Button = styled.View`
  margin-right : 10px;
  alignItems: center;
  justifyContent: center;
`;



const SearchAccountBox = ({ navigation, username, firstName, avatar, id, isSelf, isFollowing }) => {
  const [followingConfirm, setFollowing] = useState(isFollowing);
  const [FollowMutation] = useMutation(FOLLOW, {
    variables: {
    id: id
    }, refetchQueries: ()=>[ {query: GET_USER, variables: {
      id: id
    }}]
  });

  const [UnFollowMutation] = useMutation(UNFOLLOW,  {
    variables:{
      id: id
    }, refetchQueries: ()=>[{query: FEED_QUERY, variables: {
      pageNumber: 0,
      items: 8
    }}, {query: GET_USER, variables: {
      id
    }}]
  });


  const handleFollow = async () =>{
    try{
      if(followingConfirm === true) {
        setFollowing(f => !f);
        await UnFollowMutation();
       
      } else {
        setFollowing(f => !f);
        await FollowMutation();
        
      }
    } catch (e) {}
  };
  if(isSelf){ return null }
  else {
  return (
    <Container>
      <TouchableOpacity onPress={() => {
        navigation.navigate("UserDetail", { id, username }) } } >
        <Header>
          <Profile>
          {avatar==null ? 
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={require("../../assets/defaultIcons.png")}
              />
            :
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={{uri: avatar}}
              />
            }
          </Profile>
          <UserInfo>
            <Bold>{ username }</Bold>
            <Text>{ firstName }</Text>
          </UserInfo>
        </Header>
      </TouchableOpacity>
      <View/>
      <Button>
        <FollowButton onPress={handleFollow} backgroundColor={followingConfirm ? LightGrey :mainPink }>
          <Text style={followingConfirm ? {color:"black"} : {color:"white"}}>Following</Text>
        </FollowButton>
      </Button>
    </Container>
  );
}};

SearchAccountBox.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  avatar: PropTypes.string,
  isSelf: PropTypes.bool,
  isFollowing: PropTypes.bool,

};

export default withNavigation(SearchAccountBox);