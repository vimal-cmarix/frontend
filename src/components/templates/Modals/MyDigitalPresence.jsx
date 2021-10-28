import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '@assets/styles/typo';
import { SPACING } from '@assets/styles/theme';
import { sizes as breakpoint } from '@assets/styles/medias';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import Btn from '@components/molecules/Btn';
import TextInput from '@components/molecules/TextInput';
import { useToast } from '@components/molecules/Notification';

import BtnGroup from '@components/organisms/BtnGroup';
import FormBlock from '@components/organisms/FormBlock';
import socialInfos from '@components/organisms/ProfileOverview/socials';

import ProfileService from '@api/services/profile';

import errorHandle from '@src/utils/error';

import useMedia from '@hooks/useMedia';

import IconSVG from '@components/atoms/IconSVG';
import ModalBody from './ModalBody';

import {
  Body,
  Actions,
  Row,
  SocialRow,
  SocialContent,
  InternalModalBox,
  SocialRowTrash,
  SocialRowContent,
  InternalModalBoxClose,
} from './style';

function MyDigitalPresence() {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: profileState, dispatch: profileDispatch } = useContext(
    ProfileContext,
  );

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: modalT } = useTranslation('modals');

  const [socialForm, setSocialForm] = useState([]);
  const [internalModalShow, setInternalModalShow] = useState(false);
  const [domainURL, setDomainURL] = useState(null);
  const [urlError, setUrlError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');

  useEffect(() => {
    if (!Array.isArray(profileState.digitalPresences)) return;

    const actualKeys = profileState.digitalPresences.map(item => item.domain);

    const otherLinks = Object.keys(socialInfos)
      .map(key => {
        if (actualKeys.includes(key)) return null;

        return {
          domain: key,
          image: socialInfos[key].image,
          placeholder: socialInfos[key].placeholder,
          url: '',
          uuid: uuidv4(),
        };
      })
      .filter(Boolean);

    const socialPresences = profileState.digitalPresences.map(data => {
      return {
        ...data,
        uuid: uuidv4(),
        image: socialInfos[data.domain]?.image || socialInfos.other.image,
        placeholder:
          socialInfos[data.domain]?.placeholder ||
          socialInfos.other.placeholder,
      };
    });

    setSocialForm([...socialPresences, ...otherLinks]);
  }, []);

  const formRef = useRef(null);

  function closeModal() {
    console.log('innnnnnnnn');
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  async function updateDigitalPresence(data) {
    setLoading(true);

    try {
      const { id } = profileState;

      const { data: responseData } = await ProfileService.setDigitalPresence(
        id,
        data,
      );
      const { digitalPresences } = responseData.data;

      profileDispatch({
        type: 'SET_DIGITAL_PRESENCE',
        digitalPresences,
      });

      closeModal();
      showSuccess(modalT('digital_presence.success'));
    } catch (err) {
      showToast(errorHandle(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    console.log('innnnnnnnn');
    try {
      // Remove all previous errors
      if (!urlError) {
        formRef.current.setErrors({});

        const schema = Yup.object({
          socials: Yup.array().of(
            Yup.object().shape({
              url: Yup.string(),
            }),
          ),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });
        const arrayOfUrls = formData.socials
          .filter(({ url }) => url)
          .map(({ url }) => ({ url }));

        await updateDigitalPresence({ objects: arrayOfUrls });
      } else {
        showToast('Please insert correct social URL!');
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(error.message);
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function toogleInternalModal(event) {
    event.preventDefault();

    setInternalModalShow(state => !state);
  }

  function handleClickSocial(socialName, { image, placeholder }) {
    const newData = {
      domain: socialName,
      image,
      placeholder,
      url: '',
      uuid: uuidv4(),
      isManualAdded: true,
    };

    setInternalModalShow(false);
    setSocialForm(state => [...state, newData]);
  }

  function handleChange(event) {
    const domainURl = event.target.value;
    // console.log('domainURl', domainURl);
    setDomainURL(domainURl);
    setIsChange(true);
  }

  function validateURL(domain) {
    // console.log('domain', event);
    if (
      domainURL &&
      !domainURL.includes(`${domain}.com`) &&
      domain !== 'other' &&
      isChange
    ) {
      setUrlError(true);
      setErrorCount(errorCount + 1);
      // console.log('error1', urlError);
      const domainName = domain.charAt(0).toUpperCase() + domain.slice(1);
      showToast(`${domainName} link should contain ${domain}.com`);
    } else if (!domainURL && !isChange) {
      if (urlError) {
        setUrlError(true);
      } else {
        setUrlError(false);
        // console.log('error2', urlError);
      }
    } else {
      setUrlError(false);
      // console.log('error3', urlError);
    }
  }

  function handleFocus(event) {
    const domainURl = event.target.value;
    // console.log('domainURl', domainURl);
    setDomainURL(domainURl);
    if (!domainURl) {
      setIsChange(false);
    } else {
      // setDomainURL(domainURl);
      setIsChange(true);
    }
  }

  function handleDeleteSocial(event, uuid, index) {
    console.log('*****', index);
    event.preventDefault();

    setSocialForm(state => state.filter(social => social.uuid !== uuid));

    const allErrors = formRef.current.getErrors();

    delete allErrors[`socials[${index}].url`];

    formRef.current.setErrors(allErrors);
  }

  const SocialOptions = () => (
    <InternalModalBox>
      <InternalModalBoxClose onClick={() => setInternalModalShow(false)}>
        <IconSVG name="close" size={20} />
      </InternalModalBoxClose>
      {Object.entries(socialInfos).map(([socialName, socialData]) => (
        <button
          key={socialName}
          type="button"
          onClick={() => handleClickSocial(socialName, socialData)}
          title={socialName}
        >
          <img src={socialData.image} alt={socialName} />
        </button>
      ))}
    </InternalModalBox>
  );

  return (
    <ModalBody
      headerTitle={modalT('digital_presence.title')}
      onCancel={closeModal}
      internalModal={<SocialOptions />}
      showInternalModal={internalModalShow}
      onCancelInternalModal={toogleInternalModal}
    >
      {!isMobile && (
        <SocialContent gutterR>
          <Typography display="block" size="headline1" color="grey31">
            {modalT('digital_presence.support_text')}
          </Typography>
        </SocialContent>
      )}
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Body
          gutterY={isMobile ? 0 : SPACING * 8}
          style={{ marginBottom: isMobile ? 24 : 0 }}
        >
          <div>
            {socialForm.map((social, index) => (
              <Row key={social.uuid}>
                <SocialRow>
                  <img src={social.image} alt={social.domain} />
                  <SocialRowContent>
                    <FormBlock>
                      <TextInput
                        type="text"
                        name={`socials[${index}].url`}
                        placeholder={social.placeholder}
                        value={social.url}
                        onChange={handleChange}
                        onBlur={() => validateURL(social.domain)}
                        onFocus={handleFocus}
                        size="medium"
                      />
                    </FormBlock>
                  </SocialRowContent>
                  {social.isManualAdded && (
                    <SocialRowTrash hide={!social.isManualAdded}>
                      <Btn
                        startIcon="trash"
                        iconSize={24}
                        type="button"
                        handleClick={event =>
                          handleDeleteSocial(event, social.uuid, index)
                        }
                        variant="delete"
                      />
                    </SocialRowTrash>
                  )}
                </SocialRow>
              </Row>
            ))}
          </div>
          <SocialContent gutterR flex justifyEnd>
            <Btn
              variant="textPrimary"
              label="Add more"
              startIcon="plus"
              iconSize={14}
              handleClick={toogleInternalModal}
              type="button"
            />
          </SocialContent>
        </Body>
        <SocialContent gutterX>
          <Actions>
            {!isMobile && (
              <BtnGroup>
                <Btn
                  startIcon="leftArrow"
                  iconSize={12}
                  label={buttonsT('back')}
                  type="button"
                  handleClick={closeModal}
                />
              </BtnGroup>
            )}

            <BtnGroup style={{ width: isMobile ? '100%' : 'auto' }}>
              <Btn
                variant="outlinePrimary"
                label={buttonsT('save')}
                type="submit"
                loading={loading}
                full={isMobile}
              />
            </BtnGroup>
          </Actions>
        </SocialContent>
      </Form>
    </ModalBody>
  );
}

export default MyDigitalPresence;
