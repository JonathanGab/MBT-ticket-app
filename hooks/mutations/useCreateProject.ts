import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateNewProject(
    $title: String!
    $description: String
    $startTime: Date!
    $endTime: Date
    $status: String
    $users: [UserInput]!
  ) {
    createNewProject(
      title: $title
      start_time: $startTime
      Users: $users
      description: $description
      end_time: $endTime
      status: $status
    ) {
      title
      description
      start_time
      end_time
      status
      Users {
        id
      }
    }
  }
`;
