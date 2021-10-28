import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import { cdn } from '@utils/general';
import AboutCompanyService from '@src/api/services/about-company';
import { Accordion, Dropdown } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
// import notificationBell from '@src/assets/images/notification.png';
import FileUploadModal from '@components/molecules/FileUploadModal';
import AdminService from '@api/services/admin';
import HeaderB2B from '@components/organisms/headerB2B';
import LeftbarB2B from '@components/organisms/LeftbarComPage';
import ProfileContext from '@context/profileContext';
import AppContext from '@context/appContext';
import errorHandle from '@src/utils/error';
import SignService from '@api/services/sign';
import {
  login,
  withoutAuth,
  withAuthSync,
  loginVerification,
} from '@src/utils/auth';
import { sizes } from '@assets/styles/medias';
import AssetService from '@api/services/asset';
import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import ReactSelect from '@components/molecules/CustomSelect/ReactSelect';
import {
  FormWrapperBlock,
  BoxFormSection,
  BoxFormWrap,
  LeftSideMenu,
  ReftSideMenu,
  ToggleAccordion,
  ListCheckboxOne,
  ListCheckboxOneInput,
  ListCheckboxOneLabel,
  Spinner,
  Row,
  Wrapper,
  AddBenefitsOBtn,
  AddedList,
  DeleteItem,
} from './style';

