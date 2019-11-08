import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    caption
    rating
    storeLocation
    storeName
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    isPicked
    pickCount
    comments {
      id
      text
      headComment
      user {
        id
        username
      }
    }
    createdAt
  }
`;
export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    isFollowing
    isSelf
    bio
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const POST_COMMENT = gql`
  fragment CommentParts on Comment {
    id
    user{
      id
      username
      avatar
    }
    post{
      id
      user{
        id
        username
        avatar
      }
      caption
      createdAt
    }
    text
    headComment
    createdAt
  }
`