import React, { useState, useEffect,Component } from "react";
import styled from "styled-components";
import Loader from '../../components/Loader';
import axios from 'axios';
import PropTypes from 'prop-types';
import constants from "../../constants";
import MapStore from './MapStore';
import {Text} from 'react-native'; //버튼


const Container = styled.View`
    flex:1;
`;
const Input = styled.TextInput`
    background-color: rgba(255,255,255,0.4);
    width: ${constants.width /1.6 };
    border-radius: 20px;
    padding : 10px;
    text-align:center;

`;

const InputContainer = styled.View`
    align-items:center;
    margin-vertical:20px;
`;
const SearchResults = styled.ScrollView`
    margin-top: 20px;
    `;

const MapPresenter =({ 
  loading, 
  searchTerm, 
  searchResults,
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
          autoCorrect={false}/>
      </InputContainer>
      <SearchResults> 
        {loading ? <Loader/> : (
          <>
          {searchResults ? (
              searchResults && searchResults.map(store=>(
                <MapStore
                  key={store.place_id}
                  place_id={store.place_id}
                  name={store.name}
                  formatted_address={store.formatted_address}/>

              ))
            ) : null}
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