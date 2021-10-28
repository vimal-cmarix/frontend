import React, { useMemo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { useToast } from '@components/molecules/Notification';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// import reactCSS from 'reactcss'

import IconSVG from '@components/atoms/IconSVG';
import Btn from '@components/molecules/Btn';
import BoardService from '@api/services/board';

import { SPACING } from '@assets/styles/theme';

import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderContent,
  HeaderGroup,
  HorizontalBar,
  HeaderColor,
  HeaderColorPicker,
  ColorPopover,
  PopoverAction,
} from './style';

function Swimlane({
  type,
  showAddButton,
  colorCode,
  title,
  subTitle,
  swimlaneId,
  onAdd,
  children,
}) {
  let updatedColorCode = colorCode;
  const { query } = useRouter();
  const [background, setBackground] = useState(colorCode);
  // console.log('colorCode', colorCode, background);
  // console.log('updatedColorCode', updatedColorCode);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { t: buttonsT } = useTranslation('buttons');
  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  // const [displayColorPicker, setDisplayColorPicker] = useState(false);
  function handleChangeComplete(color) {
    setBackground(color.hex);
  }

  async function handleSaveColor() {
    const colorData = {
      colorCode: background,
    };
    updatedColorCode = background;
    await BoardService.setSwimlaneColor(query.boardId, swimlaneId, colorData);
    setDisplayColorPicker(false);
    showSuccess('Color changed successfully');
  }

  async function handleCancel() {
    // console.log('background', background);
    // console.log('updatedColorCode', updatedColorCode);
    setDisplayColorPicker(false);
    setBackground(updatedColorCode);
  }

  function handleDisplayColorChange() {
    if (displayColorPicker) {
      // console.log('test', updatedColorCode);
      setDisplayColorPicker(false);
      setBackground(updatedColorCode);
    } else {
      setDisplayColorPicker(true);
    }
  }

  const iconMap = useMemo(
    () => ({
      bookmarked: 'bookmarked',
      'application-sent': 'send',
      'application-viewed': 'eye',
      'interview-secured': 'interview',
      'final-outcome': 'lamp',
    }),
    [],
  );
  const styles = {
    // 'default': {
    color: {
      width: '16px',
      height: '16px',
      borderRadius: '2.75px',
      background: `${background}`,
    },
    headerColor: {
      width: '100%',
      height: '8px',
      background: `${background}`,
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    // },
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert('You clicked outside of me!');
          handleCancel();
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <Container>
      <HeaderColor color={background} />
      <Header>
        <HeaderGroup>
          <HeaderLeft color={background}>
            <IconSVG name={iconMap[type]} size={20} />
          </HeaderLeft>
          <HeaderContent>
            <h2>{title}</h2>
            <span>{subTitle}</span>
          </HeaderContent>
          <HeaderRight>
            <>
              <HeaderColorPicker>
                <Btn
                  handleClick={handleDisplayColorChange}
                  style={styles.color}
                  startIcon="downArrow"
                />
              </HeaderColorPicker>
              {displayColorPicker ? (
                <ColorPopover ref={wrapperRef}>
                  {/* <ReactColorPreset /> */}
                  <SketchPicker
                    disableAlpha
                    styles={styles.headerColor}
                    color={background}
                    onChange={handleChangeComplete}
                  />
                  <PopoverAction>
                    <Btn
                      type="button"
                      label={buttonsT('cancel')}
                      handleClick={handleCancel}
                      size="md"
                      variant="outlineSecondary"
                    />
                    <Btn
                      type="button"
                      label={buttonsT('save')}
                      handleClick={handleSaveColor}
                      size="md"
                      variant="outlinePrimary"
                    />
                  </PopoverAction>
                </ColorPopover>
              ) : null}
            </>
          </HeaderRight>
        </HeaderGroup>
        <HorizontalBar />
        {/* {showAddButton ? (
          <HeaderGroup>
            <Btn
              style={{ marginTop: SPACING * 4 }}
              variant="addBoard"
              handleClick={onAdd}
              startIcon="plus"
              full
            /> 
          </HeaderGroup>
        ) : (
          <HorizontalBar />
        )} */}
        {/* <Btn handleClick={onAdd} /> */}
      </Header>
      {children}
    </Container>
  );
}

Swimlane.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  colorCode: PropTypes.string.isRequired,
  swimlaneId: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
};

Swimlane.defaultProps = {
  showAddButton: false,
  onAdd: () => null,
};

export default Swimlane;
