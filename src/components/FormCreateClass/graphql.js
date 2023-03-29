import { gql } from "@apollo/client";

export const CREATE_CLASS = gql`
  mutation CreateClass($createClassInput: CreateClassInput) {
    createClass(createClassInput: $createClassInput) {
      id
      classId
      name
    }
  }
`;

export const GET_USER_LIST = gql`
  query GetAllUsers($userInput: UserInput, $skip: Int, $take: Int) {
    getAllUsers(userInput: $userInput, skip: $skip, take: $take) {
      id
      userId
      fullName
      role
      status
      userClass {
        id
        name
      }
    }
  }
`;
