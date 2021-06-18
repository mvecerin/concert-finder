import React from 'react';
import {addConcert} from '../../features/concert/concertSlice';
import {useAppDispatch, useAppSelector, useForm} from '../hooks';
import {ConcertForm} from './ConcertForm';

interface Props {
  toggle: Function;
}

export const AddForm = ({toggle}: Props) => {
  const {user} = useAppSelector(state => state.user);
  const [values, handleChange, modify] = useForm({
    title: '',
    ticketPrice: 0,
    date: '',
    locationId: '',
    performerId: '',
    userId: user?.id,
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await dispatch(addConcert(values));
      if (data.payload) toggle();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ConcertForm
      handleChange={handleChange}
      modify={modify}
      onSubmit={onSubmit}
      values={values}
      id="addForm"
    />
  );
};
