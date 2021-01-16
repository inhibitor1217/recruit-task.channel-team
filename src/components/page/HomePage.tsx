import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';
import { Table } from '../countries';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.countries.load());
  }, []);

  return (
    <React.Fragment>
      <Table />
    </React.Fragment>
  );
};

export default HomePage;
