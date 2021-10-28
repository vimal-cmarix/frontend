import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@components/atoms/Icon';

import { Container, Label, IconWrapper } from './style';

/*
 * SimpleLink component
 * You can remove chevron icon by passing arrow as false
 */

const SimpleLink = ({
  label,
  size,
  arrow,
  href,
  handleClick,
  arrowDirection,
}) => (
  <>
    {handleClick ? (
      <Container onClick={handleClick}>
        {arrow === 'left' && (
          <IconWrapper arrow={arrow}>
            <Icon name="arrow_right" />
          </IconWrapper>
        )}
        <Label size={size} arrow={arrow}>
          {label}
        </Label>
        {arrow === 'right' && (
          <IconWrapper arrow={arrow} direction={arrowDirection || 'left'}>
            <Icon name="arrow_right" />
          </IconWrapper>
        )}
      </Container>
    ) : (
      <Link href={href}>
        <Container href={href}>
          {arrow === 'left' && (
            <IconWrapper arrow={arrow}>
              <Icon name="arrow_right" />
            </IconWrapper>
          )}
          <Label size={size} arrow={arrow}>
            {label}
          </Label>
          {arrow === 'right' && (
            <IconWrapper arrow={arrow}>
              <Icon name="arrow_right" />
            </IconWrapper>
          )}
        </Container>
      </Link>
    )}
  </>
);

SimpleLink.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  arrow: PropTypes.oneOf(['right', 'left']),
  href: PropTypes.string,
  handleClick: PropTypes.func,
  arrowDirection: PropTypes.string,
};

SimpleLink.defaultProps = {
  size: 'small',
  arrow: 'right',
  href: '#',
  handleClick: undefined,
  arrowDirection: 'left',
};

export default SimpleLink;
