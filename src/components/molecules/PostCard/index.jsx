import React, { useState, useRef, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Typography } from '@assets/styles/typo';

import PaymentContext from '@context/paymentContext';
import AppContext from '@context/appContext';

import { FREE } from '@modules/consts';

import Tag from '@components/atoms/Tag';
import IconSVG from '@components/atoms/IconSVG';
import Icon from '@components/atoms/Icon';

import ModalAnalytics from '@components/templates/Modals/Analytics';
import ModalUpgrade from '@components/templates/Modals/activeAnalytics';

import { intlFormatDate, nFormatter } from '@src/utils/general';

import {
  Container,
  TextContainer,
  Description,
  Created,
  TagsWrapper,
  TagWrapper,
  ActionButton,
  OptionsContainer,
  Views,
  ViewsIcon,
  ViewsWrapper,
} from '@components/molecules/PostCard/style';
import CardThumbnail from '@components/molecules/CardThumbnail';
import PopOver from '@components/molecules/PopOver';

/**
 * The Post card is used to show info by post format.
 */
const PostCard = ({
  image,
  title,
  desc,
  created,
  tags,
  onEdit,
  onDelete,
  showOptions,
  isDraft,
  onPublish,
  type,
  disabled,
  popOverList,
  data,
  disableHover,
  onShare,
  titleOnly,
  thumbCover,
  noFooter,
  noAnalytics,
  isFull,
}) => {
  const { t: postsT } = useTranslation('post');

  const { state: paymentState } = useContext(PaymentContext);
  const { dispatch: appDispatch } = useContext(AppContext);

  const [popOverVisibility, setPopOverVisibility] = useState(false);
  const btnNewRef = useRef(null);

  const isAnalyticsEnabled = useMemo(
    () => paymentState.userPlan !== FREE && !isDraft,
    [paymentState.userPlan, isDraft],
  );

  const isAnalyticsDisabled = useMemo(
    () => paymentState.userPlan === FREE && !isDraft,
    [paymentState.userPlan, isDraft],
  );

  function showAnalytics() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalAnalytics,
      props: {
        type: 'library',
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

  let popOverItems = [];

  if (popOverList?.length) popOverItems = popOverList;
  else {
    if (isAnalyticsEnabled) {
      popOverItems.push({
        label: postsT('options.analytics'),
        onClick: showAnalytics,
      });
    }

    if (isAnalyticsDisabled) {
      popOverItems.push({
        iconName: 'analytics',
        label: postsT('options.analytics'),
        onClick: showUpgradeModal,
      });
    }

    if (!isDraft) {
      popOverItems.push({
        iconName: 'share',
        label: postsT('options.share'),
        onClick: onShare,
      });
    }

    popOverItems.push(
      {
        iconName: 'edit',
        label: postsT('options.edit'),
        onClick: onEdit,
      },
      {
        iconName: 'trash',
        label: postsT('options.delete'),
        onClick: onDelete,
      },
    );

    if (isDraft) {
      popOverItems.push({
        label: postsT('options.publish'),
        onClick: onPublish,
      });
    }
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
    <Container disabled={disabled} disableHover={disableHover} isFull={isFull}>
      {showOptions && (
        <ActionButton
          ref={btnNewRef}
          onClick={togglePopOver}
          isPopOverVisible={popOverVisibility}
        >
          <OptionsContainer>
            <Icon name="options" />
          </OptionsContainer>
          <PopOver
            isVisible={popOverVisibility}
            btnRef={btnNewRef}
            onClickOutside={closePopOver}
            items={popOverItems}
          />
        </ActionButton>
      )}
      <CardThumbnail
        asset={data.asset}
        forceCover={thumbCover}
        image={image}
        type={data.type}
        link={data.link}
      />
      <TextContainer className="libraryTextWrap">
        <Typography display="block" size="headline1" color="black111" as="h2">
          {title}
        </Typography>
        {!titleOnly && (
          <>
            <Description>{desc}</Description>
            {!noFooter && (
              <>
                <TagsWrapper>
                  {tags.map((tag, index) => (
                    <TagWrapper key={index.toString()}>
                      <Tag label={tag} />
                    </TagWrapper>
                  ))}
                </TagsWrapper>

                {!noAnalytics && (
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
                      {nFormatter(data.views)}
                      <ViewsIcon>
                        <IconSVG name="eye" size={20} />
                      </ViewsIcon>
                    </Views>
                  </ViewsWrapper>
                )}
              </>
            )}
          </>
        )}
      </TextContainer>
    </Container>
  );
};

PostCard.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  created: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  showOptions: PropTypes.bool,
  onEdit: PropTypes.func,
  isDraft: PropTypes.bool,
  onPublish: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['blog', 'media', 'link', 'document', 'video'])
    .isRequired,
  popOverList: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  data: PropTypes.objectOf(PropTypes.any),
  disableHover: PropTypes.bool,
  onShare: PropTypes.func,
  titleOnly: PropTypes.bool,
  thumbCover: PropTypes.bool,
  noFooter: PropTypes.bool,
  noAnalytics: PropTypes.bool,
  isFull: PropTypes.bool,
};

PostCard.defaultProps = {
  image: null,
  desc: '',
  created: '',
  tags: [],
  showOptions: false,
  onDelete: () => null,
  onEdit: () => null,
  isDraft: false,
  disabled: false,
  onPublish: () => null,
  popOverList: [],
  data: {},
  disableHover: false,
  onShare: () => null,
  titleOnly: false,
  thumbCover: false,
  noFooter: false,
  noAnalytics: false,
  isFull: false,
};

export default PostCard;
