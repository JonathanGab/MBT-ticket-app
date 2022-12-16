import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateNewProject(
    $title: String!
    $startTime: Date!
    $endTime: Date!
    $description: String!
    $users: [UserInput]
    $status: StatusEnum!
  ) {
    createNewProject(
      title: $title
      start_time: $startTime
      end_time: $endTime
      Users: $users
      status: $status
      description: $description
    ) {
      title
      start_time
      end_time
      description
      id
      Owner {
        id
        name
      }
      Users {
        id
        name
      }
      status
    }
  }
`;
