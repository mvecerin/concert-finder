import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {logIn} from '../../features/user/userSlice';
import {useAppDispatch, useForm} from '../hooks';

export const LogInForm = () => {
  const [values, handleChange] = useForm({
    email: 'test@mail.com',
    password: 'testpassword',
  });
  const [authFailed, setFail] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await dispatch(logIn(values));
      if (!data.payload) setFail(true);
    } catch (e) {}
  };

  return (
    <Form id="logIn" onSubmit={onSubmit}>
      <FormGroup>
        <Label for="email">E-mail</Label>
        <Input
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="email"
          type="email"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="password"
          minLength={8}
          type="password"
          required
        />
      </FormGroup>
      {authFailed && <p className="text-danger">Log in failed</p>}
    </Form>
  );
};
