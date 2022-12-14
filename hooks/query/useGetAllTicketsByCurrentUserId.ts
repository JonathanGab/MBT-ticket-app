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
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_TICKETS_BY_CURRENT_USER_ID,
    {
      variables: {
        getAllTicketsByCurrentUserIdId: id,
      },
    }
  );
  refetch();
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
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_TICKETS_ORDER_BY_DATE_AND_CURRENT_USER_ID,
    {
      variables: {
        getAllTicketsOrderByDateAndCurrentUserIdId: id,
      },
    }
  );
  refetch();
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getAllTicketsOrderByDateAndCurrentUserId;
};

export const GET_LAST_COMPLETED_TICKETS_BY_CURRENT_USER_ID = gql`
  query GetLastCompletedTicketsByCurrentUserId(
    $getLastCompletedTicketsByCurrentUserIdId: ID
  ) {
    getLastCompletedTicketsByCurrentUserId(
      id: $getLastCompletedTicketsByCurrentUserIdId
    ) {
      created_at
      title
      status
      Users {
        name
      }
    }
  }
`;

export const useGetLastCompletedTicketsByCurrentUserId = (
  id: number
): ITicket[] | null => {
  const { loading, error, data, refetch } = useQuery(
    GET_LAST_COMPLETED_TICKETS_BY_CURRENT_USER_ID,
    {
      variables: {
        getLastCompletedTicketsByCurrentUserIdId: id,
      },
    }
  );
  refetch();
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getLastCompletedTicketsByCurrentUserId;
};
