import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CHILD_COMMENT } from "../../fragments";
import { gql } from "apollo-boost";

import Loader from '../../components/Loader';
import { useQuery } from "react-apollo-hooks";
import CommentInput from './CommentInput';


const Container = styled.View`

`;



const GET_CHILD_COMMENTS = gql`
    query seeChildComment($headComment: String){
      seeChildComment(headComment: $headComment){
            ...ChildCommentParts
        }
    }
    ${CHILD_COMMENT}
`;



const CommentModal = ({
  id
}) => {
  const {loading, data, refetch} = useQuery(GET_CHILD_COMMENTS, {
    variables: { headComment: id}
});
 

  

  return (
    <Container>
      {loading ? (<Loader/>) : (data&&data.seeChildComment.map(item=><CommentInput key={item.id}{...item}/>))}
    </Container>
  )
}


CommentModal.propTypes = {
  id: PropTypes.string.isRequired
}

export default CommentModal;
