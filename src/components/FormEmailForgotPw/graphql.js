import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetAllUsers($userInput: UserInput, $skip: Int, $take: Int) {
    getAllUsers(userInput: $userInput, skip: $skip, take: $take) {
      id
      email
      fullName
    }
  }
`;
