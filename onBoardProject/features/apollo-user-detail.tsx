import {gql} from '@apollo/client';

export const GET_USER_QUERY = gql`
  query AccessUser($id: ID!) {
    user(id: $id) {
      name
      email
      phone
      birthDate
      role
    }
  }
`;
