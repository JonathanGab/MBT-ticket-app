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
        id
        content
        published_at
        modified_at
      }
      nbrOfComments
    }
  }
`;

export const useGetTicketById = (id: number): ITicket | null => {
  const { loading, error, data, refetch } = useQuery(GET_TICKETS_BY_ID, {
    variables: {
      getTicketByIdId: id,
    },
  });
  refetch();
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getTicketById;
};
