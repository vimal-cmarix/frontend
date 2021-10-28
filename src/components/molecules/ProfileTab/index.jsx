import React from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { Grey31 } from '@assets/styles/colors';

import { Container, Button, Text, EditButton } from './style';

function ProfileTab({
  text,
  isActive,
  onClickEditButton,
  onClick,
  isTimeline,
}) {
  return (
    <Container
      isActive={isActive}
      onClick={onClick}
      className={`profile-tab-${text.toLowerCase().replace(' ', '_')}`}
    >
      <Button>
        <Text isTimeline={isTimeline}>{text}</Text>
        {onClickEditButton && (
          <EditButton onClick={onClickEditButton}>
            <IconSVG name="edit" size={16} color={Grey31} />
          </EditButton>
        )}
      </Button>
    </Container>
  );
}

ProfileTab.propTypes = {
  isActive: PropTypes.bool,
  isTimeline: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClickEditButton: PropTypes.func,
};

ProfileTab.defaultProps = {
  isActive: false,
  isTimeline: false,
  onClickEditButton: null,
  onClick: null,
};

export default ProfileTab;
