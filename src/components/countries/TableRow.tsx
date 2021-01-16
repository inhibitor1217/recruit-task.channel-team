import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';

interface TableRowProps {
  id: string;
  country: Country;
}

const TableRow: React.FC<TableRowProps> = ({ id, country }) => {
  const dispatch = useDispatch();

  const onRemove = () => dispatch(actions.countries.remove(id));

  return (
    <tr>
      <td>{country.alpha2Code}</td>
      <td>{country.name}</td>
      <td>{country.capital}</td>
      <td>{country.region}</td>
      <td>{country.callingCodes.join(', ')}</td>
      <td>
        <button onClick={onRemove}>Remove</button>
      </td>
    </tr>
  );
};

export default TableRow;
