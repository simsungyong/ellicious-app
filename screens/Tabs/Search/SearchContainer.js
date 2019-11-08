import React, { useState  } from "react";
import { ScrollView, RefreshControl, Platform, View, Text} from "react-native";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";
import SearchAccountPresenter from "./SearchAccountPresenter";
import SearchStorePresenter from "./SearchStorePresenter";
import TopBarNav from 'top-bar-nav';
import styled from "styled-components";
import styles from "../../../styles";
import constants from "../../../constants";

const ButtonContainer = styled.View`
  padding-vertical: 5px;
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

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
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    const Scene = ({ index }) => (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        {
          (index == 1) ? 
            <SearchStorePresenter term={ term } shouldFetch={ shouldFetch } />
            :
            <SearchAccountPresenter term={ term } shouldFetch={ shouldFetch } />
          }
      </View>
    );
    
    const ROUTES = {
      Scene
      // ideally you would have a ROUTES object with multiple React component scenes
    };
    
    // There are three types of labels (image, text, and element)
    const ROUTESTACK = [
      // { image: require('../'), title: 'Scene' },
      { text: '계정', title: 'Scene' },
      // { element: <Text>World</Text>, title: 'Scene' },
      { text: '장소', title: 'Scene' }
    ];

    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <TopBarNav
          routeStack={ROUTESTACK}
          renderScene={(route, i) => {
            let Component = ROUTES[route.title];
            return <Component index={i} />;
          }}
          // headerStyle={[styles.headerStyle, { paddingTop: 30 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
          // labelStyle={styles.labelStyle}
          // underlineStyle={styles.underlineStyle}
          // imageStyle={styles.imageStyle}
          headerStyle={{ paddingTop: 10 }}
          sidePadding={40}
          inactiveOpacity={1}
          fadeLabels={true}
        />
      </View>
    )
  }
}