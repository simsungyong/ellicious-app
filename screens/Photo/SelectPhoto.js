import React,{useState, useEffect} from "react";
import {Image,ScrollView,TouchableOpacity} from 'react-native';
import { EvilIcons } from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { mainPink, TINT_COLOR } from "../../components/Color";

const View = styled.View`
  flex: 1;
`;
const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${mainPink};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-width:2;
  border-color: white;
`;


const Text = styled.Text`
  color: ${TINT_COLOR};
  font-weight: 600;
  `;

export default ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allPhotos, setAllPhotos] = useState();

  const changeSelected = (photo) => {
    setSelected(photo);
    //console.log(selected);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy:[[MediaLibrary.SortBy.creationTime, false]]
      });
      
      const [firstPhoto] = assets;
      
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  const askPermission = async()=>{
    try{
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if(status === "granted"){
        setHasPermission(true);
        getPhotos();
      }
    } catch(e){
      console.log(e);
      hasPermission(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate("Upload", { photo: selected });
  };

  useEffect(()=>{
    askPermission();
  },[]);
return(
  <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>

                <Image
                  style={{ width: constants.width, height: constants.height / 2 }}
                  source={{ uri: selected.uri }}
                />
              <Button onPress={handleSelected}>
                <Text>Next</Text>
              </Button>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  {allPhotos.map(photo => (
                    <TouchableOpacity
                      key={photo.id}
                      onPress={() => changeSelected(photo)}
                    >
                      <Image
                        source={{ uri: photo.uri }}
                        style={{
                          width: constants.width / 4,
                          height: constants.height / 8,
                          opacity: photo.id === selected.id ? 0.5 : 1
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};

/* 
<EvilIcons
  color={PointPink }
  size={20}
  name={"check" }
/>

나중에 사진 선택에 check아이콘 넣고, 
버튼에 next대신 선택한 사진 수 들어가게
*/