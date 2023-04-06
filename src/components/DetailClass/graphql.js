import { gql } from "@apollo/client";

export const GET_CLASS = gql`
  query GetClass($getClassId: ID!) {
    getClass(id: $getClassId) {
      id
      name
      students {
        id
        studentId
        name
      }
    }
  }
`;
