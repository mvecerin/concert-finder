import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {IConcert} from '../interfaces';
import {SelectLocations} from './SelectLocations';
import {SelectPerformers} from './SelectPerformers';

interface Props {
  id: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  values: IConcert;
  modify: Function;
}

export const ConcertForm = ({
  onSubmit,
  handleChange,
  values,
  modify,
  id,
}: Props) => {
  return (
    <Form id={id} onSubmit={onSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          onChange={handleChange}
          value={values.title}
          placeholder="Title"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="ticketPrice">Ticket price</Label>
        <Input
          name="ticketPrice"
          onChange={e =>
            modify({...values, [e.target.name]: e.target.valueAsNumber})
          }
          value={values.ticketPrice}
          placeholder="Ticket price"
          type="number"
          min={0}
        />
      </FormGroup>
      <FormGroup>
        <Label for="date">Date</Label>
        <Input
          name="date"
          onChange={e =>
            modify({
              ...values,
              [e.target.name]: new Date(e.target.value),
            })
          }
          required
          defaultValue={values.date}
          type="date"
        />
      </FormGroup>
      <FormGroup>
        <Label for="locationId">Location</Label>
        <Input
          name="locationId"
          onChange={handleChange}
          required
          type="select"
          value={values.locationId}
        >
          <option value="">Select</option>
          <SelectLocations />
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="performerId">Performer</Label>
        <Input
          name="performerId"
          onChange={handleChange}
          required
          type="select"
          value={values.performerId}
        >
          <option value="">Select</option>
          <SelectPerformers />
        </Input>
      </FormGroup>
    </Form>
  );
};
