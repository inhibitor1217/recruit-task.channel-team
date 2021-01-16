import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actions, RootState } from '../../store/modules';
import {
  CountriesOrder,
  CountriesOrderBy,
} from '../../store/modules/countries';

const columns: {
  key: string;
  label: string;
  orderBy: CountriesOrderBy;
}[] = [
  {
    key: CountriesOrderBy[CountriesOrderBy.code],
    label: '국가 코드',
    orderBy: CountriesOrderBy.code,
  },
  {
    key: CountriesOrderBy[CountriesOrderBy.name],
    label: '이름',
    orderBy: CountriesOrderBy.name,
  },
  {
    key: CountriesOrderBy[CountriesOrderBy.capital],
    label: '수도',
    orderBy: CountriesOrderBy.capital,
  },
  {
    key: CountriesOrderBy[CountriesOrderBy.region],
    label: '대륙',
    orderBy: CountriesOrderBy.region,
  },
  {
    key: CountriesOrderBy[CountriesOrderBy.callingCode],
    label: '국가 전화번호',
    orderBy: CountriesOrderBy.callingCode,
  },
];

const StyledCell = styled.td<{ active: boolean }>`
  span {
    font-weight: bold;
    color: #888888;
    ${({ active }) => active && `color: #000000`}
  }

  > * + * {
    margin-left: 8px;
  }
`;

const TableHeader: React.FC = () => {
  const dispatch = useDispatch();
  const activeOrderBy = useSelector(
    (state: RootState) => state.countries.orderBy
  );
  const activeOrder = useSelector((state: RootState) => state.countries.order);

  return (
    <tr>
      {columns.map(({ key, label, orderBy }) => {
        const isActive = activeOrderBy === orderBy;
        const order = isActive ? activeOrder : CountriesOrder.ascending;

        return (
          <StyledCell key={key} active={isActive}>
            <span>{label}</span>
            <button
              onClick={() => dispatch(actions.countries.orderBy(orderBy))}
            >
              {order === CountriesOrder.ascending ? 'asc' : 'desc'}
            </button>
          </StyledCell>
        );
      })}
      <td />
    </tr>
  );
};

export default TableHeader;
