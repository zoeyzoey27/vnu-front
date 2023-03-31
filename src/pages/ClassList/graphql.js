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
export const DELETE_CLASS = gql`
  mutation DeleteClass($deleteClassId: ID!) {
    deleteClass(id: $deleteClassId)
  }
`;
export const DELETE_CLASSES = gql`
  mutation DeleteClasses($ids: [ID]!) {
    deleteClasses(ids: $ids)
  }
`;
