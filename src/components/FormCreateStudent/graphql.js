import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($createStudentInput: CreateStudentInput) {
    createStudent(createStudentInput: $createStudentInput) {
      id
      studentId
      name
      gender
      phoneNumber
      address
      class {
        id
        name
      }
      major {
        majorId
        name
      }
    }
  }
`;
export const GET_MAJOR_LIST = gql`
  query GetAllMajors($name: String, $skip: Int, $take: Int) {
    getAllMajors(name: $name, skip: $skip, take: $take) {
      id
      majorId
      name
      graduationDiploma
      time
    }
  }
`;

