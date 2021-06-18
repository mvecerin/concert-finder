import React from 'react';
import {selectAllPerformers} from '../../features/performers/performerSlice';
import {useAppSelector} from '../hooks';

export const SelectPerformers = () => {
  const performers = useAppSelector(selectAllPerformers);

  return (
    <>
      {performers.map(performer => (
        <option key={performer.id} value={performer.id}>
          {performer.name}
        </option>
      ))}
    </>
  );
};
