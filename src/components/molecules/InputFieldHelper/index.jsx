import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';
import { Typography } from '@assets/styles/typo';

import { Container, QuestionModal, IconContainer } from './styles';

const InputFieldHelper = ({ content, exampleText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseIn = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const parseMultiParagraphs = text => {
    const listOfParagraphs = text.split('\\n');

    return listOfParagraphs.map(eachParagraph => (
      <Typography size="body1" color="grey31" style={{ marginBottom: 20 }}>
        {eachParagraph}
      </Typography>
    ));
  };

  return (
    <Container>
      <IconContainer
        onMouseOver={handleMouseIn}
        onFocus={handleMouseIn}
        onMouseOut={handleMouseOut}
        onBlur={handleMouseOut}
      >
        <IconSVG name="questionMark" size={20} />
      </IconContainer>
      {isHovered && (
        <QuestionModal>
          {parseMultiParagraphs(content)}

          <Typography size="body2" color="grey400">
            {exampleText}
          </Typography>
        </QuestionModal>
      )}
    </Container>
  );
};

InputFieldHelper.propTypes = {
  content: PropTypes.string.isRequired,
  exampleText: PropTypes.string,
};

InputFieldHelper.defaultProps = {
  exampleText: '',
};

export default InputFieldHelper;
