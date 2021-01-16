import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../../store';
import { CONTENT_WIDTH } from '../../utils/const';
import { Table } from '../countries';
import { ActionGroup, KeywordInput } from '../interactions';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.header`
  width: 100%;
  background-color: #212121;
  padding: 16px 20px;

  h1 {
    color: #ffffff;
    font-weight: normal;
  }
`;

const StyledActionsContainer = styled.div`
  width: ${CONTENT_WIDTH}px;
  margin-top: 36px;

  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: auto;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #121212;
  padding: 16px 20px;

  span {
    color: #9c9c9c;
  }
`;

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.countries.load());
  }, []);

  return (
    <FlexContainer>
      <StyledHeader>
        <h1>List of Countries</h1>
      </StyledHeader>
      <StyledActionsContainer>
        <KeywordInput />
        <ActionGroup />
      </StyledActionsContainer>
      <Table />
      <StyledFooter>
        <span>
          Created by 황동욱, inhibitor [inhibitor@kaist.ac.kr] (2021.01.16)
        </span>
      </StyledFooter>
    </FlexContainer>
  );
};

export default HomePage;
