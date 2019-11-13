import React, { Component,useState } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    AppRegistry,
    TextBase
  } from 'react-native';
import SearchBar from "../../components/SearchBar";
import MapPresenter from './MapPresenter';


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

    render(){
        const { term, shouldFetch } = this.state;
        
        <MapPresenter term={ term } shouldFetch={ shouldFetch } />
        return(
            <View style={{ flex: 1, justifyContent: 'center'}}>
            </View>
        )
    }
    }

    /*
    state = {
        region: {},
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    onMapRegionChange(region) {
       
        this.setState({ region });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 4 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            </View>
        );
    }
}

export default MapContainer;*/