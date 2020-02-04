import React, { Suspense  } from "react";
import {  ActivityIndicator, View} from "react-native";
import MessageDetailPresenter from "./MessageDetailPresenter";

export default ({navigation})  => {
    const username = navigation.getParam("username");
    const roomId = navigation.getParam("roomId");
    const userId = navigation.getParam("userId");

    return (
        <View>
            <Suspense
                fallback={
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator />
                    </View>
                }
            >
                <MessageDetailPresenter username={username} userId={userId} roomId={roomId} />
            </Suspense>
        </View>
    )
}