import { gql, useQuery } from '@apollo/client';
import IUser from './useGetUser';

interface ITicketProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  difficulty: number;
  status: string;
  labels: string;
  estimatedTime: Date;
  users: [IUser];
}

export interface ICommentProps {
  id: number;
  content: string;
  published_at: Date;
  modified_at: Date;
  Users: [IUser];
  Tickets: [ITicketProps];
}

export const GET_COMMENTS_BY_TICKET_ID = gql`
  query GetCommentsByTicketId($getCommentsByTicketIdId: ID) {
    getCommentsByTicketId(id: $getCommentsByTicketIdId) {
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
      Comments {
        id
        content
      }
    }
  }
`;

export const useGetCommentByTicketId = (id: number): ICommentProps | null => {
  const { loading, error, data, refetch } = useQuery(
    GET_COMMENTS_BY_TICKET_ID,
    {
      variables: {
        getCommentsByTicketIdId: id,
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
  return data?.getCommentsByTicketId;
};
