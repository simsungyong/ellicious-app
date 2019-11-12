import React ,{useState,useEffect}from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";

const View = styled.View`
  
  flex: 1;
`;




const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  const askPermission = async()=>{
    try{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);

      if(status === "granted"){
        setHasPermission(true);
      }
    } catch(e){
      console.log(e);
      setHasPermission(false);
    }
  };

  useEffect(()=>{
    askPermission();
  },[]);

  return (
    <View>
    <Camera
      style={{width: constants.width, height: constants.height/2}}/>
  </View>
  )
}
  
