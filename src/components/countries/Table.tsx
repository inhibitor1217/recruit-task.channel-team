import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { RootState } from '../../store/modules';
import { sortedCountries } from '../../store/selectors';
import { AddCountryForm } from '../interactions';

const ScrollContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Table: React.FC = () => {
  const countries = useSelector(sortedCountries);
  const isAdding = useSelector((state: RootState) => state.countries.add);

  return (
    <ScrollContainer>
      {isAdding && <AddCountryForm />}
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
