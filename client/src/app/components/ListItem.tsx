import React from 'react';
import {Collapse, ListGroupItem} from 'reactstrap';
import {useToggle} from '../hooks';
import {IConcert} from '../interfaces';
import {Concert} from './Concert';

interface Props {
  concert: IConcert;
}

export const ListItem = ({concert}: Props) => {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <ListGroupItem tag="a" href="#" onClick={toggle}>
        <h5>{concert.title}</h5>
      </ListGroupItem>
      <Collapse isOpen={isOpen}>
        <Concert concert={concert} />
      </Collapse>
    </>
  );
};
