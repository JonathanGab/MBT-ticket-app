import { gql, useQuery } from '@apollo/client';
import ITicket from '../../components/Interface/ITicket';

export const GET_FILTERED_TICKETS = gql`
query GetAllTicketFiltered($users: Int, $projectId: Int) {
  getAllTicketFiltered(Users: $users, projectId: $projectId) {
    title
    status
    Users {
      name
    }
    description
    difficulty
    id
    projectId
    spent_time
    priority
    labels
    estimated_time
  }
}
`;

export const useFilterTicket = (
  users: number,
  projectId: number
): ITicket[] | null => {
  const { loading, error, data } = useQuery(GET_FILTERED_TICKETS, {
    variables: {
      users: users,
      projectId: projectId
    }
  });
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  // console.log('getTicket', data?.getAllTicketFiltered);
  return data?.getAllTicketFiltered;
};
