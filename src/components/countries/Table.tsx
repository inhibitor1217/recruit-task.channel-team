import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { RootState } from '../../store/modules';
import { sortedCountries } from '../../store/selectors';
import { CONTENT_WIDTH } from '../../utils/const';
import { AddCountryForm } from '../interactions';

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;

  overflow-y: auto;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`;

const StyledTable = styled.table`
  width: ${CONTENT_WIDTH}px;

  border-collapse: collapse;

  tr {
    background-color: #ffffff;
  }
  tr:nth-child(2n) {
    background-color: #f5f5f5;
  }

  td.has-text {
    min-width: 120px;
    padding: 4px 8px;
  }
`;

const StyledLoadingIndicator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${CONTENT_WIDTH}px;
  flex: 1;
  background-color: #f5f5f5;
`;

const Table: React.FC = () => {
  const countries = useSelector(sortedCountries);
  const isAdding = useSelector((state: RootState) => state.countries.add);

  return (
    <ScrollContainer>
      {isAdding && <AddCountryForm />}
      <StyledTable>
        <tbody>
          <TableHeader />
          {countries &&
            countries.map((item) => (
              <TableRow key={item.id} id={item.id} country={item.country} />
            ))}
        </tbody>
      </StyledTable>
      {!countries && (
        <StyledLoadingIndicator>
          <span>Loading ...</span>
        </StyledLoadingIndicator>
      )}
    </ScrollContainer>
  );
};

export default Table;
