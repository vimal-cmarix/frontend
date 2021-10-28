import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { List, ListItem, Label, Error, Container, Text, Bullet } from './style';

/**
 * Styled html checkbox
 */
const RadioList = ({
  name,
  list,
  layout,
  onChange,
  value,
  size,
  colorLight,
}) => {
  const radioRefs = useRef([]);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: radioRefs.current,
      getValue: refs => {
        return refs.find(ref => ref.checked).value || '';
      },
      setValue: (refs, id) => {
        const inputRef = refs.find(ref => ref && ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: refs => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  if (list?.length > 0)
    return (
      <Container>
        <List layout={layout}>
          {list.map((item, index) => (
            <ListItem key={`item-${index + 1}`}>
              <Label
                onClick={() => {
                  onChange(item.value);
                }}
              >
                <input
                  name={name}
                  id={`${name}-${item.value}`}
                  checked={value === item.value}
                  ref={ref => radioRefs.current.push(ref)}
                  disabled={item.disabled ? 'disabled' : ''}
                  type="radio"
                  value={item.value}
                />
                <Bullet size={size} colorLight={colorLight} />
                <Text size={size}>{item.label}</Text>
              </Label>
            </ListItem>
          ))}
        </List>
        {error && <Error>{error}</Error>}
      </Container>
    );

  return '';
};

RadioList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  layout: PropTypes.oneOf(['column', 'row']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  colorLight: PropTypes.bool,
  onChange: PropTypes.func,
};

RadioList.defaultProps = {
  layout: 'row',
  size: 'small',
  colorLight: false,
  onChange: undefined,
};

export default RadioList;
