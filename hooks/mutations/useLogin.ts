import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Mutation($email: String!, $hashedPassword: String!) {
    login(email: $email, hashedPassword: $hashedPassword)
  }
`;
