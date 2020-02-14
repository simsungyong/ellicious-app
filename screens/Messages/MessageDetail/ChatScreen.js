import React from 'react';
import { View, KeyboardAvoidingView,Platform,Animated, Text,StyleSheet, Dimensions, TextInput, Keyboard, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import {FontAwesome} from '@expo/vector-icons';
import User from '../../../User'
import styled from "styled-components";
import { TINT_COLOR } from '../../../components/Color';
import { GiftedChat } from 'react-native-gifted-chat';
const Image = styled.Image`
height: 25
width: 25
borderRadius:7.5
margin-right : 2px;
`;

const Img = styled.View`
margin-right : 3px;
`;

const isIOS = Platform.OS === 'ios';

export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 30, color: TINT_COLOR, fontWeight: "200" }}>
                    {navigation.getParam('username')}
                </Text>
            </View>
        ),
        // return {
        //     title: navigation.getParam('username', null)
        // }
    });
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            person: {
                userId: props.navigation.getParam('userId'),
                username: props.navigation.getParam('username'),
                avatar: props.navigation.getParam('avatar'),
            },

            //firstchatting: props.navigation.getParam('firstchatting'),
            textMessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages')
        }
        
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(60);
        //console.log(this.state.meName)
    }
    componentWillUnmount() {
        if (this.state.messageList.length > 0) {
            firebase.database().ref('users/' + User.userId + '/friends/' + this.state.person.userId).update({ isRead: true });
        }
        this.state._isMounted = false;
    }

    componentDidMount() {
        this.state._isMounted = true;
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true));
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e, false));
        this.state.dbRef.child(User.userId).child(this.state.person.userId)
            .on("child_added", (value) => {
                if(this.state._isMounted=== true){
                    this.setState((prevState) => {
                        return {
                            messageList: [...prevState.messageList, value.val()]

                        }
                    })
                }
            })

    }

    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 60 : 80;
        let bottomOS = isIOS ? 120: 140;
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? heightOS : 0
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? bottomOS : 60
            })
        ]).start();
    }
    convertTime = (time) => {
        let d = new Date(time);
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        return result;
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    // getlast() {
    //     let a = firebase.database().ref('messages').child(User.userId).child(this.state.person.userId).limitToLast(1);
    //     a.on("child_added", (value) => {
    //         console.log(value.val().message)
    //     })
    // }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {

            let msgId = this.state.dbRef.child(User.userId).child(this.state.person.userId).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.username,
            }
            let recentMessage = message.message;
            let recentTime = message.time
            firebase.database().ref('users/' + User.userId + '/friends/' + this.state.person.userId).set({ ID: this.state.person.username, userId: this.state.person.userId, recentTime: recentTime, recentMessage: recentMessage, isRead: false });
            firebase.database().ref('users/' + this.state.person.userId + '/friends/' + User.userId).set({ ID: User.username, userId: User.userId, recentTime: recentTime, recentMessage: recentMessage, isRead: false });


            updates[User.userId + '/' + this.state.person.userId + '/' + msgId] = message;
            updates[this.state.person.userId + '/' + User.userId + '/' + msgId] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });

        }
    }


    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.username ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.username ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                {item.from === User.username ? null :
                    (
                        <Img>
                            {this.state.person.avatar == null ?
                                <Image
                                    source={{ uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704" }}
                                />
                                :
                                <Image
                                    source={{ uri: this.state.person.avatar }}
                                />
                            }
                        </Img>
                    )
                }

                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <Animated.View style={[styles.bottomBar, { bottom: this.keyboardHeight }]} >
                    <TextInput
                        style={styles.inputMessage}
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                        placeholder="Type message..." />
                    <TouchableOpacity onPress={this.sendMessage} style={styles.sendButton}>
                        <FontAwesome name={"send-o"} size={20}/>
                    </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ref={ref=> this.flatList =ref}
                    onContentSizeChange={()=> this.flatList.scrollToEnd({animated:true})}
                    onLayout={()=>this.flatList.scrollToEnd({animated: true})}
                    style={{ paddingTop:5, paddingHorizontal: 5, height}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    ListFooterComponent={<Animated.View style={{height: this.bottomPadding}}/>}
                    keyExtractor={(item, index) => index.toString()} />

            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        height: 60
    },
    inputMessage:{
        padding: 10,
        borderWidth:1,
        borderColor:'#ccc',
        width: '80%',
        marginBottom : 10,
        borderRadius:5
    },
    sendButton:{
        alignItems:'center',
        marginBottom: 10,
        marginLeft:10,
        height:40, width:40,
        paddingTop:10, paddingLeft:5,
        backgroundColor : '#2196F3',
        borderRadius:20
    }
})