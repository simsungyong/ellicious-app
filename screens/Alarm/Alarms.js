import React,{useState}from "react";
import { ScrollView, RefreshControl} from 'react-native'
import styled from "styled-components";
import { Grey, TINT_COLOR } from "../../components/Color";
import gql from 'graphql-tag';
import { withNavigation } from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import {ALARM_FRAGEMENT} from '../../fragments';
import AlarmPart from './AlarmPart';

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
  
  )
}

export default withNavigation(Alarms);
