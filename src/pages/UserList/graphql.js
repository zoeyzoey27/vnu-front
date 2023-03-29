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
