import React from 'react';
import PropTypes from 'prop-types';
import { White } from '@assets/styles/colors';

import Loader from '@components/atoms/Loader';
import { LoaderWrapper } from '@components/atoms/Noembed/style';
import {
  DropDownContainer,
  Option,
  OptionLabel,
  ContainerOptions,
  ContainerAvatar,
} from './style';
import ScrollbarCustom from '../ScrollbarCustom';
import Avatar from '../Avatar';

/**
 * The Dropdown of CustomSelect Molecule
 */
const Dropdown = ({
  options,
  size,
  isActive,
  onOptionSelected,
  toTop,
  position,
  autoHeightMax,
  loading,
  topOrBottom,
}) => {
  function getOptions() {
    return options.map(option => (
      <Option
        key={option.value}
        onClick={() => {
          onOptionSelected(option);
        }}
      >
        {option.image && (
          <ContainerAvatar>
            <Avatar
              objectFit="contain"
              background={White}
              image={option.image}
              size="xxsmall"
            />
          </ContainerAvatar>
        )}
        <OptionLabel>{option.label}</OptionLabel>
      </Option>
    ));
  }

  return (
    isActive && (
      <DropDownContainer
        topOrBottom={topOrBottom}
        position={position}
        toTop={toTop}
        size={size}
      >
        <ScrollbarCustom autoHeightMax={autoHeightMax}>
          <ContainerOptions>
            {loading ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : (
              getOptions()
            )}
          </ContainerOptions>
        </ScrollbarCustom>
      </DropDownContainer>
    )
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
  size: PropTypes.oneOf(['small', 'medium']),
  isActive: PropTypes.bool.isRequired,
  onOptionSelected: PropTypes.func.isRequired,
  toTop: PropTypes.bool,
  position: PropTypes.oneOf(['absolute', 'relative', 'fixed']),
  autoHeightMax: PropTypes.string,
  loading: PropTypes.bool,
  topOrBottom: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [],
  size: 'small',
  toTop: false,
  position: 'absolute',
  autoHeightMax: '203px',
  loading: false,
  topOrBottom: '',
};

export default Dropdown;
