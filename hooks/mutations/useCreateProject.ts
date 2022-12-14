import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateNewProject(
    $title: String!
    $startTime: Date!
    $users: [UserInput]
    $status: StatusEnum!
  ) {
    createNewProject(
      title: $title
      start_time: $startTime
      Users: $users
      status: $status
    ) {
      title
      start_time
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
