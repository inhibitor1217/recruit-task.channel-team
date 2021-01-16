import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';
import { RootState } from '../../store/modules';
import { canStartAddingCountry } from '../../store/selectors/countries';

const ActionGroup: React.FC = () => {
  const dispatch = useDispatch();

  const isLoadPending = useSelector(
    (state: RootState) => state.countries.pending
  );

  const onReload = () => dispatch(actions.countries.load());
  const onStartAdd = () => dispatch(actions.countries.addToggle());

  return (
    <div>
      <button onClick={onReload} disabled={isLoadPending}>
        Reset
      </button>
      {isLoadPending && <span>Loading ...</span>}
      <button
        onClick={onStartAdd}
        disabled={!useSelector(canStartAddingCountry)}
      >
        Add
      </button>
    </div>
  );
};

export default ActionGroup;
