import React, { useContext } from 'react';
import Navigation from './Navigation';
import DrawerNavigation from './DrawerNavigation';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';
export default function DisplayNav() {
  const { isLogged } = useContext(LoginContext) as ILoginContext;
  return <>{isLogged ? <DrawerNavigation /> : <Navigation />}</>;
}
