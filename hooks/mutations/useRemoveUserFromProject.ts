import { gql } from '@apollo/client';

export const REMOVE_USER_FROM_PROJECT = gql`
  mutation Mutation($removeUserFromProjectId: ID!, $users: [UserInput]) {
    removeUserFromProject(id: $removeUserFromProjectId, Users: $users) {
      id
      Users {
        id
        name
      }
    }
  }
`;
