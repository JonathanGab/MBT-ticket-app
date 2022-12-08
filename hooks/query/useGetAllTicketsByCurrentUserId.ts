import { gql, useQuery } from '@apollo/client';
import ITicket from '../../components/Interface/ITicket';

export const GET_ALL_TICKETS_BY_CURRENT_USER_ID = gql`
  query GetAllTicketsByCurrentUserId($getAllTicketsByCurrentUserIdId: ID) {
    getAllTicketsByCurrentUserId(id: $getAllTicketsByCurrentUserIdId) {
      id
      labels
      title
      status
    }
  }
`;

export const useGetAllTicketsByCurrentUserId = (
  id: number
): ITicket[] | null => {
  const { loading, error, data } = useQuery(
    GET_ALL_TICKETS_BY_CURRENT_USER_ID,
    {
      variables: {
        getAllTicketsByCurrentUserIdId: id,
      },
    }
  );
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getAllTicketsByCurrentUserId;
};

export const GET_ALL_TICKETS_ORDER_BY_DATE_AND_CURRENT_USER_ID = gql`
  query GetAllTicketsOrderByDateAndCurrentUserId(
    $getAllTicketsOrderByDateAndCurrentUserIdId: ID
  ) {
    getAllTicketsOrderByDateAndCurrentUserId(
      id: $getAllTicketsOrderByDateAndCurrentUserIdId
    ) {
      created_at
      title
      status
    }
  }
`;

export const useGetAllTicketsOrderByDateAndCurrentUserId = (
  id: number
): ITicket[] | null => {
  const { loading, error, data } = useQuery(
    GET_ALL_TICKETS_ORDER_BY_DATE_AND_CURRENT_USER_ID,
    {
      variables: {
        getAllTicketsOrderByDateAndCurrentUserIdId: id,
      },
    }
  );
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getAllTicketsOrderByDateAndCurrentUserId;
};
