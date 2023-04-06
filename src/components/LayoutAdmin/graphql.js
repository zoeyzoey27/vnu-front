import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      userId
      fullName
      email
      gender
      phoneNumber
      address
      role
    }
  }
`;
export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $updateUserInput: UpdateUserInput) {
    updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
      id
      userId
      fullName
      email
      gender
      phoneNumber
      role
      address
    }
  }
`;
