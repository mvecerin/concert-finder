import React from 'react';
import {Button} from 'reactstrap';
import {deleteConcert} from '../../features/concert/concertSlice';
import {useAppDispatch} from '../hooks';
import {IConcert} from '../interfaces';
import {ShowModal} from './ShowModal';

interface Props {
  concert: IConcert;
}

export const Options = ({concert}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <ShowModal modalLabel="Edit" formId="editForm" concert={concert} />
      <Button
        color="danger"
        onClick={() => dispatch(deleteConcert(concert.id!))}
      >
        Delete
      </Button>
    </div>
  );
};
