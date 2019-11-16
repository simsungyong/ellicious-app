import React, { useState  } from "react";
import { ScrollView, RefreshControl, Platform, View, Text, StyleSheet} from "react-native";
import SearchBar from "../../../components/SearchBar";
import MessagePresenter from "./MessagePresenter";
import styled from "styled-components";
import styles from "../../../styles";
import { PointPink, mainPink } from "../../../components/Color";


export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    )
  });
  constructor(props) {
      super(props);
      const { navigation } = props;
      this.state = {
        term: "",
        shouldFetch: false
      };
      navigation.setParams({
        term: this.state.term,
        onChange: this.onChange,
        onSubmit: this.onSubmit
      });
  }
  onChange = text => {
      const { navigation } = this.props;
      navigation.setParams({
        term: text
      });
      if(text.length == 0) {
        this.setState({ term: text, shouldFetch: false });
      } else this.setState({ term: text, shouldFetch: true });
  };
  onSubmit = () => {
    
  };
  render() {
    const { term, shouldFetch } = this.state;
    
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <MessagePresenter term={ term } shouldFetch={ shouldFetch } />
      </View>
    )
  }
}
