import React, { Suspense  } from "react";
import { View, ActivityIndicator} from "react-native";
import MessageDetailPresenter from "./MessageDetailPresenter";
// import styled from "styled-components";
// import styles from "../../../styles";
// import constants from "../../../constants";
// import { PointPink, mainPink } from "../../../components/Color";


export default ({navigation})  => {
    const username = navigation.getParam("username");
    const roomId = navigation.getParam("roomId");
    const userId = navigation.getParam("userId");

    return (
        <View>
            <Suspense
                fallback={
                    <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                    <ActivityIndicator />
                    </View>
                }
                >
                <MessageDetailPresenter username={username} userId={userId} roomId={roomId} />
            </Suspense>
        </View>
    )
}