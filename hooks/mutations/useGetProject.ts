import { gql, useQuery } from '@apollo/client';
import IProject from '../../components/Interface/IProject';

export const GET_PROJECT = gql`
  query GetAllProjects {
    getAllProjects {
      id
      title
      description
      start_time
      end_time
      status
    }
  }
`;

export const useGetProject = (): IProject[] | null => {
  const { loading, error, data } = useQuery(GET_PROJECT);
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data.getAllProjects;
};
