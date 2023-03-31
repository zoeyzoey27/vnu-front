import { gql } from "@apollo/client";

export const GET_CLASS_LIST = gql`
  query GetAllClasses($className: String, $skip: Int, $take: Int) {
    getAllClasses(className: $className, skip: $skip, take: $take) {
      id
      classId
      name
    }
  }
`;
export const GET_STUDENT_LIST = gql`
  query GetAllStudents($studentInput: StudentInput, $skip: Int, $take: Int) {
    getAllStudents(studentInput: $studentInput, skip: $skip, take: $take) {
      id
      studentId
      name
      gender
      major {
        id
        name
      }
      class {
        id
        name
      }
    }
  }
`;
export const DELETE_STUDENT = gql`
  mutation DeleteStudent($deleteStudentId: ID!) {
    deleteStudent(id: $deleteStudentId)
  }
`;
export const DELETE_STUDENTS = gql`
  mutation DeleteStudents($ids: [ID]!) {
    deleteStudents(ids: $ids)
  }
`;
