import React, { useState } from "react";
import { Image, Platform, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import { Ionicons, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo-hooks";
import { IconColor, StarColor, TINT_COLOR, Grey, PointPink, BG_COLOR, LightGrey, Line, LightPink, mainPink } from '../../components/Color';
import { withNavigation } from "react-navigation";
import { ALARM_FRAGEMENT } from '../../fragments';

const Container = styled.View`
  flex : 1;
  flex-direction: row;
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
const CheckingView = styled.View`
    
`;
const CHECK_ALARM = gql`
    mutation checkAlarm ($alarmId: String!, $check: Boolean!){
        checkAlarm (alarmId: $alarmId, check: $check) {
            id
        }
    }
`;
const ALARM = gql`
  {
    getAlarm {
      ...AlarmParts
    }
  }
  ${ALARM_FRAGEMENT}
`;

const AlarmPart = ({
    id,
    category,
    check,
    from,
    post,
    navigation
}) => {

    const [checkAlarmMutation] = useMutation(CHECK_ALARM)

    const checkAlarms = async () => {
        await checkAlarmMutation({
            variables: {
                alarmId: id,
                check: true
            }, refetchQueries: () => [{ query: ALARM }]
        })
        navigation.navigate("Detail", { id: post.id })
    }

    const checkFollow = async () => {
        await checkAlarmMutation({
            variables: {
                alarmId: id,
                check: true
            }, refetchQueries: () => [{ query: ALARM }]
        })
        navigation.navigate("UserDetail", { id: from.id, username: from.username })
    }

    const KindType = ({ category, from }) => {
        switch (category) {
            case ('like'):
                return (
                    <CheckingView backgroundColor={check ? null : "red"}>
                        <TouchableOpacity onPress={checkAlarms}>
                            <Header>
                                <Text>{from.username}님이 맛집 게시물을 좋아해요! </Text>
                                <Image
                                    source={{ uri: post.files[0].url }}
                                    style={{ width: 70, height: 70 }}
                                />
                            </Header>
                        </TouchableOpacity>
                    </CheckingView>
                )
            case ('comment'):
                return (
                    <CheckingView backgroundColor={check ? null : "red"}>
                        <TouchableOpacity onPress={checkAlarms}>
                            <Header>
                                <Text>{from.username}님이 맛집 게시물에 댓글을 달았어요! </Text>
                                <Image
                                    source={{ uri: post.files[0].url }}
                                    style={{ width: 70, height: 70 }}
                                />
                            </Header>
                        </TouchableOpacity>
                    </CheckingView>
                )
            case ('pick'):
                return (
                    <CheckingView backgroundColor={check ? null : "red"}>
                        <TouchableOpacity onPress={checkAlarms}>
                            <Header>
                                <Text>{from.username}님이 맛집 게시물을 콕! 집었어요 </Text>
                                <Image
                                    source={{ uri: post.files[0].url }}
                                    style={{ width: 70, height: 70 }}
                                />
                            </Header>
                        </TouchableOpacity>
                    </CheckingView>
                )
            case ('follow'):
                return (
                    <CheckingView backgroundColor={check ? null : "red"}>
                        <TouchableOpacity onPress={checkFollow}>
                            <Header>
                                <Text>{from.username}님이 팔로우를 했어요! </Text>
                                <Image
                                    source={{ uri: from.avatar }}
                                    style={{ width: 70, height: 70 }}
                                />
                            </Header>
                        </TouchableOpacity>
                    </CheckingView>
                )
        }
    }
    return (
        <Container>
            <KindType category={category} from={from} />
        </Container>
    )


}


AlarmPart.propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            })
        )
    }),
    category: PropTypes.string.isRequired,
    check: PropTypes.bool.isRequired
}
export default withNavigation(AlarmPart);
