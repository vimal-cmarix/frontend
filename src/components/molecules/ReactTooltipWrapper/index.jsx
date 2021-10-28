import { TooltipBg } from '@assets/styles/colors';
import { Typography } from '@assets/styles/typo';
import PropTypes from 'prop-types';
import React from 'react';
import { HoverContainer, StyledTooltip } from './style';

export const ReactTooltipWrapper = ({ children, text, place, ...rest }) => {
  return (
    <>
      <HoverContainer data-tip={text}>{children}</HoverContainer>
      <StyledTooltip
        place={place}
        effect="solid"
        backgroundColor={TooltipBg}
        getContent={dataTip => (
          <Typography
            color="grey31"
            size="headline1"
            dangerouslySetInnerHTML={{
              __html: dataTip,
            }}
          />
        )}
        {...rest}
      />
    </>
  );
};

ReactTooltipWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  place: PropTypes.string,
};

ReactTooltipWrapper.defaultProps = {
  place: 'top',
};
