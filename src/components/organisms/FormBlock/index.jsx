import React from 'react';
import PropTypes from 'prop-types';

import { ReactTooltipWrapper } from '@components/molecules/ReactTooltipWrapper';
import IconSVG from '@components/atoms/IconSVG';
import { Container, HelperTextPositioner, Label, InputWrapper } from './style';

/**
 * The From Group was made to group some form fields with Label.
 * You can pass any component as children.
 * You can also pass an optional 'helperText' props.
 * Has a 'disabled' state.
 */
const FormBlock = ({
  className,
  label,
  disabled,
  helperText,
  children,
  isLabelStrong,
  isLabelMedium,
  isLabelShowMobile,
  helperTextPos,
}) => {
  return (
    <Container disabled={disabled} className={className}>
      {label && (
        <Label
          disabled={disabled}
          isLabelStrong={isLabelStrong}
          isLabelMedium={isLabelMedium}
          isLabelShowMobile={isLabelShowMobile}
        >
          {label}
          {helperText && (
            <ReactTooltipWrapper text={helperText} place={helperTextPos}>
              <HelperTextPositioner>
                <IconSVG name="questionMark" size={16} />
              </HelperTextPositioner>
            </ReactTooltipWrapper>
          )}
        </Label>
      )}
      <InputWrapper>{children}</InputWrapper>
    </Container>
  );
};

FormBlock.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isLabelStrong: PropTypes.bool,
  isLabelMedium: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  isLabelShowMobile: PropTypes.bool,
  helperTextPos: PropTypes.string,
};

FormBlock.defaultProps = {
  className: undefined,
  label: null,
  disabled: false,
  helperText: undefined,
  isLabelStrong: false,
  isLabelMedium: false,
  helperTextPos: 'top',
  isLabelShowMobile: true,
};

export default FormBlock;
