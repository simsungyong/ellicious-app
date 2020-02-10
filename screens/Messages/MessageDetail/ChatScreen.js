import React from 'react';
import { View, Text, Dimensions , TextInput, AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';

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
            messageList:[],
            meId:'ck24ln3jzud670b09fyije6pt',
            meName:'yong_ari'
        }
        //console.log(this.state.meName)
    }



    componentDidMount(){
        firebase.database().ref('messages').child(this.state.meId).child(this.state.person.userId)
        .on("child_added",(value)=>{
            this.setState((prevState)=>{
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    sendMessage = async () => {
        
        if(this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(this.state.meId).child(this.state.person.userId).push().key;
            let updates={};
            let message={
                message:this.state.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from: this.state.meName
            }
            firebase.database().ref('users/'+this.state.meId+'/friends/').set({ID: this.state.person.username});
            firebase.database().ref('users/'+this.state.person.userId+'/friends/').set({ID: this.state.meName});


            updates['messages/'+this.state.meId+'/'+this.state.person.userId+'/'+msgId] = message;
            updates['messages/'+this.state.person.userId+'/'+this.state.meId+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''})
        }
    }


    renderRow = ({item})=>{
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf: item.from === this.state.meName ? 'flex-end' : 'flex-start',
                backgroundColor: item.from ===this.state.meName ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee', padding:3,fontSize:12}}>{item.time}</Text>
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