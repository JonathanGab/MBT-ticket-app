import React, { useContext } from 'react';
import Navigation from './Navigation';
import DrawerNavigation from './DrawerNavigation';
import { ILoginContext, LoginContext } from '../../contexts/LoginContext';
import AppNav from './Navigation';
export default function DisplayNav() {
  const { valueAsyncStorage } = useContext(LoginContext) as ILoginContext;
  return (
    <>{valueAsyncStorage.token !== null ? <DrawerNavigation /> : <AppNav />}</>
  );
}
