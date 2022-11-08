import { gql, useQuery } from '@apollo/client';
import IUser from '../../components/Interface/IUser';

export const GET_USER = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
    }
  }
`;

export const useGetUsers = (): IUser[] | null => {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data.getAllUsers;
};
