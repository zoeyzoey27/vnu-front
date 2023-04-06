import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetPasswordId: ID!, $password: String!) {
    resetPassword(id: $resetPasswordId, password: $password)
  }
`;
