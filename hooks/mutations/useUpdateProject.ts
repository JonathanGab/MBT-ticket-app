import { gql, useMutation } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation updateProjectById(
    $updateProjectByIdId: ID!
    $description: String
    $title: String
    $startTime: Date
    $endTime: Date
    $users: [UserInput]
  ) {
    updateProjectById(
      id: $updateProjectByIdId
      description: $description
      title: $title
      start_time: $startTime
      end_time: $endTime
      Users: $users
    ) {
      start_time
      end_time
      title
      status
      description
      Users {
        id
        name
      }
    }
  }
`;
