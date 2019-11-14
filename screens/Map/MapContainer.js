import React, { Component,useState } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    AppRegistry,
    TextBase,
    TouchableOpacity
  } from 'react-native';
import Loader from '../../components/Loader';
import MapPresenter from './MapPresenter';
import MapStore from './MapStore';
import axios from 'axios';
import {search} from '../../api';


export default class MapContainer extends React.Component {
    state={
        loading : false,
        searchTerm:"",
        error:null,
        searchResults:null,
        place_id:null
    };
    onSubmitEditing=async()=>{
        const {searchTerm} = this.state;
        if(searchTerm !==""){
            let loading, searchResults, error;
            this.setState({
                loading:true
            });
            try{
                ({
                    data:{results: searchResults}}
                    = await search.searchStore(searchTerm));
                } catch{
                    error:"can't search"
                }finally{
                    console.log(searchResults);
                    this.setState({
                        loading:false,
                        searchResults,
                        error
                    });
                }
            }
        }
        handleSearchUpdate = text=>{
            this.setState({
                searchTerm:text
            })
        }
        render(){
            const{loading, searchResults, searchTerm} = this.state;
            return (
            <View>
                <MapPresenter
                loading={loading}
                searchResults={searchResults}
                searchTerm={searchTerm}
                onSubmitEditing={this.onSubmitEditing}
                handleSearchUpdate={this.handleSearchUpdate}/>
            </View>)
        }
    }

    