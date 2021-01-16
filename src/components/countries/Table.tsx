import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { RootState } from '../../store/modules';

const ScrollContainer = styled.div`
  overflow-y: auto;
`;

const Table: React.FC = () => {
  const countries = useSelector((state: RootState) => state.countries.list);

  return (
    <ScrollContainer>
      <table>
        <tbody>
          <TableHeader />
          {countries &&
            countries.map((item) => (
              <TableRow key={item.id} country={item.country} />
            ))}
        </tbody>
      </table>
    </ScrollContainer>
  );
};

export default Table;
