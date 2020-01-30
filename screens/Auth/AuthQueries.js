import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const ID_CHECK = gql`
  query checkAccount($account: String!){
    checkAccount(account: $account)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $password: String!) {
    confirmSecret(password: $password, email: $email)
  }
`;