import React from "react";
import {Alert } from "react-native"
import Post from "./Post";

export default class PostUpdate extends React.PureComponent {
    
    shouldComponentUpdate(nextProps) {
        return this.props.item !== nextProps.item
    }

    render() {
        // Alert.alert(this.props.item.storeName)
        return <Post key={this.props.item}{...this.props.item} />
    }
}