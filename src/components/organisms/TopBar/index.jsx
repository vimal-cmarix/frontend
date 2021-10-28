import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

import Brand from '@components/atoms/Brand';

import { Container, NavWrapper, MarginTop, BrandWrapper } from './style';

/**
 * TopBar Component
 */
const TopBar = ({ colorSchema, component, className }) => {
  // const { t } = useTranslation('navbar');

  return (
    <Container colorSchema={colorSchema} className={className}>
      <MarginTop />
      <NavWrapper>
        <BrandWrapper>
          <Link href="/profile">
            <a href="/profile">
              <Brand
                colorSchema={colorSchema === 'light' ? 'dark' : 'light'}
                size="nav"
              />
            </a>
          </Link>
        </BrandWrapper>
        {component}
      </NavWrapper>
    </Container>
  );
};

TopBar.propTypes = {
  colorSchema: PropTypes.oneOf(['dark', 'light']),
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  className: PropTypes.string,
};

TopBar.defaultProps = {
  colorSchema: 'dark',
  component: null,
  className: '',
};

export default TopBar;
