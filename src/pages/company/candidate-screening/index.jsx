import React, { useRef, useState, useEffect } from 'react';
import Page from '@components/templates/Page';
import { withAuthSync } from '@src/utils/auth';
import { Form } from '@unform/web';
import Link from 'next/link';
import errorHandle from '@src/utils/error';
import { useToast } from '@components/molecules/Notification';
import AboutCompanyService from '@api/services/about-company';
import DashboardNew from '@api/services/dashboard-new';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { cdn } from '@utils/general';
import { screenQuestion } from '../../../modules/jobScreening';
import {
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  FormGroup,
  TextCount,
  CadidateScreenTitle,
  AddScreeningWrap,
  AddQueList,
  AddQueHead,
  AddQueBody,
  IdalAnsWrap,
  QueInner,
  QueInnerLabel,
  ScreenQuestionWrap,
  ScreenQuestionList,
  Logo,
  Hint,
} from './style';

const CandidateScreening = () => {
  const {
    languages,
    CustomQuestion,
    UrgentHiring,
    locations,
    VisaStatus,
    certification,
    license,
    BackgroundCheck,
    DrugTest,
    WorkAuth,
    WorkExpe,
    IndustryExcp,
    ExprienceTool,
    GPA,
    education,
  } = screenQuestion;
  const question = [];
  const formRef = useRef(null);
  const router = useRouter();
  const [questionListArray, setQuestionListArray] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [recieveApplicantBy, setRecieveApplicantBy] = useState(
    'External Website',
  ); //External Website Sizigi ATS
  const [idealAnswer, setIdealAnswer] = useState(0);
  const [mustHaveQualification, setMustHaveQualification] = useState(false);
  const [optionType, setOptionType] = useState('');
  const [requestContent, setRequestContent] = useState(false);
  const [questionList, setQuestionList] = useState('');
  const { t: modalT } = useTranslation('modals');
  ////classname/////
  const [customClassName, setCustomClassName] = useState('');
  const [languageClassName, setLanguageClassName] = useState('');
  const [urgentHiringClassName, setUrgentHiringClassName] = useState('');
  const [locationClassName, setLocationClassName] = useState('');
  const [certificateClassName, setCertificateClassName] = useState('');
  const [industryClassName, setIndustryClassName] = useState('');
  const [visaClassName, setVisaClassName] = useState('');
  const [workClassName, setWorkClassName] = useState('');
  const [workExperiClassName, setWorkExperiClassName] = useState('');
  const [drugClassName, setDrugClassName] = useState('');
  const [experToolClassName, setExperToolClassName] = useState('');
  const [driverLinceClassName, setDriverLinceClassName] = useState('');
  const [educationClassName, setEducationClassName] = useState('');
  const [backgroundClassName, setBackgroundClassName] = useState('');
  const [gpaClassName, setGpaClassName] = useState('');

  const [urgentShow, setUrgentShow] = useState(false);
  const [customQuestionShow, setCustomQuestionShow] = useState(false);
  const [language, setLanuage] = useState(false);
  const [location, setLocation] = useState(false);
  const [induExp, setInduExp] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [visa, setVisa] = useState(false);
  const [workAuth, setWorkAuth] = useState(false);
  const [workExp, setWorkExp] = useState(false);
  const [drug, setDrug] = useState(false);
  const [expTool, setExpeTool] = useState(false);
  const [driver, setDriverLicense] = useState(false);
  const [educationshow, setEducationShow] = useState(false);
  const [backgroundCheck, setBackgroundCheck] = useState(false);
  const [gpa, setGPA] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [webAddress, setWebsiteAddress] = useState('');
  const [textBox, setTextBox] = useState('');
  const [lableText, setTextLabel] = useState('');
  const [labelTextAns, setTextAns] = useState('');
  const [valWebsiteAddressError, setValWebsiteAddressError] = useState('');
  const [valWebsiteUrl, setValWebsiteUrl] = useState('');
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [profilesId, setProfileId] = useState('');
  const { t: errorMessage } = useTranslation('errorMessages');
  const [loading, setLoading] = useState(false);

  const loadData = value => {
    setWebsiteAddress(value);
  };

  useEffect(() => {
    const getLocal =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('profileuserInformation'))
        : null;
    if (getLocal.data.job_candidate !== null) {
      const { externalWebsiteLink } = getLocal.data.job_candidate;
      loadData(externalWebsiteLink);
    }
  }, []);
  const onFormSubmit = async () => {
    const jobdetail =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('profileuserInformation'))
        : null;
    const { id } = jobdetail?.data;
    const data = {
      recieveApplicantBy,
      externalWebsiteLink: webAddress,
    };
    let m = true;
    const validationWebsite = /^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    if (data.externalWebsiteLink === '') {
      setValWebsiteAddressError('Website Address is required.');
    } else {
      m = validationWebsite.test(webAddress);
      if (m) {
        setValWebsiteUrl('');
      } else {
        setValWebsiteUrl('Website URL is wrong');
      }
      setValWebsiteAddressError('');
    }
    if (data.externalWebsiteLink !== '' && m) {
      const res = await DashboardNew.putWebAddress(id, data);
      if (res.status === 200) {
        localStorage.setItem(
          'profileuserInformation',
          JSON.stringify(res.data),
        );
        router.push('/company/job-review');
      }
    }
    // const data = {
    //   recieveApplicantBy,
    //   jobScreening: questionArray,
    // };
    // const val = questionArray.map(res => {
    //   delete res.label;
    //   return res;
    // });
    // console.log('New Array', val);
  };

  async function handleSelect(e) {
    console.log('select', e.target.name);
    if (e.target.name === 'recieveApplicantBy') {
      setRecieveApplicantBy(e.target.value);
    }
    if (e.target.name === 'responseType') {
      setOptionType(e.target.value);
    }

    if (e.target.name === 'changeLanguage') {
      setOptionType(e.target.value);
    }

    if (e.target.name === 'educationDegree') {
      setOptionType(e.target.value);
    }
  }

  async function handleQuestionList(e) {
    // const insideArray = [];
    console.log('e', e.target.name);
    if (e.target.name === 'custom') {
      if (customClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setCustomQuestionShow(true);
        setCustomClassName('selected');
        questionListArray.push('custom question');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setCustomQuestionShow(false);
        setCustomClassName('');
        const index = questionListArray.indexOf('custom question');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === CustomQuestion.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }
    // console.log('question', questionListArray);
    if (e.target.name === 'language') {
      if (languageClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setLanuage(true);
        setLanguageClassName('selected');
        questionListArray.push('language');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setLanuage(false);
        setLanguageClassName('');
        const index = questionListArray.indexOf('language');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === languages.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }

    if (e.target.name === 'urgentHiring') {
      if (urgentHiringClassName === '') {
        const data = {
          question: UrgentHiring.question,
          idealAnswer: UrgentHiring.idealAnswer,
          mustHaveQualification,
          responseType: 'yes/no',
          requestContent,
          label: 'urgent',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        setUrgentShow(true);
        setUrgentHiringClassName('selected');
        questionArray.push(data);
        questionListArray.push('urgent hiring need');
        console.log('New Array : ', questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setUrgentHiringClassName('');
        setUrgentShow(false);
        const removeQuestion = questionArray.findIndex(
          res => res.label === UrgentHiring.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('urgent hiring need');
        questionListArray.splice(index, 1);
      }
    }

    if (e.target.name === 'location') {
      if (locationClassName === '') {
        setLocation(true);
        setLocationClassName('selected');
        questionListArray.push('location');
        const data = {
          question: locations.question,
          idealAnswer: locations.idealAnswer,
          mustHaveQualification,
          responseType: 'yes/no',
          requestContent,
          label: 'locations',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        questionArray.push(data);
        console.log('Question Array : ', questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setLocation(false);
        setLocationClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === locations.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('location');
        questionListArray.splice(index, 1);
      }
    }
    if (e.target.name === 'industry') {
      if (industryClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setInduExp(true);
        setIndustryClassName('selected');
        console.log(questionArray);
        questionListArray.push('industry experience');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setInduExp(false);
        setIndustryClassName('');
        const index = questionListArray.indexOf('industry experience');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === IndustryExcp.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }

    // console.log('ques........', questionListArray);
    if (e.target.name === 'certificate') {
      if (certificateClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setCertificate(true);
        setCertificateClassName('selected');
        questionListArray.push('certificates');
        // console.log(questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setCertificate(false);
        setCertificateClassName('');
        const index = questionListArray.indexOf('certificates');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === certification.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }

    if (e.target.name === 'visa') {
      if (visaClassName === '') {
        const data = {
          question: VisaStatus.question,
          idealAnswer: VisaStatus.idealAnswer,
          mustHaveQualification: false,
          responseType: 'yes/no',
          requestContent: false,
          label: 'visastatus',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        setVisa(true);
        setVisaClassName('selected');
        questionListArray.push('visa status');
        questionArray.push(data);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        const removeQuestion = questionArray.findIndex(
          res => res.label === VisaStatus.label,
        );
        questionArray.splice(removeQuestion, 1);
        setVisa(false);
        setVisaClassName('');
        const index = questionListArray.indexOf('visa status');
        questionListArray.splice(index, 1);
      }
    }

    if (e.target.name === 'workAuth') {
      if (workClassName === '') {
        const data = {
          question: WorkAuth.question,
          idealAnswer: WorkAuth.idealAnswer,
          mustHaveQualification,
          responseType: 'yes/no',
          requestContent,
          label: 'workautho',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        setWorkAuth(true);
        setWorkClassName('selected');
        questionListArray.push('work authorization');
        questionArray.push(data);
        // console.log(questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setWorkAuth(false);
        setWorkClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === WorkAuth.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('work authorization');
        questionListArray.splice(index, 1);
        // console.log(questionArray);
      }
    }

    if (e.target.name === 'workExper') {
      if (workExperiClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setWorkExp(true);
        setWorkExperiClassName('selected');
        questionListArray.push('work experience');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setWorkExp(false);
        setWorkExperiClassName('');
        const index = questionListArray.indexOf('work experience');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === WorkExpe.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }

    if (e.target.name === 'drug') {
      if (drugClassName === '') {
        const data = {
          question: DrugTest.question,
          idealAnswer: DrugTest.idealAnswer,
          mustHaveQualification,
          responseType: 'yes/no',
          requestContent,
          label: 'drugtest',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        setDrug(true);
        setDrugClassName('selected');
        questionListArray.push('drug test');
        questionArray.push(data);
        console.log('newArray', questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setDrug(false);
        setDrugClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === DrugTest.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('drug test');
        questionListArray.splice(index, 1);
      }
    }
    if (e.target.name === 'experTool') {
      if (experToolClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setExpeTool(true);
        setExperToolClassName('selected');
        questionListArray.push('expertise with tools');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setExpeTool(false);
        setExperToolClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === ExprienceTool.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('expertise with tools');
        questionListArray.splice(index, 1);
      }
    }
    if (e.target.name === 'driverLicense') {
      if (driverLinceClassName === '') {
        const data = {
          question: license.question,
          idealAnswer: license.idealAnswer,
          mustHaveQualification: false,
          responseType: 'yes/no',
          requestContent: false,
          label: 'driverLicense',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        questionArray.push(data);
        setDriverLicense(true);
        setDriverLinceClassName('selected');
        questionListArray.push('drivers license');
        console.log(questionArray);
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setDriverLicense(false);
        setDriverLinceClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === license.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('drivers license');
        questionListArray.splice(index, 1);
        console.log(questionArray);
      }
    }
    if (e.target.name === 'education') {
      if (educationClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setEducationShow(true);
        setEducationClassName('selected');
        questionListArray.push('education');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setOptionType('');
        setEducationShow(false);
        setEducationClassName('');
        const index = questionListArray.indexOf('education');
        questionListArray.splice(index, 1);
        const removeQuestion = questionArray.findIndex(
          res => res.label === education.label,
        );
        questionArray.splice(removeQuestion, 1);
      }
    }
    if (e.target.name === 'backgroundCheck') {
      if (backgroundClassName === '') {
        // setQuestionArray([]);
        const data = {
          question: BackgroundCheck.question,
          idealAnswer: BackgroundCheck.idealAnswer,
          mustHaveQualification: false,
          responseType: 'yes/no',
          requestContent: false,
          label: 'backgroundCheck',
        };
        setMustHaveQualification(false);
        setRequestContent(false);
        questionArray.push(data);
        setBackgroundCheck(true);
        setBackgroundClassName('selected');
        questionListArray.push('background check');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setBackgroundCheck(false);
        setBackgroundClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === BackgroundCheck.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('background check');
        questionListArray.splice(index, 1);
      }
    }
    if (e.target.name === 'gpa') {
      if (gpaClassName === '') {
        setMustHaveQualification(false);
        setRequestContent(false);
        setGPA(true);
        setGpaClassName('selected');
        questionListArray.push('gpa');
      } else {
        setMustHaveQualification(false);
        setRequestContent(false);
        setGPA(false);
        setGpaClassName('');
        const removeQuestion = questionArray.findIndex(
          res => res.label === GPA.label,
        );
        questionArray.splice(removeQuestion, 1);
        const index = questionListArray.indexOf('gpa');
        questionListArray.splice(index, 1);
      }
    }
  }

  async function onChangeInput(e) {
    setTextBox(e.target.value[e.target.value]);
    if (e.target.name === 'textLabel') {
      setTextLabel(e.target.value);
    }

    if (e.target.name === 'labelAns') {
      setTextAns(e.target.value);
    }
  }

  async function handleChange(e) {
    setIsChecked(e.target.checked[e.target.value]);
    if (e.target.name === 'mustHaveQualification') {
      if (e.target.checked) {
        console.log('isChecked :', e.target.checked);
        setMustHaveQualification(true);
        const data = {
          question: locations.question,
          idealAnswer: 'Yes',
          mustHaveQualification: true,
          responseType: 'yes/no',
          requestContent,
        };
        question.push(data);
        console.log('Final Response', question);
      } else {
        console.log('isChecked false :', e.target.checked);
        setMustHaveQualification(false);
      }
    }

    if (e.target.name === 'requestContent') {
      if (e.target.checked) {
        setRequestContent(1);
      } else {
        setRequestContent(0);
      }
    }
  }

  async function Save(data) {
    setLoading(true);

    try {
      const profileId = JSON.parse(localStorage.getItem('userDetail'));
      //console.log('id', profileId.data.id);
      const res = await AboutCompanyService.updateCandidateScreening(
        profileId.data.id,
        data,
      );
      console.log('response', res);
      localStorage.setItem('reviewDetail', JSON.stringify(res.data.data));
      setLoading(false);

      if (res.status === 200) {
        //console.log('success');
        router.push('/company/job-review');
      }
    } catch (e) {
      console.log('error', e);
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    const queArray = questionListArray.toString();
    //console.log('ed', queArray);
    //setQuestionList(;
    Object.assign(
      data,
      { recieveApplicantBy },
      { lableText },
      { idealAnswer },
      { optionType },
      { mustHaveQualification },
      { requestContent },
      { questionList: queArray },
    );
    //console.log('data', data);
    // await Save(data);
  }

  const rightContent = () => (
    <BoxFormSection>
      {/* 3 of 3: Candidate Screening */}
      <Link href="/company/dashboard">
        <Logo>
          <img src={cdn('/static/img/sizigi-full-logo.svg')} alt="logo" />
        </Logo>
      </Link>
      <div className="container">
        <BoxFormWrap>
          <BoxFormTitle>
            <Link href="/company/job-post-second-page">
              <a href="/company/job-post-second-page" className="head-back-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Link>
            <h2>3 of 4: Candidate Screening</h2>
          </BoxFormTitle>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <BoxFormBody className="pb-0">
              <CadidateScreenTitle>
                How would you like to recieve your applicants?
              </CadidateScreenTitle>
              <datagrid />
              <FormGroup className="border-form-group mb-24">
                <Label className="border-group-label">
                  Recieve applicants by
                </Label>
                <select
                  className="form-control"
                  name="recieveApplicantBy"
                  onChange={handleSelect}
                >
                  <option value="External Website">External Website</option>
                  {/* <option value="Sizigi-ATS">Sizigi ATS</option> */}
                </select>
              </FormGroup>

              {recieveApplicantBy === 'Sizigi-ATS' && (
                <>
                  <AddScreeningWrap>
                    <h4>Add screening questions</h4>
                    <p>
                      We recommend 3 or more questions. Applicants must answer
                      each question.
                    </p>

                    {language && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{languages.question}</h4>
                            <button
                              onClick={e => {
                                setIsChecked(false);
                                setLanuage(false);
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setLanguageClassName('');
                                const index = questionListArray.indexOf(
                                  'language',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === languages.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="mb-24">
                              <Label>
                                Proficiency: <span className="req-star">*</span>
                              </Label>
                              <input
                                id={1}
                                type="text"
                                name="textLabel"
                                placeholder="Language"
                                className="form-control"
                                defaultValue={textBox}
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== languages.label,
                                  );
                                  const data = {
                                    question: `What is your level of proficiency in  ${e.target.value}?`,
                                    idealAnswer: optionType,
                                    mustHaveQualification,
                                    responseType: 'text',
                                    requestContent,
                                    label: 'languages',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                            </FormGroup>

                            <FormGroup className="border-form-group mb-24">
                              <Label className="border-group-label">
                                Ideal Answer
                              </Label>
                              <select
                                className="form-control"
                                name="changeLanguage"
                                value={optionType}
                                onChange={e => {
                                  setOptionType(e.target.value[e.target.value]);
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== languages.label,
                                  );
                                  const data = {
                                    question: `What is your level of proficiency in  ${lableText}?`,
                                    idealAnswer: e.target.value,
                                    mustHaveQualification,
                                    responseType: 'text',
                                    requestContent,
                                    label: 'languages',
                                  };
                                  setOptionType(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              >
                                <option value="conversational">
                                  Conversational
                                </option>
                                <option value="normal">Normal</option>
                              </select>
                            </FormGroup>

                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={3}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== languages.label,
                                          );
                                          const data = {
                                            question: `What is your level of proficiency in  ${lableText}?`,
                                            idealAnswer: optionType,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'text',
                                            requestContent,
                                            label: 'languages',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== languages.label,
                                          );
                                          const data = {
                                            question: `What is your level of proficiency in  ${lableText}?`,
                                            idealAnswer: optionType,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'text',
                                            requestContent,
                                            label: 'languages',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>

                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={4}
                                      type="checkbox"
                                      name="requestContent"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== languages.label,
                                          );
                                          const data = {
                                            question: `What is your level of proficiency in  ${lableText}?`,
                                            idealAnswer: optionType,
                                            mustHaveQualification,
                                            responseType: 'text',
                                            requestContent: e.target.checked,
                                            label: 'languages',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== languages.label,
                                          );
                                          const data = {
                                            question: `What is your level of proficiency in  ${lableText}?`,
                                            idealAnswer: optionType,
                                            mustHaveQualification,
                                            responseType: 'text',
                                            requestContent: e.target.checked,
                                            label: 'languages',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {urgentShow && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{UrgentHiring.question}</h4>
                            <button
                              onClick={() => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setIsChecked(false);
                                setUrgentShow(false);
                                setUrgentHiringClassName('');
                                const index = questionListArray.indexOf(
                                  'urgent hiring need',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === UrgentHiring.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {UrgentHiring.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={1}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked) {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== UrgentHiring.label,
                                          );
                                          const data = {
                                            question: UrgentHiring.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent,
                                            label: 'urgent',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== UrgentHiring.label,
                                          );
                                          const data = {
                                            question: UrgentHiring.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent,
                                            label: 'urgent',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {location && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{locations.question}</h4>
                            <button
                              onClick={e => {
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === locations.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setLocation(false);
                                setLocationClassName('');
                                const index = questionListArray.indexOf(
                                  'location',
                                );
                                questionListArray.splice(index, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {locations.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={2}
                                      type="checkbox"
                                      checked={isChecked}
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked === true) {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== locations.label,
                                          );
                                          const data = {
                                            question: locations.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'locations',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== locations.label,
                                          );
                                          const data = {
                                            question: locations.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'locations',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {induExp && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{IndustryExcp.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setInduExp(false);
                                setIndustryClassName('');
                                const index = questionListArray.indexOf(
                                  'industry experience',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === IndustryExcp.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="mb-24">
                              <Label>
                                Industry: <span className="req-star">*</span>
                              </Label>
                              <input
                                name="textLabel"
                                defaultValue={textBox}
                                type="text"
                                placeholder="Industry"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== IndustryExcp.label,
                                  );
                                  const data = {
                                    question: `How many years of ${e.target.value} experience do you currently have?`,
                                    idealAnswer: labelTextAns,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'industryexcep',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array ', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                            </FormGroup>

                            {/* <IdalAnsWrap> */}
                            <FormGroup className="ideal-ans-wrap mb-24">
                              {/* <h5>Ideal Answer :</h5> */}
                              <Label>Ideal Answer:</Label>
                              <input
                                type="text"
                                name="labelAns"
                                className="form-control"
                                defaultValue={textBox}
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== IndustryExcp.label,
                                  );
                                  const data = {
                                    question: `How many years of ${lableText} experience do you currently have?`,
                                    idealAnswer: e.target.value,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'industryexcep',
                                  };
                                  setTextAns(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              />
                              <span className="min-lbl">minimum</span>
                            </FormGroup>
                            {/* </IdalAnsWrap> */}
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={5}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        // console.log(questionArray);
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== IndustryExcp.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'industryexcep',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== IndustryExcp.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'industryexcep',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>

                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={6}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="requestContent"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== IndustryExcp.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'industryexcep',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== IndustryExcp.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'industryexcep',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {certificate && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{certification.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setCertificate(false);
                                setCertificateClassName('');
                                const index = questionListArray.indexOf(
                                  'certificates',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === certification.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="mb-24">
                              <Label>
                                License/Certification:{' '}
                                <span className="req-star">*</span>
                              </Label>
                              <input
                                defaultValue={textBox}
                                type="text"
                                name="textLabel"
                                placeholder="Certification"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== certification.label,
                                  );
                                  const data = {
                                    question: `Do you have the following license or certification: ${e.target.value}?`,
                                    idealAnswer: certification.idealAnswer,
                                    mustHaveQualification,
                                    responseType: 'yes/no',
                                    requestContent,
                                    label: 'certificate',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                            </FormGroup>

                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">Yes</span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={7}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== certification.label,
                                          );
                                          const data = {
                                            question: `Do you have the following license or certification: ${lableText} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'yes/no',
                                            requestContent,
                                            label: 'certificate',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== certification.label,
                                          );
                                          const data = {
                                            question: `Do you have the following license or certification: ${lableText} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'yes/no',
                                            requestContent,
                                            label: 'certificate',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>

                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={8}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="requestContent"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== certification.label,
                                          );
                                          const data = {
                                            question: `Do you have the following license or certification: ${lableText} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification,
                                            responseType: 'yes/no',
                                            requestContent: e.target.checked,
                                            label: 'certificate',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== certification.label,
                                          );
                                          const data = {
                                            question: `Do you have the following license or certification: ${lableText} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification,
                                            responseType: 'yes/no',
                                            requestContent: e.target.checked,
                                            label: 'certificate',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {visa && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{VisaStatus.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setVisa(false);
                                setVisaClassName('');
                                const index = questionListArray.indexOf(
                                  'visa status',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === VisaStatus.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">Yes</span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={9}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked === true) {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== VisaStatus.label,
                                          );
                                          const data = {
                                            question: VisaStatus.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'visastatus',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== VisaStatus.label,
                                          );
                                          const data = {
                                            question: VisaStatus.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'visastatus',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {workAuth && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{WorkAuth.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setWorkAuth(false);
                                setWorkClassName('');
                                const index = questionListArray.indexOf(
                                  'work authorization',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === WorkAuth.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                                // console.log(questionArray);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {WorkAuth.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={10}
                                      checked={isChecked}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked) {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkAuth.label,
                                          );
                                          const data = {
                                            question: WorkAuth.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'workautho',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkAuth.label,
                                          );
                                          const data = {
                                            question: WorkAuth.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'workautho',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {workExp && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{WorkExpe.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setWorkExp(false);
                                setWorkExperiClassName('');
                                const index = questionListArray.indexOf(
                                  'work experience',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === WorkExpe.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="mb-24">
                              <Label>
                                Work Experience:{' '}
                                <span className="req-star">*</span>
                              </Label>
                              <input
                                type="text"
                                name="textLabel"
                                defaultValue={textBox}
                                placeholder="Tap to search"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== WorkExpe.label,
                                  );
                                  const data = {
                                    question: `How many years of ${e.target.value} experience do you currently have?`,
                                    idealAnswer: '1',
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'workExpre',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                            </FormGroup>
                            <FormGroup className="ideal-ans-wrap mb-24">
                              <Label>Ideal Answer:</Label>
                              <input
                                type="text"
                                name="labelAns"
                                defaultValue={textBox}
                                placeholder="Total Exprience"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== WorkExpe.label,
                                  );
                                  const data = {
                                    question: `How many years of ${lableText} experience do you currently have?`,
                                    idealAnswer: e.target.value,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'workExpre',
                                  };
                                  setTextAns(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              />
                              <span className="min-lbl">minimum</span>
                            </FormGroup>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={11}
                                      type="checkbox"
                                      checked={isChecked}
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        // console.log(questionArray);
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkExpe.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'workExpre',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkExpe.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'workExpre',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>

                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={12}
                                      type="checkbox"
                                      name="requestContent"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkExpe.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'workExpre',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== WorkExpe.label,
                                          );
                                          const data = {
                                            question: `How many years of ${lableText} experience do you currently have?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'workExpre',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {drug && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{DrugTest.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setDrug(false);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === DrugTest.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                                setDrugClassName('');
                                const index = questionListArray.indexOf(
                                  'drug test',
                                );
                                questionListArray.splice(index, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {DrugTest.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={13}
                                      type="checkbox"
                                      checked={isChecked}
                                      name="mustHaveQualification"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked === true) {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== DrugTest.label,
                                          );
                                          const data = {
                                            question: DrugTest.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'drugtest',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== DrugTest.label,
                                          );
                                          const data = {
                                            question: DrugTest.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'drugtest',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {expTool && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{ExprienceTool.question}</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setExpeTool(false);
                                setExperToolClassName('');
                                const index = questionListArray.indexOf(
                                  'expertise with tools',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === ExprienceTool.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="mb-24">
                              <Label>
                                Tool or Technology:{' '}
                                <span className="req-star">*</span>
                              </Label>
                              <input
                                defaultValue={textBox}
                                name="textLabel"
                                type="text"
                                placeholder="Tool or technology"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== ExprienceTool.label,
                                  );
                                  const data = {
                                    question: `How many years of work experience do you have using ${e.target.value}?`,
                                    idealAnswer: labelTextAns,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'exprienecetool',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                            </FormGroup>

                            <FormGroup className="ideal-ans-wrap mb-24">
                              <Label>Ideal Answer:</Label>
                              <input
                                type="text"
                                defaultValue={textBox}
                                name="labelAns"
                                placeholder="Expreince with tool"
                                className="form-control"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== ExprienceTool.label,
                                  );

                                  const data = {
                                    question: `How many years of work experience do you have using ${lableText}?`,
                                    idealAnswer: e.target.value,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent,
                                    label: 'exprienecetool',
                                  };
                                  setTextAns(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                                // style={{ display: 'block' }}
                              />
                              <span className="min-lbl">minimum</span>
                            </FormGroup>

                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={14}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        // console.log(questionArray);
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== ExprienceTool.label,
                                          );
                                          const data = {
                                            question: `How many years of work experience do you have using ${lableText}?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'exprienecetool',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== ExprienceTool.label,
                                          );
                                          const data = {
                                            question: `How many years of work experience do you have using ${lableText}?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: 'numeric',
                                            requestContent,
                                            label: 'exprienecetool',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>

                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={15}
                                      type="checkbox"
                                      name="requestContent"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== ExprienceTool.label,
                                          );
                                          const data = {
                                            question: `How many years of work experience do you have using ${lableText}?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'exprienecetool',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== ExprienceTool.label,
                                          );
                                          const data = {
                                            question: `How many years of work experience do you have using ${lableText}?`,
                                            idealAnswer: labelTextAns,
                                            mustHaveQualification,
                                            responseType: 'numeric',
                                            requestContent: e.target.checked,
                                            label: 'exprienecetool',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {driver && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{license.question}</h4>
                            <button
                              onClick={() => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setDriverLicense(false);
                                setDriverLinceClassName('');
                                const index = questionListArray.indexOf(
                                  'drivers license',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === license.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {license.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={16}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked) {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== license.label,
                                          );
                                          const data = {
                                            question: license.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'driverLicense',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== license.label,
                                          );
                                          const data = {
                                            question: license.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'driverLicense',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {educationshow && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{education.question}</h4>
                            <button
                              onClick={() => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setOptionType('');
                                setEducationShow(false);
                                setEducationClassName('');
                                const index = questionListArray.indexOf(
                                  'education',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === education.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="border-form-group mb-24">
                              <Label className="border-group-label">
                                Degree: <span className="req-star">*</span>
                              </Label>
                              <select
                                className="form-control"
                                name="educationDegree"
                                value={optionType}
                                onChange={e => {
                                  setOptionType(e.target.value[e.target.value]);
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== education.label,
                                  );
                                  const data = {
                                    question: `Have you completed the following level of education: ${e.target.value} ?`,
                                    idealAnswer: VisaStatus.idealAnswer,
                                    mustHaveQualification,
                                    responseType: 'yes/no',
                                    requestContent: false,
                                    label: 'educ',
                                  };
                                  setOptionType(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              >
                                <option value="conversational">
                                  Bechelors
                                </option>
                                <option value="master">Master</option>
                              </select>
                            </FormGroup>

                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {education.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={17}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked === true) {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== education.label,
                                          );
                                          const data = {
                                            question: `Have you completed the following level of education: ${optionType} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'educ',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !== education.label,
                                          );
                                          const data = {
                                            question: `Have you completed the following level of education: ${optionType} ?`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'educ',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {backgroundCheck && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{BackgroundCheck.question}</h4>
                            <button
                              onClick={() => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setBackgroundCheck(false);
                                setBackgroundClassName('');
                                const index = questionListArray.indexOf(
                                  'background check',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === BackgroundCheck.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <IdalAnsWrap>
                              <h5>Ideal Answer :</h5>
                              <span className="que-right-Label">
                                {BackgroundCheck.idealAnswer}
                              </span>
                            </IdalAnsWrap>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={18}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked) {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              BackgroundCheck.label,
                                          );
                                          const data = {
                                            question: BackgroundCheck.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: true,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'backgroundCheck',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              BackgroundCheck.label,
                                          );
                                          const data = {
                                            question: BackgroundCheck.question,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification: false,
                                            responseType: 'yes/no',
                                            requestContent: false,
                                            label: 'backgroundCheck',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {gpa && recieveApplicantBy === 'Sizigi-ATS' && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>{GPA.question}</h4>
                            <button
                              onClick={() => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setTextLabel('');
                                setGPA(false);
                                setGpaClassName('');
                                const index = questionListArray.indexOf('gpa');
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === GPA.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="ideal-ans-wrap mb-24">
                              <Label>Ideal Answer:</Label>
                              <input
                                type="text"
                                defaultValue={textBox}
                                name="labelAns"
                                className="form-control"
                                placeholder="1.00"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== GPA.label,
                                  );
                                  const data = {
                                    question: GPA.question,
                                    idealAnswer: e.target.value,
                                    mustHaveQualification,
                                    responseType: 'numeric',
                                    requestContent: false,
                                    label: 'gpa',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              />
                              <span className="min-lbl">minimum</span>
                            </FormGroup>
                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={19}
                                      type="checkbox"
                                      name="mustHaveQualification"
                                      checked={isChecked}
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );
                                        if (e.target.checked === true) {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== GPA.label,
                                          );
                                          const data = {
                                            question: GPA.question,
                                            idealAnswer: lableText,
                                            mustHaveQualification: true,
                                            responseType: 'numeric',
                                            requestContent: false,
                                            label: 'gpa',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          const keepQuestion = questionArray.filter(
                                            res => res.label !== GPA.label,
                                          );
                                          const data = {
                                            question: GPA.question,
                                            idealAnswer: lableText,
                                            mustHaveQualification: false,
                                            responseType: 'numeric',
                                            requestContent: false,
                                            label: 'gpa',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}

                    {customQuestionShow && (
                      <>
                        <AddQueList>
                          <AddQueHead>
                            <h4>Write a custom screening question.</h4>
                            <button
                              onClick={e => {
                                setMustHaveQualification(false);
                                setRequestContent(false);
                                setCustomQuestionShow(false);
                                setCustomClassName('');
                                const index = questionListArray.indexOf(
                                  'custom question',
                                );
                                questionListArray.splice(index, 1);
                                const removeQuestion = questionArray.findIndex(
                                  res => res.label === CustomQuestion.label,
                                );
                                questionArray.splice(removeQuestion, 1);
                              }}
                              type="button"
                              aria-label="Mute volume"
                              className="que-remove-icon"
                            />
                          </AddQueHead>

                          <AddQueBody>
                            <FormGroup className="border-form-group mb-0">
                              <Label className="border-group-label">
                                Custom Screening Question:{' '}
                                <span className="req-star">*</span>
                              </Label>
                              <textarea
                                className="form-control"
                                defaultValue={textBox}
                                name="textLabel"
                                placeholder="Try asking a question like, “What do you look for in a
                        team setting?”"
                                onBlur={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== CustomQuestion.label,
                                  );
                                  const data = {
                                    question: `${e.target.value}`,
                                    idealAnswer: 'Yes',
                                    mustHaveQualification,
                                    responseType: optionType,
                                    requestContent,
                                    label: 'customQuestion',
                                  };
                                  setTextLabel(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              />
                              <TextCount>XXX/XXX</TextCount>
                            </FormGroup>

                            <FormGroup className="border-form-group mb-16">
                              <Label className="border-group-label">
                                Response type:
                              </Label>
                              <select
                                className="form-control"
                                name="responseType"
                                value={optionType}
                                onChange={e => {
                                  const keepQuestion = questionArray.filter(
                                    res => res.label !== CustomQuestion.label,
                                  );

                                  const data = {
                                    question: `${lableText}`,
                                    idealAnswer: 'Yes',
                                    mustHaveQualification,
                                    responseType: e.target.value,
                                    requestContent,
                                    label: 'customQuestion',
                                  };
                                  setOptionType(e.target.value);
                                  keepQuestion.push(data);
                                  setQuestionArray(keepQuestion);
                                  console.log('New Array', keepQuestion);
                                }}
                              >
                                <option>Select an option</option>
                                <option value="text">Text</option>
                                <option value="text1">Text1</option>
                              </select>
                            </FormGroup>

                            <ul>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={20}
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={e => {
                                        // console.log(questionArray);
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setMustHaveQualification(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              CustomQuestion.label,
                                          );
                                          const data = {
                                            question: `${lableText}`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: optionType,
                                            requestContent,
                                            label: 'customQuestion',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setMustHaveQualification(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              CustomQuestion.label,
                                          );
                                          const data = {
                                            question: `${lableText}`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification:
                                              e.target.checked,
                                            responseType: optionType,
                                            requestContent,
                                            label: 'customQuestion',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Must-have qualification
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                              <li>
                                <QueInner>
                                  <div className="checkbox-field">
                                    <input
                                      value={21}
                                      type="checkbox"
                                      name="requestContent"
                                      onChange={e => {
                                        setIsChecked(
                                          e.target.checked[e.target.name],
                                        );

                                        if (e.target.checked === true) {
                                          setRequestContent(true);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              CustomQuestion.label,
                                          );
                                          const data = {
                                            question: `${lableText}`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification,
                                            responseType: optionType,
                                            requestContent: e.target.checked,
                                            label: 'customQuestion',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        } else {
                                          setRequestContent(false);
                                          const keepQuestion = questionArray.filter(
                                            res =>
                                              res.label !==
                                              CustomQuestion.label,
                                          );
                                          const data = {
                                            question: `${lableText}`,
                                            idealAnswer: 'Yes',
                                            mustHaveQualification,
                                            responseType: optionType,
                                            requestContent: e.target.checked,
                                            label: 'customQuestion',
                                          };
                                          keepQuestion.push(data);
                                          setQuestionArray(keepQuestion);
                                          console.log('newArray', keepQuestion);
                                        }
                                      }}
                                    />
                                    <QueInnerLabel>
                                      Request content
                                    </QueInnerLabel>
                                  </div>
                                </QueInner>
                              </li>
                            </ul>
                          </AddQueBody>
                        </AddQueList>
                      </>
                    )}
                  </AddScreeningWrap>{' '}
                </>
              )}

              {recieveApplicantBy === 'Sizigi-ATS' && (
                <ScreenQuestionWrap>
                  <h4>Screening questions list</h4>
                  <ScreenQuestionList>
                    <button
                      type="button"
                      name="custom"
                      onClick={handleQuestionList}
                      className={customClassName}
                    >
                      Custom question
                    </button>
                    <button
                      type="button"
                      className={languageClassName}
                      name="language"
                      value="language"
                      onClick={handleQuestionList}
                    >
                      Language
                    </button>
                    <button
                      type="button"
                      name="urgentHiring"
                      onClick={handleQuestionList}
                      className={urgentHiringClassName}
                    >
                      Urgent Hiring Need
                    </button>
                    <button
                      type="button"
                      name="location"
                      onClick={handleQuestionList}
                      className={locationClassName}
                    >
                      Location
                    </button>
                    <button
                      type="button"
                      name="industry"
                      onClick={handleQuestionList}
                      className={industryClassName}
                    >
                      Industry Experience
                    </button>
                    <button
                      type="button"
                      name="certificate"
                      onClick={handleQuestionList}
                      className={certificateClassName}
                    >
                      Certifications
                    </button>
                    <button
                      type="button"
                      name="visa"
                      onClick={handleQuestionList}
                      className={visaClassName}
                    >
                      Visa Status
                    </button>
                    <button
                      type="button"
                      name="workAuth"
                      onClick={handleQuestionList}
                      className={workClassName}
                    >
                      Work Authorization
                    </button>
                    <button
                      type="button"
                      name="workExper"
                      onClick={handleQuestionList}
                      className={workExperiClassName}
                    >
                      Work Experience
                    </button>
                    <button
                      type="button"
                      name="drug"
                      onClick={handleQuestionList}
                      className={drugClassName}
                    >
                      Drug Test
                    </button>
                    <button
                      type="button"
                      name="experTool"
                      onClick={handleQuestionList}
                      className={experToolClassName}
                    >
                      Expertise with Tools
                    </button>
                    <button
                      type="button"
                      name="driverLicense"
                      onClick={handleQuestionList}
                      className={driverLinceClassName}
                    >
                      Driver’s License
                    </button>
                    <button
                      type="button"
                      name="education"
                      onClick={handleQuestionList}
                      className={educationClassName}
                    >
                      Education
                    </button>
                    <button
                      type="button"
                      name="backgroundCheck"
                      onClick={handleQuestionList}
                      className={backgroundClassName}
                    >
                      Background Check
                    </button>
                    <button
                      type="button"
                      name="gpa"
                      onClick={handleQuestionList}
                      className={gpaClassName}
                    >
                      GPA
                    </button>
                  </ScreenQuestionList>
                </ScreenQuestionWrap>
              )}

              {recieveApplicantBy !== 'Sizigi-ATS' && (
                <AddScreeningWrap className="external-link-wrap">
                  <FormGroup className="mb-24">
                    <Label>
                      Website Address <span className="req-star">*</span>
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      value={webAddress}
                      placeholder="https://yourcompany.com/job123"
                      onChange={e => setWebsiteAddress(e.target.value)}
                    />
                    <Hint>{valWebsiteAddressError || valWebsiteUrl}</Hint>
                    {/* <TextInput
                      type="text"
                      className="form-control"
                      value={webAddress}
                      placeholder="https://yourcompany.com/job123"
                      onChange={e => setWebsiteAddress(e.target.value)}
                    /> */}
                  </FormGroup>

                  {/* <h4>
                    Recieve applicants by Sizigi ATS to use screening questions
                  </h4>
                  <p>
                    Unfortunately screening questions can’t be collected from
                    applicants when they apply on an external site.
                  </p>
                  <p>
                    If you want to collect answers to screening questions,
                    please choose to recieve applicants by Sizigi ATS!
                  </p> */}
                </AddScreeningWrap>
              )}
            </BoxFormBody>

            <BoxFormAction>
              <button type="submit" className="btn" onClick={onFormSubmit}>
                Post now!
              </button>
            </BoxFormAction>
          </Form>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );

  const content = rightContent();
  return (
    <Page
      title="Candidate Screening"
      description="Candidate Screening Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(CandidateScreening);
