export default interface IProject {
    id: number;
    title: string;
    description: string;
    start_time: Date;
    end_time?: Date;
    daysLeft?: string;
    status: string;
    Users: [
      {
        id:number,
        name:string,
      }
    ];
    numUsers?: number;
    Tickets?:[
      {id:number}
    ] 
    nbTicket?: number;
    picture_id?: number;
  }