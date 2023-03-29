import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation RegisterUser($userRegisterInput: UserRegisterInput) {
    registerUser(userRegisterInput: $userRegisterInput) {
      userId
      fullName
      email
      password
      role
      status
      createdAt
    }
  }
`;
