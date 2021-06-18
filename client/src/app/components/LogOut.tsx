import React from 'react';
import {Button} from 'reactstrap';
import {logOut} from '../../features/user/userSlice';
import {useAppDispatch} from '../hooks';

interface Props {}

export const LogOut = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Button color="dark" className="me-2" onClick={() => dispatch(logOut())}>
      Log out
    </Button>
  );
};
