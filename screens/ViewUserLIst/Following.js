import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,TextInput,RefreshControl, KeyboardAvoidingView,Alert, TouchableOpacity, StyleSheet  } from "react-native";
import { POST_COMMENT } from "../../fragments";
import PostOfComment from '../../components/CommentComponents/PostOfComment';
import { PointPink, CommentsBox, mainPink, TINT_COLOR, Grey, LightPink } from "../../components/Color";

const Container = styled.View`
flex : 1;
padding : 15px;
`;

const Following=({
    navigation,
    id}) => {
    return(
        <Container>
            <Text>2</Text>
        </Container>
    )
};

export default Following;