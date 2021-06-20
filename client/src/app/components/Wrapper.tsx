import React, {useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {
  getConcerts,
  getVisibleConcerts,
} from '../../features/concert/concertSlice';
import {useAppDispatch, useAppSelector, useForm} from '../hooks';
import {IFilter} from '../interfaces';
import {Filter} from './Filter';
import {List} from './List';
import {ShowModal} from './ShowModal';

interface Props {}

export const Wrapper = (props: Props) => {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(state => state.user);
  const [values, handleChange] = useForm<IFilter>({
    filterLocation: '',
    filterPerformer: '',
    filterTicket: 0,
  });
  const concerts = useAppSelector(state => getVisibleConcerts(state, values));

  useEffect(() => {
    if (isAuth) {
      dispatch(getConcerts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return isAuth ? (
    <Container className="pt-3">
      <Row className="align-items-end pt-2">
        <Col lg="6">
          <ShowModal modalLabel="Add concert" formId="addForm" />
        </Col>
        <Col lg="6">
          <Filter onChange={handleChange} />
        </Col>
      </Row>
      <List concerts={concerts!} />
    </Container>
  ) : (
    <h5 className="text-center pt-3">Log in to view concerts</h5>
  );
};
