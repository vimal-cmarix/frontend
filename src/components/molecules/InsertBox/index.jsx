import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@components/atoms/Icon';

import { Container, AddButton, IconWrapper, Text } from './style';

/**
 * The insert card is used when there are not data
 */
const InsertBox = ({ label, onClick }) => {
  return (
    <Container onClick={onClick}>
      <AddButton>
        <IconWrapper>
          <Icon name="add-circle_solid" />
        </IconWrapper>
        {label && <Text>{label}</Text>}
      </AddButton>
    </Container>
  );
};

InsertBox.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

InsertBox.defaultProps = {
  label: '',
  onClick: () => {},
};

export default InsertBox;
