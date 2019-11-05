import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
//import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import PostOfComment from "../components/PostOfComment";

const GET_COMMENTS = gql`
    query seeComment($postId: String!){
        
    }
`
