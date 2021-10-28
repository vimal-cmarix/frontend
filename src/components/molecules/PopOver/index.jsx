import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import IconSVG from '@components/atoms/IconSVG';
import { Container, PopOverItem, Icon } from './style';

/**
 * The Pop Over is used to display a simple pop-over list.
 * Each item can either be a link or have a onClick prop.
 * You can manage the click outside using the prop onClickOutside and passing the trigger element ref.
 * You can also manage the visibility using the prop isVisible.
 */
const PopOver = ({ isVisible, btnRef, onClickOutside, items, styles }) => {
  const popOverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!btnRef.current || btnRef.current.contains(event.target))
        return false;

      if (popOverRef.current && !popOverRef.current.contains(event.target)) {
        return onClickOutside();
      }
      return false;
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popOverRef]);

  return (
    <Container styles={styles} visible={isVisible} ref={popOverRef}>
      {items.map(item => {
        const { href, label, iconName, ...passProps } = item;

        if (href) {
          return (
            <Link href={href} key={label}>
              <PopOverItem href="#" {...passProps}>
                <span>{item.label}</span>
                {iconName && (
                  <Icon>
                    <IconSVG name={iconName} size={20} />
                  </Icon>
                )}
              </PopOverItem>
            </Link>
          );
        }
        return (
          <PopOverItem key={label} {...passProps}>
            <span>{item.label}</span>
            {iconName && (
              <Icon>
                <IconSVG name={iconName} size={20} />
              </Icon>
            )}
          </PopOverItem>
        );
      })}
    </Container>
  );
};

PopOver.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
  btnRef: PropTypes.shape({
    /* eslint-disable react/forbid-prop-types */
    current: PropTypes.any,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      data: PropTypes.string,
      iconName: PropTypes.string,
    }),
  ).isRequired,
  styles: PropTypes.string,
};

PopOver.defaultProps = {
  onClickOutside: () => null,
  btnRef: {
    current: null,
  },
  styles: '',
};

export default PopOver;
