import { gql } from "@apollo/client";

export const GET_STUDENT = gql`
  query GetStudent($getStudentId: ID!) {
    getStudent(id: $getStudentId) {
      id
      studentId
      name
      email
      gender
      phoneNumber
      address
      class {
        id
        name
      }
      major {
        id
        name
      }
    }
  }
`;