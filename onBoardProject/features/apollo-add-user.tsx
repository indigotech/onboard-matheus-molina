import {gql} from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: Date!
    $password: String!
    $role: UserRole!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        password: $password
        role: $role
      }
    ) {
      name
      email
      id
    }
  }
`;
