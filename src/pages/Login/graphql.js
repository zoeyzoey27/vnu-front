import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      id
      userId
      fullName
      email
      role
      token
    }
  }
`;
