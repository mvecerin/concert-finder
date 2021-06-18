import React from 'react';
import {Navbar as NavbarBS, NavbarBrand} from 'reactstrap';
import {useAppSelector} from '../hooks';
import {LogOut} from './LogOut';
import {ShowModal} from './ShowModal';

interface Props {}

export const Navbar = (props: Props) => {
  const {isAuth} = useAppSelector(state => state.user);
  return (
    <NavbarBS color="dark" dark>
      <NavbarBrand href="/" className="ps-3">
        Concert finder
      </NavbarBrand>
      {isAuth ? <LogOut /> : <ShowModal modalLabel="Log in" formId="logIn" />}
    </NavbarBS>
  );
};
