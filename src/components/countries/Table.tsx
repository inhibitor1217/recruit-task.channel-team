import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TableHeader, TableRow } from '.';
import { useCallbackOnScrollEnd } from '../../hooks';
import { actions, RootState } from '../../store/modules';
import { sortedCountries } from '../../store/selectors';
import { paginatedCountries } from '../../store/selectors/countries';
import { CONTENT_WIDTH } from '../../utils/const';
import { AddCountryForm } from '../interactions';

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;

  overflow-y: auto;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

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

  td {
    padding: 4px 8px;
  }
  td.has-text {
    min-width: 120px;
  }
`;

const StyledLoadingIndicator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${CONTENT_WIDTH}px;
  flex: 1;
  background-color: #f5f5f5;
`;

const StyledFullRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${CONTENT_WIDTH}px;
  height: 120px;

  span.link {
    color: #2196f3;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Table: React.FC = () => {
  const dispatch = useDispatch();

  const countries = useSelector(paginatedCountries);

  const count = useSelector(sortedCountries)?.length;
  const isAdding = useSelector((state: RootState) => state.countries.add);

  const [scrollContainerRef, onScroll] = useCallbackOnScrollEnd<HTMLDivElement>(
    () => dispatch(actions.countries.fetchMore())
  );

  React.useEffect(() => {
    onScroll();
  }, [count]);

  return (
    <ScrollContainer ref={scrollContainerRef} onScroll={onScroll}>
      {isAdding && <AddCountryForm />}
      <StyledTable>
        <tbody>
          <TableHeader />
          {countries &&
            countries.map((item, index) => (
              <TableRow
                key={item.id}
                id={item.id}
                country={item.country}
                index={index}
              />
            ))}
        </tbody>
      </StyledTable>
      {!countries && (
        <StyledLoadingIndicator>
          <span>Loading ...</span>
        </StyledLoadingIndicator>
      )}
      {countries && count === 0 && (
        <StyledFullRow>
          <span>검색 결과가 없습니다.</span>
        </StyledFullRow>
      )}
    </ScrollContainer>
  );
};

export default Table;
