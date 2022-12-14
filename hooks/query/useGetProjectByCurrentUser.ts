import { gql, useQuery } from '@apollo/client';

interface IUsers {
  id: number;
  name: string;
}

export default interface IProject {
  id: number;
  title: string;
  description: string;
  start_time: Date;
  end_time?: Date;
  created_at?: Date;
  updated_at?: Date;
  status: string;
  Users: IUsers[];
  Tickets?: [{ id: number; title: string }];
  picture_id?: number;
}

export const GET_PROJECT_BY_CURRENT_USER = gql`
  query Query($getAllProjectsByCurrentUserIdId: ID) {
    getAllProjectsByCurrentUserId(id: $getAllProjectsByCurrentUserIdId) {
      id
      Users {
        id
        name
      }
      title
      description
      status
      start_time
      Tickets {
        id
        title
      }
    }
  }
`;

export const useGetProjectByCurrentUser = (id: number): IProject[] | null => {
  const { loading, error, data, refetch } = useQuery(
    GET_PROJECT_BY_CURRENT_USER,
    {
      variables: { getAllProjectsByCurrentUserIdId: id },
    }
  );
  refetch();
  if (loading) {
    return null;
  }
  if (error) {
    console.error(error);
    return null;
  }
  return data?.getAllProjectsByCurrentUserId;
};

export const GET_ALL_PROJECTS_ORDER_BY_DATE_AND_CURRENT_USER_ID = gql`
  query GetAllProjectsOrderByDateAndCurrentUserId(
    $getAllProjectsOrderByDateAndCurrentUserIdId: ID
  ) {
    getAllProjectsOrderByDateAndCurrentUserId(
      id: $getAllProjectsOrderByDateAndCurrentUserIdId
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

export const useGetAllProjectsOrderByDateAndCurrentUserId = (
  id: number
): IProject[] | null => {
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_PROJECTS_ORDER_BY_DATE_AND_CURRENT_USER_ID,
    {
      variables: {
        getAllProjectsOrderByDateAndCurrentUserIdId: id,
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
  return data?.getAllProjectsOrderByDateAndCurrentUserId;
};

export const GET_ALL_COMPLETED_PROJECTS_BY_CURRENT_USER_ID = gql`
  query GetAllProjectsCompletedByCurrentUserId(
    $getAllProjectsCompletedByCurrentUserIdId: ID
  ) {
    getAllProjectsCompletedByCurrentUserId(
      id: $getAllProjectsCompletedByCurrentUserIdId
    ) {
      status
      title
    }
  }
`;

export const useGetAllProjectsCompletedByCurrentUserId = (
  id: number
): IProject[] | null => {
  const { loading, error, data } = useQuery(
    GET_ALL_COMPLETED_PROJECTS_BY_CURRENT_USER_ID,
    {
      variables: {
        getAllProjectsCompletedByCurrentUserIdId: id,
      },
    }
  );
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getAllProjectsCompletedByCurrentUserId;
};

export const GET_LAST_COMPLETED_PROJECTS_BY_CURRENT_USER_ID = gql`
  query GetLastCompletedProjectsByCurrentUserId(
    $getLastCompletedProjectsByCurrentUserIdId: ID
  ) {
    getLastCompletedProjectsByCurrentUserId(
      id: $getLastCompletedProjectsByCurrentUserIdId
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

export const useGetLastCompletedProjectsByCurrentUserId = (
  id: number
): IProject[] | null => {
  const { loading, error, data } = useQuery(
    GET_LAST_COMPLETED_PROJECTS_BY_CURRENT_USER_ID,
    {
      variables: {
        getLastCompletedProjectsByCurrentUserIdId: id,
      },
    }
  );
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data?.getLastCompletedProjectsByCurrentUserId;
};
