import React, { useState } from "react";
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components'; //View, scrollview import안하고 styled만 임포트하면 쓸수잇다
import RecommendItem from './RecommendItem';
import {AntDesign, FontAwesome } from "@expo/vector-icons";
import { mainPink} from './Color';

const Container = styled.View`
    margin-vertical: 5px;
    `;
const ScrollView = styled.ScrollView``;

const Title = styled.Text`
    color: black;
    font-weight: 600;
    padding-left: 20px;
    margin-bottom: 5px;
    `;

const BoxHide = styled.View`
    flex-direction: row;
`

const Iconbox = styled.View`
    margin-left:10px;
`
const Refreshbox = styled.View`
    align-items: flex-end;
    margin-right: 15px;
    flex:1;
`
    
    const Section =({title, children, horizontal=true})=>{
        const [top10, setTop10] = useState(true);
        return(
        <Container>
            <BoxHide>
                <Title>{title}</Title>
                <Iconbox>
                <TouchableOpacity onPress={()=>setTop10(!top10)}>
                {top10 ? <AntDesign name={"up"} size={18}/> : <AntDesign name={"down"} size={20}/>}
                </TouchableOpacity>
                </Iconbox>
                
            </BoxHide>
            {top10 ? <ScrollView horizontal={horizontal}>{children}</ScrollView> : null}
            
        </Container>
        )
    };

    Section.propTypes = {
        children: PropTypes.oneOfType([ //children proptype검사하는 거 !! 복사해서쓰기
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        horizontal: PropTypes.bool,
        title: PropTypes.string.isRequired
    };
    
    export default Section;
    

    // <Refreshbox>
    //             <TouchableOpacity>
    //                 <FontAwesome name={"refresh"} color={mainPink} size={20}/>
    //             </TouchableOpacity>
    //             </Refreshbox>