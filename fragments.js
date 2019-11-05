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
      user {
        id
        username
      }
    }
    createdAt
  }
`;