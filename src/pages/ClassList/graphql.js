import { gql } from "@apollo/client";

export const GET_CLASS_LIST = gql`
  query GetAllClasses($className: String, $skip: Int, $take: Int) {
    getAllClasses(className: $className, skip: $skip, take: $take) {
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
