import React, { useContext, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import ProfileService from '@api/services/profile';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import generateUEID from '@src/utils/general';

import Icon from '@components/atoms/Icon';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { Button } from '@components/molecules/Button';
import TagList from '@components/molecules/TagList';
import { useToast } from '@components/molecules/Notification';
import errorHandle from '@src/utils/error';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import ModalBody from './ModalBody';

import {
  DefaultModalContent,
  Title,
  Body,
  Row,
  Actions,
  ButtonAddContentWrapper,
  ButtonAddContent,
  LeftButtonWrapper,
  RightButtonWrapper,
  FormBlockWrapper,
  CloseButton,
  ShowMobile,
} from './style';

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

/**
 * Interests Modal
 */
const Interests = ({ interestsList }) => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [listData, setListData] = useState(compose(interestsList));
  const [loading, setLoading] = useState(false);
  const [interestValue, setInterestValue] = useState('');

  const toast = useToast();
  const formRef = useRef(null);
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  async function addInterest(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        interest: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      if (listData.find(t => t.label === data.interest)) {
        formRef.current.setErrors({
          interest: errorMessage('interests.duplicated'),
        });
        return;
      }

      setListData([{ id: generateUEID(), label: data.interest }, ...listData]);
      setInterestValue('');
      formRef.current.reset();
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  const removeInterest = id => setListData(listData.filter(t => t.id !== id));

  function updateInterests(list) {
    profileDispatch({
      type: 'SET_INTERESTS',
      interests: list,
    });
  }

  function closeModal() {
    formRef.current.setErrors({});
    formRef.current.reset();
    appDispatch({ type: 'SET_MODAL_CLOSED' });
    goToNextStepAndShow(appDispatch);
  }

  async function saveModal() {
    const list = decompose(listData);
    setLoading(true);

    try {
      const profileId = profileState.id;

      if (profileId) {
        await ProfileService.setInterests(profileId, { interests: list });

        setLoading(false);
        updateInterests(list);
        showSuccess(modalT('interests.success'));
        closeModal();
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  return (
    <ModalBody onCancel={closeModal} headerTitle="Interests">
      <Body>
        <Form onSubmit={addInterest} ref={formRef}>
          <Row>
            <FormBlockWrapper>
              <FormBlock label={modalT('interests.label')}>
                <ButtonAddContentWrapper>
                  <TextInput
                    name="interest"
                    size="medium"
                    onChange={e => setInterestValue(e.target.value)}
                  />
                  <ButtonAddContent type="submit">
                    {interestValue && `${modalT('interests.add')}`}
                  </ButtonAddContent>
                </ButtonAddContentWrapper>
              </FormBlock>
            </FormBlockWrapper>
            <TagList list={listData} onRemove={removeInterest} />
          </Row>
        </Form>

        <Actions>
          <LeftButtonWrapper>
            <Button
              label={buttonsT('cancel')}
              size="medium"
              colorSchema="secondary"
              handleClick={closeModal}
            />
          </LeftButtonWrapper>

          <RightButtonWrapper>
            <Button
              label={buttonsT('save')}
              type="submit"
              size="medium"
              handleClick={saveModal}
              loading={loading}
            />
          </RightButtonWrapper>
        </Actions>
      </Body>
    </ModalBody>
  );
};

Interests.propTypes = {
  interestsList: PropTypes.arrayOf(PropTypes.string),
};

Interests.defaultProps = {
  interestsList: [],
};

export default Interests;
