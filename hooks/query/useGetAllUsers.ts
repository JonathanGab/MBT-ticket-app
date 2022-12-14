import { gql, useQuery } from '@apollo/client';
import IUser from './useGetUser';

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
    }
  }
`;

export const useGetAllUsers = (): IUser[] => {
  const { loading, data, error, refetch } = useQuery(GET_ALL_USERS);
  refetch();
  if (loading) {
    return [];
  } else if (error) {
    console.error(error);
    return [];
  }
  return data?.getAllUsers;
};
