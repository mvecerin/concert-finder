import React from 'react';
import {selectAllLocations} from '../../features/locations/locationSlice';
import {useAppSelector} from '../hooks';

interface Props {}

export const SelectLocations = (props: Props) => {
  const locations = useAppSelector(selectAllLocations);

  return (
    <>
      {locations.map(location => (
        <option key={location.id} value={location.id}>
          {location.title}
        </option>
      ))}
    </>
  );
};
