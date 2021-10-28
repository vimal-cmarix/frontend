import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Typography } from '@assets/styles/typo';

import { Container } from './style';
import CustomDatePickerInput from './CustomDatePickerInput';

const CustomDatePicker = ({ error, ...rest }) => {
  useEffect(() => {
    const datePickers = document.getElementsByClassName(
      'react-datepicker__input-container',
    );
    Array.from(datePickers).forEach(el =>
      el.childNodes[0].setAttribute('readOnly', true),
    );
  }, []);

  return (
    <Container>
      <DatePicker
        {...rest}
        customInput={
          rest.defaultInput ? (
            <input type="text" readOnly />
          ) : (
            <CustomDatePickerInput hasError={!!error} />
          )
        }
      />
      {error && (
        <Typography
          color="red"
          size="body2"
          style={{ display: 'block', marginTop: 5 }}
        >
          {error}
        </Typography>
      )}
    </Container>
  );
};

CustomDatePicker.propTypes = {
  error: PropTypes.string,
  defaultInput: PropTypes.bool,
};

CustomDatePicker.defaultProps = {
  error: null,
  defaultInput: false,
};

export default CustomDatePicker;
