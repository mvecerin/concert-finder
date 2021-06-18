import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {
  getConcerts,
  getVisibleConcerts,
} from '../../features/concert/concertSlice';
import {useAppDispatch, useAppSelector} from '../hooks';
import {IFilter} from '../interfaces';
import {Filter} from './Filter';
import {List} from './List';
import {ShowModal} from './ShowModal';

interface Props {}

export const Wrapper = (props: Props) => {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(state => state.user);
  const [values, setValues] = useState<IFilter>({
    filterLocation: '',
    filterPerformer: '',
    filterTicket: 0,
  });
  const concerts = useAppSelector(state => getVisibleConcerts(state, values));

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValues({...values, [e.currentTarget.name]: e.currentTarget.value});
    console.log(values);
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(getConcerts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return isAuth ? (
    <Container className="pt-3">
      <Row className="align-items-end">
        <Col>
          <ShowModal modalLabel="Add concert" formId="addForm" />
        </Col>
        <Col>
          <Filter onChange={onChange} />
        </Col>
      </Row>
      <List concerts={concerts!} />
    </Container>
  ) : (
    <></>
  );
};
