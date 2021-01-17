import classnames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../../store';

interface TableRowProps {
  index: number;
  id: string;
  country: Country;
}

const StyledTd = styled.td`
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;

  span {
    text-overflow: ellipsis;
  }

  button {
    background-color: transparent;
    width: 24px;
    height: 24px;
    padding: 4px;
    margin: 0;
    border: none;
    outline: none;
  }

  button:hover {
    cursor: pointer;
  }
`;

const TableRow: React.FC<TableRowProps> = ({ id, country, index }) => {
  const dispatch = useDispatch();

  const onRemove = () => dispatch(actions.countries.remove(id));

  return (
    <tr>
      <StyledTd>
        <span style={{ color: '#888888' }}>{index + 1}</span>
      </StyledTd>
      <StyledTd className="has-text">
        <span>{country.alpha2Code}</span>
      </StyledTd>
      <StyledTd className="has-text">
        <span>{country.name}</span>
      </StyledTd>
      <StyledTd className="has-text">
        <span>{country.capital}</span>
      </StyledTd>
      <StyledTd className="has-text">
        <span>{country.region}</span>
      </StyledTd>
      <StyledTd className="has-text">
        <span>{country.callingCodes.join(', ')}</span>
      </StyledTd>
      <StyledTd>
        <button onClick={onRemove}>
          <i className={classnames('material-icons', 'md-24', 'md-dark')}>
            delete
          </i>
        </button>
      </StyledTd>
    </tr>
  );
};

export default TableRow;
