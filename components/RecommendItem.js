import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styled from 'styled-components';
import {withNavigation} from 'react-navigation';
import { mainPink } from './Color';

const ImageCon = styled.View`
    margin-bottom: 5px;
    
`;

const Image = styled.Image`
  width: 75;
  height: 75;
  borderRadius:25;
  position : relative;
  borderColor:${mainPink};
    borderWidth:2.5;
`;
const Container = styled.TouchableOpacity`
    align-items: center;
    margin-horizontal:15px;
    `;
const RecommendItem = ({
    id,
    avatar,
    username,
    horizontal=false,
    navigation
}) =>{
    return(
    <Container onPress={() =>
        navigation.navigate("UserDetail", { id, username })
      }>
        <ImageCon>
        {avatar == null ?
            <Image
              source={require("../assets/defaultIcons.png")}
            />
            :
            <Image
              source={{ uri: avatar }}
            />
          }
        </ImageCon>
        <Text style={{fontWeight:"500", fontSize:12}}>{username}</Text>
    </Container>
    )
}


RecommendItem.propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string, 
    username: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    };

export default withNavigation(RecommendItem);