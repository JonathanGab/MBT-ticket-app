import { createContext, useState } from 'react';

export interface IAuthContextProps {
  token: string;
  userId: string;
  roles: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setRoles: React.Dispatch<React.SetStateAction<string>>;
}
export const AuthContext = createContext<IAuthContextProps | null>(null);
export default function AuthProvider({ children }: any) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [roles, setRoles] = useState('');

  return (
    <AuthContext.Provider
      value={{ token, setToken, userId, setUserId, roles, setRoles }}
    >
      {children}
    </AuthContext.Provider>
  );
}
