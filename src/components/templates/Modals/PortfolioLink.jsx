import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import Icon from '@components/atoms/Icon';
import { Button } from '@components/molecules/Button';
import { PUBLIC } from '@modules/consts';
import ShareButtons from '@components/molecules/ShareButtons';

import getCoverImage from '@utils/portfolio';
import {
  DefaultModalContent,
  Title,
  CloseButton,
  Resume,
  PrivateLinkWrapper,
  CopyButtonWrapper,
  ContentCopy,
  InputHidden,
} from './style';
import { useToast } from '../../molecules/Notification';
/**
 * Private link modal for posts
 */
const PortfolioLinkModal = ({ data, privateData, showClose, onClose }) => {
  const { t } = useTranslation('modals');
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const accessLink = () =>
    `${process.env.API_URL_SHORT_REDIRECT}/u/${data.shortUrl}`;

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  const text = `<span> Hey,<br/>
    I'm inviting you to check out my ${data.type}, <strong>${
    data.title
  }</strong> on the link below:<br/><u>${accessLink()}</u></span>`;

  const shareText = `I'm inviting you to check out my ${data.type}, ${data.title} on the link below:`;

  function copyLink() {
    const copyText = document.getElementById('input-copy');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    showSuccess('Content copied successfully');
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
        <Icon name="share" size="32" />
        <Title private>{t('portfolio_link.title')}</Title>
        <Resume>{t('portfolio_link.resume')}</Resume>
        {showClose && (
          <CloseButton onClick={onClose || closeModal}>
            <Icon name="close" />
          </CloseButton>
        )}
        <ContentCopy alignLeft>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </ContentCopy>
        <InputHidden value={formatText(text)} readOnly id="input-copy" />
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
            title={shareText}
            media={getCoverImage(data)}
          />
        </CopyButtonWrapper>
      </PrivateLinkWrapper>
    </DefaultModalContent>
  );
};

PortfolioLinkModal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  privateData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
};

PortfolioLinkModal.defaultProps = {
  showClose: false,
  onClose: false,
};

export default PortfolioLinkModal;
