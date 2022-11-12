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

export const useGetAllUsers = (): IUser[]  => {  
  const { loading, data, error } = useQuery(GET_ALL_USERS)

    if (loading) {
      return [];
    } else if (error) {
      console.error(error);
      return [];
    }
    return data?.getAllUsers;
};