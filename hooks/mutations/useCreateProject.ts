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
      description: $description
      start_time: $startTime
      end_time: $endTime
      status: $status
      Users: $users
    ) {
      title: title
      startTime: start_time
      users: Users {
        id
      }
      status: status
      end_time: end_time
      description: description
    }
  }
`;
