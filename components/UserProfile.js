import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserProfile = ({}) => null;

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired
        }).isRequired,
        files: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
          })
        ).isRequired,
        isLiked: PropTypes.bool.isRequired,
        isPicked: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
              id: PropTypes.string.isRequired,
              username: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired,
        caption: PropTypes.string.isRequired,
        storeLocation: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        category: PropTypes.shape({
            id: PropTypes.string.isRequired,
            categoryName: PropTypes.string.isRequired
        })
    })
  )
};

export default UserProfile;