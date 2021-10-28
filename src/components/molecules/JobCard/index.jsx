import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconSVG from '@components/atoms/IconSVG';

import { getFirstLetters, intlFormatDate } from '@utils/general';

import {
  Container,
  JobTitle,
  CompanyName,
  CreatedAt,
  Group,
  Image,
  Content,
  RightIcon,
  WrapperTrackedIcon,
  CheckBox,
  colorSchemes,
} from './style';

const variants = Object.keys(colorSchemes).filter(
  variant => variant !== 'disabled',
);

function JobCard({
  data,
  showDeleteButton,
  onDelete,
  onGroupClick,
  isSelectable,
  onSelect,
  isSelect,
  isDragging,
}) {
  const { jobTitle, company, createdAt, tracked, deletedAt } = data;
  const [themeColorIndex] = useState(0);

  const isDisabled = !!deletedAt;
  const colorScheme = isDisabled
    ? 'disabled'
    : data.theme || variants[themeColorIndex];

  return (
    <Container
      isDragging={isDragging}
      isDisabled={isDisabled}
      isSelectable={isSelectable}
      colorScheme={colorScheme}
    >
      <Group onClick={isSelectable ? onSelect : onGroupClick}>
        <Image>{getFirstLetters(jobTitle)}</Image>
        <Content>
          <JobTitle>{jobTitle}</JobTitle>
          <CompanyName>{company.name ? company.name : company}</CompanyName>
          <CreatedAt>
            <span>Created on: {intlFormatDate(Date.parse(createdAt))}</span>
            <IconSVG name="clock" size={12} />
          </CreatedAt>
        </Content>
        <WrapperTrackedIcon>
          <IconSVG name={tracked ? 'eye' : 'unEye'} size={15} />
        </WrapperTrackedIcon>
        {!isDisabled && showDeleteButton && (
          <RightIcon onClick={onDelete}>
            <IconSVG name="trash" size={24} />
          </RightIcon>
        )}
        {isSelectable && (
          <CheckBox isSelect={isSelect}>
            <IconSVG name="checkStroke" size={20} />
          </CheckBox>
        )}
      </Group>
    </Container>
  );
}

JobCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    jobTitle: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    deletedAt: PropTypes.string,
    tracked: PropTypes.bool,
    theme: PropTypes.oneOfType(Object.keys(colorSchemes)),
  }).isRequired,
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onGroupClick: PropTypes.func,
  isSelectable: PropTypes.bool,
  onSelect: PropTypes.func,
  isSelect: PropTypes.bool,
  isDragging: PropTypes.bool,
};

JobCard.defaultProps = {
  showDeleteButton: true,
  isSelectable: false,
  isSelect: false,
  isDragging: false,
  onDelete: () => null,
  onGroupClick: () => null,
  onSelect: () => null,
};

export default JobCard;
