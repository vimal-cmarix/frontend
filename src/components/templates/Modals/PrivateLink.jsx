import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
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
const PrivateLinkModal = () => {
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

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function urlGenerate() {
    return `${process.env.API_URL_SHORT_REDIRECT}/i/${fetchData.shortUrl}`;
  }

  const userToken = () => {
    return (
      fetchData &&
      fetchData.slug && (
        <>
          <ContentCopy>
            <p>{urlGenerate()}</p>
          </ContentCopy>
          <InputHidden value={urlGenerate()} readOnly id="input-copy" />
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
    showSuccess(`Link Copied Successfully`);
  }

  function openLink() {
    const url = `${urlGenerate()}`;
    window.open(url);
  }

  useEffect(() => {
    generate();
  }, []);

  return (
    <DefaultModalContent
      className="shareProfileModal"
      isOpened={appState.modal.isOpened}
      fitContent
    >
      {loader ? (
        <Loader size="xlarge" />
      ) : (
        <PrivateLinkWrapper>
          <img src={cdn('/static/img/slider.svg')} width="32px" alt="Slider" />
          <Title private>{t('private_link.title')}</Title>
          <Resume
            dangerouslySetInnerHTML={{ __html: t('private_link.resume') }}
          />
          <CloseButton onClick={closeModal}>
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
          <ButtonWrapperCenter>
            <Btn
              type="button"
              variant="outlinePrimary"
              label="Preview"
              handleClick={openLink}
            />
          </ButtonWrapperCenter>
        </PrivateLinkWrapper>
      )}
    </DefaultModalContent>
  );
};

export default PrivateLinkModal;
