import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';
import useCombinedRefs from '@hooks/useCombinedRefs';
import {
  DatePickerInput,
  ButtonCorner,
  DatePickerInputContainer,
} from './style';

const CustomDatePickerInput = ({ value, onClick, hasError }, ref) => {
  const [isOpened, setIsOpened] = useState(false);
  const combinedRef = useCombinedRefs(ref);

  const handleButtonClick = () => {
    setIsOpened(true);
    onClick();
  };

  return (
    <DatePickerInputContainer isOpened={isOpened} hasError={hasError}>
      <DatePickerInput
        hasError={hasError}
        placeholder="MM/YYYY"
        ref={combinedRef}
        defaultValue={value}
        onFocus={handleButtonClick}
        onBlur={() => setIsOpened(false)}
        readOnly
      />
      <ButtonCorner
        isOpened={isOpened}
        onClick={() => combinedRef.current.focus()}
      >
        <IconSVG name="calendar" size={20} />
      </ButtonCorner>
    </DatePickerInputContainer>
  );
};

CustomDatePickerInput.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default forwardRef(CustomDatePickerInput);
