import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function CustomSelect({ name, options, ...props }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value[value]',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <Select
        name={fieldName}
        options={options}
        classNamePrefix="select"
        ref={ref}
        placeholder="Selecione o aluno"
        {...props}
        className="asyncInput"
      />

      {error && <span className="error">{error}</span>}
    </Container>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      duration: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
};
