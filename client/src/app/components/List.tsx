import React from 'react';
import {ListGroup} from 'reactstrap';
import {IConcert} from '../interfaces';
import {ListItem} from './ListItem';

interface Props {
  concerts: IConcert[];
}

export const List = ({concerts}: Props) => {
  return (
    <ListGroup type="unstyled" className="mt-3">
      {concerts.map(concert => (
        <ListItem concert={concert} key={concert.id} />
      ))}
    </ListGroup>
  );
};
