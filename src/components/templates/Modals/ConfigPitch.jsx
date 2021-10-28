import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
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

import PresentationService from '@api/services/presentation';
import Storage from '@utils/storage';

import { PUBLISHED, IS_ADDING_PITCH_TO_JOBCARD } from '@modules/consts';

import useMedia from '@src/hooks/useMedia';

import ModalBody from './ModalBody';
import { BoxSticky } from './ModalBody/styles';

import { Actions, LoaderWrapperModal } from './style';

/**
 * Contact Modal
 */
const ConfigPitch = ({
  isMultiply,
  onSave,
  setInternalModalShow,
  jobCardId,
  boardId,
  // isEditPitch,
}) => {
  const [listPitch, setListPitch] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const { t: buttonsT } = useTranslation('buttons');

  const router = useRouter();

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);
  const { id: profileId } = profileState;

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const contentListRef = useRef(null);

  const totalPitchSelected = Object.values(selectedItems).filter(Boolean)
    ?.length;
  const totalItems = listPitch?.length;

  function closeModal() {
    setInternalModalShow(false);
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
      const { data } = await PresentationService.getAll(profileId, {
        status: PUBLISHED,
        sort: 'createdAt',
        order: 'DESC',
        limit: 1000,
        skip: 0,
      });
      // console.log('data---', data.data.rows);
      setListPitch(data.data.rows);

      const selectedIds = data.data.rows
        .filter(pitch => pitch.selected)
        .map(({ id }) => id);

      setTimeout(() => {
        contentListRef.current?.selectSpecificItems(selectedIds);
      }, 0);
    } catch (err) {
      showError(errorHandle(err));
      setListPitch([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSetContents() {
    const pitchesId = Object.entries(selectedItems)
      .filter(([, value]) => value)
      .map(([pitchId]) => pitchId);

    const payload = { pitches: pitchesId };

    setLoadingSave(true);

    try {
      await onSave(payload);

      closeModal();
    } catch (err) {
      showError(errorHandle(err));
    } finally {
      setLoadingSave(false);
    }
  }

  const handleSelectedItems = useCallback(items => {
    // console.log('item---', items);
    setSelectedItems(items);
  }, []);

  function goToCreatePitch() {
    router.push(`/presentation/create/step-1`);
    Storage.add(
      IS_ADDING_PITCH_TO_JOBCARD,
      JSON.stringify({ jobCardId, boardId }),
    );
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  useEffect(() => {
    const { id } = profileState;

    if (!id) return;

    getContentsToAdd();
  }, []);

  return (
    <ModalBody
      onCancel={closeModal}
      headerTitle="Add pitch"
      selectContentModal
      contentUnGutterBottom
      hFull
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {loading ? (
          <LoaderWrapperModal style={{ margin: 'auto 0' }}>
            <Loader size="large" />
          </LoaderWrapperModal>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            {!listPitch?.length ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: !listPitch.length ? 'auto 0' : 0,
                }}
              >
                <Typography size="headline1" color="grey31" align="center">
                  You have not yet created a pitch to add here.
                </Typography>
                <Btn
                  type="button"
                  variant="outlinePrimary"
                  label="Create Pitch"
                  handleClick={goToCreatePitch}
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
                  {!!totalPitchSelected && `• ${totalPitchSelected} selected`}
                </Typography>

                <ContentCardList
                  ref={contentListRef}
                  onSelect={handleSelectedItems}
                  list={listPitch}
                  configurable
                  // isEditPitch
                  selectOnlyOne={!isMultiply}
                  isPitch
                />
              </>
            )}
          </div>
        )}

        <BoxSticky className="boxPopupFooter" style={{ marginTop: 0 }}>
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

            {!!listPitch?.length && (
              <BtnGroup>
                {isMultiply && (
                  <Btn
                    handleClick={
                      totalPitchSelected === totalItems
                        ? deselectAllItems
                        : selectAllItems
                    }
                    variant="outlinePrimary"
                    label={
                      totalPitchSelected === totalItems
                        ? 'Deselect all'
                        : 'Select all'
                    }
                  />
                )}
                <Btn
                  type="button"
                  variant="outlinePrimary"
                  label="Create Pitch"
                  handleClick={goToCreatePitch}
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

ConfigPitch.propTypes = {
  isMultiply: PropTypes.bool,
  // isEditPitch: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  setInternalModalShow: PropTypes.func.isRequired,
  jobCardId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

ConfigPitch.defaultProps = {
  isMultiply: true,
  onSave: () => null,
};

export default ConfigPitch;
