import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
  query GetAllUsers($userInput: UserInput, $skip: Int, $take: Int) {
    getAllUsers(userInput: $userInput, skip: $skip, take: $take) {
      id
      userId
      fullName
      email
      gender
      role
      status
      userClass {
        id
        name
      }
    }
  }
`;
export const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($updateUserStatusId: ID!, $status: String!) {
    updateUserStatus(id: $updateUserStatusId, status: $status) {
      id
      userId
      fullName
      status
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;
export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID]!) {
    deleteUsers(ids: $ids)
  }
`;
