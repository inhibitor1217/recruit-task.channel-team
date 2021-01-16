import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { sortedCountries } from '../../store/selectors';

const ScrollContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Table: React.FC = () => {
  const countries = useSelector(sortedCountries);

  return (
    <ScrollContainer>
      <table>
        <tbody>
          <TableHeader />
          {countries &&
            countries.map((item) => (
              <TableRow key={item.id} id={item.id} country={item.country} />
            ))}
        </tbody>
      </table>
    </ScrollContainer>
  );
};

export default Table;
