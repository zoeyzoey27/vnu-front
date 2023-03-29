import { gql } from "@apollo/client";

export const CREATE_MAJOR = gql`
  mutation CreateMajor($majorInput: MajorInput) {
    createMajor(majorInput: $majorInput) {
      id
      majorId
      name
      graduationDiploma
      time
    }
  }
`;
export const GET_MAJOR = gql`
  query GetMajor($getMajorId: ID!) {
    getMajor(id: $getMajorId) {
      id
      majorId
      name
      graduationDiploma
      time
    }
  }
`;
export const UPDATE_MAJOR = gql`
  mutation UpdateMajor(
    $updateMajorId: ID!
    $updateMajorInput: UpdateMajorInput
  ) {
    updateMajor(id: $updateMajorId, updateMajorInput: $updateMajorInput) {
      id
      majorId
      name
      graduationDiploma
      time
    }
  }
`;
