import React, { useState, useEffect,Component } from "react";
import styled from "styled-components";
import Loader from '../../components/Loader';
import axios from 'axios';
import PropTypes from 'prop-types';
import constants from "../../constants";
import MapStore from './MapStore';
import {Text, TouchableOpacity} from 'react-native'; //버튼
import { LightGrey, Grey } from "../../components/Color";


const Container = styled.View`
    flex:1;
`;
const Input = styled.TextInput`
    width: ${constants.width /1.1 };
    border-radius: 20px;
    padding : 10px;
    text-align:center;
    background-color : ${LightGrey};
    border-radius: 10px;
`;

const InputContainer = styled.View`
  align-items:center;
  padding:7px;

`;
const SearchResults = styled.ScrollView`
  margin-top: 15px;
`;

const MapPresenter =({ 
  loading, 
  searchTerm, 
  searchResults,
  photo,
  onSubmitEditing,  
  handleSearchUpdate })=>(
    <Container>
      <InputContainer>
        <Input
          onChangeText={handleSearchUpdate}
          value={searchTerm}
          returnKeyType={"search"}
          placeholder={"음식점을 등록해 주세요"}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={false}
        />
      </InputContainer>
      <SearchResults> 
        {loading ? <Loader/> : (
          <>
          <TouchableOpacity>
          {searchResults ? (
              searchResults && searchResults.map(store=>(
                <MapStore
                  photo={photo}
                  key={store.place_id}
                  place_id={store.place_id}
                  name={store.name}
                  formatted_address={store.formatted_address}/>
              ))
            ) : null}
            </TouchableOpacity>
          </>
        )}
      </SearchResults>
    </Container>);



MapPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    searchResults: PropTypes.array,
    searchTerm: PropTypes.string.isRequired,
    handleSearchUpdate: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func
  };
export default MapPresenter;
/*                
<View>
                {loading ? <Loader/> : (
                    <Text>complete</Text>/*
                    storeData.map(store=>(<MapStore
                                        key={store.place_id}
                                        place_id={store.place_id}
                                        name={store.name}
                                        formatted_address={store.formatted_address}
                                        />)))}
                                        </View>*/