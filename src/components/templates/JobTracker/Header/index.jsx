import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { sizes as breakpoint } from '@assets/styles/medias';

import IconSVG from '@components/atoms/IconSVG';
import Btn from '@components/molecules/Btn';

import useMedia from '@src/hooks/useMedia';

import { Container, MobileTitle } from './style';
import { CreateButton } from '../style';

const Header = ({ mobileTitle, showCreateButton, handleCreate }) => {
  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const router = useRouter();

  return (
    <Container>
      {isMobile ? (
        <Btn startIcon="leftArrow" handleClick={() => router.back()} />
      ) : (
        <div />
      )}
      {mobileTitle && <MobileTitle>{mobileTitle}</MobileTitle>}
      {showCreateButton && (
        <CreateButton onClick={() => handleCreate()}>
          <IconSVG name="plus" size={12} />
          <span>Create</span>
        </CreateButton>
      )}
    </Container>
  );
};

Header.propTypes = {
  mobileTitle: PropTypes.string,
  showCreateButton: PropTypes.bool,
  handleCreate: PropTypes.func,
};

Header.defaultProps = {
  mobileTitle: null,
  showCreateButton: true,
  handleCreate: () => {},
};

export default Header;
