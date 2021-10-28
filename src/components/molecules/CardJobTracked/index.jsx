import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AppContext from '@context/appContext';
import { sizes } from '@assets/styles/medias';

import { Button } from '../Button';
import {
  ButtonCreateMobile,
  CardTrackedJob,
  ContainerSubTitleJob,
  TitleCardJobTracked,
  ContentCardJobTracked,
  SubTitleCardJobTracked,
} from './style';
import { HideMobile } from '../../templates/Modals/style';

const CardJobTracked = ({
  title,
  subTitle,
  content,
  TrackedIcon,
  tracked,
  handleCreate,
}) => {
  const { state: appState } = useContext(AppContext);

  const { t: buttonsT } = useTranslation('buttons');

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  return (
    <CardTrackedJob
      onClick={() => {
        if (screenWidth < parseInt(sizes.tablet, 10)) handleCreate(tracked);
      }}
    >
      <TitleCardJobTracked>{title}</TitleCardJobTracked>
      <ContainerSubTitleJob>
        <TrackedIcon />
        <SubTitleCardJobTracked>{subTitle}</SubTitleCardJobTracked>
      </ContainerSubTitleJob>
      <ContentCardJobTracked>{content}</ContentCardJobTracked>
      <HideMobile>
        <Button
          label={buttonsT('Create')}
          size="small"
          icon="arrow_right"
          handleClick={() => handleCreate(tracked)}
        />
      </HideMobile>
      <ButtonCreateMobile onClick={() => handleCreate(tracked)}>
        Tap to continue
      </ButtonCreateMobile>
    </CardTrackedJob>
  );
};

CardJobTracked.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  TrackedIcon: PropTypes.func.isRequired,
  tracked: PropTypes.bool,
  handleCreate: PropTypes.func.isRequired,
};

CardJobTracked.defaultProps = {
  tracked: false,
};

export default CardJobTracked;
