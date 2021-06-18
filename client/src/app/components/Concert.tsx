import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {selectLocationById} from '../../features/locations/locationSlice';
import {selectPerformerById} from '../../features/performers/performerSlice';
import {useAppSelector} from '../hooks';
import {IConcert} from '../interfaces';
import {Options} from './Options';

interface Props {
  concert: IConcert;
}

export const Concert = ({concert}: Props) => {
  const date = new Date(concert.date).toDateString();
  const {user} = useAppSelector(state => state.user);
  const performer = useAppSelector(state =>
    selectPerformerById(state, concert.performerId),
  );
  const location = useAppSelector(state =>
    selectLocationById(state, concert.locationId),
  );

  return (
    <Card>
      <CardBody>
        <h6>
          {performer?.name}, {location?.title}
        </h6>
        <h6>Date: {date}</h6>
        <h6>Ticket: {concert.ticketPrice}</h6>
        {user?.id === concert.userId && <Options concert={concert} />}
      </CardBody>
    </Card>
  );
};
