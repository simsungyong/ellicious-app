import React from 'react';
import { View, Text, Dimensions , TextInput, AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import User from '../../../User'
export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('username', null)
        }
    }

    constructor(props){
        super(props);
        this.state={
            person:{
                userId: props.navigation.getParam('userId'),
                username: props.navigation.getParam('username')
            },
            textMessage: '',
            messageList:[]
        }
        //console.log(this.state.meName)
    }


    componentDidMount(){
        firebase.database().ref('messages').child(User.userId).child(this.state.person.userId)
        .on("child_added",(value)=>{
            this.setState((prevState)=>{
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    convertTime = (time)=>{
        let d = new Date(time);
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes()< 10 ? '0' : '') + d.getMinutes();
        return result;
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    getlast(){
        let a = firebase.database().ref('messages').child(User.userId).child(this.state.person.userId).limitToLast(1);
        a.on("child_added", (value)=>{
            console.log(value.val().message)
        })
    }

    sendMessage = async () => {
        let msgId = firebase.database().ref('messages').child(User.userId).child(this.state.person.userId).push().key;
        if(this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(User.userId).child(this.state.person.userId).push().key;
            let updates={};
            let message={
                message:this.state.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from: User.username
            }
            firebase.database().ref('users/'+User.userId+'/friends/'+this.state.person.userId).set({ID: this.state.person.username, userId: this.state.person.userId});
            firebase.database().ref('users/'+this.state.person.userId+'/friends/'+User.userId).set({ID: User.username, userId: User.userId});

            

            updates['messages/'+User.userId+'/'+this.state.person.userId+'/'+msgId] = message;
            updates['messages/'+this.state.person.userId+'/'+User.userId+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''})
        }
    }


    renderRow = ({item})=>{
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf: item.from === User.username ? 'flex-end' : 'flex-start',
                backgroundColor: item.from ===User.username ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee', padding:3,fontSize:12}}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }

    render() {
        let {height,width} = Dimensions.get('window');
        return (
            <SafeAreaView>
                <FlatList
                style={{padding:10, height: height*0.8}}
                data={this.state.messageList}
                renderItem={this.renderRow}
                keyExtractor={(item,index)=>index.toString()}/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                        placeholder="Type message..." />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text >Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

}