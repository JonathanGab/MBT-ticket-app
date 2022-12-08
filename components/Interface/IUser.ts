export default interface IUser {
  id?: number;
  name: string;
  email: string;
  hashedPassword: string;
  created_at?: Date;
  updated_at?: Date;
}
