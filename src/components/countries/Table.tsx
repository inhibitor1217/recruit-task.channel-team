import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { RootState } from '../../store/modules';
import { sortedCountries } from '../../store/selectors';
import { CONTENT_WIDTH } from '../../utils/const';
import { AddCountryForm } from '../interactions';

const ScrollContainer = styled.div`
  overflow-y: auto;
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

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
    </ScrollContainer>
  );
};

export default Table;
