import { gql, useQuery } from '@apollo/client';

export default interface IUser {
  id?: number | string;
  name: string;
  email: string;
  hashedPassword: string;
  Project: [
    {
      title: string;
      status: string;
    }
  ];
  Ticket: [
    {
      title: string;
      status: string;
    }
  ];
}

export const GET_CURRENT_USER = gql`
  query getUserById($getUserByIdId: ID) {
    getUserById(id: $getUserByIdId) {
      id
      name
      email
      role
      hashedPassword
      Projects {
        title
        status
      }
      Tickets {
        title
        status
      }
    }
  }
`;

export const useGetCurrentUser = (id: String): IUser | null => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { getUserByIdId: id },
  });
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data.getUserById;
};
