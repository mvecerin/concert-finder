import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {selectAllLocations} from '../../features/locations/locationSlice';
import {selectAllPerformers} from '../../features/performers/performerSlice';
import {useAppSelector} from '../hooks';
import {IConcert} from '../interfaces';

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
  const locations = useAppSelector(selectAllLocations);
  const performers = useAppSelector(selectAllPerformers);
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
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.title}
            </option>
          ))}
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
          {performers.map(performer => (
            <option key={performer.id} value={performer.id}>
              {performer.name}
            </option>
          ))}
        </Input>
      </FormGroup>
    </Form>
  );
};
