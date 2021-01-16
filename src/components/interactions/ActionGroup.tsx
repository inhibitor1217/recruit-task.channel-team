import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';
import { RootState } from '../../store/modules';

const ActionGroup: React.FC = () => {
  const dispatch = useDispatch();

  const isLoadPending = useSelector(
    (state: RootState) => state.countries.pending
  );
  const onReload = () => dispatch(actions.countries.load());

  return (
    <div>
      <button onClick={onReload} disabled={isLoadPending}>
        Reset
      </button>
      {isLoadPending && <span>Loading ...</span>}
    </div>
  );
};

export default ActionGroup;
