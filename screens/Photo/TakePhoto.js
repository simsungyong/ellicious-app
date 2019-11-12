import React ,{useState,useEffect}from "react";
import {Image,ScrollView,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Ionicons} from '@expo/vector-icons';
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { Platform } from "@unimodules/core";
import styles from "../../styles";

const View = styled.View`
  
  flex: 1;
`;

const Icon = styled.View``;



const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const askPermission = async()=>{
    try{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);

      if(status === "granted"){
        setHasPermission(true);
      }
    } catch(e){
      console.log(e);
      setHasPermission(false);
    }finally{
      setLoading(false);
    }
  };

  const toggleType = ()=>{
    if(cameraType === Camera.Constants.Type.front){
      setCameraType(Camera.Constants.Type.back);
    }else{
      setCameraType(Camera.Constants.Type.front);
    }
  }
  useEffect(()=>{
    askPermission();
  },[]);

  return (
    <View>
      {loading ? (
        <Loader/>
      ): hasPermission ? (
      <Camera
      type={cameraType}
      style={{width: constants.width, height: constants.height/2}}>
        <TouchableOpacity onPress={toggleType}>
          <Icon>
            <Ionicons name={
              Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"} 
              size={28} 
              color={styles.blackColor}/>
            </Icon>
        </TouchableOpacity>
      </Camera>
      ): null}
  </View>
  )
}
  
