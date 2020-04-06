//검색창 
import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import styles from "../../styles";
import { LightGrey } from "../Color";

const SearchBar = ({ onChange, value, onSubmit }) => (
    <TextInput
        style={{
            height: 35,
            backgroundColor: LightGrey,
            padding: 10,
            borderRadius: 5,
            textAlign: "center", 
            flex : 1,
            margin : 5
        }}
        returnKeyType="search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
        value={value}
        placeholder={"Search"}
        placeholderTextColor={styles.darkGreyColor}
    />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default SearchBar;