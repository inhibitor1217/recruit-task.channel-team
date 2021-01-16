import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, reset, SubmitHandler } from 'redux-form';
import { actions } from '../../store';
import { isValidCountry } from '../../utils';
import { ADD_COUNTRY_FORM_KEY } from '../../utils/const';

interface AddCountryFormProps {
  handleSubmit: SubmitHandler;
  submitting: boolean;
  pristine: boolean;
  invalid: boolean;
  reset(): void;
}

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
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const AddCountryForm: React.FC<AddCountryFormProps> = ({
  handleSubmit,
  pristine,
  invalid,
  reset: resetForm,
  submitting,
}) => {
  const dispatch = useDispatch();

  const cancel = () => dispatch(actions.countries.addToggle());

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="code"
        type="text"
        label="국가 코드"
        component={renderField}
      />
      <Field name="name" type="text" label="이름" component={renderField} />
      <Field name="capital" type="text" label="수도" component={renderField} />
      <Field name="region" type="text" label="대륙" component={renderField} />
      <Field
        name="callingCodes"
        type="text"
        label="국가 전화번호"
        component={renderField}
      />
      <button type="submit" disabled={invalid || submitting}>
        Submit
      </button>
      <button
        type="button"
        disabled={pristine || submitting}
        onClick={resetForm}
      >
        Clear
      </button>
      <button type="button" disabled={submitting} onClick={cancel}>
        Cancel
      </button>
    </form>
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
