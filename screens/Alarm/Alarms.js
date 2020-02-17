import React,{useState}from "react";
import { Image,ScrollView, RefreshControl} from 'react-native'
import styled from "styled-components";
import { Grey, TINT_COLOR, LightGrey, LightPink } from "../../components/Color";
import gql from 'graphql-tag';
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import {ALARM_FRAGEMENT} from '../../fragments';
import AlarmPart from './AlarmPart';

const Container=styled.View`

`;

const Box = styled.View`
flex-direction : row;
padding : 10px;

`;

const TextCon=styled.View`
padding : 5px;
alignItems: flex-start;
flex :1;
`;

const Text = styled.Text`
color : ${TINT_COLOR};
`;
const Time = styled.Text`
color : ${Grey};
fontSize:15;
`;

const TimeCon = styled.View`
alignItems: flex-start;
flex : 1;
`;

const Bold = styled.Text`
fontWeight : 600;
color : ${TINT_COLOR};
`;

export const ALARM = gql`
  {
    getAlarm {
      ...AlarmParts
    }
  }
  ${ALARM_FRAGEMENT}
`;

const Alarms =({
  navigation
}) => {
  const {loading, data, refetch, fetchMore} = useQuery(ALARM)
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async() =>{
    try{
      setRefreshing(true);
      await refetch();
      
    }catch (e){
      console.log(e);
    }finally{
      setRefreshing(false);
    }
  };
  return(
    <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
        {loading ? (<Loader/>): data && data.getAlarm.map(item=> <AlarmPart key={item.id}{...item} />)}
      </ScrollView>
    /*
<Container>
    <Box style={{backgroundColor : LightPink}}>
      <Image 
      style={{height: 50, width: 50, borderRadius:19}}
      source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
      <TextCon>
        <Text style={{fontSize:17}}>
          <Bold>dae.yum</Bold>
          님이 팔로우를 시작했습니다.
        </Text>
        <TimeCon>
          <Time>5 분전 </Time>
        </TimeCon>
      </TextCon>
    </Box>

    <Box  style={{backgroundColor : LightPink}}>
      <Image 
      style={{height: 50, width: 50, borderRadius:19}}
      source={{uri: "https://scontent.ficn6-1.fna.fbcdn.net/v/t1.0-9/66458354_614447625745585_1475234847139037184_n.jpg?_nc_cat=110&_nc_oc=AQnxRw7aY0QOXr7Ai9jIzPDD0rZdavHqKOLlffwz3F8aVfgpn9Doo34K50YMXl76n3M&_nc_ht=scontent.ficn6-1.fna&oh=6f574090dce248a20033fe6018460390&oe=5E485E6F"}}/>
      <TextCon>
        <Text style={{fontSize:17}}>
          <Bold>20._.min</Bold>
          님이 게시글을 좋아합니다.
        </Text>
        <TimeCon>
          <Time>8 분전 </Time>
        </TimeCon>
      </TextCon>
    </Box>
    <Box>
      <Image 
      style={{height: 50, width: 50, borderRadius:19}}
      source={{uri: "http://handpizza.co.kr/images/m41/m41_05.jpg"}}/>
      <TextCon>
        <Text style={{fontSize:17}}>
          <Bold>yong_ari</Bold>
          님이 게시글을 콕 집어 갔습니다.
        </Text>
        <TimeCon>
          <Time>1 시간 전 </Time>
        </TimeCon>
      </TextCon>
    </Box>
    <Box style={{backgroundColor : LightPink}}>
      <Image 
      style={{height: 50, width: 50, borderRadius:19}}
      source={{uri: "http://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg"}}/>
      <TextCon>
        <Text style={{fontSize:17}}>
          <Bold>jun_ha</Bold>
          님이 댓글을 남겼습니다.
        </Text>
        <TimeCon>
          <Time>2 시간 전 </Time>
        </TimeCon>
      </TextCon>
    </Box>
    <Box>
      <Image 
      style={{height: 50, width: 50, borderRadius:19}}
      source={{uri: "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile25.uf.tistory.com%2Fimage%2F9970EA485B05356F0EBF04"}}/>
      <TextCon>
        <Text style={{fontSize:17}}>
          <Bold>hong_jjun</Bold>
          님이 댓글을 남겼습니다.
        </Text>
        <TimeCon>
          <Time>3 시간 전 </Time>
        </TimeCon>
      </TextCon>
    </Box>
  </Container>*/
  )
}

export default withNavigation(Alarms);
