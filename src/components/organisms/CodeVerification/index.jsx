import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import CodeInput from '@components/molecules/CodeInput';

import { Container, CodeBlock, Input, CodeContainer } from './style';

const CodeVerification = ({ onValidate }) => {
  const [value, setValue] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);
  const [focus, setFocus] = useState(0);
  const input = useRef(null);

  const inputValue = () => {
    return value.reduce(
      (acc, item) => (item.value ? acc + item.value : acc),
      '',
    );
  };

  const validate = () => {
    const val = inputValue();
    onValidate(val);
  };

  const changeDigit = event => {
    const { value: val } = event.target;
    const currentLength = val.toString()?.length;
    const oldLength = inputValue()?.length;
    if (currentLength > 6) return;

    const newValue = value.map((item, index) => {
      const newItem = item;
      newItem.value = val[index];
      return newItem;
    });

    const newFocus = focus + (currentLength > oldLength ? +1 : -1);
    if (newFocus > 5 || newFocus < 0 || focus >= currentLength) {
      setFocus(currentLength);
    } else {
      setFocus(newFocus);
    }
    setValue([...newValue]);
    validate();
  };

  const refreshFocus = event => {
    const { keyCode } = event;
    if (keyCode === 39 && focus < 5) {
      setFocus(focus + 1);
    } else if (keyCode === 37 && focus > 0) {
      setFocus(focus - 1);
    }
  };

  const inputFocus = e => {
    if (e) e.preventDefault();
    input.current.focus();
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Container>
      <Input
        type="tel"
        maxLength="6"
        pattern="[0-9]{6}"
        autoComplete="one-time-code"
        onKeyDown={e => refreshFocus(e)}
        onChange={e => changeDigit(e)}
        value={inputValue()}
        ref={input}
        autoFocus
      />
      <CodeContainer>
        {value.map((digit, index) => (
          <CodeBlock key={digit.id} onClick={e => inputFocus(e)}>
            <CodeInput value={digit.value} focus={index === focus} />
          </CodeBlock>
        ))}
      </CodeContainer>
    </Container>
  );
};

CodeVerification.propTypes = {
  onValidate: PropTypes.func,
};

CodeVerification.defaultProps = {
  onValidate: () => null,
};

export default CodeVerification;
