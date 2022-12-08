import { gql, useQuery } from '@apollo/client';
import ITicket from '../../components/Interface/ITicket';

export const GET_TICKETS_BY_ID = gql`
  query GetTicketById($getTicketByIdId: ID) {
    getTicketById(id: $getTicketByIdId) {
      id
      title
      description
      estimated_time
      spent_time
      status
      labels
      priority
      difficulty
      projectId
      Users {
        id
        name
      }
      Comment {
        User {
          name
          email
          id
        }
        id
        content
        published_at
        modified_at
      }
    }
  }
`;

export const useGetTicketById = (id: number): ITicket | null => {
  const { loading, error, data } = useQuery(GET_TICKETS_BY_ID, {
    variables: {
      getTicketByIdId: id,
    },
  });
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getTicketById;
};
