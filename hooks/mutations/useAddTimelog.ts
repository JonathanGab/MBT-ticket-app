import { gql } from '@apollo/client';

export const ADD_TIMELOG = gql`
  mutation addTimelog(
    $spentTime: Int!
    $users: UserInput
    $ticket: TicketInput
  ) {
    createNewTimelog(spent_time: $spentTime, Users: $users, Ticket: $ticket) {
      id
      spent_time
      created_at
    }
  }
`;
