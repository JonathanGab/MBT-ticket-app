import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $hashedPassword: String!) {
    login(email: $email, hashedPassword: $hashedPassword) {
      token
      userId
      role
    }
  }
`;
