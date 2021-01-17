import classnames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actions } from '../../store';

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.input`
  min-width: 300px;
  height: 40px;

  margin: 0;
  padding: 4px 12px;
  outline: none;
  border: 1px solid #e0e0e0;
  border-right-width: 0;
`;

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: #212121;
  border: none;
  outline: none;

  &:hover {
    background-color: #424242;
    cursor: pointer;
  }

  &:active {
    background-color: #555555;
  }

  &:disabled {
    i {
      color: #888888;
    }
  }

  &:disabled:hover {
    cursor: initial;
    background-color: #212121;
  }
`;

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
    <StyledForm onSubmit={commitKeyword}>
      <StyledInput
        onChange={onChangeInput}
        placeholder="국가 코드, 이름 등으로 검색"
      />
      <StyledButton>
        <i className={classnames('material-icons', 'md-24', 'md-light')}>
          search
        </i>
      </StyledButton>
    </StyledForm>
  );
};

export default KeywordInput;
