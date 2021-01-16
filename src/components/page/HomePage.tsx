import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../../store';
import { Table } from '../countries';
import { KeywordInput } from '../search';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.countries.load());
  }, []);

  return (
    <FlexContainer>
      <h2>List of countries</h2>
      <KeywordInput />
      <Table />
      <h5>Created by 황동욱, inhibitor [inhibitor@kaist.ac.kr]</h5>
    </FlexContainer>
  );
};

export default HomePage;
