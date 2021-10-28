import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { SPACING } from '@assets/styles/theme';
import { Typography } from '@assets/styles/typo';
import { sizes as breakpoint } from '@assets/styles/medias';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Loader from '@components/atoms/Loader';

import Btn from '@components/molecules/Btn';
import { useToast } from '@components/molecules/Notification';

import BtnGroup from '@components/organisms/BtnGroup';
import ContentCardList from '@components/organisms/ContentCardList';

import errorHandle from '@src/utils/error';

import ProfileService from '@api/services/profile';
import useMedia from '@src/hooks/useMedia';

import ModalBody from './ModalBody';
import { BoxSticky } from './ModalBody/styles';

import { Actions, LoaderWrapperModal } from './style';

/**
 * Contact Modal
 */
const ConfigContent = () => {
  const [listContent, setListContent] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const { t: buttonsT } = useTranslation('buttons');

  const router = useRouter();

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );
  const { id: profileId } = profileState;

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const contentListRef = useRef(null);

  const totalContentSelected = Object.values(selectedItems).filter(Boolean)
    ?.length;
  const totalItems = listContent?.length;

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function selectAllItems() {
    contentListRef.current?.selectAllItems();
  }

  function deselectAllItems() {
    contentListRef.current?.deselectAllItems();
  }

  async function getContentsToAdd() {
    setLoading(true);

    try {
      const response = await ProfileService.listContentsToAdd(profileId);

      setListContent(response.data.data);

      const selectedIds = response.data.data
        .filter(content => content.selected)
        .map(({ id }) => id);

      setTimeout(() => {
        contentListRef.current?.selectSpecificItems(selectedIds);
      }, 0);
    } catch (err) {
      showError(errorHandle(err));
      setListContent([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSetContents() {
    const contentIds = Object.entries(selectedItems)
      .filter(([, value]) => value)
      .map(([contentId]) => contentId);

    const payload = { contents: contentIds };

    setLoadingSave(true);

    try {
      const response = await ProfileService.setContents(profileId, payload);

      profileDispatch({
        type: 'SET_CONTENTS',
        contents: response.data.data,
      });

      closeModal();
      showSuccess('Updated content list');
    } catch (err) {
      showError(errorHandle(err));
    } finally {
      setLoadingSave(false);
    }
  }

  const handleSelectedItems = useCallback(items => {
    setSelectedItems(items);
  }, []);

  function goToLibrary() {
    router.push('/library?tab=published');
    closeModal();
  }

  useEffect(() => {
    const { id } = profileState;

    if (!id) return;

    getContentsToAdd();
  }, []);

  return (
    <ModalBody
      onCancel={closeModal}
      headerTitle="Add content"
      selectContentModal
      contentUnGutterBottom
    >
      <div>
        {loading ? (
          <LoaderWrapperModal>
            <Loader size="large" />
          </LoaderWrapperModal>
        ) : (
          <>
            {!listContent?.length ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography size="headline1" color="grey31" align="center">
                  You have already selected all the items in your Library.
                </Typography>
                <Btn
                  variant="outlinePrimary"
                  label="Go to Library"
                  handleClick={goToLibrary}
                  style={{ marginTop: SPACING * 4 }}
                />
              </div>
            ) : (
              <>
                <Typography
                  display="block"
                  size="headline1"
                  color="grey31"
                  style={{ marginBottom: SPACING * 6 }}
                >
                  Select from your Library{' '}
                  {!!totalContentSelected &&
                    `• ${totalContentSelected} selected`}
                </Typography>

                <ContentCardList
                  ref={contentListRef}
                  onSelect={handleSelectedItems}
                  list={listContent}
                  configurable
                />
              </>
            )}
          </>
        )}

        <BoxSticky>
          <Actions>
            <BtnGroup>
              {!isMobile && (
                <Btn
                  startIcon="leftArrow"
                  iconSize={12}
                  label={buttonsT('back')}
                  handleClick={closeModal}
                />
              )}
            </BtnGroup>

            {!!listContent?.length && (
              <BtnGroup>
                <Btn
                  handleClick={
                    totalContentSelected === totalItems
                      ? deselectAllItems
                      : selectAllItems
                  }
                  variant="outlinePrimary"
                  label={
                    totalContentSelected === totalItems
                      ? 'Deselect all'
                      : 'Select all'
                  }
                />
                <Btn
                  handleClick={handleSetContents}
                  variant="solidPrimary"
                  label={buttonsT('save')}
                  loading={loadingSave}
                />
              </BtnGroup>
            )}
          </Actions>
        </BoxSticky>
      </div>
    </ModalBody>
  );
};

export default ConfigContent;
