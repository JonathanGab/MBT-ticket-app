import { createContext, useState } from 'react';

export interface IAuthContextProps {
  token: string;
  userId: string;
  roles: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setRoles: React.Dispatch<React.SetStateAction<string>>;
  getProjectId: null | number;
  setGetProjectId: React.Dispatch<React.SetStateAction<null | number>>;
  getTicketId: null | number;
  setGetTicketId: React.Dispatch<React.SetStateAction<null | number>>;
}
export const AuthContext = createContext<IAuthContextProps | null>(null);
export default function AuthProvider({ children }: any) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [roles, setRoles] = useState('');
  const [getProjectId, setGetProjectId] = useState<null | number>(null);
  const [getTicketId, setGetTicketId] = useState<null | number>(null);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        roles,
        setRoles,
        getProjectId,
        setGetProjectId,
        getTicketId,
        setGetTicketId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
