import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';

const KeywordInput: React.FC = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState<string>('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const commitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.countries.setKeyword(keyword));
  };

  return (
    <form onSubmit={commitKeyword}>
      <input onChange={onChangeInput} />
      <button>search</button>
    </form>
  );
};

export default KeywordInput;
