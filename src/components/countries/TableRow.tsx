import React from 'react';

interface TableRowProps {
  country: Country;
}

const TableRow: React.FC<TableRowProps> = ({ country }) => {
  return (
    <tr>
      <td>{country.alpha2Code}</td>
      <td>{country.name}</td>
      <td>{country.capital}</td>
      <td>{country.region}</td>
      <td>{country.callingCodes.join(', ')}</td>
    </tr>
  );
};

export default TableRow;
