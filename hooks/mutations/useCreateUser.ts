import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $hashedPassword: String!
    $role: String
  ) {
    createNewUser(
      name: $name
      email: $email
      hashedPassword: $hashedPassword
      role: $role
    ) {
      id
      name
      email
      hashedPassword
      role
    }
  }
`;
