import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation UserChangePassword(
    $userChangePasswordId: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    userChangePassword(
      id: $userChangePasswordId
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;
