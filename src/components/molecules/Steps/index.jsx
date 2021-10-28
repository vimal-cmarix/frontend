import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'styled-css-grid';
import { useTranslation } from 'react-i18next';

import { sizes } from '@assets/styles/medias';
import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';

import {
  List,
  ListItem,
  StepName,
  StepNumber,
  StepState,
  IconWrapper,
} from './style';

const Steps = ({ active, list }) => {
  const { t: presentationT } = useTranslation('pitch_steps');
  const { state: appState } = useContext(AppContext);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 4;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 6;
    return 0;
  }

  function getGridSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.laptop, 10)) return 12;
    return 1;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 4;
    return 0;
  }

  function getGapSize() {
    if (screenWidth > parseInt(sizes.laptop, 10)) return '24px';
    return '0';
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();
  const gapSize = getGapSize();

  function getState(id) {
    const index = list.findIndex(i => i.id === id);
    const activeIndex = list.findIndex(i => i.id === active);

    if (index > activeIndex)
      return {
        id: 'waiting',
        label: presentationT('steps.status.waiting'),
      };

    if (index < activeIndex)
      return {
        id: 'pass',
        label: presentationT('steps.status.pass'),
      };

    return {
      id: 'active',
      label: presentationT('steps.status.active'),
    };
  }

  return (
    <Grid columns={gridSize} gap={gapSize}>
      <Cell left={leftSize} width={cellSize}>
        <List>
          {list.map((item, index) => (
            <ListItem
              width={100 / list?.length}
              state={getState(item.id).id}
              key={`step-${item.id}`}
            >
              <StepNumber state={getState(item.id).id}>
                {getState(item.id).id === 'pass' ? (
                  <IconWrapper>
                    <Icon name="check" />
                  </IconWrapper>
                ) : (
                  index + 1
                )}
              </StepNumber>
              <StepName state={getState(item.id).id}>{item.label}</StepName>
              <StepState state={getState(item.id).id}>
                {getState(item.id).label}
              </StepState>
            </ListItem>
          ))}
        </List>
      </Cell>
    </Grid>
  );
};

Steps.propTypes = {
  active: PropTypes.string.isRequired,
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Steps;
