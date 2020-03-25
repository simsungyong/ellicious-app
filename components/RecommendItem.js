import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styled from 'styled-components';
import {withNavigation} from 'react-navigation';

const ImageCon = styled.View`
    margin-bottom: 5px;
`;

const Image = styled.Image`
  width: 90;
  height: 90;
  borderRadius:30;
  position : relative;
`;
const Container = styled.TouchableOpacity`
    align-items: center;
    margin-horizontal:15px;
    `;  //View flex 디폴트는 column
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
              source={{ uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704" }}
            />
            :
            <Image
              source={{ uri: avatar }}
            />
          }
        </ImageCon>
        <Text style={{fontWeight:"500"}}>{username}</Text>
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