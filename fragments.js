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
    commentCount
    comments {
      id
      text
      user {
        id
        username
        avatar
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
    lastName
    firstName
    fullName
    isFollowing
    isSelf
    bio
    category{
      categoryName
      id
    }
    following{
      username
      avatar
      id
      isFollowing
    }
    followers{
      username
      avatar
      id
      isFollowing
    }
    followingCount
    followersCount
    categoryCount
    postsCount
    posts {
      id
      likeCount
      files{
        id
        url
      }
      pickCount
      commentCount
    }
  }`;

export const PICK_FRAGMENT = gql`
  fragment PickInfo on Pick {
    post {
      id
      storeLat
      storeLong
      rating
      storeLocation
      storeName
      files{
        url
        id
      }
      user{
        username
        avatar
        id
      }
    }
  }
`

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    categoryName
  }`

export const CATEGORYINFO_FRAGMENT = gql`
fragment CategoryInfo on Category {
    id
    categoryName
    posts{
      id
      storeName
      storeLocation
      storeLat
      storeLong
      rating
      files{
        id
        url
      }
    }
}`

export const POST_COMMENT = gql`
  fragment CommentParts on Comment {
    id
    user{
      id
      username
      avatar
    }
    headComment{
      id
    }
    post{
      id
    }
    text
    
    createdAt
  }
`



/*

childComment{
  id
  text
  user{
    username
    avatar
  }
}*/