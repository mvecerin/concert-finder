import React from 'react';
import {editConcert} from '../../features/concert/concertSlice';
import {useAppDispatch, useForm} from '../hooks';
import {IConcert} from '../interfaces';
import {ConcertForm} from './ConcertForm';

interface Props {
  toggle: Function;
  concert: IConcert;
}

export const EditForm = ({toggle, concert}: Props) => {
  const [values, handleChange, modify] = useForm({
    ...concert,
    date: new Date(concert.date),
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await dispatch(editConcert(values));
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
      id="editForm"
    />
  );
};
