import React from 'react';
import {Col, Input, Label, Row} from 'reactstrap';
import {SelectLocations} from './SelectLocations';
import {SelectPerformers} from './SelectPerformers';

interface Props {
  onChange: any;
}

export const Filter = ({onChange}: Props) => {
  return (
    <Row>
      <Col>
        <Label for="filterLocation">Location</Label>
        <Input type="select" name="filterLocation" onChange={onChange}>
          <option value="">Select</option>
          <SelectLocations />
        </Input>
      </Col>
      <Col>
        <Label for="filterPerformer">Performer</Label>
        <Input type="select" name="filterPerformer" onChange={onChange}>
          <option value="">Select</option>
          <SelectPerformers />
        </Input>
      </Col>
      <Col>
        <Label for="filterTicket">Ticket price less than</Label>
        <Input type="number" name="filterTicket" onChange={onChange} />
      </Col>
    </Row>
  );
};
