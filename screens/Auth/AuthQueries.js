import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../../fragments";

export const REQUEST_SECRET = gql`
  mutation requestSecret($phoneNum: String!) {
    requestSecret(phoneNum: $phoneNum)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $cellPhone: String!
    $password: String!
    $firstName: String
    $lastName: String
    $username: String!
  ) {
    createAccount(
      phoneNum: $cellPhone
      password: $password
      firstName: $firstName
      lastName: $lastName
      username: $username
    ) {
      id
      username
    }
  } 
`;

export const CHECK_USERNAME = gql`
  query checkUsername($term: String!){
    checkUsername(term: $term)
  }
`;

export const ID_CHECK = gql`
  query checkAccount($cellPhone: String!){
    checkAccount(phoneNum: $cellPhone)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($cellPhone: String!, $password: String!) {
    confirmSecret(password: $password, phoneNum: $cellPhone)
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($phoneNum: String!, $password: String!) {
    updatePassword(phoneNum: $phoneNum, password: $password)
  }
`;


export const POST_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;


export const FEED_QUERY = gql`
  query seeFeed($pageNumber: Int!, $items: Int!){
    seeFeed(pageNumber: $pageNumber, items: $items){
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`
