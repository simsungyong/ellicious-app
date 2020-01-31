import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $cellPhone: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      phoneNum: $cellPhone
      password: $password
      firstName: $firstName
      lastName: $lastName
    )
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