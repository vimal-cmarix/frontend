import React from 'react';
import PropTypes from 'prop-types';

import JobCard from '@components/molecules/JobCard';

import { Container } from './style';

function JobCardList({ list, onSelectItem, selectedItems }) {
  const renderJobCard = jobCard => (
    <JobCard
      key={jobCard.id}
      data={jobCard}
      isSelectable={!!jobCard.canSelect}
      isSelect={selectedItems[jobCard.id]}
      showDeleteButton={false}
      onSelect={() => onSelectItem(jobCard.id)}
    />
  );

  return <Container>{list.map(renderJobCard)}</Container>;
}

JobCardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectItem: PropTypes.func,
  selectedItems: PropTypes.objectOf(PropTypes.any),
};

JobCardList.defaultProps = {
  selectedItems: {},
  onSelectItem: () => null,
};

export default JobCardList;
