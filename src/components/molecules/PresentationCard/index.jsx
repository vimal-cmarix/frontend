import React, { useState, useRef, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Typography } from '@assets/styles/typo';

import PaymentContext from '@context/paymentContext';
import AppContext from '@context/appContext';

import Icon from '@components/atoms/Icon';
import IconSVG from '@components/atoms/IconSVG';

import PopOver from '@components/molecules/PopOver';
import CardThumbnail from '@components/molecules/CardThumbnail';

import ModalAnalytics from '@components/templates/Modals/Analytics';
import ModalUpgrade from '@components/templates/Modals/activeAnalytics';

import { intlFormatDate, nFormatter } from '@src/utils/general';
import { FREE, PROFILE } from '@modules/consts';

import {
  Container,
  TextContainer,
  Created,
  ActionButton,
  OptionsContainer,
  Recipient,
  ViewsWrapper,
  Views,
  ViewsIcon,
  Description,
} from './style';

/**
 * The Post card is used to show info by post format.
 */
const PresentationCard = ({
  image,
  title,
  jobLink,
  views,
  recipient,
  created,
  onEdit,
  onDelete,
  handleRemovePitch,
  showingInJobTracker,
  isDraft,
  onShare,
  type,
  data,
  stylesPopOver,
}) => {
  const { t: presentationT } = useTranslation('presentation');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');

  const { state: paymentState } = useContext(PaymentContext);
  const { dispatch: appDispatch } = useContext(AppContext);

  const isAnalyticsEnabled = useMemo(
    () => paymentState.userPlan !== FREE && !isDraft && type !== PROFILE,
    [paymentState.userPlan, isDraft, type],
  );

  const isAnalyticsDisabled = useMemo(
    () => paymentState.userPlan === FREE && !isDraft && type !== PROFILE,
    [paymentState.userPlan, isDraft, type],
  );

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  const popOverItems = [];

  function showAnalytics() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalAnalytics,
      props: {
        type: 'presentation',
        data,
      },
    });
  }

  function showUpgradeModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalUpgrade,
      props: {
        showClose: true,
      },
    });
  }

  if (isAnalyticsEnabled) {
    popOverItems.push({
      iconName: 'analytics',
      label: presentationT('card_options.analytics'),
      onClick: showAnalytics,
    });
  }

  if (isAnalyticsDisabled) {
    popOverItems.push({
      iconName: 'analytics',
      label: presentationT('card_options.analytics'),
      onClick: showUpgradeModal,
    });
  }

  popOverItems.push({
    iconName: 'edit',
    label: presentationT('card_options.edit'),
    onClick: onEdit,
  });

  if (type !== PROFILE) {
    popOverItems.push({
      iconName: 'trash',
      label: presentationT('card_options.delete'),
      onClick: onDelete,
    });
  }

  const togglePopOver = e => {
    e.stopPropagation();
    if (popOverVisibility) {
      setPopOverVisibility(false);
    } else {
      setPopOverVisibility(true);
    }
  };

  const closePopOver = () => {
    setPopOverVisibility(false);
  };

  return (
    <Container>
      <ActionButton
        ref={btnNewRef}
        onClick={showingInJobTracker ? handleRemovePitch : togglePopOver}
        isPopOverVisible={showingInJobTracker || popOverVisibility}
      >
        <OptionsContainer>
          {showingInJobTracker ? (
            <IconSVG name="trash" />
          ) : (
            <Icon name="options" />
          )}
        </OptionsContainer>
        <PopOver
          isVisible={popOverVisibility}
          btnRef={btnNewRef}
          onClickOutside={closePopOver}
          items={popOverItems}
          styles={stylesPopOver}
        />
      </ActionButton>
      <CardThumbnail image={image} type="media" />
      <TextContainer className="pitchTextWrap">
        <Typography display="block" size="headline1" color="black111" as="h2">
          {title}
        </Typography>
        <Description>{data.description}</Description>
        {recipient && <Recipient>{`Recipient: ${recipient}`}</Recipient>}
        {type !== PROFILE && (
          <ViewsWrapper>
            <Created>
              {`Created: ${intlFormatDate(Date.parse(created))}`}
            </Created>
            <Views
              onClick={e => {
                e.stopPropagation();
                if (isAnalyticsEnabled) {
                  showAnalytics();
                } else {
                  showUpgradeModal();
                }
              }}
            >
              {nFormatter(views)}
              <ViewsIcon>
                <IconSVG name="eye" size={20} />
              </ViewsIcon>
            </Views>
          </ViewsWrapper>
        )}
      </TextContainer>
    </Container>
  );
};

PresentationCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  created: PropTypes.string,
  type: PropTypes.oneOf(['public', 'private']).isRequired,
  jobLink: PropTypes.string,
  recipient: PropTypes.string,
  views: PropTypes.number,
  isDraft: PropTypes.bool,
  onDelete: PropTypes.func,
  handleRemovePitch: PropTypes.func,
  showingInJobTracker: PropTypes.bool,
  onEdit: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any),
  stylesPopOver: PropTypes.string,
};

PresentationCard.defaultProps = {
  image: null,
  created: '',
  jobLink: '',
  recipient: '',
  stylesPopOver: '',
  views: 0,
  isDraft: false,
  showingInJobTracker: false,
  onDelete: () => null,
  handleRemovePitch: () => null,
  onEdit: () => null,
  data: {},
};

export default PresentationCard;
