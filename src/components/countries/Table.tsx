import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableRow } from '.';
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
          <tr>
            <td>국가 코드</td>
            <td>이름</td>
            <td>수도</td>
            <td>대륙</td>
            <td>국가 전화번호</td>
          </tr>
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
