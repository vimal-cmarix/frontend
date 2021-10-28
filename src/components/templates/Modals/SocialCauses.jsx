import React, { useContext, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import CultureFitService from '@api/services/cultureFit';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import generateUEID from '@src/utils/general';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import TagList from '@components/molecules/TagList';
import Btn from '@components/molecules/Btn';
import errorHandle from '@src/utils/error';
import { Typography } from '@assets/styles/typo';
import ModalBody from './ModalBody';

import { Row, Actions, FormBlockWrapper } from './style';

const compose = list => {
  return list.map(item => {
    return {
      id: generateUEID(),
      label: item,
    };
  });
};

const decompose = list => {
  return list.map(item => {
    return item.label;
  });
};

const SocialCauses = ({ socialCausesList, cultureFitId }) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [loading, setLoading] = useState(false);
  const [socialCauseValue, setSociaCauselValue] = useState('');
  const [listData, setListData] = useState(compose(socialCausesList || []));
  const [listLength, setListLength] = useState(listData.length);
  const { t: profileT } = useTranslation('profile');
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  const closeModal = () => {
    formRef.current.setErrors({});
    formRef.current.reset();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  };

  function updateSocialCauses(list) {
    profileDispatch({
      type: 'SET_SOCIAL_CAUSES',
      socialCauses: list,
    });
  }

  const addSocialCauses = async data => {
    formRef.current.setErrors({});

    if (data.socialCause) {
      if (listData.find(t => t.label === data.socialCause)) {
        formRef.current.setErrors({
          socialCause: errorMessage('social_cause.duplicated'),
        });
        return;
      }

      setListData([
        { id: generateUEID(), label: data.socialCause },
        ...listData,
      ]);
      setSociaCauselValue('');
      formRef.current.reset();
    }
  };

  const removeSocialCause = id =>
    setListData(listData.filter(t => t.id !== id));

  async function saveModal() {
    const list = decompose(listData);
    if (listLength > 0 || (list && list.length > 0)) {
      setLoading(true);
      try {
        const profileId = profileState.id;
        if (profileId && cultureFitId) {
          await CultureFitService.updateSocialCauses(profileId, cultureFitId, {
            socialCauses: list,
          });
          setLoading(false);
          updateSocialCauses(list);
          showSuccess(modalT('social_causes.success'));
          closeModal();
        }
      } catch (e) {
        showToast(errorHandle(e));
        setLoading(false);
      }
    }
  }

  function handleChange(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      setSociaCauselValue(e.target.value);
    } else {
      e.target.value = '';
    }
  }

  return (
    <ModalBody onCancel={closeModal} headerTitle="What I stand for">
      <Form onSubmit={addSocialCauses} ref={formRef}>
        <Row>
          <FormBlockWrapper>
            <FormBlock label={profileT('cultureFit.social_causes')}>
              <TextInput
                placeholder={modalT('social_causes.label')}
                name="socialCause"
                size="medium"
                className="textinput"
                onChange={handleChange}
                defaultValue={socialCauseValue}
              />
            </FormBlock>
            <Typography color="greyCF" size="body1" style={{ marginTop: 10 }}>
              {modalT('social_causes.add')}
            </Typography>
          </FormBlockWrapper>
          <TagList list={listData} onRemove={removeSocialCause} />
        </Row>
      </Form>

      <Actions>
        <Btn
          label={buttonsT('back')}
          size="md"
          handleClick={closeModal}
          variant="text"
          startIcon="leftArrow"
          iconSize={8}
        />

        <Btn
          label={buttonsT('save')}
          type="button"
          size="md"
          variant="outlinePrimary"
          loading={loading}
          disabled={listLength <= 0 && listData <= 0}
          handleClick={saveModal}
        />
      </Actions>
    </ModalBody>
  );
};

SocialCauses.propTypes = {
  socialCausesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  cultureFitId: PropTypes.string.isRequired,
};

export default SocialCauses;
