import { gql, useMutation } from '@apollo/client';

export const UPDATE_TICKET = gql`
  mutation updateTicket(
    $updateTicketByIdId: ID!
    $title: String
    $description: String
    $status: String
    $labels: String
    $priority: String
    $difficulty: Int
    $users: [UserInput]
  ) {
    updateTicketById(
      id: $updateTicketByIdId
      title: $title
      description: $description
      status: $status
      labels: $labels
      priority: $priority
      difficulty: $difficulty
      Users: $users
    ) {
      description
      difficulty
      labels
      priority
      status
      title
      Users {
        id
      }
    }
  }
`;
