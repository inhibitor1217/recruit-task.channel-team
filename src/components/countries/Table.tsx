import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow } from '.';
import { RootState } from '../../store/modules';

const Table: React.FC = () => {
  const countries = useSelector((state: RootState) => state.countries.list);

  return (
    <table>
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
    </table>
  );
};

export default Table;
