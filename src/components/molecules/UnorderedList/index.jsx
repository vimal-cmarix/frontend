import React from 'react';
import PropTypes from 'prop-types';

import { Container, Item } from './style';

const UnorderedList = ({ list, size, children }) => {
  return (
    <Container size={size}>
      {children}
      {list.map(i => (
        <Item key={i}>{i}</Item>
      ))}
    </Container>
  );
};

UnorderedList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  children: PropTypes.element,
};

UnorderedList.defaultProps = {
  size: 'small',
  children: null,
};

export default UnorderedList;
