import { createContext, useState, Dispatch, SetStateAction } from 'react';

export interface ILoginContext {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<ILoginContext | null>(null);

export default function LoginProvider({ children }: any) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
