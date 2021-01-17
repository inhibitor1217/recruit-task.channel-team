import classnames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm, reset, SubmitHandler } from 'redux-form';
import { actions } from '../../store';
import { isValidCountry } from '../../utils';
import { ADD_COUNTRY_FORM_KEY, CONTENT_WIDTH } from '../../utils/const';

interface AddCountryFormProps {
  handleSubmit: SubmitHandler;
  submitting: boolean;
  pristine: boolean;
  invalid: boolean;
  reset(): void;
}

const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 1;

  padding: 16px 0;

  margin-right: 16px;

  label {
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
  }

  > * + * {
    margin-top: 4px;
  }
`;

const StyledInput = styled.input<{ error: boolean }>`
  margin-right: 16px;
  align-self: stretch;

  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 2px 4px;
  margin: 0;
  outline: none;

  ${({ error }) => error && `border-color: #f44336;`}

  font-size: 14px;
  line-height: 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  > * + * {
    margin-left: 4px;
  }

  i {
    padding-top: 2px;
  }

  span {
    word-break: keep-all;
  }
`;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}: {
  input: React.InputHTMLAttributes<HTMLInputElement>;
  label: string;
  type: string;
  meta: { touched: string; error: string; warning: string };
}) => (
  <StyledFieldContainer>
    <label>{label}</label>
    <StyledInput
      {...input}
      placeholder={label}
      type={type}
      error={!!(touched && (error || warning))}
    />
    {touched &&
      ((error && (
        <ErrorContainer>
          <i className={classnames('material-icons', 'md-16', 'md-dark')}>
            error
          </i>
          <span>{error}</span>
        </ErrorContainer>
      )) ||
        (warning && (
          <ErrorContainer>
            <i className={classnames('material-icons', 'md-16', 'md-dark')}>
              error
            </i>
            <span>{warning}</span>
          </ErrorContainer>
        )))}
  </StyledFieldContainer>
);

const StyledFormContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #e0e0e0;

  form {
    width: ${CONTENT_WIDTH}px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;

    button {
      align-self: center;
      margin-left: auto;
    }

    button + button {
      margin-left: 8px;
    }
  }
`;

const StyledActionButton = styled.button`
  background-color: transparent;
  width: 32px;
  height: 32px;
  padding: 4px;
  margin: 0;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: initial;
  }
`;

const AddCountryForm: React.FC<AddCountryFormProps> = ({
  handleSubmit,
  pristine,
  invalid,
  reset: resetForm,
  submitting,
}) => {
  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit}>
        <Field
          name="code"
          type="text"
          label="국가 코드"
          component={renderField}
        />
        <Field name="name" type="text" label="이름" component={renderField} />
        <Field
          name="capital"
          type="text"
          label="수도"
          component={renderField}
        />
        <Field name="region" type="text" label="대륙" component={renderField} />
        <Field
          name="callingCodes"
          type="text"
          label="국가 전화번호"
          component={renderField}
        />
        <StyledActionButton type="submit" disabled={invalid || submitting}>
          <i
            className={classnames(
              'material-icons',
              'md-24',
              'md-dark',
              (invalid || submitting) && 'md-inactive'
            )}
          >
            playlist_add
          </i>
        </StyledActionButton>
        <StyledActionButton
          type="button"
          disabled={pristine || submitting}
          onClick={resetForm}
        >
          <i
            className={classnames(
              'material-icons',
              'md-24',
              'md-dark',
              (pristine || submitting) && 'md-inactive'
            )}
          >
            clear
          </i>
        </StyledActionButton>
      </form>
    </StyledFormContainer>
  );
};

const callingCodesRegex = /^([0-9, ]+)$/i;

export default reduxForm({
  form: ADD_COUNTRY_FORM_KEY,
  validate: (values: Record<string, string>) => {
    return {
      code: values.code ? undefined : '국가 코드를 입력하세요.',
      name: values.name ? undefined : '이름을 입력하세요.',
      callingCodes: callingCodesRegex.test(values.callingCodes)
        ? undefined
        : '올바른 형태의 국가 전화번호를 입력하세요.',
    };
  },
  onSubmit: (values: Record<string, string>, dispatch) => {
    const candidate: AnyJson = {
      name: values.name,
      alpha2Code: values.code,
      capital: values.capital ?? '',
      region: values.region ?? '',
      callingCodes: (values.callingCodes ?? '').replace(' ', '').split(','),
    };
    if (!isValidCountry(candidate)) {
      throw Error(`invalid country: ${JSON.stringify(candidate)}`);
    }
    dispatch(actions.countries.addConfirm(candidate));
  },
  onSubmitSuccess: (result, dispatch) => dispatch(reset(ADD_COUNTRY_FORM_KEY)),
})(AddCountryForm);
