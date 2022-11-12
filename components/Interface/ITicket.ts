export default interface ITicket {
    id: number;
    title: string;
    description: string;
    priority: string;
    difficulty: number;
    status: string;
    labels: string;
    estimated_time: number;
    Users: [
        {
          id:number,
          name:string,
        }
      ];

}