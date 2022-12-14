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
  Tickets?: [{ id: number }];
  picture_id?: number;
}

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($getProjectByIdId: ID) {
    getProjectById(id: $getProjectByIdId) {
      title
      end_time
      description
      created_at
      completed
      start_time
      status
      Users {
        id
        name
        email
      }
    }
  }
`;
export const useGetProjectById = (id: number): IProject | null => {
  const { loading, error, data, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { getProjectByIdId: id },
  });
  refetch();
  if (loading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  }
  return data.getProjectById;
};
