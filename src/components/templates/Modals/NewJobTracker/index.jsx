import React, { useContext, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import BoardService from '@api/services/board';
import UserService from '@api/services/user';

import AppContext from '@context/appContext';

import TextInput from '@components/molecules/TextInput';

import FormBlock from '@components/organisms/FormBlock';
import CustomSelect from '@components/molecules/CustomSelect';
import Btn from '@components/molecules/Btn';
import Avatar from '@components/molecules/Avatar';
import Dropdown from '@components/molecules/CustomSelect/Dropdown';
import { useToast } from '@components/molecules/Notification';

import { White } from '@assets/styles/colors';

import { useRouter } from 'next/router';
import useKeypress from '@src/hooks/useKeypress';
import ModalBody from '../ModalBody';

import {
  Body,
  Row,
  Actions,
  LeftButtonWrapper,
  RightButtonWrapper,
  ButtonAddContentWrapper,
  ContainerAlignRight,
  HideMobile,
} from '../style';
import { AvatarContainer, FormNewJob, TextEnterManually } from './style';
import ModalDialog from '../Dialog';

/**
 * New Job Tracker Modal
 */

function validUrl(url) {
  const expression = /(https?:\/\/[^\s]+)/g;
  const regex = new RegExp(expression);

  return url.match(regex);
}

const NewJobTracker = ({ data }) => {
  const { t: modalsT } = useTranslation('modals');
  const { t: buttonsT } = useTranslation('buttons');
  const { t: errorMessage } = useTranslation('errorMessages');

  const { dispatch: appDispatch } = useContext(AppContext);

  const toast = useToast();
  const showSuccess = msg => toast.add(msg, 'success');
  const showError = msg => toast.add(msg, 'error');

  const [listSwimline, setListSwimline] = useState([]);
  const [loading, setLoading] = useState(false);

  const [listCompany, setListCompany] = useState([
    // {
    //   value: '0',
    //   label: 'Spotify',
    //   image:
    //     'https://cdn.icon-icons.com/icons2/836/PNG/512/Spotify_icon-icons.com_66783.png',
    // },
    // {
    //   value: '1',
    //   label: 'Slack',
    //   image:
    //     'https://uploads-ssl.webflow.com/5d640f4558306be99cf47a0e/5e6130528d76903a87d32642_slack%2520logo-p-500.png',
    // },
    // {
    //   value: '2',
    //   label: 'Salesforce',
    //   image:
    //     'https://logodownload.org/wp-content/uploads/2020/04/salesforce-logo-1.png',
    // },
    // {
    //   value: '3',
    //   label: 'Sony',
    //   image: 'https://image.flaticon.com/icons/png/512/871/871524.png',
    // },
  ]);
  const [linkData, setLinkData] = useState(null);
  const [postingUrl, setUrl] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState(null);

  const [swimlane, setSwimlane] = useState({});

  const [isManually, setIsManually] = useState(false);

  const formRef = useRef(null);

  const { query, push } = useRouter();

  useEffect(() => {
    if (data.swimlanes) {
      setListSwimline(data.swimlanes);
      setSwimlane(data.swimlanes[0]);
    }

    if (data.titleSwimline)
      setSwimlane(
        data.swimlanes?.filter(swim => swim.label === data.titleSwimline)[0],
      );
  }, []);

  function handleManuallySubmit() {
    formRef.current.submitForm();
  }

  useKeypress('Enter', () => handleManuallySubmit(), []);

  function closeModal() {
    appDispatch({ type: 'SET_MODAL_CLOSED' });
  }

  function handleGoPricing() {
    closeModal();
    push('/pricing');
  }

  function handleOpenDialogUpgrade() {
    closeModal();
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: ModalDialog,
      props: {
        icon: { name: 'warn', color: '#DF7958' },
        title: modalsT('upgrade_warn.title'),
        description: modalsT('upgrade_warn.description'),
        warnDescription: modalsT('upgrade_warn.warn_description'),
        labelCancel: modalsT('upgrade_warn.cancel'),
        labelConfirm: modalsT('upgrade_warn.confirm'),
        onConfirm: handleGoPricing,
        onCancel: async () => {
          await UserService.setBonusUpgrade();
          appDispatch({
            type: 'SET_MODAL_OPENED',
            component: ModalDialog,
            props: {
              title: modalsT('upgrade_sure.title'),
              description: modalsT('upgrade_sure.description'),
              warnDescription: modalsT('upgrade_sure.warn_description'),
              labelCancel: modalsT('upgrade_sure.cancel'),
              labelConfirm: modalsT('upgrade_sure.confirm'),
              onConfirm: () => {
                handleGoPricing();
              },
              onCancel: () => {
                closeModal();
              },
            },
          });
        },
      },
    });
  }

  async function handleSubmit(values) {
    const value = {
      companyName: values.companyName,
      jobTitle: values.jobTitle,
      tracked: true,
    };

    if (values && values.url) value.url = values.url;

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        // url: Yup.string()
        //   .url()
        //   .required(),
        companyName: Yup.string().required(),
        jobTitle: Yup.string().required(),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      if (values.url && !validUrl(values.url)) {
        formRef.current.setErrors({
          url: errorMessage(`link.invalid`),
        });

        return;
      }

      setLoading(true);

      await BoardService.setJobCard(query.boardId, swimlane.value, value);

      showSuccess('Section has been changed successfully');
      closeModal();
      if (data.handleGetBoard) data.handleGetBoard();
    } catch (err) {
      setLoading(false);

      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = errorMessage(
            `${error.path}.${error.type}`,
          );
        });
        formRef.current.setErrors(validationErrors);
      } else if (
        err.status === 400 &&
        err.data?.message[0]?.constraints?.GENERAL.includes('please upgrade')
      ) {
        try {
          await BoardService.setJobCardInactive(
            query.boardId,
            swimlane.value,
            value,
          );
          if (data.handleGetBoard) data.handleGetBoard();
          handleOpenDialogUpgrade();
        } catch (error) {
          showError(modalsT('new_job.toast_upgrade'));
        }
      } else showError(err.data.message[0]);
    }
  }

  function handleEnterManually() {
    setIsManually(true);
    formRef.current.setErrors({});
  }

  function onChangeUrl(url) {
    if (validUrl(url) && !linkData) {
      const mockJobTitle = 'Insights Manager';
      const mockCompany = listCompany[0];
      const { pathname } = new URL(url);
      const splitPath = pathname.split('/');
      const splitDetail = splitPath[3]?.split('-at-');
      // console.log('url---', splitDetail);
      if (splitDetail && splitDetail.length > 1) {
        const getCompanyName = splitDetail[1].replaceAll('-', ' ');
        const getJobTitle = splitDetail[0].replaceAll('-', ' ');
        const companyName = getCompanyName
          .toLowerCase()
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

        const jobName = getJobTitle
          .toLowerCase()
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

        handleEnterManually();
        formRef.current.setFieldValue(
          'companyName',
          companyName.replace(/[0-9]/g, '').trim(),
        );
        formRef.current.setFieldValue('jobTitle', jobName);
      }
      // setCompany(mockCompany);
      // setCompanyValue(mockCompany.label);
      // setLinkData({ mockCompany, mockJobTitle });

      // setJobTitle(mockJobTitle);
    }
    setUrl(url);
  }

  const visibledListCompanies =
    (companyValue && !company) ||
    (companyValue && company && company.label !== companyValue);

  const companiesFiltered = listCompany.filter(item =>
    item.label.toLowerCase().includes(companyValue.toLowerCase()),
  );
  function handleChange(e, inputType) {
    if (e.target.value && e.target.value.trim() !== '') {
      if (inputType === 'companyName') {
        setCompany(null);
        setCompanyValue(e.target.value);
      } else if (inputType === 'JobTitle') {
        setJobTitle(e.target.value);
      }
    } else {
      e.target.value = '';
    }
  }

  return (
    <ModalBody headerTitle="Add Job" onCancel={closeModal}>
      <FormNewJob onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <FormBlock isLabelShowMobile={false} label="Job posting URL">
            <TextInput
              name="url"
              size="medium"
              onChange={e => onChangeUrl(e.target.value)}
              placeholder="Copy-paste the job posting link here!"
              noBorder
            />
          </FormBlock>
          {/* <TextEnterManually hide={isManually} onClick={handleEnterManually}>
            or enter manually
          </TextEnterManually> */}
        </Row>
        {/* <Row hide={!isManually}></Row> */}
        <Row>
          <FormBlock
            className="reqlabel"
            isLabelShowMobile={false}
            label="Company Name"
          >
            <ButtonAddContentWrapper>
              <TextInput
                name="companyName"
                size="medium"
                value={companyValue}
                onChange={e => handleChange(e, 'companyName')}
                noBorder
                placeholder="Enter the company name here"
                maxLength="130"
              />
              {companyValue && company && (
                <AvatarContainer>
                  <Avatar
                    objectFit="contain"
                    background={White}
                    image={company.image}
                    size="xxsmall"
                  />
                </AvatarContainer>
              )}
              <Dropdown
                options={companiesFiltered}
                onOptionSelected={e => {
                  formRef.current.setFieldValue('companyName', e.label);
                  setCompany(e);
                  setCompanyValue(e.label);
                }}
                autoHeightMax="130px"
                name="select_company"
                size="medium"
                isActive={
                  !!visibledListCompanies && companiesFiltered.length > 0
                }
              />
            </ButtonAddContentWrapper>
          </FormBlock>
        </Row>
        <Row>
          <FormBlock
            className="reqlabel"
            isLabelShowMobile={false}
            label="Job Title"
          >
            <TextInput
              name="jobTitle"
              size="medium"
              value={jobTitle}
              onChange={e => handleChange(e, 'jobTitle')}
              placeholder="What position are you applying for?"
              maxLength="130"
              noBorder
            />
          </FormBlock>
        </Row>

        <Row className="swimlanedropdown">
          <FormBlock isLabelShowMobile={false} label="Swimlane">
            <CustomSelect
              options={listSwimline}
              size="medium"
              value={swimlane}
              position="fixed"
              onOptionSelected={setSwimlane}
              name="select_swimlane"
            />
          </FormBlock>
        </Row>
        <Actions>
          <LeftButtonWrapper>
            <HideMobile>
              <Btn
                type="button"
                label={buttonsT('cancel')}
                size="md"
                handleClick={closeModal}
                variant="outlineSecondary"
              />
            </HideMobile>
          </LeftButtonWrapper>
          <RightButtonWrapper>
            <ContainerAlignRight>
              <Btn
                label={buttonsT('Save Job')}
                type="button"
                size="md"
                variant="outlinePrimary"
                handleClick={handleManuallySubmit}
                loading={loading}
              />
            </ContainerAlignRight>
          </RightButtonWrapper>
        </Actions>
      </FormNewJob>
    </ModalBody>
  );
};

NewJobTracker.propTypes = {
  data: PropTypes.shape({
    titleSwimline: PropTypes.string,
    tracked: PropTypes.bool,
    swimlanes: PropTypes.arrayOf(PropTypes.object),
    handleGetBoard: PropTypes.func,
  }),
};

NewJobTracker.defaultProps = {
  data: {},
};

export default NewJobTracker;
