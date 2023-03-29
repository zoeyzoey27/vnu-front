import { gql } from "@apollo/client";

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
export const DELETE_MAJOR = gql`
  mutation DeleteMajor($deleteMajorId: ID!) {
    deleteMajor(id: $deleteMajorId)
  }
`;
export const DELETE_MAJORS = gql`
  mutation DeleteMajors($ids: [ID]!) {
    deleteMajors(ids: $ids)
  }
`;
