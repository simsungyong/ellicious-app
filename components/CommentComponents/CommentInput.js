import React, { useState } from "react";
import { Image} from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import { EvilIcons } from "@expo/vector-icons";

import PopUpModal from '../../components/PopUpModal';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  margin-bottom: 10px;
`;

const CaptionCon = styled.View`
  flex-direction: row; 
  alignItems: center;
  margin-left : 15px;
  margin-top : 5px;
`;

const Caption = styled.Text`
`;


const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-left: 5px;
  justifyContent : flex-end;
  margin-right : 5px;
`;
const TimeView = styled.View`
  justifyContent : flex-end;
  flex-direction: row; 
  flex:1
`
const Timebox = styled.Text`
  opacity: 0.5;
  margin-right: 10px;
  font-size: 11px;
`;

const DelBot = styled.View`
  margin-right:10px;
  `



const CommentInput = ({
  id,
  user,
  handleDelete,
  display,
  headComment,
  post,
  text,
  isLiked,
  likeCount,
  createdAt,
  navigation
}) => {
  const time = moment(createdAt).startOf('minute').fromNow();
  const [popup, setPopup] = useState(false);

  const handleModal = async()=>{
    await setPopup(!popup)
  }

  const handleDeleteChild = async(childId)=>{
    await handleDelete(childId)
  }

  return (
    <Container>
      <CaptionCon>
        <Touchable>
          {user.avatar==null ? 
            <Image
            style={{height: 25, width: 25, borderRadius:15}}
              source={require("../../assets/defaultIcons.png")}
            />
          :
            <Image
              style={{height: 25, width: 25, borderRadius:15}}
              source={{uri: user.avatar}}
            />
          }
        </Touchable>
        <Touchable>
          <Bold>{user.username}</Bold>
        </Touchable>
        <Caption>{text}</Caption>
        <TimeView>
          <Timebox>{time}</Timebox>
          {user.isSelf ?
          <DelBot>
          <Touchable onPress={handleModal}>
            <EvilIcons name={"trash"} size={20}/>
          </Touchable>
          </DelBot> : null}
        </TimeView>
      </CaptionCon>
      <PopUpModal display={popup} setModal={handleModal} handleDelete={handleDeleteChild} child={id}/>
    </Container>
  )
}


CommentInput.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  headComment: PropTypes.shape({
    id: PropTypes.string
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired
}

export default CommentInput;
