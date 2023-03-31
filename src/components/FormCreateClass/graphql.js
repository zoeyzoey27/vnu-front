import { gql } from "@apollo/client";

export const CREATE_CLASS = gql`
  mutation CreateClass($createClassInput: CreateClassInput) {
    createClass(createClassInput: $createClassInput) {
      id
      classId
      name
    }
  }
`;

export const GET_USER_LIST = gql`
  query GetAllUsers($userInput: UserInput, $skip: Int, $take: Int) {
    getAllUsers(userInput: $userInput, skip: $skip, take: $take) {
      id
      userId
      fullName
      role
      status
      userClass {
        id
        name
      }
    }
  }
`;
export const GET_STUDENT_LIST = gql`
  query GetAllStudents($studentInput: StudentInput, $skip: Int, $take: Int) {
    getAllStudents(studentInput: $studentInput, skip: $skip, take: $take) {
      id
      studentId
      name
      class {
        id
        name
      }
    }
  }
`;
export const UPDATE_CLASS = gql`
  mutation UpdateClass(
    $updateClassId: ID!
    $updateClassInput: UpdateClassInput
  ) {
    updateClass(id: $updateClassId, updateClassInput: $updateClassInput) {
      id
      classId
      name
      teacher {
        id
        fullName
      }
      students {
        id
        name
      }
    }
  }
`;
export const GET_CLASS = gql`
  query GetClass($getClassId: ID!) {
    getClass(id: $getClassId) {
      id
      classId
      name
      teacher {
        id
        fullName
      }
      students {
        id
        studentId
        name
      }
    }
  }
`;
