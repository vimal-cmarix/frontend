import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import ProfileProvider from '@api/services/profile';
import Icon from '@components/atoms/Icon';
import errorHandle from '@utils/error';
import { Button } from '@components/molecules/Button';
import { useToast } from '@components/molecules/Notification';
import Loader from '@components/atoms/Loader';

import ShareButtons from '@components/molecules/ShareButtons';
import { cdn } from '@utils/general';
import Btn from '@components/molecules/Btn';
import {
  DefaultModalContent,
  Title,
  CloseButton,
  Resume,
  PrivateLinkWrapper,
  ContentCopy,
  CopyButtonWrapper,
  ButtonWrapperCenter,
  InputHidden,
} from './style';

/**
 * Private Link Modal
 */
const PrivateProfileJob = ({ data, onClose }) => {
  const { t } = useTranslation('modals');
  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [fetchData, setFetchData] = useState();
  const [loader, setLoader] = useState(false);

  function urlGenerate() {
    return `${process.env.API_URL_SHORT_REDIRECT}/c/${data.shortUrl}`;
  }

  const text = `
    <span>
      ${urlGenerate()}
    </span>
  `;

  function formatText(inputText) {
    return inputText
      .replace(/\s+/g, ' ')
      .replace(/\r?\n|\r/g, '')
      .replace(/<\/span>/gi, `\n`)
      .replace(/<[^>]*>?/gi, '');
  }

  const userToken = () => {
    return (
      fetchData &&
      fetchData.slug && (
        <>
          <ContentCopy isLeft>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{ __html: text }} />
          </ContentCopy>
          <InputHidden value={formatText(text)} readOnly id="input-copy" />
        </>
      )
    );
  };

  async function generate() {
    setLoader(true);
    try {
      const res = await ProfileProvider.generateShareData(profileState.id);

      profileDispatch({
        type: 'SET_SHARE',
        share: res.data.data,
      });

      return setFetchData({
        slug: res.data.data.slug,
        secret: res.data.data.secret,
        shortUrl: res.data.data.shortUrl,
      });
    } catch (error) {
      showError(errorHandle(error));
      return false;
    } finally {
      setLoader(false);
    }
  }

  function copyLink() {
    const copyText = document.getElementById('input-copy');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    showSuccess(`Copied!`);
  }

  useEffect(() => {
    generate();
  }, []);

  return (
    <DefaultModalContent isOpened={appState.modal.isOpened} fitContent>
      {loader ? (
        <Loader size="large" />
      ) : (
        <PrivateLinkWrapper>
          <img src={cdn('/static/img/slider.svg')} width="32px" alt="Slider" />
          <Title private>{t('private_link.title')}</Title>
          <Resume
            dangerouslySetInnerHTML={{ __html: t('private_link.resume') }}
          />
          <CloseButton onClick={onClose}>
            <Icon name="close" />
          </CloseButton>
          {userToken()}

          <CopyButtonWrapper>
            <Button
              label="Copy"
              type="button"
              icon="copy"
              colorSchema="copy"
              handleClick={copyLink}
            />
            {fetchData && (
              <ShareButtons
                layout="row"
                url={urlGenerate()}
                title={"I'm inviting you to see my profile"}
                media=""
              />
            )}
          </CopyButtonWrapper>
        </PrivateLinkWrapper>
      )}
    </DefaultModalContent>
  );
};

PrivateProfileJob.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClose: PropTypes.func,
};

PrivateProfileJob.defaultProps = {
  onClose: false,
};

export default PrivateProfileJob;
