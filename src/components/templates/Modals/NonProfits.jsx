/* eslint-disable react/jsx-curly-newline */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import CultureFitService from '@api/services/cultureFit';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { useToast } from '@components/molecules/Notification';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import Btn from '@components/molecules/Btn';
import errorHandle from '@src/utils/error';
import { Typography } from '@assets/styles/typo';
import IconSVG from '@components/atoms/IconSVG';
import ModalBody from './ModalBody';

import {
  Row,
  Actions,
  FormBlockWrapper,
  FormBlockRow,
  TrashButton,
} from './style';

const NonProfits = ({ nonProfitsList, cultureFitId }) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [loading, setLoading] = useState(false);
  const [nonProfitsData, setNonProfitsData] = useState([
    {
      name: '',
      url: '',
      id: uuidv4(),
    },
  ]);

  useEffect(() => {
    if (nonProfitsList?.length > 0) {
      const nonProfits = nonProfitsList?.map(eachItem => ({
        ...eachItem,
        id: uuidv4(),
      }));
      setNonProfitsData(nonProfits);
    }
  }, [nonProfitsList]);

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
    setNonProfitsData(nonProfitsList);
    goToNextStepAndShow(appDispatch);
  };

  const addNonProfits = () => {
    setNonProfitsData(currState => [
      ...currState,
      { name: '', url: '', id: uuidv4() },
    ]);
  };

  const removeNonProfit = id => {
    if (nonProfitsData?.length === 1) {
      formRef.current.reset();
      setNonProfitsData([
        {
          name: '',
          url: '',
          id: uuidv4(),
        },
      ]);
      return;
    }

    const filteredList = nonProfitsData.filter(eachItem => eachItem.id !== id);
    setNonProfitsData(filteredList);
  };

  const saveModal = async () => {
    const nonProfits =
      nonProfitsData?.length === 1 && !nonProfitsData[0].name
        ? []
        : nonProfitsData;

    const profileId = profileState.id;
    const reqBody = {
      nonProfits,
    };

    try {
      setLoading(true);

      await CultureFitService.updateNonProfit(profileId, cultureFitId, reqBody);

      profileDispatch({
        type: 'SET_NON_PROFITS',
        nonProfits: nonProfitsData,
      });
      showSuccess(modalT('non_profits.success'));
      setLoading(false);
      closeModal();
    } catch (err) {
      showToast(errorHandle(err));
      setLoading(false);
    }
  };

  const updateInputValues = (e, inputName, index) => {
    const inputValue = e.target.value;
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    } else {
      setNonProfitsData(currState => {
        const currStateCopy = currState;
        currStateCopy[index][inputName] = inputValue;
        return [...currStateCopy];
      });
    }
  };

  const handleSubmit = async formData => {
    if (nonProfitsList?.length > 0 || formData.nonProfit[0].name !== '') {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object({
          nonProfit: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required(),
              url: Yup.string()
                .url()
                .required(),
            }),
          ),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        await saveModal(formData);
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            const [, fieldName] = error.path?.split('.');
            validationErrors[error.path] = errorMessage(
              `${fieldName}.${error.type}`,
            );
          });
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  };

  return (
    <ModalBody onCancel={closeModal} headerTitle="What I stand for">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <Typography style={{ marginBottom: 15 }} size="base" color="grey61">
            Non-Profits
          </Typography>

          <FormBlockWrapper>
            {nonProfitsData.map((eachNonProfit, index) => (
              <FormBlockRow
                className="form-block__multiple_inputs"
                key={eachNonProfit.id}
              >
                <Scope path={`nonProfit[${index}]`}>
                  <FormBlock label="Name" isLabelStrong>
                    <TextInput
                      placeholder={modalT('non_profits.label')}
                      name="name"
                      size="medium"
                      onChange={e => updateInputValues(e, 'name', index)}
                      value={nonProfitsData[index].name}
                    />
                  </FormBlock>

                  <FormBlock label="URL" isLabelStrong>
                    <TextInput
                      placeholder={modalT('non_profits.label_url')}
                      name="url"
                      size="medium"
                      onChange={e => updateInputValues(e, 'url', index)}
                      value={nonProfitsData[index].url}
                    />
                  </FormBlock>

                  {(nonProfitsData?.length > 1 ||
                    nonProfitsData[index]?.name) && (
                    <TrashButton
                      onClick={() => removeNonProfit(eachNonProfit.id)}
                    >
                      <IconSVG name="trash" size={20} />
                    </TrashButton>
                  )}
                </Scope>
              </FormBlockRow>
            ))}

            <Btn
              type="button"
              label="Add more"
              size="md"
              handleClick={addNonProfits}
              variant="textPrimary"
              startIcon="plus"
              iconSize={8}
              style={{
                margin: '12px 0 0 auto',
                display: 'flex',
              }}
            />
          </FormBlockWrapper>
        </Row>

        <Actions>
          <Btn
            label={buttonsT('back')}
            size="md"
            handleClick={closeModal}
            variant="text"
            startIcon="leftArrow"
            iconSize={8}
            type="button"
          />

          <Btn
            label={buttonsT('save')}
            type="submit"
            size="md"
            variant="outlinePrimary"
            loading={loading}
          />
        </Actions>
      </Form>
    </ModalBody>
  );
};

NonProfits.propTypes = {
  nonProfitsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  cultureFitId: PropTypes.string.isRequired,
};

export default NonProfits;
