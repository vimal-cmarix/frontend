import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';
import { Button } from '@components/molecules/Button';
import ProfileContext from '@context/profileContext';
import { PUBLIC } from '@modules/consts';

import ShareButtons from '@components/molecules/ShareButtons';
import { cdn } from '@utils/general';
import {
  DefaultModalContent,
  Title,
  CloseButton,
  Resume,
  PrivateLinkWrapper,
  CopyButtonWrapper,
  ContentCopy,
  InputHidden,
  ButtonWrapperCenter,
} from './style';

/**
 * Private link modal for presentations
 */
const PresentationLinkModal = ({
  data,
  privateData,
  goPresentation,
  showClose,
  onClose,
}) => {
  const { t } = useTranslation('modals');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const router = useRouter();

  const accessLink = () =>
    `${process.env.API_URL_SHORT_REDIRECT}/o/${data.shortUrl}`;

  function closeModal() {
    if (onClose) onClose();
    else appDispatch({ type: 'SET_MODAL_CLOSED' });
  }
  const firstName = profileState.personalInfo
    ? profileState.personalInfo.firstName
    : 'Sizigi';

  const lastName = profileState.personalInfo
    ? profileState.personalInfo.lastName
    : 'Training';

  const text = {
    public: `<span>${firstName} ${lastName} is inviting you to view their <strong>${
      data.title
    }</strong> pitch.</span><span>To view this pitch, click on the link below \n\r<br/><u>${accessLink()}</u></span>`,
    private: `<span>Hello!</span><span>${firstName} ${lastName} is inviting you to view their <strong>${
      data.title
    }</strong> pitch.</span><span>To view pitch, click on the link below \n\r<br/><u>${accessLink()}</u><br /> \n\rand use <strong>${
      data.secret
    }</strong> as the password.</span>`,
  };

  function copyLink() {
    const copyText = document.getElementById('input-copy');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  function formatText(inputText) {
    return inputText
      .replace(/\s+/g, ' ')
      .replace(/\r?\n|\r/g, '')
      .replace(/<\/span>/gi, `\n`)
      .replace(/<[^>]*>?/gi, '');
  }

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened}>
      <PrivateLinkWrapper>
        <img src={cdn('/static/img/slider.svg')} width="32px" alt="Slider" />
        <Title private>{t('pitch_link.title')}</Title>
        <Resume>{t(`pitch_link.resume.${data.type}`)}</Resume>
        {showClose && (
          <CloseButton onClick={closeModal}>
            <Icon name="close" />
          </CloseButton>
        )}
        <ContentCopy alignLeft>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: text[data.type] }} />
        </ContentCopy>
        <InputHidden
          value={formatText(text[data.type])}
          readOnly
          id="input-copy"
        />
        <CopyButtonWrapper>
          <Button
            label="Copy"
            type="button"
            icon="copy"
            colorSchema="copy"
            handleClick={copyLink}
          />
          <ShareButtons
            layout="row"
            url={accessLink()}
            title={"I'm inviting you to see my pitch"}
            media=""
          />
        </CopyButtonWrapper>
        {goPresentation && (
          <ButtonWrapperCenter>
            <Button
              label="Go to pitch"
              type="button"
              size="medium"
              colorSchema="primary"
              handleClick={() => {
                router.push('/presentation');
                closeModal();
              }}
            />
          </ButtonWrapperCenter>
        )}
      </PrivateLinkWrapper>
    </DefaultModalContent>
  );
};

PresentationLinkModal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  privateData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  goPresentation: PropTypes.bool,
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
};

PresentationLinkModal.defaultProps = {
  goPresentation: false,
  showClose: false,
  onClose: false,
};

export default PresentationLinkModal;
