import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {

    render() {
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    //this.props.notifyChange(details.geometry.location);
                    
                }
                }

                query={{
                    key: 'AIzaSyDI0c6fpWeaxC1d82jjF5Q0gsjA3I6q4ac',
                    language: 'ko'
                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
            />
        );
    }
}
export default MapInput;