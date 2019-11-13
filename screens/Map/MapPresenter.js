import React, { useState } from "react";
import { ScrollView, RefreshControl, Platform, View, Text} from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from '../../components/Loader';

const MapPresenter =({ term, shouldFetch })=>{
    const [refreshing, setRefreshing] = useState(false);
    

    
}


MapPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
  };
  
  export default MapPresenter;