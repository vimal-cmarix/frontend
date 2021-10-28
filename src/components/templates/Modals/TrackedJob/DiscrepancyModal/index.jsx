import React from 'react';
import PropTypes from 'prop-types';
import ModalBody from '../../ModalBody';
import {
  DiscrepancyModalOptionType,
  DiscrepancyModalDivider,
  DiscrepancyModalHeader,
  DiscrepancyModalOption,
  InfoWrapper,
  DiscrepancyModalOptionItem,
} from './style';

const DiscrepancyModal = ({
  originalJobTitle,
  updatedJobTitle,
  onOptionPicked,
  setInternalModalShow,
}) => {
  function closeModal() {
    setInternalModalShow(false);
  }

  const handleOptionSelected = async selectedOption => {
    const payload = { selectedJobTitle: selectedOption };
    try {
      await onOptionPicked(payload);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalBody isUnPadding onCancel={closeModal}>
      <InfoWrapper>
        <DiscrepancyModalHeader>
          Hey! It looks like theres a difference between the job title you put
          in and the job title from the posting URL. Which would you like to
          use?
        </DiscrepancyModalHeader>
        <DiscrepancyModalOption
          role="button"
          tabIndex={0}
          onClick={() => handleOptionSelected(originalJobTitle)}
          onKeyDown={() => handleOptionSelected(originalJobTitle)}
        >
          <DiscrepancyModalOptionType>Job Title</DiscrepancyModalOptionType>
          <DiscrepancyModalOptionItem>
            {originalJobTitle}
          </DiscrepancyModalOptionItem>
        </DiscrepancyModalOption>

        <DiscrepancyModalDivider>OR</DiscrepancyModalDivider>

        <DiscrepancyModalOption
          role="button"
          tabIndex={0}
          onClick={() => handleOptionSelected(updatedJobTitle)}
          onKeyDown={() => handleOptionSelected(updatedJobTitle)}
        >
          <DiscrepancyModalOptionType>Job Title</DiscrepancyModalOptionType>
          <DiscrepancyModalOptionItem>
            {updatedJobTitle}
          </DiscrepancyModalOptionItem>
        </DiscrepancyModalOption>
      </InfoWrapper>
    </ModalBody>
  );
};

DiscrepancyModal.propTypes = {
  originalJobTitle: PropTypes.string.isRequired,
  updatedJobTitle: PropTypes.string.isRequired,
  onOptionPicked: PropTypes.func.isRequired,
  setInternalModalShow: PropTypes.func.isRequired,
};

export default DiscrepancyModal;
