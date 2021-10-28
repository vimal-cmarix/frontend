import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '@components/molecules/TextInput';
import Checkbox from '@components/atoms/CheckBox';

import { Container, WrapperCheckbox } from './style';

const ListFeedback = ({ list, onChange, placeholder }) => {
  return (
    <Container>
      {list.map(item => (
        <WrapperCheckbox key={item.value}>
          <Checkbox
            name="option"
            checked={item.checked}
            label={item.label}
            onChange={() => onChange(item)}
          />
        </WrapperCheckbox>
      ))}
      <TextInput id="tagIn" name="detail" multiline placeholder={placeholder} />
    </Container>
  );
};

ListFeedback.propTypes = {
  list: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

ListFeedback.defaultProps = {
  placeholder: '',
};

export default ListFeedback;
