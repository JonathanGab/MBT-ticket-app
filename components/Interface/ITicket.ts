export default interface ITicket {
  id: number;
  title: string;
  description: string;
  priority: string;
  difficulty: number;
  status: string;
  labels: string;
  estimated_time: number;
  created_at: Date;
  updated_at?: Date;
  Users: [
    {
      id: number;
      name: string;
    }
  ];
  Comment: [
    {
      User: {
        id: number;
        name: string;
      };
      id: number;
      content: string;
    }
  ];
  nbrOfComments?: number;
}