const CompanyPage = ({ jwt }) => {
  const companySizeOption = [
    { value: '1-49', label: '1-49' },
    { value: '50-149', label: '50-149' },
    { value: '150-249', label: '150-249' },
    { value: '250-499', label: '250-499' },
    { value: '500-749', label: '500-749' },
    { value: '750-999', label: '750-999' },
    { value: '1000+', label: '1000+' },
  ];
  const selectHealthAndWellness = [];
  const selectVacation = [];
  const selectFinancial = [];
  const selectProfessional = [];
  const selectOfficePerk = [];
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t: modalT } = useTranslation('modals');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  // const healthStorage =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('selectHealthAndWellness'))
  //     : [];
  // const vacationStorage =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('selectVacation'))
  //     : [];
  // const financialStorage =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('selectFinancial'))
  //     : [];
  // const professionalStorage =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('selectProfessional'))
  //     : [];
  // const officePerkStorage =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('selectOfficePerk'))
  //     : [];
  const [elements, setElements] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [financials, setFinancials] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [officePerks, setOfficePerks] = useState([]);
  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const toast = useToast();
  const [showMore, setShowMore] = useState(9);
  const [selectedArray, setSelectedArray] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  const showSuccess = msg => toast.add(msg, 'success');
  const showToast = msg => toast.add(msg, 'error');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });
  // const [value, setValue] = useState();
  const [isPossible, setIsPossibleValue] = useState(true);
  const [resp, setResponse] = useState('');
  const [showUploadModallogo, setShowUploadModallogo] = useState(false);
  const [showUploadModalvideo, setShowUploadModalvideo] = useState(false);
  const [imgsrc, setImgSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [html, setHtml] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyHeadquarters, setCompanyHeadquarters] = useState('');
  const [companySize, setcompanySize] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');
  const [cmpContent, setCmpContent] = useState('');

  function checkDefaultOption() {
    if (checkValue && checkValue.length > 0) {
      selectedArray.forEach(item => {
        const item1 = item;
        if (checkValue.includes(item1.name)) {
          return (item1.ischecked = true);
        }
        return (item1.ischecked = false);
      });
      setSelectedArray(selectedArray);
    }
  }

  const onLinkVideoPreview = url => {
    setVideoLink(url);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const response = AssetService.parserLink({
        url: url.trim(),
        width: 0,
        accessToken,
      });
      response.then(res => {
        const { data } = res;
        if (data.url.includes('twitter.com')) {
          if (data.title.includes('JavaScript')) {
            data.title = 'Description not available.';
          }
        }
        if (data.title || data.description) {
          setPreviewVideo(data.media ? data.media : null);
        } else {
          setPreviewVideo(false);
        }
      });
    } else {
      setPreviewVideo(false);
    }
  };

  const loadData = res => {
    console.log('res', res);
    const size = companySizeOption.find(
      resv => resv.value === res?.company_about?.companySize,
    );
    setCmpContent(res?.content);
    setResponse(res);
    setCompanyName(res?.companyName);
    setIndustry(res?.company_about?.industry);
    setCompanyHeadquarters(res?.company_about?.headquarters);
    setElements(JSON.parse(res?.company_about?.healthAndWellness) || []);
    setVacations(JSON.parse(res?.company_about?.vacationAndTimeOffice) || []);
    setFinancials(JSON.parse(res?.company_about?.financialAndRetirement) || []);
    setProfessionals(
      JSON.parse(res?.company_about?.professionalDevelopment) || [],
    );
    setOfficePerks(JSON.parse(res?.company_about?.officeLifeAndPerks) || []);
    setcompanySize({
      label: size?.label,
      value: size?.value,
    });
    setImgSrc(res?.logoUrl);
    if (res.videoLink !== null) {
      onLinkVideoPreview(res.videoLink);
    }
    setVideoLink(res?.videoLink ? res.videoLink : '');
    setVideoSrc(res?.videoUrl ? res.videoUrl : '');
  };

  useEffect(() => {
    const getResponse = async () => {
      const companyInfo =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('companyProfile'))
          : null;
      const res = await AdminService.getCompanyProfile(companyInfo.id);
      const { data } = res.data;
      loadData(data);
    };
    getResponse();
    checkDefaultOption();
  }, [checkValue, selectedArray]);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const onUploadSuccess = async res => {
    setShowUploadModallogo(false);
    setImgSrc(res);
  };

  const onUploadVideo = async res => {
    setShowUploadModalvideo(false);
    setVideoSrc(res);
  };
  const moveleft = () => {
    if (document.querySelector('.about_company')) {
      document.querySelector('.about_company').classList.add('moved_left');
    }
    if (document.querySelector('.health_and_wellness')) {
      document
        .querySelector('.health_and_wellness')
        .classList.add('moved_left');
    }
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 400);
  };

  const moveRight = () => {
    if (document.querySelector('.about_company')) {
      document.querySelector('.about_company').classList.remove('moved_left');
    }
    if (document.querySelector('.health_and_wellness')) {
      document
        .querySelector('.health_and_wellness')
        .classList.remove('moved_left');
    }
    setTimeout(function() {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  };

  const healthNdWell = [
    { name: 'Dental insurance', ischecked: false },
    { name: 'Disability insurance', ischecked: false },
    { name: 'Fitness subsidies', ischecked: false },
    { name: 'Free healthcare insurance', ischecked: false },
    { name: 'FSA account', ischecked: false },
    { name: 'Health coaching', ischecked: false },
    { name: 'Health insurance', ischecked: false },
    { name: 'Health reimbursement account', ischecked: false },
    { name: 'HSA account', ischecked: false },
    { name: 'Life insurance', ischecked: false },
    { name: 'LSA account', ischecked: false },
    { name: 'On-site gym/gym membership', ischecked: false },
    { name: 'Standing desks', ischecked: false },
    { name: 'Telemedicine programs', ischecked: false },
    { name: 'Vision insurance', ischecked: false },
    { name: 'Wellness program', ischecked: false },
  ];

  const vacation = [
    { name: 'Adoption leave', ischecked: false },
    { name: 'Bearevment', ischecked: false },
    { name: 'Floating holidays', ischecked: false },
    { name: 'Forced time off', ischecked: false },
    { name: 'Foster child leave', ischecked: false },
    { name: 'Leave of absence', ischecked: false },
    { name: 'Maternity leave', ischecked: false },
    { name: 'Paid holidays', ischecked: false },
    { name: 'Paid vacation', ischecked: false },
    { name: 'Paternity leave', ischecked: false },
    { name: 'Personal/sick days', ischecked: false },
    { name: 'Sabbatical', ischecked: false },
    { name: 'Surrogacy leave', ischecked: false },
    { name: 'Unlimited PTO', ischecked: false },
    { name: 'Unlimited vacation', ischecked: false },
    { name: 'Voulnteering time off', ischecked: false },
  ];

  const financial = [
    { name: '401(k)', ischecked: false },
    { name: 'Company equity', ischecked: false },
    { name: 'Employee stock purchase program', ischecked: false },
    { name: 'Financial counseling', ischecked: false },
    { name: 'Pension', ischecked: false },
    { name: 'Performance bonus', ischecked: false },
    { name: 'Relocation assistance', ischecked: false },
  ];

  const professional = [
    { name: 'Access to online courses', ischecked: false },
    { name: 'Employee resource groups', ischecked: false },
    { name: 'High promotion rate', ischecked: false },
    { name: 'Learning and development stipend', ischecked: false },
    { name: 'Lunch and learns', ischecked: false },
    { name: 'Mentor program', ischecked: false },
    { name: 'Paid training programs', ischecked: false },
    { name: 'Rotational program', ischecked: false },
    { name: 'Shadowing opportunities', ischecked: false },
    { name: 'Student loan repayment', ischecked: false },
    { name: 'Tuition reimbursement/assistence', ischecked: false },
  ];

  const officePerk = [
    { name: 'Casual dress', ischecked: false },
    { name: 'Catered lunches', ischecked: false },
    { name: 'Cell phone provided/reimbursement', ischecked: false },
    { name: 'Childcare assistance', ischecked: false },
    { name: 'Commuter benefits program', ischecked: false },
    { name: 'Company-sponsored social events', ischecked: false },
    { name: 'Diversity and inclusion program', ischecked: false },
    { name: 'Employee discounts', ischecked: false },
    { name: 'Flexible work hours', ischecked: false },
    { name: 'Fully stocked kitchens', ischecked: false },
    { name: 'Laptop/equipment provided', ischecked: false },
    { name: 'Pet insurance', ischecked: false },
    { name: 'Pet-friendly office', ischecked: false },
    { name: 'Provided parking', ischecked: false },
    { name: 'Remote work opportunities', ischecked: false },
    { name: 'Wifi reimbursement', ischecked: false },
  ];

  const [pageName, setPageName] = useState('');

  async function handleWellness(e) {
    const page = localStorage.getItem('page');
    const { type, checked, value, name } = e.target;
    const values = type === 'checkbox' ? checked : value;
    if (values) {
      if (page === 'health') {
        console.log('-----health');
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        if (newArr.length > 0) {
          newArr.forEach(item => {
            if (item.ischecked === true) {
              selectHealthAndWellness.push(item.name);
            }
          });
        }
        setElements(selectHealthAndWellness);
        setCheckValue(selectHealthAndWellness);

        console.log('--------->', elements, checkValue);
      }
      if (page === 'vacation') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        if (newArr.length > 0) {
          newArr.forEach(item => {
            if (item.ischecked === true) {
              selectVacation.push(item.name);
            }
          });
        }

        setVacations(selectVacation);
        setCheckValue(selectVacation);
        // selectVacation.push(e.target.name);
      }
      if (page === 'financial') {
        // console.log('financial--');
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        if (newArr.length > 0) {
          newArr.forEach(item => {
            if (item.ischecked === true) {
              selectFinancial.push(item.name);
            }
          });
        }
        setFinancials(selectFinancial);
        setCheckValue(selectFinancial);
        // selectFinancial.push(e.target.name);
      }
      if (page === 'professional') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        if (newArr.length > 0) {
          newArr.forEach(item => {
            if (item.ischecked === true) {
              selectProfessional.push(item.name);
            }
          });
        }
        setProfessionals(selectProfessional);
        setCheckValue(selectProfessional);
      }
      if (page === 'officePerk') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        if (newArr.length > 0) {
          newArr.forEach(item => {
            if (item.ischecked === true) {
              selectOfficePerk.push(item.name);
            }
          });
        }
        setOfficePerks(selectOfficePerk);
        setCheckValue(selectOfficePerk);
        // selectOfficePerk.push(e.target.name);
      }
    } else {
      if (page === 'health') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        const index = elements.indexOf(name);
        elements.splice(index, 1);
        setCheckValue(elements);
        setElements(elements);
      }
      if (page === 'vacation') {
        // const index = selectVacation.indexOf(e.target.name);
        // selectVacation.splice(index, 1);

        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        const index = vacations.indexOf(e.target.name);
        vacations.splice(index, 1);
        setCheckValue(vacations);
        setVacations(vacations);
      }
      if (page === 'financial') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        const index = financials.indexOf(e.target.name);
        financials.splice(index, 1);
        setCheckValue(financials);
        setFinancials(financials);
      }
      if (page === 'professional') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        const index = professionals.indexOf(e.target.name);
        professionals.splice(index, 1);
        setCheckValue(professionals);
        setProfessionals(professionals);
      }
      if (page === 'officePerk') {
        const itemIndex = selectedArray.findIndex(item => item.name === value);
        if (itemIndex !== -1) {
          selectedArray[itemIndex].ischecked = !selectedArray[itemIndex]
            .ischecked;
        }
        const newArr = [...selectedArray];
        setSelectedArray(newArr);
        const index = officePerks.indexOf(e.target.name);
        officePerks.splice(index, 1);
        setCheckValue(officePerks);
        setOfficePerks(officePerks);
      }
    }
  }

  async function save(data) {
    setLoading(true);

    try {
      const profileId = cookie.get(`${process.env.PROJECT_NAME}-profileId`);
      console.log(data, 'data');
      const res = await AboutCompanyService.updatePerksAndBenefit(
        profileId,
        data,
      );
      // localStorage.setItem('userDetail', JSON.stringify(res.data));
      setLoading(false);

      if (res.status === 200) {
        showSuccess('Company information saved successfully');
        // router.push('/company/general-info');
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function getSelectedPerks() {
    const selectHlthAndWLL = localStorage.getItem('selectHealthAndWellness');
    // );
    // console.log('selectHlthAndWLL>>>>>>>>>>', selectHlthAndWLL);
    const slcVacation = localStorage.getItem('selectVacation');
    const slcFinancial = localStorage.getItem('selectFinancial');
    const slcProfessional = localStorage.getItem('selectProfessional');
    const slcOfficePerk = localStorage.getItem('selectOfficePerk');

    const data = {
      healthAndWellness: selectHlthAndWLL,
      vacationAndTimeOffice: slcVacation,
      financialAndRetirement: slcFinancial,
      professionalDevelopment: slcProfessional,
      officeLifeAndPerks: slcOfficePerk,
    };
    save(data);
  }

  function saveHealthAndWellness() {
    const page = localStorage.getItem('page');
    if (page === 'health') {
      const prevArray =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('selectHealthAndWellness'))
          : null;
      let joinArray = [];
      const uniqueVal = [];

      if (prevArray) {
        elements.forEach(item => {
          if (!item.includes(prevArray)) {
            uniqueVal.push(item);
          } else {
            uniqueVal.push(item);
          }
        });
        joinArray = uniqueVal;
      } else {
        joinArray = elements;
      }
      console.log('>>>>>>>', joinArray, elements);
      localStorage.setItem(
        'selectHealthAndWellness',
        JSON.stringify(joinArray),
      );
      getSelectedPerks();
      moveRight();
    }
    if (page === 'vacation') {
      const prevArray =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('selectVacation'))
          : null;
      let joinArray = [];
      const uniqueVal = [];
      if (prevArray) {
        // joinArray = prevArray.concat(vacations);
        vacations.forEach(item => {
          if (!item.includes(prevArray)) {
            uniqueVal.push(item);
          } else {
            uniqueVal.push(item);
          }
        });
        joinArray = uniqueVal;
      } else {
        joinArray = vacations;
      }
      localStorage.setItem('selectVacation', JSON.stringify(joinArray));
      getSelectedPerks();
      moveRight();
    }
    if (page === 'financial') {
      // console.log('-------financial');
      const prevArray =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('selectFinancial'))
          : null;
      let joinArray = [];
      const uniqueVal = [];
      // console.log('prevArray', prevArray);
      if (prevArray) {
        // joinArray = prevArray.concat(financials);
        financials.forEach(item => {
          if (!item.includes(prevArray)) {
            uniqueVal.push(item);
          } else {
            uniqueVal.push(item);
          }
        });
        joinArray = uniqueVal;
      } else {
        joinArray = financials;
      }
      localStorage.setItem('selectFinancial', JSON.stringify(joinArray));
      getSelectedPerks();
      moveRight();
    }
    if (page === 'professional') {
      const prevArray =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('selectProfessional'))
          : null;
      let joinArray = [];
      const uniqueVal = [];
      if (prevArray) {
        // joinArray = prevArray.concat(professionals);
        professionals.forEach(item => {
          if (!item.includes(prevArray)) {
            uniqueVal.push(item);
          } else {
            uniqueVal.push(item);
          }
        });
        joinArray = uniqueVal;
      } else {
        joinArray = professionals;
      }
      localStorage.setItem('selectProfessional', JSON.stringify(joinArray));
      getSelectedPerks();
      moveRight();
    }
    if (page === 'officePerk') {
      const prevArray =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('selectOfficePerk'))
          : null;
      let joinArray = [];
      const uniqueVal = [];
      if (prevArray) {
        // joinArray = prevArray.concat(officePerks);
        officePerks.forEach(item => {
          if (!item.includes(prevArray)) {
            uniqueVal.push(item);
          } else {
            uniqueVal.push(item);
          }
        });
        joinArray = uniqueVal;
      } else {
        joinArray = officePerks;
      }
      localStorage.setItem('selectOfficePerk', JSON.stringify(joinArray));
      getSelectedPerks();
      moveRight();
    }
    setElements(
      JSON.parse(localStorage.getItem('selectHealthAndWellness') || []),
    );
    setVacations(JSON.parse(localStorage.getItem('selectVacation')) || []);
    setFinancials(JSON.parse(localStorage.getItem('selectFinancial')) || []);
    setProfessionals(
      JSON.parse(localStorage.getItem('selectProfessional')) || [],
    );
    setOfficePerks(JSON.parse(localStorage.getItem('selectOfficePerk')) || []);
    //setStep(1);
  }

  function deleteHealthWellness(i, value) {
    if (value === 'health') {
      elements.splice(i, 1);
      localStorage.setItem('selectHealthAndWellness', JSON.stringify(elements));
      const items = JSON.parse(localStorage.getItem('selectHealthAndWellness'));
      setCheckValue(items);
      setElements(items);
      getSelectedPerks();
    }
    if (value === 'vacation') {
      vacations.splice(i, 1);
      localStorage.setItem('selectVacation', JSON.stringify(vacations));
      const items = JSON.parse(localStorage.getItem('selectVacation'));
      setCheckValue(items);
      setVacations(items);
      getSelectedPerks();
    }
    if (value === 'financial') {
      financials.splice(i, 1);
      localStorage.setItem('selectFinancial', JSON.stringify(financials));
      const items = JSON.parse(localStorage.getItem('selectFinancial'));
      setCheckValue(items);
      setFinancials(items);
      getSelectedPerks();
    }
    if (value === 'professional') {
      professionals.splice(i, 1);
      localStorage.setItem('selectProfessional', JSON.stringify(professionals));
      const items = JSON.parse(localStorage.getItem('selectProfessional'));
      setCheckValue(items);
      setProfessionals(items);
      getSelectedPerks();
    }
    if (value === 'officeperk') {
      officePerks.splice(i, 1);
      localStorage.setItem('selectOfficePerk', JSON.stringify(officePerks));
      const items = JSON.parse(localStorage.gtItem('selectOfficePerk'));
      setCheckValue(items);
      setOfficePerks(items);
      getSelectedPerks();
    }
  }

  async function getSelectionPage(value) {
    localStorage.setItem('page', value);
    if (value === 'health') {
      setPageName('Health And Wellness');
      setSelectedArray(healthNdWell);
      // const arrayVal = await JSON.parse(
      //   localStorage.getItem('selectHealthAndWellness'),
      // );
      setCheckValue(elements);
      moveleft();
    }
    if (value === 'vacation') {
      setPageName('Vacation And Time Off');
      // setSelectedArray(vacation);
      // const arrayVal = JSON.parse(localStorage.getItem('selectVacation'));

      setSelectedArray(vacation);
      // const arrayVal = JSON.parse(localStorage.getItem('selectVacation'));
      // setTimeout(() => {
      setCheckValue(vacation);
      moveleft();
    }
    if (value === 'financial') {
      setPageName('Financial and Retirement');
      setSelectedArray(financial);
      // const arrayVal = JSON.parse(localStorage.getItem('selectFinancial'));
      setCheckValue(financial);
      moveleft();
    }
    if (value === 'professional') {
      setPageName('Professional Development');
      setSelectedArray(professional);
      // const arrayVal = JSON.parse(localStorage.getItem('selectProfessional'));
      setCheckValue(professional);
      moveleft();
    }
    if (value === 'officePerk') {
      setPageName('Office Life and Perks');
      setSelectedArray(officePerk);
      moveleft();
      setSelectedArray(officePerk);
      // const arrayVal = JSON.parse(localStorage.getItem('selectOfficePerk'));
      setCheckValue(officePerk);
      moveleft();
    }

    //setStep(2);
  }

  function filterList(e) {
    //console.log('e', e);
    if (pageName === 'Health And Wellness') {
      setSelectedArray(e.target.value);

      let updateList = healthNdWell;
      updateList = updateList.filter(item => {
        return (
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      setSelectedArray(updateList);
    }
    if (pageName === 'Vacation And Time Off') {
      //setSelectedArray(vacation);

      let updateList = vacation;
      updateList = updateList.filter(item => {
        return (
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      setSelectedArray(updateList);
    }
    if (pageName === 'Professional Development') {
      //setSelectedArray(professional);

      let updateList = professional;
      updateList = updateList.filter(item => {
        return (
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      setSelectedArray(updateList);
    }
    if (pageName === 'Financial and Retirement') {
      //setSelectedArray(financial);

      let updateList = financial;
      updateList = updateList.filter(item => {
        return (
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      setSelectedArray(updateList);
    }
    if (pageName === 'Office Life and Perks') {
      //setSelectedArray(officePerk);

      let updateList = officePerk;
      updateList = updateList.filter(item => {
        return (
          item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      setSelectedArray(updateList);
    }
  }

  const openSubmenu = () => {
    document
      .querySelector('.profile-leftside-menu .has-submenu')
      .classList.toggle('opened');
  };

  const onChangeLinkURL = e => {
    setVideoLink(e.target.value);
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (e.target.value.match(regex)) {
      const response = AssetService.parserLink({
        url: e.target.value.trim(),
        // width: width > 0 ? width : screenPart,
        width: 0,
        accessToken,
      });
      response.then(res => {
        const { data } = res;
        if (data.url.includes('twitter.com')) {
          if (data.title.includes('JavaScript')) {
            data.title = 'Description not available.';
          }
        }
        if (data.title || data.description) {
          setPreviewVideo(data.media ? data.media : null);
        } else {
          setPreviewVideo(false);
        }
      });
    } else {
      setPreviewVideo(false);
    }
  };

  async function onSaveCompanyLogo() {
    localStorage.removeItem('profileuserInformation');
    if (companyName) {
      setLoading(true);
      const companyProfile =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('companyProfile'))
          : null;
      const data = {
        companySize: companySize.value,
        biggestChallenge: resp.company_about.biggestChallenge,
        hearAboutUs: resp.company_about.hearAboutUs,
        industry,
        brandcolors: resp.company_about.brandcolors,
        socialfeedlinkone: resp.company_about.socialfeedlinkone
          ? resp.company_about.socialfeedlinkone
          : '',
        socialfeedlinksecond: resp.company_about.socialfeedlinksecond
          ? resp.company_about.socialfeedlinksecond
          : '',
        textcolor: resp.company_about.textcolor,
        headquarters: companyHeadquarters,
        healthAndWellness: resp.company_about.healthAndWellness,
        vacationAndTimeOffice: resp.company_about.vacationAndTimeOffice,
        financialAndRetirement: resp.company_about.financialAndRetirement,
        professionalDevelopment: resp.company_about.professionalDevelopment,
        officeLifeAndPerks: resp.company_about.officeLifeAndPerks,
        companyLogoUrl: {
          logoUrl: imgsrc,
        },
      };

      await AdminService.setCompanyLogo(companyProfile.id, data);
      companyProfile.logoUrl = imgsrc;
      // if (companyProfile.company_about !== null) {
      //   companyProfile.company_about.headquarters = companyHeadquarters;
      // }
      localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
      showSuccess('Company general info updated successfully');
      setLoading(false);
    }
  }

  async function onUploadVideoSave() {
    localStorage.removeItem('profileuserInformation');
    setLoading(true);
    const companyProfile =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('companyProfile'))
        : null;
    const data = {
      content: cmpContent,
      videoUrl: videoSrc,
      videoLink,
    };
    console.log(companyProfile, 'Old');
    companyProfile.videoUrl = videoSrc || '';
    companyProfile.videoLink = videoLink || '';
    localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
    console.log(companyProfile, 'New');
    await AdminService.companyMediaInfo(companyProfile.id, data);
    showSuccess('Video updated successfully');
    setLoading(false);
  }

  async function signIn(data) {
    localStorage.removeItem('called');
    setLoading(true);

    try {
      const res = await SignService.getApplicant(data);
      const { accessToken, profileId, userId } = res.data.data;

      profileDispatch({
        type: 'CLEAR_PROFILE',
      });
      const info = jwtDecode(accessToken);

      if (info.isVerified) {
        login(accessToken, profileId, () => {
          Storage.rm('university');
          router.push('/profile');
        });
        setLoading(false);
      } else {
        loginVerification(profileId, userId, () => {
          setShowAction({
            show: true,
            text: homeT('account_verification_action.text', {
              type: 'Login',
            }),
          });
        });
        setLoading(false);
      }
    } catch (e) {
      showToast(errorHandle(e));
      setLoading(false);
    }
  }

  async function handleChange(e) {
    const call = localStorage.getItem('called');
    if (e.target.value && e.target.value.trim() === '') {
      e.target.value = '';
    }
    if (call) {
      const data = formRef.current.getData();
      try {
        // Remove all previous errors

        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email()
            .required(),
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
          phone: Yup.string(),
          password: Yup.string()
            .min(8)
            .required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
        // data.phone = value;
        //await signUp(data);
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
    //formRef.current.setErrors({});
    //formRef.current.getErrors();
  }

  function showVerificationModal() {
    setShowAction({ show: false, text: '' });
    dispatch({ type: 'SET_MODAL_OPENED', component: VerificationModal });
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      await signIn(data);
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

  function createNoembedMarkup() {
    return { __html: previewVideo };
  }

  function verifyRedirect() {
    const { redirect } = router.query;
    if (redirect) Storage.add('redirect', redirect);
  }

  useEffect(() => {
    verifyRedirect();
  }, []);

  const leftCellDisplay =
    screenWidth >= parseInt(sizes.laptop, 10) ? 'block' : 'none';
  const rightCellWidth = screenWidth >= parseInt(sizes.laptop, 10) ? 8 : 1;
  const gridSize = screenWidth >= parseInt(sizes.laptop, 10) ? 12 : 1;
  const gapSize = screenWidth >= parseInt(sizes.laptop, 10) ? '24px' : '40px';

  const rightContent = () => (
    <>
      <HeaderB2B />
      <BoxFormSection>
        {/* <Container> */}
        <BoxFormWrap>
          <Form handleSubmit={handleSubmit} ref={formRef}>
            <LeftSideMenu>
              <div className="profile-section-wrap">
                <LeftbarB2B />
                <ReftSideMenu>
                  <div className="profile-right-panel about_company">
                    <div className="company-page-main ">
                      <div className="card">
                        <h3 className="company-common-title">
                          Company logo{' '}
                          <small>
                            (200 X 200 is recommended size for image upload)
                          </small>
                        </h3>
                        {!imgsrc && (
                          <div className="drag-drop">
                            <button
                              type="button"
                              className="upload-popup-btn"
                              onClick={setShowUploadModallogo}
                            >
                              Upload file here
                            </button>
                            <div className="drag-drop-group">
                              <img
                                src={cdn('/static/img/plus-black.svg')}
                                alt="create_video"
                              />
                              Drag And Drop logo
                            </div>

                            {showUploadModallogo && (
                              <FileUploadModal
                                closeModal={e => setShowUploadModallogo(e)}
                                onSuccess={onUploadSuccess}
                              />
                            )}
                            {/* <button
                              type="button"
                              onClick={e => setImgSrc('')}
                              className="delete"
                            >
                              <img
                                src={cdn('/static/img/delet-white.png')}
                                alt="create_video"
                              />
                            </button> */}
                          </div>
                        )}
                        {imgsrc && (
                          <div className="company-preview-wrap">
                            <button
                              type="button"
                              onClick={e => setImgSrc('')}
                              // href="/AdminCompanyPage-new"
                              className="delete"
                            >
                              <img
                                src={cdn('/static/img/delet-white.png')}
                                alt="create_video"
                              />
                            </button>
                            <img src={imgsrc} alt="Company Logo" />
                          </div>
                        )}
                        <FormWrapperBlock className="form-group req_star">
                          <FormBlock label={t('form.label.CompanyName')}>
                            <input
                              disabled="true"
                              className="form-control"
                              name="Company name"
                              size="medium"
                              maxLength="30"
                              value={companyName}
                              placeholder={t('form.placeholder.CompanyName')}
                              onChange={e => setCompanyName(e.target.value)}
                            />
                          </FormBlock>
                        </FormWrapperBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock label={t('form.label.Industry')}>
                            <input
                              className="form-control"
                              name="Industry"
                              size="medium"
                              maxLength="30"
                              placeholder={t('form.placeholder.Industry')}
                              value={industry}
                              onChange={e => setIndustry(e.target.value)}
                            />
                          </FormBlock>
                        </FormWrapperBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock
                            label={t('form.label.CompanyHeadquarters')}
                          >
                            <input
                              className="form-control"
                              name="Company Headquarters"
                              size="medium"
                              maxLength="30"
                              placeholder={t(
                                'form.placeholder.CompanyHeadquarters',
                              )}
                              value={companyHeadquarters}
                              onChange={e =>
                                setCompanyHeadquarters(e.target.value)
                              }
                            />
                          </FormBlock>
                        </FormWrapperBlock>

                        <Row className="select-combo-wrap">
                          <FormBlock
                            label={t('form.label.CompanySize')}
                            className="select-combo-inner"
                          >
                            <ReactSelect
                              className="countryAbout"
                              options={companySizeOption}
                              value={companySize}
                              name="companySize"
                              onOptionSelected={val => {
                                setcompanySize(val);
                              }}
                              // onChange={e => setcompanySize(e.target.value)}
                            />
                          </FormBlock>
                        </Row>

                        {/* <div className="form-group select-value">
                          <FormBlock
                            className="label"
                            label={t('form.label.CompanySize')}
                          />
                          <select
                            className="form-control-new"
                            value={companySize}
                            onChange={e => setcompanySize(e.target.value)}
                          >
                            <option>Select an option</option>
                            <option value="1-49">1-49</option>
                            <option value="50-149">50-149</option>
                            <option value="150-249">150-249</option>
                            <option value="250-499">250-499</option>
                            <option value="500-749">500-749</option>
                            <option value="749-999">749-999</option>
                            <option value="1000+">1000+</option>
                          </select>
                        </div>
                         */}

                        <button
                          type="submit"
                          className="update"
                          onClick={onSaveCompanyLogo}
                          // style={{ marginTop: '5px' }}
                        >
                          {!loading && 'Update'}
                          {loading && <Spinner />}
                        </button>
                      </div>

                      <div className="card">
                        <h3 className="company-common-title">Upload Video</h3>
                        <p className="comapny-video-desc">
                          Why should this candidate work here? <br />{' '}
                          <span>80% of HR leaders</span> say sharing employer
                          branding has a significant impact on their ability to
                          attract strong talent!
                        </p>
                        {!videoLink && !videoSrc && (
                          <div className="drag-drop upload-video">
                            <button
                              className="upload-popup-btn"
                              type="submit"
                              onClick={setShowUploadModalvideo}
                            >
                              Upload file here
                            </button>
                            <img
                              src={cdn('/static/img/upload-cloud.png')}
                              alt="create_video"
                            />
                            <div className="box-note">
                              Video should be in .mp4 format only and max size
                              15 MB
                            </div>
                            {showUploadModalvideo && (
                              <FileUploadModal
                                closeModal={e => setShowUploadModalvideo(e)}
                                onSuccess={onUploadVideo}
                                isVideo={setShowUploadModalvideo}
                              />
                            )}
                          </div>
                        )}
                        {videoSrc && (
                          <div className="company-video-preview">
                            {/* <p>{videoSrc}</p> */}
                            <button
                              style={{ outline: 'none' }}
                              type="button"
                              // href="/AdminCompanyPage-new"
                              className="delete"
                              onClick={e => setVideoSrc('')}
                            >
                              <img
                                src={cdn('/static/img/delet-white.png')}
                                alt="create_video"
                              />
                            </button>
                            <video controls>
                              <source src={videoSrc} type="video/mp4" />
                              <track
                                src="captions_en.vtt"
                                kind="captions"
                                srcLang="en"
                                label="english_captions"
                              />
                            </video>
                          </div>
                        )}

                        {previewVideo && (
                          <Wrapper
                            style={{ marginBottom: '32px' }}
                            dangerouslySetInnerHTML={createNoembedMarkup()}
                          />
                        )}

                        {!videoLink && !videoSrc && (
                          <span className="or">or</span>
                        )}

                        {!videoSrc && (
                          <>
                            <div className="form-group link-group">
                              <FormBlock label={t('form.label.AdminLink')} />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Copy-paste link here!"
                                value={videoLink}
                                onChange={onChangeLinkURL}
                              />
                            </div>
                          </>
                        )}
                        <button
                          type="submit"
                          onClick={onUploadVideoSave}
                          // style={{ marginTop: '5px' }}
                          className="update"
                        >
                          Update
                        </button>
                        {/* <a href="/AdminCompanyPage-new" className="update">
                          Update
                        </a> */}
                      </div>

                      <div className="card">
                        <h3 className="company-common-title">
                          Company Perks &amp; Benefits
                        </h3>
                        <p className="company-benefit-desc">
                          Organizations that list at least four noncash benefits
                          increase their applicant pool by{' '}
                          <span>over 20%!</span>
                        </p>
                        <Accordion defaultActiveKey="0" flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              <svg
                                width="30"
                                height="27"
                                viewBox="0 0 30 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="a"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.306 9.94398C18.8619 9.49964 18.2594 9.25 17.6311 9.25C17.0029 9.25 16.4004 9.49964 15.9563 9.94398L15.4999 10.4004L15.0435 9.94398C14.1185 9.01898 12.6188 9.01898 11.6938 9.94398C10.7687 10.869 10.7687 12.3687 11.6938 13.2937L12.1501 13.7501L15.4999 17.0999L18.8496 13.7501L19.306 13.2937C19.7504 12.8496 20 12.2471 20 11.6189C20 10.9906 19.7504 10.3881 19.306 9.94398Z"
                                  stroke="#1D242F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="b"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.6709 0.683772C11.5348 0.27543 11.1527 0 10.7222 0C10.2918 0 9.90965 0.27543 9.77354 0.683772L5.8348 12.5H1C0.447715 12.5 0 12.9477 0 13.5C0 14.0523 0.447715 14.5 1 14.5H6.55556C6.98599 14.5 7.36812 14.2246 7.50424 13.8162L10.7222 4.16228L11.7978 7.38889H13.9059L11.6709 0.683772ZM17.7948 19.0556H15.6866L18.1069 26.3162C18.243 26.7246 18.6251 27 19.0556 27C19.486 27 19.8681 26.7246 20.0042 26.3162L23.943 14.5H28.7778C29.3301 14.5 29.7778 14.0523 29.7778 13.5C29.7778 12.9477 29.3301 12.5 28.7778 12.5H23.2222C22.7918 12.5 22.4097 12.7754 22.2735 13.1838L19.0556 22.8377L17.7948 19.0556Z"
                                  fill="#1D242F"
                                />
                              </svg>
                              Health and Wellness
                              <span className="toggle-icon">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {elements && elements.length <= 0 && (
                                <ToggleAccordion
                                  type="button"
                                  className="add-benefits-btn"
                                  onClick={() => getSelectionPage('health')}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add Health and Wellness Benefits
                                </ToggleAccordion>
                              )}

                              {elements && elements.length > 0 && (
                                <>
                                  <AddBenefitsOBtn
                                    onClick={e => getSelectionPage('health')}
                                  >
                                    <svg
                                      width="27"
                                      height="27"
                                      viewBox="0 0 27 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.5 9V18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9 13.5H18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Add more health and wellness benefit
                                  </AddBenefitsOBtn>

                                  <AddedList>
                                    <ul>
                                      {elements.map((item, i) => {
                                        return (
                                          <li>
                                            <h4>{item}</h4>
                                            <DeleteItem
                                              onClick={() =>
                                                deleteHealthWellness(
                                                  i,
                                                  'health',
                                                )
                                              }
                                            >
                                              <img
                                                src={cdn(
                                                  '/static/img/images/trash-icon.svg',
                                                )}
                                                alt="trash-icon.svg"
                                              />
                                              {/* <img src={trash} alt="trash-icon.svg" /> */}
                                            </DeleteItem>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </AddedList>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.75 7.5C3.75 6.11929 4.86929 5 6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5Z"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M20 2.5V7.5"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 2.5V7.5"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.75 12.5H26.25"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22.5 19L17.5 24"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17.5 19L22.5 24"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Vacation and Time Office
                              <span className="toggle-icon">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#1D242F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {vacations && vacations.length <= 0 && (
                                <ToggleAccordion
                                  type="button"
                                  className="add-benefits-btn"
                                  onClick={() => getSelectionPage('vacation')}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add Vacation and Time Office Benefits
                                </ToggleAccordion>
                              )}
                              {vacations && vacations.length > 0 && (
                                <>
                                  <AddBenefitsOBtn
                                    onClick={e => getSelectionPage('vacation')}
                                  >
                                    <svg
                                      width="27"
                                      height="27"
                                      viewBox="0 0 27 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.5 9V18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9 13.5H18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Add More Vacation And Time Office Benefit
                                  </AddBenefitsOBtn>

                                  <AddedList>
                                    <ul>
                                      {vacations.map((item, i) => {
                                        return (
                                          <li>
                                            <h4>{item}</h4>
                                            <DeleteItem
                                              onClick={() =>
                                                deleteHealthWellness(
                                                  i,
                                                  'vacation',
                                                )
                                              }
                                            >
                                              <img
                                                src={cdn(
                                                  '/static/img/images/trash-icon.svg',
                                                )}
                                                alt="trash-icon.svg"
                                              />
                                              {/* <img src={trash} alt="trash-icon.svg" /> */}
                                            </DeleteItem>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </AddedList>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              <svg
                                width={30}
                                height={30}
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <g clipPath="url(#clip0)">
                                  <path
                                    d="M15 7.6665V22.3332"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.3333 10.3335H13.3333C12.7145 10.3335 12.121 10.5793 11.6834 11.0169C11.2458 11.4545 11 12.048 11 12.6668C11 13.2857 11.2458 13.8792 11.6834 14.3167C12.121 14.7543 12.7145 15.0002 13.3333 15.0002H16.6667C17.2855 15.0002 17.879 15.246 18.3166 15.6836C18.7542 16.1212 19 16.7147 19 17.3335C19 17.9523 18.7542 18.5458 18.3166 18.9834C17.879 19.421 17.2855 19.6668 16.6667 19.6668H11"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect
                                      width={16}
                                      height={16}
                                      fill="white"
                                      transform="translate(7 7)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              Financial &amp; Retirement
                              <span className="toggle-icon">
                                <svg
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {financials && financials.length <= 0 && (
                                <ToggleAccordion
                                  type="button"
                                  className="add-benefits-btn"
                                  onClick={() => getSelectionPage('financial')}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add Financial &amp; Retirement Benefits
                                </ToggleAccordion>
                              )}
                              {financials && financials.length > 0 && (
                                <>
                                  <AddBenefitsOBtn
                                    onClick={e => getSelectionPage('financial')}
                                  >
                                    <svg
                                      width="27"
                                      height="27"
                                      viewBox="0 0 27 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.5 9V18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9 13.5H18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Add more health and wellness benefit
                                  </AddBenefitsOBtn>

                                  <AddedList>
                                    <ul>
                                      {financials.map((item, i) => {
                                        return (
                                          <li>
                                            <h4>{item}</h4>
                                            <DeleteItem
                                              onClick={() =>
                                                deleteHealthWellness(
                                                  i,
                                                  'financial',
                                                )
                                              }
                                            >
                                              <img
                                                src={cdn(
                                                  '/static/img/images/trash-icon.svg',
                                                )}
                                                alt="trash-icon.svg"
                                              />
                                              {/* <img src={trash} alt="trash-icon.svg" /> */}
                                            </DeleteItem>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </AddedList>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              <svg
                                width={31}
                                height={29}
                                viewBox="0 0 31 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.5 27C22.4036 27 28 21.4036 28 14.5C28 7.59644 22.4036 2 15.5 2C8.59644 2 3 7.59644 3 14.5C3 21.4036 8.59644 27 15.5 27Z"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.5 22L15.5 12"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.5 16L12.5 14.5"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.5 14.5L18.5 13"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.7803 17.8267C16.2392 18.133 16.7566 18.341 17.2998 18.4377C17.843 18.5345 18.4003 18.5177 18.9368 18.3886C19.4732 18.2595 19.9771 18.0208 20.4169 17.6875C20.8566 17.3542 21.2226 16.9336 21.4919 16.452C21.7612 15.9704 21.9279 15.4383 21.9816 14.8892C22.0353 14.34 21.9748 13.7857 21.8039 13.2611C21.633 12.7365 21.3554 12.2529 20.9885 11.8407C20.6217 11.4286 20.1736 11.0968 19.6723 10.8662C19.5588 10.8139 19.4691 10.721 19.4208 10.6058C19.0966 9.83367 18.5516 9.17446 17.8542 8.71088C17.1568 8.2473 16.338 8 15.5006 8C14.6631 8 13.8443 8.2473 13.1469 8.71088C12.4495 9.17446 11.9045 9.83367 11.5803 10.6058C11.532 10.721 11.4423 10.8139 11.3288 10.8662C10.8275 11.0967 10.3793 11.4285 10.0123 11.8407C9.64541 12.2528 9.36774 12.7364 9.19679 13.2611C9.02583 13.7858 8.96529 14.3401 9.01897 14.8893C9.07265 15.4385 9.23938 15.9707 9.50869 16.4523C9.778 16.9339 10.1441 17.3546 10.5838 17.6879C11.0236 18.0212 11.5276 18.2599 12.0641 18.389C12.6006 18.5181 13.158 18.5348 13.7013 18.438C14.2445 18.3412 14.7619 18.1331 15.2208 17.8267C15.3035 17.7711 15.4009 17.7415 15.5006 17.7415C15.6002 17.7415 15.6976 17.7711 15.7803 17.8267Z"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Professional Development
                              <span className="toggle-icon">
                                <svg
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {professionals && professionals.length <= 0 && (
                                <ToggleAccordion
                                  type="button"
                                  className="add-benefits-btn"
                                  onClick={() =>
                                    getSelectionPage('professional')
                                  }
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add Professional Development Benefits
                                </ToggleAccordion>
                              )}
                              {professionals && professionals.length > 0 && (
                                <>
                                  <AddBenefitsOBtn
                                    onClick={e =>
                                      getSelectionPage('professional')
                                    }
                                  >
                                    <svg
                                      width="27"
                                      height="27"
                                      viewBox="0 0 27 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.5 9V18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9 13.5H18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Add more health and wellness benefit
                                  </AddBenefitsOBtn>

                                  <AddedList>
                                    <ul>
                                      {professionals.map((item, i) => {
                                        return (
                                          <li>
                                            <h4>{item}</h4>
                                            <DeleteItem
                                              onClick={() =>
                                                deleteHealthWellness(
                                                  i,
                                                  'professional',
                                                )
                                              }
                                            >
                                              <img
                                                src={cdn(
                                                  '/static/img/images/trash-icon.svg',
                                                )}
                                                alt="trash-icon.svg"
                                              />
                                              {/* <img src={trash} alt="trash-icon.svg" /> */}
                                            </DeleteItem>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </AddedList>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>
                              <svg
                                width={30}
                                height={30}
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 12H22C23.0609 12 24.0783 12.4214 24.8284 13.1716C25.5786 13.9217 26 14.9391 26 16C26 17.0609 25.5786 18.0783 24.8284 18.8284C24.0783 19.5786 23.0609 20 22 20H21"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5 12H21V21C21 22.0609 20.5786 23.0783 19.8284 23.8284C19.0783 24.5786 18.0609 25 17 25H9C7.93913 25 6.92172 24.5786 6.17157 23.8284C5.42143 23.0783 5 22.0609 5 21V12Z"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 5V8"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 5V8"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17 5V8"
                                  stroke="#1D242F"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Office Life and Perks
                              <span className="toggle-icon">
                                <svg
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 8V16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 12H16"
                                    stroke="#1D242F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              {officePerks && officePerks.length <= 0 && (
                                <ToggleAccordion
                                  type="button"
                                  className="add-benefits-btn"
                                  onClick={() => getSelectionPage('officePerk')}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                                      stroke="#1D242F"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Add Office Life and Perks Benefits
                                </ToggleAccordion>
                              )}
                              {officePerks && officePerks.length > 0 && (
                                <>
                                  <AddBenefitsOBtn
                                    onClick={e =>
                                      getSelectionPage('officePerk')
                                    }
                                  >
                                    <svg
                                      width="27"
                                      height="27"
                                      viewBox="0 0 27 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.5 9V18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9 13.5H18"
                                        stroke="#485768"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Add more health and wellness benefit
                                  </AddBenefitsOBtn>

                                  <AddedList>
                                    <ul>
                                      {officePerks.map((item, i) => {
                                        return (
                                          <li>
                                            <h4>{item}</h4>
                                            <DeleteItem
                                              onClick={() =>
                                                deleteHealthWellness(
                                                  i,
                                                  'officeperk',
                                                )
                                              }
                                            >
                                              <img
                                                src={cdn(
                                                  '/static/img/images/trash-icon.svg',
                                                )}
                                                alt="trash-icon.svg"
                                              />
                                              {/* <img src={trash} alt="trash-icon.svg" /> */}
                                            </DeleteItem>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </AddedList>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                  <BoxFormWrap className="health_and_wellness">
                    <div className="box-form-body">
                      <div className="inside-select-list">
                        <div className="list_header">
                          <button
                            type="button"
                            className="head-back-btn gotoprevious"
                            onClick={moveRight}
                          >
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 18L9 12L15 6"
                                stroke="#1D242F"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <h3>{pageName}</h3>
                          <button
                            type="button"
                            className="list-save-btn gotoprevious"
                            // onClick={moveRight}
                            onClick={saveHealthAndWellness}
                          >
                            Save
                          </button>
                        </div>
                        <div className="benefit-search">
                          <div className="search-field">
                            <img
                              src={cdn('/static/img/search-icon.svg')}
                              alt="Link (URL)"
                              className="searchicon"
                            />
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Start typing to filter benefits..."
                              onChange={e => filterList(e)}
                            />
                          </div>
                        </div>
                        <div className="list_body">
                          {selectedArray.slice(0, showMore).map(item => {
                            return (
                              <>
                                <ListCheckboxOne>
                                  <ListCheckboxOneInput
                                    type="checkbox"
                                    name={item.name}
                                    className="checkbox"
                                    onChange={handleWellness}
                                    value={item.name}
                                    checked={item.ischecked}
                                    key={item.name}
                                  />
                                  <ListCheckboxOneLabel htmlFor="gym">
                                    {item.name}
                                  </ListCheckboxOneLabel>
                                </ListCheckboxOne>
                              </>
                            );
                          })}
                          <div className="text-center mt-3">
                            {selectedArray.length !== showMore &&
                              selectedArray.length >= 9 && (
                                <button
                                  type="button"
                                  className="regular_blue_text btb-text"
                                  onClick={() =>
                                    setShowMore(selectedArray.length)
                                  }
                                >
                                  View more
                                </button>
                              )}
                            {selectedArray.length === showMore && (
                              <button
                                type="button"
                                className="regular_blue_text btb-text"
                                onClick={() => setShowMore(9)}
                              >
                                View less
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </BoxFormWrap>
                </ReftSideMenu>
              </div>
            </LeftSideMenu>
          </Form>
        </BoxFormWrap>
        {/* </Container> */}
      </BoxFormSection>
    </>
  );

  const content = rightContent();

  return (
    <Page
      title="Company Page"
      description="Company Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(CompanyPage, true);
