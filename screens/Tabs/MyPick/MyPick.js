import React, { useEffect } from "react";
import { gql } from "apollo-boost";
//import {NavigationEvents} from 'react-navigation';
import { useQuery } from "react-apollo-hooks";
import {
  StyleSheet,
  View
} from "react-native";
// import MapViewPick from '../../../components/MapView/MapViewPick';
import Loader from "../../../components/Loader";
import { PICK_FRAGMENT } from '../../../fragments';
import MyPickPresenter from './MyPickPresenter';

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(120,3,150, 0.9)",
  },
})

const region = {
  latitude: 37.6247855,
  longitude: 127.0773206,
  latitudeDelta: 0.047864195044303443,
  longitudeDelta: 0.0540142817690068,
};

export const GET_PICK = gql`
  {
    seePick {
        ...PickInfo
    }
  } ${PICK_FRAGMENT}
`;

const MyPick = ({ navigation }) => {
  const { loading, data, refetch } = useQuery(GET_PICK);
  useEffect(() => {
    refetch();
  },[data])

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : <MyPickPresenter navigation={navigation} marker={data.seePick} region={region} />}
    </View>
  )
}

export default MyPick;