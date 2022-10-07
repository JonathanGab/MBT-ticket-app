import { gql, useQuery } from '@apollo/client';
import ITicket from '../../components/Interface/ITicket';


export const GET_FILTERED_TICKETS = gql`
  query Query($users: Int, $projectId: Int) {
    getAllTicketFiltered(Users: $users, projectId: $projectId) {
      id
      title
      description
      status
      priority
      difficulty
    }
  }
`;

export const useFilterTicket = (
  project: Number,
  user: Number
): ITicket[] | null => {
  const { loading, error, data } = useQuery(GET_FILTERED_TICKETS, {
    variables: {
      users: user,
      projectId: project,
    },
  });
  if (loading) {
    return null;
  } else if (error) {
    console.log(error);
    return null;
  }
  return data?.getAllTicketFiltered;
};
