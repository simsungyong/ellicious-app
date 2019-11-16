import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, View, Text} from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles";
import MessageRooms from "../../../components/MessageRooms";


const SEARCH = gql`
  {
    seeRooms {
      id
      participants {
        username
      }
    }
  }
`;

const MessagePresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };
  if(!loading) { console.log(data); }
  return (
    <ScrollView refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        // data &&
        // data.searchUser &&
        // data.searchUser.map(user => 
        //   <SearchAccountBox key={user.id} {...user} />
        <Text>hello world</Text>
      )}
    </ScrollView>
  );
};

MessagePresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default MessagePresenter;