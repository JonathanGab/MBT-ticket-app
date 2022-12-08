import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation addComment(
    $content: String!
    $publishedAt: Date!
    $user: UserInput!
    $ticket: TicketInput!
  ) {
    createNewComment(
      content: $content
      published_at: $publishedAt
      User: $user
      Ticket: $ticket
    ) {
      User {
        name
      }
      content
    }
  }
`;

// {
//   "content": "Test from GQL",
//   "publishedAt": "2022-12-07",
//   "user": {
//     "id": 10
//   },
//   "ticket": {
//     "id": 1
//   }
// }
