import React from "react";

import styled from "styled-components";
import {PointPink} from "./Color";
import {FontAwesome } from "@expo/vector-icons";
import Stars from 'react-native-stars';

const StarView = styled.View`
    flex-direction: row;
    align-items: center;  
    justifyContent : center;
}
`
const Star = ({
    rating,
    color={PointPink},
    size=10,
    disabled=true
})=>{
    return(
        <StarView>
            <Stars
                default={rating}
                count={5}
                disabled={disabled}
                half={true}
                fullStar={<FontAwesome
                    color={color}
                    size={size}
                    name={"star"}
                />}
                emptyStar={<FontAwesome
                    color={color}
                    size={size}
                    name={"star-o"}
                />}
                halfStar={<FontAwesome
                    color={color}
                    size={size}
                    name={"star-half-empty"}
                />}
            />
        </StarView>
    )
}


export default Star;