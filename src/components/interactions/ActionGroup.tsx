import classnames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../../store';
import { RootState } from '../../store/modules';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * + * {
    margin-left: 8px;
  }
`;

const StyledActionButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: #26a69a;
  border-radius: 20px;
  border: none;
  outline: none;

  &:hover {
    background-color: #80cbc4;
    cursor: pointer;
  }

  &:active {
    background-color: #b2dfdb;
  }

  &:disabled {
    background-color: #26a69a;
  }

  &:disabled:hover {
    cursor: initial;
  }
`;

const StyledToggleButton = styled(StyledActionButton)<{ isActive: boolean }>`
  ${({ isActive }) =>
    isActive &&
    `
    background-color: #00695C;

    &:hover {
      background-color: #00897B;
    }
  
    &:active {
      background-color: #00796B;
    }
  
    &:disabled {
      background-color: #26A69A;
    }
  `}
`;

const ActionGroup: React.FC = () => {
  const dispatch = useDispatch();

  const isLoadPending = useSelector(
    (state: RootState) => state.countries.pending
  );
  const isAdding = useSelector((state: RootState) => state.countries.add);

  const onReload = () => dispatch(actions.countries.load());
  const onStartAdd = () => dispatch(actions.countries.addToggle());

  return (
    <StyledContainer>
      {isLoadPending && <span>Loading ...</span>}
      <StyledActionButton onClick={onReload} disabled={isLoadPending}>
        <i className={classnames('material-icons', 'md-24', 'md-light')}>
          refresh
        </i>
      </StyledActionButton>
      <StyledToggleButton isActive={isAdding} onClick={onStartAdd}>
        <i className={classnames('material-icons', 'md-24', 'md-light')}>add</i>
      </StyledToggleButton>
    </StyledContainer>
  );
};

export default ActionGroup;
