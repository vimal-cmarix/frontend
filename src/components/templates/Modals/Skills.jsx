import React, { useContext, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import ProfileService from '@api/services/profile';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import generateUEID from '@src/utils/general';

import FormBlock from '@components/organisms/FormBlock';

import TextInput from '@components/molecules/TextInput';
import { List } from '@components/molecules/List';
import { useToast } from '@components/molecules/Notification';
import Btn from '@components/molecules/Btn';

import BtnGroup from '@components/organisms/BtnGroup';
import { goToNextStepAndShow } from '@components/organisms/TourProfile';

import errorHandle from '@src/utils/error';

import { SPACING } from '@assets/styles/theme';
import ModalBody from './ModalBody';

import {
  Body,
  Row,
  Actions,
  ButtonAddContent,
  ButtonAddContentWrapper,
  ListWrapper,
} from './style';

const compose = list => {
  return list.map(item => {
    return {
      id: generateUEID(),
      text: item,
    };
  });
};

const decompose = list => {
  return list.map(item => {
    return item.text;
  });
};

/**
 * Skills Modal
 */
const Skills = ({ skillsList }) => {
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalT } = useTranslation('modals');
  const { t: buttonsT } = useTranslation('buttons');

  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const [listData, setListData] = useState(compose(skillsList));
  const [listLength, setListLength] = useState(listData.length);
  const [loading, setLoading] = useState(false);
  const [skillValue, setSkillValue] = useState('');

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const formRef = useRef(null);

  async function addSkill(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        skill: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      if (listData.find(t => t.text === data.skill)) {
        formRef.current.setErrors({ skill: errorMessage('skill.duplicated') });
        return;
      }

      setListData([{ id: generateUEID(), text: data.skill }, ...listData]);
      setSkillValue('');

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

  const listRemoveItem = id => setListData(listData.filter(t => t.id !== id));

  function updateSkills(list) {
    profileDispatch({
      type: 'SET_SKILLS',
      skills: list,
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
        await ProfileService.setSkills(profileId, { skills: list });

        setLoading(false);
        updateSkills(list);
        closeModal();
        showSuccess(modalT('skills.success'));
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  function handleChangeSkill(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      setSkillValue(e.target.value);
    } else {
      e.target.value = '';
    }
  }

  return (
    <ModalBody headerTitle="Skills" onCancel={closeModal}>
      <Body>
        <Form onSubmit={addSkill} ref={formRef}>
          <Row>
            <FormBlock label={modalT('skills.label')}>
              <ButtonAddContentWrapper>
                <TextInput
                  name="skill"
                  size="medium"
                  onChange={handleChangeSkill}
                  maxLength="30"
                />
                <ButtonAddContent type="submit">
                  {skillValue && 'Press enter'}
                </ButtonAddContent>
              </ButtonAddContentWrapper>
            </FormBlock>
            <ListWrapper>
              <List
                draggable
                list={listData}
                setList={setListData}
                remove={listRemoveItem}
              />
            </ListWrapper>
          </Row>
        </Form>
        <Actions mt={SPACING * 6}>
          <BtnGroup>
            <Btn
              startIcon="leftArrow"
              iconSize={12}
              label={buttonsT('back')}
              handleClick={closeModal}
            />
          </BtnGroup>

          <BtnGroup>
            <Btn
              type="submit"
              variant="outlinePrimary"
              label={buttonsT('save')}
              handleClick={saveModal}
              disabled={listLength <= 0 && listData <= 0}
              loading={loading}
            />
          </BtnGroup>
        </Actions>
      </Body>
    </ModalBody>
  );
};

Skills.propTypes = {
  skillsList: PropTypes.arrayOf(PropTypes.string),
};

Skills.defaultProps = {
  skillsList: [],
};

export default Skills;
