import React, { useRef, useState, useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { Link } from 'react-scroll';
import AssetService from '@api/services/asset';
import AboutCompanyService from '@api/services/about-company';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useTranslation } from 'react-i18next';
import { Grid, Cell } from 'styled-css-grid';
import jwtDecode from 'jwt-decode';
import VerificationModal from '@components/templates/Modals/VerificateAccount';
import { cdn } from '@utils/general';
import cookie from 'js-cookie';
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
import FileUploadModal from '@components/molecules/FileUploadModal';
import Page from '@components/templates/Page';
import Brand from '@components/atoms/Brand';
import FormBlock from '@components/organisms/FormBlock';
import TextInput from '@components/molecules/TextInput';
import { useToast, Action } from '@components/molecules/Notification';
import Storage from '@utils/storage';
import Btn from '@components/molecules/Btn';
import { SketchPicker } from 'react-color';
import { Dropdown } from 'react-bootstrap';
// import notificationBell from '@src/assets/images/notification.png';
import HeaderB2B from '@components/organisms/headerB2B';

import {
  FormWrapperBlock,
  BoxFormSection,
  BoxFormWrap,
  LeftSideMenu,
  ReftSideMenu,
  ColorPopover,
  PopoverAction,
  ProfileSectionWrap,
  BrandColorPicker,
  SetColorOne,
  DragDrop,
  FlexRowHalf,
  WidthFullBlock,
  TextCount,
  Wrapper,
} from './style';

const AdvanceSetting = ({ jwt }) => {
  const companyProfile =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('companyProfile'))
      : null;
  const [cmpUser, setCmpUser] = useState('');
  const [companyInfo] = useState(companyProfile);
  const [qualificharacterCount, setQualifiCharaterCount] = useState(0);
  const [blogcharacterCount, setBlogCharaterCount] = useState(0);
  const [characterCount, setCharaterCount] = useState(0);
  const colorCode = '#009de9';
  const colorCode2 = '#1D242F';
  const { t: errorMessage } = useTranslation('errorMessages');
  const { t } = useTranslation('signup');
  const { t: homeT } = useTranslation('home');
  const { t: buttonsT } = useTranslation('buttons');
  const { dispatch: profileDispatch } = useContext(ProfileContext);

  const { state: appState, dispatch } = useContext(AppContext);
  const formRef = useRef(null);
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');
  const showSuccess = msg => toast.add(msg, 'success');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [showAction, setShowAction] = useState({ show: false, text: '' });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);
  const [background, setBackground] = useState(colorCode);
  const [background2, setBackground2] = useState(colorCode2);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showisVideo, setShowIsVideo] = useState(false);
  const [imgsrc, setImgSrc] = useState('');
  const [videosrc, setVideoSrc] = useState('');
  const [imgOrVideoSrcCulture, setImgOrVideoSrcCulture] = useState('');
  const [imgOrVideoSrcBlog, setImgOrVideoSrcBlog] = useState('');
  const [showUploadModalImgVideo, setshowUploadModalImgVideo] = useState(false);
  const [type, setType] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [fullName, setFullname] = useState('');
  const [position, setPosition] = useState('');
  const [empTestimonial, setEmpTestimonial] = useState('');
  const [caltureTitle, setCaltureTitle] = useState('');
  const [companyCalture, setCompanyCalture] = useState('');
  const [blogLink, setBlogLink] = useState('');
  const [blogtitle, setBlogtitle] = useState('');
  const [blogcompanyArtical, setBlogcompanyArtical] = useState('');
  const [socialLink1, setSocialLink1] = useState('');
  const [socialLink2, setSocialLink2] = useState('');
  const [socialLink1Error, setSocialLink1Error] = useState(false);
  const [socialLink2Error, setSocialLink2Error] = useState(false);
  const [showUploadModalImgVideo2, setshowUploadModalImgVideo2] = useState(
    false,
  );
  const [value, setValue] = useState();
  const [previewVideo, setPreviewVideo] = useState('');
  const [count, setCount] = useState(0);
  const [openEmpProfileModalOne, setOpenEmpProfileModalOne] = useState(false);
  const [openEmpProfileModalTwo, setOpenEmpProfileModalTwo] = useState(false);
  const [openEmpTestVideo, setOpenEmpTestVideo] = useState(false);

  const [meetEmponeprofile, setMeetEmpOneProfile] = useState('');
  const [meetEmponeFullname, setMeetEmpOneFullname] = useState('');
  const [meetEmponePosition, setMeetEmpOnePosition] = useState('');
  const [meetEmponeContent, setMeetEmpContent] = useState('');
  const [meetEmponeVideo, setMeetEmpOneVideo] = useState('');

  const [meetEmpTwoprofile, setMeetEmpTwoProfile] = useState('');
  const [meetEmpTwoFullname, setMeetEmpTwoFullname] = useState('');
  const [meetEmpTwoPosition, setMeetEmpTwoPosition] = useState('');
  const [meetEmpTwoContent, setMeetEmpTwoContent] = useState('');
  const [meetEmpTwoVideo, setMeetEmpTwoVideo] = useState('');

  const [countTwo, setCountTwo] = useState(0);
  const [openModalCaltureOne, setOpenModalCaltureOne] = useState(false);
  const [openModalCaltureTwo, setOpenModalCaltureTwo] = useState(false);
  const [addEmpNew, setAddNewEmp] = useState(false);
  const [companyCaltureOneLogo, setCompanyCaltureOneLogo] = useState('');
  const [companyCaltureOneTitle, setCompanyCaltureOneTitle] = useState('');
  const [companyCaltureOneContent, setCompanyCaltureOneContent] = useState('');

  const [companyCaltureTwoLogo, setCompanyCaltureTwoLogo] = useState('');
  const [companyCaltureTwoTitle, setCompanyCaltureTwoTitle] = useState('');
  const [companyCaltureTwoContent, setCompanyCaltureTwoContent] = useState('');

  const [resp, setResp] = useState('');
  const [addNewCal, setAddNewCal] = useState(false);

  const [blogError, setBlogError] = useState(false);
  const [type3, setType3] = useState('');

  const [calError1, setCalError1] = useState(false);
  const [calError2, setCalError2] = useState(false);
  const [calError3, setCalError3] = useState(false);

  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  const onPreviewLink = url => {
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
    const accessToken = cookie.get('sizigi-token');
    if (url.match(regex)) {
      const response = AssetService.parserLink({
        url: url.trim(),
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

  const loadData = data => {
    if (data) {
      setResp(data);
      const emp1 =
        data.company_employees !== null ? data.company_employees[0] : '';

      const emp2 =
        data.company_employees !== null ? data.company_employees[1] : '';

      const emp3 =
        data.company_employees !== null ? data.company_employees[2] : '';

      const calture1 =
        data.company_culture !== null ? data.company_culture[0] : '';

      const calture2 =
        data.company_culture !== null ? data.company_culture[1] : '';

      const calture3 =
        data.company_culture !== null ? data.company_culture[2] : '';

      setBackground(data?.company_about?.brandcolors || '#009de9');
      setBackground2(data?.company_about?.textcolor || '#1d242f');
      setSocialLink1(data?.company_about?.socialfeedlinkone || '');
      setSocialLink2(data?.company_about?.socialfeedlinksecond || '');
      setBlogLink(data?.company_blog[0]?.link || '');
      if (data.company_blog.length > 0) {
        onPreviewLink(data.company_blog[0].link);
      }
      setImgOrVideoSrcBlog(data?.company_blog[0]?.coverUrl || '');
      setType3(data ? data?.company_blog[0]?.coverUrl?.split('.').pop() : '');
      setBlogtitle(data?.company_blog[0]?.title || '');
      setBlogcompanyArtical(data?.company_blog[0]?.content || '');

      // Company Employee meet
      // First Record
      setImgSrc(emp1 ? emp1.pictureUrl : '');
      setFullname(emp1 ? emp1.fullName : '');
      setPosition(emp1 ? emp1.position : '');
      setEmpTestimonial(emp1 ? emp1.content : '');
      setVideoSrc(emp1 ? emp1.videoUrl : '');

      // Second Record
      setMeetEmpOneProfile(emp2 ? emp2.pictureUrl : '');

      setMeetEmpOneFullname(emp2 ? emp2.fullName : '');
      setMeetEmpOnePosition(emp2 ? emp2.position : '');
      setMeetEmpContent(emp2 ? emp2.content : '');
      setMeetEmpOneVideo(emp2 ? emp2.videoUrl : '');

      // Third Record
      setMeetEmpTwoProfile(emp3 ? emp3.pictureUrl : '');

      setMeetEmpTwoFullname(emp3 ? emp3.fullName : '');
      setMeetEmpTwoPosition(emp3 ? emp3.position : '');
      setMeetEmpTwoContent(emp3 ? emp3.content : '');
      setMeetEmpTwoVideo(emp3 ? emp3.videoUrl : '');

      // Company Calture //
      // One Record
      setImgOrVideoSrcCulture(calture1 ? calture1?.coverUrl : '');
      setType(calture1 ? calture1?.coverUrl?.split('.').pop() : '');
      setCaltureTitle(calture1 ? calture1?.title : '');
      setCompanyCalture(calture1 ? calture1?.content : '');

      // Second record
      setCompanyCaltureOneLogo(calture2 ? calture2.coverUrl : '');
      setType1(calture2 ? calture2?.coverUrl?.split('.').pop() : '');
      setCompanyCaltureOneTitle(calture2 ? calture2.title : '');
      setCompanyCaltureOneContent(calture2 ? calture2.content : '');

      // Third Record
      setCompanyCaltureTwoLogo(calture3 ? calture3.coverUrl : '');
      setType2(calture3 ? calture3?.coverUrl?.split('.').pop() : '');
      setCompanyCaltureTwoTitle(calture3 ? calture3.title : '');
      setCompanyCaltureTwoContent(calture3 ? calture3.content : '');

      const cal =
        data.company_employees !== null ? data.company_employees.length : 0;
      const cal1 =
        data.company_culture !== null ? data.company_culture.length : 0;

      if (cal === 1) {
        setCount(0);
      } else if (cal === 2) {
        setCount(1);
      } else if (cal === 3) {
        setCount(2);
      } else {
        setCount(0);
      }

      if (cal1 === 1) {
        setCountTwo(0);
      } else if (cal1 === 2) {
        setCountTwo(1);
      } else if (cal1 === 3) {
        setCountTwo(2);
      } else {
        setCountTwo(0);
      }
    }
  };
  useEffect(() => {
    const { id } = companyInfo;
    const userDetail =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    setCmpUser(userDetail);
    setAddNewEmp(false);
    setAddNewCal(false);
    const getResponse = async () => {
      const res = await AboutCompanyService.getPagePreview(id);
      if (res) {
        const { data } = res?.data;
        if (data) {
          loadData(data);
        } else {
          // .....
        }
      }
    };
    getResponse();
  }, [calError1]);

  const onUploadSuccess = async res => {
    setShowUploadModal(false);
    setImgSrc(res);
  };

  const onEmpProfileSaveOne = async res => {
    setMeetEmpOneProfile(res);
    setOpenEmpProfileModalOne(false);
  };

  const onEmpProfileSaveTwo = async res => {
    setOpenEmpProfileModalTwo(false);
    setMeetEmpTwoProfile(res);
  };

  const onVideoUpload = async res => {
    setShowUploadModal(false);
    setVideoSrc(res);
  };

  const onSaveEmpOneVideo = async res => {
    setMeetEmpOneVideo(res);
    setOpenEmpTestVideo(false);
  };

  const onSaveEmpVideoTwo = async res => {
    setMeetEmpTwoVideo(res);
    setOpenEmpTestVideo(false);
  };

  // First Company Calture
  const onUploadSuccessImgVideo = async res => {
    setImgOrVideoSrcCulture(res);
    setshowUploadModalImgVideo(false);
    setType(res.split('.').pop());
  };

  // Second Company calture
  const onUploadCompanyLogoOne = async res => {
    setCompanyCaltureOneLogo(res);
    setType1(res.split('.').pop());
    setOpenModalCaltureOne(false);
  };

  // Third compnay calture
  const onUploadCompanyLogoTwo = async res => {
    setCompanyCaltureTwoLogo(res);
    setOpenModalCaltureTwo(false);
    setType2(res.split('.').pop());
  };

  const onUploadSuccessImgVideo2 = async res => {
    setshowUploadModalImgVideo2(false);
    setType1(res.split('.').pop());
    setImgOrVideoSrcBlog(res);
  };

  function createNoembedMarkup() {
    return { __html: previewVideo };
  }

  /* start outerClick Handler */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayColorPicker(false);
          setDisplayColorPicker2(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  /* End outerClick Handler */

  const onChangeLinkURL = e => {
    setBlogLink(e.target.value);
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

  async function handleSaveColor() {
    if (background && background2) {
      const colorData = {
        brandcolors: background,
        textcolor: background2,
      };
      const { id } = companyInfo;
      const res = await AboutCompanyService.setBrandAndTextColor(id, colorData);
      setDisplayColorPicker(false);
      setDisplayColorPicker2(false);
      showSuccess('Color code updated successfully');
      console.log('colorChnageResponse', res);
    }
  }

  async function onSaveCompanyEmployee() {
    const { id } = companyInfo;
    let data = [];
    if (resp.company_employees.length > 0 && !addEmpNew) {
      console.log('Update');
      if (fullName && position) {
        const emp1 = {
          id: resp.company_employees[0].id,
          fullName,
          position,
          pictureUrl: imgsrc,
          videoUrl: videosrc,
          content: empTestimonial,
        };
        data.push(emp1);
      }

      if (meetEmponeFullname && meetEmponePosition) {
        const emp2 = {
          id: resp.company_employees[1].id,
          fullName: meetEmponeFullname,
          position: meetEmponePosition,
          pictureUrl: meetEmponeprofile,
          videoUrl: meetEmponeVideo,
          content: meetEmponeContent,
        };
        data.push(emp2);
      }

      if (meetEmpTwoFullname && meetEmpTwoPosition) {
        const emp3 = {
          id: resp.company_employees[2].id,
          fullName: meetEmpTwoFullname,
          position: meetEmpTwoPosition,
          pictureUrl: meetEmpTwoprofile,
          videoUrl: meetEmpTwoVideo,
          content: meetEmpTwoContent,
        };
        data.push(emp3);
      }

      const CompanyEemployees = {
        CompanyEemployees: data,
      };
      const res = await AboutCompanyService.updateCompanyEmployees(
        id,
        CompanyEemployees,
      );
      if (res.status === 200) {
        // const { id } = companyInfo;

        showSuccess('Company employees updated successfully');
      } else {
        showToast('Failed to update company employees');
      }
      console.log('response-of-updateCompany', res);
    } else {
      console.log('New');
      if (
        fullName &&
        position &&
        resp.company_employees.length !== 1 &&
        resp.company_employees.length !== 2
      ) {
        const emp1 = {
          fullName,
          position,
          pictureUrl: imgsrc,
          videoUrl: videosrc,
          content: empTestimonial,
        };
        data.push(emp1);
      }

      if (
        meetEmponeFullname &&
        meetEmponePosition &&
        resp.company_employees.length !== 2 &&
        resp.company_employees.length !== 3
      ) {
        const emp2 = {
          fullName: meetEmponeFullname,
          position: meetEmponePosition,
          pictureUrl: meetEmponeprofile,
          videoUrl: meetEmponeVideo,
          content: meetEmponeContent,
        };
        data.push(emp2);
      }

      if (
        meetEmpTwoFullname &&
        meetEmpTwoPosition &&
        resp.company_employees.length !== 3
      ) {
        const emp3 = {
          fullName: meetEmpTwoFullname,
          position: meetEmpTwoPosition,
          pictureUrl: meetEmpTwoprofile,
          videoUrl: meetEmpTwoVideo,
          content: meetEmpTwoContent,
        };
        data.push(emp3);
      }
      const CompanyEemployees = {
        CompanyEemployees: data,
      };

      const res = await AboutCompanyService.setCompanyEmployees(
        id,
        CompanyEemployees,
      );
      if (res.status === 201) {
        data = [];
        const getResponse = async () => {
          const respon = await AboutCompanyService.getPagePreview(id);
          if (respon) {
            const newData = respon?.data?.data;
            if (newData) {
              loadData(newData);
            } else {
              // .....
            }
          }
        };
        getResponse();
        showSuccess('Company employees updated successfully');
      } else {
        showToast('Failed to update company employees');
      }
    }
  }

  async function onCompanyCaltureSave() {
    const { id } = companyInfo;
    let CompanyCulturesArray = [];
    if (resp.company_culture.length > 0 && !addNewCal) {
      console.log('Update');
      if (caltureTitle) {
        const data1 = {
          id: resp.company_culture[0].id,
          title: caltureTitle,
          coverUrl: imgOrVideoSrcCulture,
          content: companyCalture,
        };
        CompanyCulturesArray.push(data1);
      }

      if (companyCaltureOneTitle) {
        const data2 = {
          id: resp.company_culture[1].id,
          title: companyCaltureOneTitle,
          coverUrl: companyCaltureOneLogo,
          content: companyCaltureOneContent,
        };
        CompanyCulturesArray.push(data2);
      }

      if (companyCaltureTwoTitle) {
        const data3 = {
          id: resp.company_culture[2].id,
          title: companyCaltureTwoTitle,
          coverUrl: companyCaltureTwoLogo,
          content: companyCaltureTwoContent,
        };
        CompanyCulturesArray.push(data3);
      }

      const obj = {
        CompanyCultures: CompanyCulturesArray,
      };
      const res = await AboutCompanyService.updateCompanyCalture(id, obj);
      if (res.status === 200) {
        showSuccess('Company culture updated successfully');
      } else {
        showToast('Failed to update company culture');
      }
      console.log('Update Company Calture', res);
    } else {
      console.log('New');
      if (caltureTitle === '') {
        setCalError1(true);
      } else if (
        caltureTitle &&
        resp.company_culture.length !== 1 &&
        resp.company_culture.length !== 2
      ) {
        const data1 = {
          title: caltureTitle,
          coverUrl: imgOrVideoSrcCulture,
          content: companyCalture,
        };
        setCalError1(false);
        console.log('first');
        CompanyCulturesArray.push(data1);
      }

      if (countTwo >= 1 && companyCaltureOneTitle === '') {
        setCalError2(true);
      } else if (
        companyCaltureOneTitle &&
        resp.company_culture.length !== 2 &&
        resp.company_culture.length !== 3
      ) {
        const data2 = {
          title: companyCaltureOneTitle,
          coverUrl: companyCaltureOneLogo,
          content: companyCaltureOneContent,
        };
        setCalError2(false);
        console.log('second');
        CompanyCulturesArray.push(data2);
      }

      if (countTwo === 2 && companyCaltureTwoTitle === '') {
        setCalError3(true);
      } else if (companyCaltureTwoTitle && resp.company_culture.length !== 3) {
        const data3 = {
          title: companyCaltureTwoTitle,
          coverUrl: companyCaltureTwoLogo,
          content: companyCaltureTwoContent,
        };
        setCalError3(false);
        CompanyCulturesArray.push(data3);
      }
      const obj = {
        CompanyCultures: CompanyCulturesArray,
      };

      if (calError1 === true || calError2 || calError3) {
        console.log('Error');
      } else {
        const res = await AboutCompanyService.setCompanyCalture(id, obj);
        if (res.status === 201) {
          // const { id } = companyInfo;
          CompanyCulturesArray = [];
          const getResponse = async () => {
            const respon = await AboutCompanyService.getPagePreview(id);
            if (respon) {
              const { data } = respon?.data;
              if (data) {
                loadData(data);
              } else {
                // .....
              }
            }
          };
          getResponse();
          showSuccess('Company cultures updated successfully');
        } else {
          showToast('Failed to update company culture');
        }
      }
    }
  }

  async function onBlogCompanyArtical() {
    const { id } = companyInfo;
    if (resp.company_blog.length > 0) {
      if (blogtitle === '') {
        setBlogError(true);
      } else {
        setBlogError(false);
        const companyBlog = {
          title: blogtitle,
          link: blogLink,
          coverUrl: imgOrVideoSrcBlog,
          content: blogcompanyArtical,
        };
        const res = await AboutCompanyService.updateBlogCompanyArtical(
          id,
          resp.company_blog[0].id,
          companyBlog,
        );

        if (res.status === 200) {
          showSuccess('Blog or featured article updated successfully');
        } else {
          showToast('Failed to update blog or featured article');
        }

        console.log('update Blog', res);
      }
    } else {
      console.log('');
      if (blogtitle === '') {
        setBlogError(true);
      } else {
        setBlogError(false);
        const companyBlog = {
          title: blogtitle,
          link: blogLink,
          coverUrl: imgOrVideoSrcBlog,
          content: blogcompanyArtical,
        };
        const res = await AboutCompanyService.setBlogCompanyArtical(
          id,
          companyBlog,
        );

        if (res.status === 201) {
          showSuccess('Blog or featured article updated successfully');
        } else {
          showToast('Failed to update blog or featured article');
        }
        console.log('create blog', res);
      }
    }
  }

  async function onSocialFeed() {
    const { id } = companyInfo;
    const socialFeed = {
      socialfeedlinkone: socialLink1,
      socialfeedlinksecond: socialLink2,
    };
    if (socialLink1 || socialLink2) {
      console.log(socialLink1, socialLink2);
      let m = true;
      let n = true;
      const validationWebsite = /^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      if (socialFeed.socialfeedlinkone) {
        m = validationWebsite.test(socialFeed.socialfeedlinkone);
        if (!m) {
          setSocialLink1Error(true);
        }
      }
      if (socialFeed.socialfeedlinksecond) {
        n = validationWebsite.test(socialFeed.socialfeedlinksecond);
        if (!n) {
          setSocialLink2Error(true);
        }
      }
      if (m && n) {
        const res = await AboutCompanyService.setSocialFeed(id, socialFeed);
        if (res.status === 200) {
          showSuccess('Social Feed updated successfully');
        } else {
          showToast('Failed to update social Feed');
        }
        setSocialLink1Error(false);
        setSocialLink2Error(false);
      }
    } else {
      const res = await AboutCompanyService.setSocialFeed(id, socialFeed);
      if (res.status === 200) {
        showSuccess('Social Feed updated successfully');
      } else {
        showToast('Failed to update social Feed');
      }
    }
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
        data.phone = value;
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
  }

  function showVerificationModal() {
    setShowAction({
      show: false,
      text: '',
    });
    dispatch({
      type: 'SET_MODAL_OPENED',
      component: VerificationModal,
    });
  }

  const openSubmenu = () => {
    document.querySelector('.has-submenu').classList.toggle('opened');
  };

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

  function verifyRedirect() {
    const { redirect } = router.query;
    if (redirect) Storage.add('redirect', redirect);
  }

  useEffect(() => {
    verifyRedirect();
  }, []);

  // if (typeof window !== 'undefined') {
  //   window.addEventListener('scroll', () => {
  //     if (
  //       document
  //         .getElementById('left-setting-menu')
  //         .classList?.contains('.profile-leftside-menu')
  //     ) {
  //       if (window.scrollY >= 130) {
  //         document
  //           .querySelector('.profile-leftside-menu')
  //           .classList?.add('sticky-left-panel');
  //       } else {
  //         document
  //           .querySelector('.profile-leftside-menu')
  //           .classList?.remove('sticky-left-panel');
  //       }
  //     }
  //   });
  // }

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
          <Form onSubmit={handleSubmit} ref={formRef}>
            <ProfileSectionWrap>
              <LeftSideMenu className="left-menu-wrapper">
                <div id="left-setting-menu" className="profile-leftside-menu">
                  <h2>Company page</h2>
                  <ul>
                    <li>
                      <NextLink href="/company/company-page">
                        <a href="/company/company-page">
                          General Info
                          <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 13L7 7L1 1"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </NextLink>
                    </li>
                    <li className="active has-submenu opened">
                      <a href="javascrip:void(0)" onClick={openSubmenu}>
                        Advanced
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13L7 7L1 1"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <div className="sub-menus">
                        <ul>
                          <li>
                            <Link
                              to="brandColors"
                              spy
                              smooth
                              offset={-80}
                              duration={500}
                              activeClass="active"
                            >
                              {/* <a href="#brandColors" className="active-submenu"> */}
                              Brand Colors
                              {/* </a> */}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="meetEmployees"
                              spy
                              smooth
                              offset={-80}
                              duration={500}
                              activeClass="active"
                            >
                              {/* <a href="#meetEmployees"> */}
                              Meet company employees
                              {/* </a> */}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="CompanyCulture"
                              spy
                              smooth
                              offset={-80}
                              duration={500}
                              activeClass="active"
                            >
                              {/* <a href="#CompanyCulture"> */}
                              Company culture
                              {/* </a> */}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="FeaturedArticle"
                              spy
                              smooth
                              offset={-80}
                              duration={500}
                              activeClass="active"
                            >
                              {/* <a href="#FeaturedArticle"> */}
                              Blog/Featured article
                              {/* </a> */}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="SocialFeed"
                              spy
                              smooth
                              offset={-80}
                              duration={500}
                              activeClass="active"
                            >
                              {/* <a href="#SocialFeed"> */}
                              Social feed
                              {/* </a> */}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <NextLink href="/company/preview">
                        <a href="/company/preview">
                          Preview
                          <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 13L7 7L1 1"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </NextLink>
                    </li>
                  </ul>
                </div>
              </LeftSideMenu>
              <ReftSideMenu>
                <div className="profile-right-panel">
                  <div className="company-page-main">
                    <div className="card" id="brandColors">
                      <h3 className="company-common-title">Brand colors</h3>
                      <p>Choose up to 2 colors to brand your company page!</p>
                      <SetColorOne>
                        <h4 className="color-name">
                          Color 1 - Primary brand color
                        </h4>
                        <p>
                          Click on square the square to choose your first color!
                        </p>
                        {/* <a href="/AdminAdvancedCompanyPage-new">
                            <span className="show-color blue" />
                          </a> */}

                        <BrandColorPicker>
                          <Btn
                            disabled={cmpUser.role === 'employee'}
                            handleClick={e => {
                              setDisplayColorPicker(true);
                              setDisplayColorPicker2(false);
                            }}
                            className="brand-color-picker-btn"
                            style={{
                              background: `${background}`,
                            }}

                            // startIcon="downArrow"
                          />

                          {displayColorPicker && !displayColorPicker2 && (
                            <>
                              <ColorPopover ref={wrapperRef}>
                                {/* <ColorPopover ref={wrapperRef}> */}
                                <SketchPicker
                                  disableAlpha
                                  styles={{
                                    width: '100%',
                                    height: '8px',
                                    background: `${background}`,
                                  }}
                                  color={background}
                                  onChange={color => {
                                    setBackground(color.hex);
                                  }}
                                />
                                <PopoverAction>
                                  <Btn
                                    type="button"
                                    label={buttonsT('cancel')}
                                    handleClick={e => {
                                      setDisplayColorPicker(false);
                                      setDisplayColorPicker2(false);
                                    }}
                                    size="md"
                                    variant="outlineSecondary"
                                  />
                                  <Btn
                                    type="button"
                                    label={buttonsT('save')}
                                    handleClick={handleSaveColor}
                                    size="md"
                                    variant="outlinePrimary"
                                  />
                                </PopoverAction>
                              </ColorPopover>
                            </>
                          )}
                        </BrandColorPicker>

                        {/* <a href="/AdminAdvancedCompanyPage-new">
                            <span className="show-color blue" />
                          </a> */}
                      </SetColorOne>
                      <SetColorOne>
                        <h4 className="color-name">
                          Color 2 - Primary text color
                        </h4>
                        <p>
                          Click on square the square to choose your second
                          color!
                        </p>
                        <BrandColorPicker>
                          <Btn
                            disabled={cmpUser.role === 'employee'}
                            handleClick={e => {
                              setDisplayColorPicker(false);
                              setDisplayColorPicker2(true);
                            }}
                            className="brand-color-picker-btn"
                            style={{
                              background: `${background2}`,
                            }}
                            // startIcon="downArrow"
                          />
                          {displayColorPicker2 && !displayColorPicker && (
                            <>
                              <ColorPopover ref={wrapperRef}>
                                {/* <ColorPopover ref={wrapperRef}> */}
                                <SketchPicker
                                  disableAlpha
                                  styles={{
                                    width: '100%',
                                    height: '8px',
                                    background: `${background2}`,
                                  }}
                                  color={background2}
                                  onChange={color => {
                                    setBackground2(color.hex);
                                  }}
                                />
                                <PopoverAction>
                                  <Btn
                                    type="button"
                                    label={buttonsT('cancel')}
                                    handleClick={() => {
                                      setDisplayColorPicker(false);
                                      setDisplayColorPicker2(false);
                                    }}
                                    size="md"
                                    variant="outlineSecondary"
                                  />
                                  <Btn
                                    type="button"
                                    label={buttonsT('save')}
                                    handleClick={handleSaveColor}
                                    size="md"
                                    variant="outlinePrimary"
                                  />
                                </PopoverAction>
                              </ColorPopover>
                            </>
                          )}
                        </BrandColorPicker>

                        {/* <a href="/AdminAdvancedCompanyPage-new">
                            <span className="show-color black" />
                          </a> */}
                      </SetColorOne>
                    </div>

                    <div className="card" id="meetEmployees">
                      <h3 className="company-common-title">
                        Meet company employees
                      </h3>
                      <p>
                        Get testimonials of your employees to drive high quality
                        applicants!
                      </p>
                      <h3 className="company-common-title mb-2 mt-3">
                        Employee profile picture{' '}
                        <small>(image size should be 200 X 200)</small>
                      </h3>
                      <DragDrop className="employee_picture">
                        {!imgsrc && cmpUser.role === 'admin' && (
                          <div className="emp-pic-box">
                            <button
                              type="button"
                              className="upload-popup-btn"
                              onClick={() => {
                                setShowUploadModal(true);
                                setShowIsVideo(false);
                              }}
                            >
                              Upload file here
                            </button>
                            <img
                              src={cdn(
                                '/static/img/emp-profile-upload-icon.svg',
                              )}
                              alt="upload-cloud"
                            />
                          </div>
                        )}

                        {showUploadModal && !showisVideo && (
                          <FileUploadModal
                            closeModal={e => setShowUploadModal(e)}
                            onSuccess={onUploadSuccess}
                            isVideo={showisVideo}
                          />
                        )}

                        {imgsrc && (
                          <>
                            {cmpUser.role === 'admin' && (
                              <button
                                type="button"
                                className="delete"
                                onClick={e => setImgSrc('')}
                              >
                                <img
                                  src={cdn('/static/img/delet-white.png')}
                                  alt="delet-white.png"
                                />
                              </button>
                            )}
                            <div className="company-pro-preview-wrap">
                              <img src={imgsrc} alt="Profile Preview" />
                            </div>
                          </>
                        )}
                      </DragDrop>

                      <FlexRowHalf>
                        <FormWrapperBlock className="form-group">
                          <FormBlock
                            label={t('form.label.fullname')}
                            className="req-label"
                          >
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="fullname"
                              size="medium"
                              maxLength="30"
                              value={fullName}
                              placeholder={t('form.placeholder.fullname')}
                              onChange={e => setFullname(e.target.value)}
                            />
                          </FormBlock>
                        </FormWrapperBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock
                            label={t('form.label.Position')}
                            className="req-label"
                          >
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="Position"
                              size="medium"
                              maxLength="30"
                              value={position}
                              placeholder={t('form.placeholder.Position')}
                              onChange={e => setPosition(e.target.value)}
                            />
                          </FormBlock>
                        </FormWrapperBlock>

                        <WidthFullBlock className="textarea-div">
                          <span>Employee testimonial</span>
                          <textarea
                            disabled={cmpUser.role === 'employee'}
                            className="textarea"
                            placeholder="Employee testimonial"
                            maxLength="1000"
                            value={empTestimonial}
                            onChange={e => {
                              setQualifiCharaterCount(e.target.value.length);
                              setEmpTestimonial(e.target.value);
                            }}
                          />
                          <TextCount>{qualificharacterCount}/1000</TextCount>
                        </WidthFullBlock>
                      </FlexRowHalf>
                      <h3 className="company-common-title mb-2">
                        Employee testimonial video
                      </h3>
                      {!videosrc && cmpUser.role === 'admin' && (
                        <DragDrop className="upload-video">
                          <button
                            type="button"
                            className="upload-popup-btn"
                            onClick={e => {
                              setShowUploadModal(true);
                              setShowIsVideo(true);
                            }}
                          >
                            Upload file here
                          </button>
                          <img
                            src={cdn('/static/img/upload-cloud.png')}
                            alt="upload-cloud-icon"
                          />
                          <div className="box-note">
                            Video should be in .mp4 format only and max size 15
                            MB
                          </div>

                          {showUploadModal && showisVideo && (
                            <FileUploadModal
                              closeModal={e => setShowUploadModal(e)}
                              onSuccess={onVideoUpload}
                              isVideo={showisVideo}
                            />
                          )}
                        </DragDrop>
                      )}

                      {videosrc && (
                        <div className="company-preview-wrap">
                          {cmpUser.role === 'admin' && (
                            <button
                              type="button"
                              onClick={e => setVideoSrc('')}
                              className="delete"
                            >
                              <img
                                src={cdn('/static/img/delet-white.png')}
                                alt="delet-white.png"
                              />
                            </button>
                          )}
                          <video controls>
                            <source
                              src={videosrc}
                              type="video/mp4"
                              autostart={cmpUser.role === 'employee' && false}
                            />
                            <track
                              src="captions_en.vtt"
                              kind="captions"
                              srcLang="en"
                              label="english_captions"
                            />
                          </video>
                        </div>
                      )}

                      {count >= 1 && (
                        <div
                          style={{
                            paddingTop: '25px',
                            borderTop: '1px solid #dedede',
                          }}
                        >
                          <h3 className="company-common-title mb-2 mt-3">
                            Employee profile picture{' '}
                            <small>(image size should be 200 X 200)</small>
                          </h3>
                          <DragDrop className="employee_picture">
                            {!meetEmponeprofile && cmpUser.role === 'admin' && (
                              <div className="emp-pic-box">
                                <button
                                  type="button"
                                  className="upload-popup-btn"
                                  onClick={() => {
                                    setOpenEmpProfileModalOne(true);

                                    setShowIsVideo(false);
                                  }}
                                >
                                  Upload file here
                                </button>
                                <img
                                  src={cdn(
                                    '/static/img/emp-profile-upload-icon.svg',
                                  )}
                                  alt="upload-cloud"
                                />
                              </div>
                            )}

                            {openEmpProfileModalOne && (
                              <>
                                <FileUploadModal
                                  closeModal={e =>
                                    setOpenEmpProfileModalOne(false)
                                  }
                                  onSuccess={onEmpProfileSaveOne}
                                  isVideo={showisVideo}
                                />
                              </>
                            )}

                            {meetEmponeprofile && (
                              <>
                                {cmpUser.role === 'admin' && (
                                  <button
                                    type="button"
                                    className="delete"
                                    onClick={e => setMeetEmpOneProfile('')}
                                  >
                                    <img
                                      src={cdn('/static/img/delet-white.png')}
                                      alt="delet-white.png"
                                    />
                                  </button>
                                )}
                                <div className="company-pro-preview-wrap">
                                  <img
                                    src={meetEmponeprofile}
                                    alt="Profile Preview"
                                  />
                                </div>
                              </>
                            )}
                          </DragDrop>

                          <FlexRowHalf>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.fullname')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="fullname"
                                  size="medium"
                                  maxLength="30"
                                  value={meetEmponeFullname}
                                  placeholder={t('form.placeholder.fullname')}
                                  onChange={e =>
                                    setMeetEmpOneFullname(e.target.value)
                                  }
                                />
                              </FormBlock>
                            </FormWrapperBlock>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.Position')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="Position"
                                  size="medium"
                                  maxLength="30"
                                  value={meetEmponePosition}
                                  placeholder={t('form.placeholder.Position')}
                                  onChange={e =>
                                    setMeetEmpOnePosition(e.target.value)
                                  }
                                />
                              </FormBlock>
                            </FormWrapperBlock>

                            <WidthFullBlock className="textarea-div">
                              <span>Employee testimonial</span>
                              <textarea
                                disabled={cmpUser.role === 'employee'}
                                className="textarea"
                                placeholder="Employee testimonial"
                                maxLength="1000"
                                value={meetEmponeContent}
                                onChange={e => {
                                  setQualifiCharaterCount(
                                    e.target.value.length,
                                  );
                                  setMeetEmpContent(e.target.value);
                                }}
                              />
                              <TextCount>
                                {qualificharacterCount}/1000
                              </TextCount>
                            </WidthFullBlock>
                          </FlexRowHalf>
                          {!meetEmponeVideo && cmpUser.role === 'admin' && (
                            <DragDrop className="upload-video">
                              <button
                                type="button"
                                className="upload-popup-btn"
                                onClick={e => {
                                  setOpenEmpTestVideo(true);
                                  setShowIsVideo(true);
                                }}
                              >
                                Upload file here
                              </button>
                              <img
                                src={cdn('/static/img/upload-cloud.png')}
                                alt="upload-cloud-icon"
                              />
                              <div className="box-note">
                                Video should be in .mp4 format only and max size
                                15 MB
                              </div>

                              {openEmpTestVideo && showisVideo && (
                                <>
                                  <FileUploadModal
                                    closeModal={e => setOpenEmpTestVideo(e)}
                                    onSuccess={onSaveEmpOneVideo}
                                    isVideo={showisVideo}
                                  />
                                  {console.log('First')}
                                </>
                              )}
                            </DragDrop>
                          )}

                          {meetEmponeVideo && (
                            <div className="company-preview-wrap">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setMeetEmpOneVideo('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}
                              <video controls>
                                <source
                                  src={meetEmponeVideo}
                                  type="video/mp4"
                                />
                                <track
                                  src="captions_en.vtt"
                                  kind="captions"
                                  srcLang="en"
                                  label="english_captions"
                                />
                              </video>
                            </div>
                          )}
                        </div>
                      )}

                      {count === 2 && (
                        <div
                          style={{
                            paddingTop: '25px',
                            borderTop: '1px solid #dedede',
                          }}
                        >
                          <h3 className="company-common-title mb-2 mt-3">
                            Employee profile picture{' '}
                            <small>(image size should be 200 X 200)</small>
                          </h3>
                          <DragDrop className="employee_picture">
                            {!meetEmpTwoprofile && cmpUser.role === 'admin' && (
                              <div className="emp-pic-box">
                                <button
                                  type="button"
                                  className="upload-popup-btn"
                                  onClick={() => {
                                    setOpenEmpProfileModalTwo(true);

                                    setShowIsVideo(false);
                                  }}
                                >
                                  Upload file here
                                </button>
                                <img
                                  src={cdn(
                                    '/static/img/emp-profile-upload-icon.svg',
                                  )}
                                  alt="upload-cloud"
                                />
                              </div>
                            )}

                            {openEmpProfileModalTwo && (
                              <>
                                <FileUploadModal
                                  closeModal={e => setOpenEmpProfileModalTwo(e)}
                                  onSuccess={onEmpProfileSaveTwo}
                                  isVideo={showisVideo}
                                />
                              </>
                            )}

                            {meetEmpTwoprofile && (
                              <>
                                {cmpUser.role === 'admin' && (
                                  <button
                                    type="button"
                                    className="delete"
                                    onClick={e => setMeetEmpTwoProfile('')}
                                  >
                                    <img
                                      src={cdn('/static/img/delet-white.png')}
                                      alt="delet-white.png"
                                    />
                                  </button>
                                )}
                                <div className="company-pro-preview-wrap">
                                  <img
                                    src={meetEmpTwoprofile}
                                    alt="Profile Preview"
                                  />
                                </div>
                              </>
                            )}
                          </DragDrop>

                          <FlexRowHalf>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.fullname')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="fullname"
                                  size="medium"
                                  maxLength="30"
                                  value={meetEmpTwoFullname}
                                  placeholder={t('form.placeholder.fullname')}
                                  onChange={e =>
                                    setMeetEmpTwoFullname(e.target.value)
                                  }
                                />
                              </FormBlock>
                            </FormWrapperBlock>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.Position')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="Position"
                                  size="medium"
                                  maxLength="30"
                                  value={meetEmpTwoPosition}
                                  placeholder={t('form.placeholder.Position')}
                                  onChange={e =>
                                    setMeetEmpTwoPosition(e.target.value)
                                  }
                                />
                              </FormBlock>
                            </FormWrapperBlock>

                            <WidthFullBlock className="textarea-div">
                              <span>Employee testimonial</span>
                              <textarea
                                disabled={cmpUser.role === 'employee'}
                                className="textarea"
                                placeholder="Employee testimonial"
                                maxLength="1000"
                                value={meetEmpTwoContent}
                                onChange={e => {
                                  setQualifiCharaterCount(
                                    e.target.value.length,
                                  );
                                  setMeetEmpTwoContent(e.target.value);
                                }}
                              />
                              <TextCount>
                                {qualificharacterCount}/1000
                              </TextCount>
                            </WidthFullBlock>
                          </FlexRowHalf>

                          {!meetEmpTwoVideo && cmpUser.role === 'admin' && (
                            <DragDrop className="upload-video">
                              <button
                                type="button"
                                className="upload-popup-btn"
                                onClick={e => {
                                  setOpenEmpTestVideo(true);
                                  setShowIsVideo(true);
                                }}
                              >
                                Upload file here
                              </button>
                              <img
                                src={cdn('/static/img/upload-cloud.png')}
                                alt="upload-cloud-icon"
                              />
                              <div className="box-note">
                                Video should be in .mp4 format only and max size
                                15 MB
                              </div>

                              {openEmpTestVideo && (
                                <>
                                  (
                                  <FileUploadModal
                                    closeModal={e => setOpenEmpTestVideo(false)}
                                    onSuccess={onSaveEmpVideoTwo}
                                    isVideo={showisVideo}
                                  />
                                  ,)
                                </>
                              )}
                            </DragDrop>
                          )}

                          {meetEmpTwoVideo && (
                            <div className="company-preview-wrap">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setMeetEmpTwoVideo('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}

                              <video controls>
                                <source
                                  src={meetEmpTwoVideo}
                                  type="video/mp4"
                                />
                                <track
                                  src="captions_en.vtt"
                                  kind="captions"
                                  srcLang="en"
                                  label="english_captions"
                                />
                              </video>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        disabled={cmpUser.role === 'employee'}
                        type="button"
                        className="update"
                        onClick={e => onSaveCompanyEmployee()}
                      >
                        Publish
                      </button>
                      {/* <a
                          href="/AdminAdvancedCompanyPage-new"
                          className="update"
                        >
                          Publish
                        </a> */}
                      {count >= 2 ? (
                        ''
                      ) : (
                        <div className="add-another">
                          <button
                            disabled={cmpUser.role === 'employee'}
                            type="button"
                            onClick={e => {
                              setCount(count + 1);
                              setAddNewEmp(true);
                            }}
                          >
                            <img
                              src={cdn('/static/img/plus-circle.svg')}
                              alt="plus-circle.svg"
                            />
                            Add Another
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="card" id="CompanyCulture">
                      <h3 className="company-common-title">Company culture</h3>
                      <p>
                        Write about what makes your company unique to drive in
                        better candidates!
                      </p>
                      <h3 className="company-common-title mb-2 mt-3">
                        Cover video or image{' '}
                        <small>
                          (Video should be in .mp4 format only and max size 15
                          MB)
                        </small>
                      </h3>

                      {!imgOrVideoSrcCulture && cmpUser.role === 'admin' && (
                        <DragDrop>
                          <button
                            type="button"
                            className="upload-popup-btn"
                            onClick={e => {
                              setshowUploadModalImgVideo(true);
                              setShowIsVideo(true);
                            }}
                          >
                            Upload file here
                          </button>
                          <div className="drag-drop-group">
                            <img
                              src={cdn('/static/img/plus-black.svg')}
                              alt="plus-black.svg"
                            />
                            Drag and drop here
                          </div>

                          {showUploadModalImgVideo && showisVideo && (
                            <FileUploadModal
                              closeModal={e =>
                                setshowUploadModalImgVideo(false)
                              }
                              onSuccess={onUploadSuccessImgVideo}
                              isVideo={showisVideo}
                            />
                          )}
                        </DragDrop>
                      )}

                      {imgOrVideoSrcCulture && (
                        <>
                          {type === 'mp4' ? (
                            <div className="company-preview-wrap">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setImgOrVideoSrcCulture('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}
                              <video controls>
                                <source
                                  src={imgOrVideoSrcCulture}
                                  type="video/mp4"
                                />
                                <track
                                  src="captions_en.vtt"
                                  kind="captions"
                                  srcLang="en"
                                  label="english_captions"
                                />
                              </video>
                            </div>
                          ) : (
                            <div className="company-preview-wrap img-pre-box">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setImgOrVideoSrcCulture('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}
                              <img src={imgOrVideoSrcCulture} alt="Cover" />
                            </div>
                          )}
                        </>
                      )}

                      <WidthFullBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock
                            label={t('form.label.title')}
                            className="req-label"
                          >
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="title"
                              size="medium"
                              maxLength="100"
                              value={caltureTitle}
                              placeholder={t('form.placeholder.title')}
                              onChange={e => setCaltureTitle(e.target.value)}
                            />
                          </FormBlock>
                          <span className="req-error">
                            {calError1 && 'Title are required'}
                          </span>
                        </FormWrapperBlock>
                      </WidthFullBlock>
                      <WidthFullBlock className="textarea-div ">
                        <span>Company culture</span>
                        <textarea
                          disabled={cmpUser.role === 'employee'}
                          className="textarea"
                          placeholder="Talk more about it here!"
                          maxLength="1000"
                          value={companyCalture}
                          onChange={e => {
                            setCharaterCount(e.target.value.length);
                            setCompanyCalture(e.target.value);
                          }}
                        />
                        <TextCount>{characterCount}/1000</TextCount>
                      </WidthFullBlock>

                      {countTwo >= 1 && (
                        <div
                          style={{
                            paddingTop: '25px',
                            borderTop: '1px solid #dedede',
                          }}
                        >
                          <h3 className="company-common-title mb-2 mt-3">
                            Cover video or image{' '}
                            <small>
                              (Video should be in .mp4 format only and max size
                              15 MB)
                            </small>
                          </h3>

                          {!companyCaltureOneLogo && cmpUser.role === 'admin' && (
                            <DragDrop>
                              <button
                                type="button"
                                className="upload-popup-btn"
                                onClick={e => {
                                  setOpenModalCaltureOne(true);
                                  setShowIsVideo(true);
                                }}
                              >
                                Upload file here
                              </button>
                              <div className="drag-drop-group">
                                <img
                                  src={cdn('/static/img/plus-black.svg')}
                                  alt="plus-black.svg"
                                />
                                Drag and drop here
                              </div>

                              {openModalCaltureOne &&
                                !companyCaltureOneLogo && (
                                  <FileUploadModal
                                    closeModal={e =>
                                      setOpenModalCaltureOne(false)
                                    }
                                    onSuccess={onUploadCompanyLogoOne}
                                    isVideo={showisVideo}
                                  />
                                )}
                            </DragDrop>
                          )}

                          {companyCaltureOneLogo && (
                            <>
                              {type1 === 'mp4' ? (
                                <div className="company-preview-wrap">
                                  {cmpUser.role === 'admin' && (
                                    <button
                                      type="button"
                                      onClick={e =>
                                        setCompanyCaltureOneLogo('')
                                      }
                                      className="delete"
                                    >
                                      <img
                                        src={cdn('/static/img/delet-white.png')}
                                        alt="delet-white.png"
                                      />
                                    </button>
                                  )}
                                  <video controls>
                                    <source
                                      src={companyCaltureOneLogo}
                                      type="video/mp4"
                                    />
                                    <track
                                      src="captions_en.vtt"
                                      kind="captions"
                                      srcLang="en"
                                      label="english_captions"
                                    />
                                  </video>
                                </div>
                              ) : (
                                <div className="company-preview-wrap img-pre-box">
                                  {cmpUser.role === 'admin' && (
                                    <button
                                      type="button"
                                      onClick={e =>
                                        setCompanyCaltureOneLogo('')
                                      }
                                      className="delete"
                                    >
                                      <img
                                        src={cdn('/static/img/delet-white.png')}
                                        alt="delet-white.png"
                                      />
                                    </button>
                                  )}
                                  <img
                                    src={companyCaltureOneLogo}
                                    alt="Cover"
                                  />
                                </div>
                              )}
                            </>
                          )}

                          <WidthFullBlock>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.title')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="title"
                                  size="medium"
                                  maxLength="30"
                                  value={companyCaltureOneTitle}
                                  placeholder={t('form.placeholder.title')}
                                  onChange={e =>
                                    setCompanyCaltureOneTitle(e.target.value)
                                  }
                                />
                              </FormBlock>
                              <span className="req-error">
                                {calError2 && 'Title are required'}
                              </span>
                            </FormWrapperBlock>
                          </WidthFullBlock>

                          <WidthFullBlock className="textarea-div ">
                            <span>Company culture</span>
                            <textarea
                              disabled={cmpUser.role === 'employee'}
                              className="textarea"
                              placeholder="Talk more about it here!"
                              maxLength="1000"
                              value={companyCaltureOneContent}
                              onChange={e => {
                                setCharaterCount(e.target.value.length);
                                setCompanyCaltureOneContent(e.target.value);
                              }}
                            />
                            <TextCount>{characterCount}/1000</TextCount>
                          </WidthFullBlock>
                        </div>
                      )}

                      {countTwo === 2 && (
                        <div
                          style={{
                            paddingTop: '25px',
                            borderTop: '1px solid #dedede',
                          }}
                        >
                          <h3 className="company-common-title mb-2 mt-3">
                            Cover video or image{' '}
                            <small>
                              (Video should be in .mp4 format only and max size
                              15 MB)
                            </small>
                          </h3>
                          {!companyCaltureTwoLogo && cmpUser.role === 'admin' && (
                            <DragDrop>
                              <button
                                type="button"
                                className="upload-popup-btn"
                                onClick={e => {
                                  setOpenModalCaltureTwo(true);
                                  setShowIsVideo(true);
                                }}
                              >
                                Upload file here
                              </button>
                              <div className="drag-drop-group">
                                <img
                                  src={cdn('/static/img/plus-black.svg')}
                                  alt="plus-black.svg"
                                />
                                Drag and drop here
                              </div>
                              {openModalCaltureTwo && countTwo === 2 && (
                                <FileUploadModal
                                  closeModal={e =>
                                    setOpenModalCaltureTwo(false)
                                  }
                                  onSuccess={onUploadCompanyLogoTwo}
                                  isVideo={showisVideo}
                                />
                              )}
                            </DragDrop>
                          )}

                          {companyCaltureTwoLogo && countTwo === 2 && (
                            <>
                              {type2 === 'mp4' ? (
                                <div className="company-preview-wrap">
                                  {cmpUser.role === 'admin' && (
                                    <button
                                      type="button"
                                      onClick={e =>
                                        setCompanyCaltureTwoLogo('')
                                      }
                                      className="delete"
                                    >
                                      <img
                                        src={cdn('/static/img/delet-white.png')}
                                        alt="delet-white.png"
                                      />
                                    </button>
                                  )}
                                  <video controls>
                                    <source
                                      src={companyCaltureTwoLogo}
                                      type="video/mp4"
                                    />
                                    <track
                                      src="captions_en.vtt"
                                      kind="captions"
                                      srcLang="en"
                                      label="english_captions"
                                    />
                                  </video>
                                </div>
                              ) : (
                                <div className="company-preview-wrap img-pre-box">
                                  {cmpUser.role === 'admin' && (
                                    <button
                                      type="button"
                                      onClick={e =>
                                        setCompanyCaltureTwoLogo('')
                                      }
                                      className="delete"
                                    >
                                      <img
                                        src={cdn('/static/img/delet-white.png')}
                                        alt="delet-white.png"
                                      />
                                    </button>
                                  )}
                                  <img
                                    src={companyCaltureTwoLogo}
                                    alt="Cover"
                                  />
                                </div>
                              )}
                            </>
                          )}

                          <WidthFullBlock>
                            <FormWrapperBlock className="form-group">
                              <FormBlock
                                label={t('form.label.title')}
                                className="req-label"
                              >
                                <TextInput
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="title"
                                  size="medium"
                                  maxLength="30"
                                  value={companyCaltureTwoTitle}
                                  placeholder={t('form.placeholder.title')}
                                  onChange={e =>
                                    setCompanyCaltureTwoTitle(e.target.value)
                                  }
                                />
                              </FormBlock>
                              <span className="req-error">
                                {calError3 && 'Title are required'}
                              </span>
                            </FormWrapperBlock>
                          </WidthFullBlock>
                          <WidthFullBlock className="textarea-div ">
                            <span>Company culture</span>
                            <textarea
                              disabled={cmpUser.role === 'employee'}
                              className="textarea"
                              placeholder="Talk more about it here!"
                              maxLength="1000"
                              value={companyCaltureTwoContent}
                              onChange={e => {
                                setCharaterCount(e.target.value.length);
                                setCompanyCaltureTwoContent(e.target.value);
                              }}
                            />
                            <TextCount>{characterCount}/1000</TextCount>
                          </WidthFullBlock>
                        </div>
                      )}

                      <button
                        disabled={cmpUser.role === 'employee'}
                        type="button"
                        className="update"
                        onClick={onCompanyCaltureSave}
                      >
                        Publish
                      </button>
                      {/* <a
                          href="/AdminAdvancedCompanyPage-new"
                          className="update"
                        >
                          Publish
                        </a> */}
                      {countTwo >= 2 ? (
                        ''
                      ) : (
                        <div className="add-another">
                          <button
                            disabled={cmpUser.role === 'employee'}
                            type="button"
                            onClick={e => {
                              setCountTwo(countTwo + 1);
                              setAddNewCal(true);
                            }}
                          >
                            <img
                              src={cdn('/static/img/plus-circle.svg')}
                              alt="plus-circle.svg"
                            />
                            Add Another
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="card" id="FeaturedArticle">
                      <h3 className="company-common-title">
                        Blog or Featured Article
                      </h3>
                      <p>
                        Did someone write something great about your company
                        that you’d like to feature on our page? <br /> OR <br />{' '}
                        Want to write a blog about your company?
                      </p>

                      {!imgOrVideoSrcBlog && cmpUser.role === 'admin' && (
                        <>
                          <WidthFullBlock className="mt-3">
                            <FormWrapperBlock className="form-group">
                              <FormBlock label={t('form.label.link')}>
                                <input
                                  disabled={cmpUser.role === 'employee'}
                                  className="form-control"
                                  name="link"
                                  size="medium"
                                  maxLength="100"
                                  value={blogLink}
                                  placeholder={t('form.placeholder.linkPest')}
                                  onChange={e => onChangeLinkURL(e)}
                                />
                              </FormBlock>
                            </FormWrapperBlock>
                          </WidthFullBlock>
                        </>
                      )}

                      {!imgOrVideoSrcBlog && !blogLink && (
                        <>
                          <span className="small">or</span>{' '}
                        </>
                      )}

                      {!imgOrVideoSrcBlog && !blogLink && (
                        <>
                          <h3 className="company-common-title mb-2 mt-3">
                            Cover video or image{' '}
                            <small>
                              (Video should be in .mp4 format only and max size
                              15 MB)
                            </small>
                          </h3>
                          <DragDrop>
                            <button
                              type="button"
                              className="upload-popup-btn"
                              onClick={e => {
                                setshowUploadModalImgVideo2(true);
                                setShowIsVideo(true);
                              }}
                            >
                              Upload file here
                            </button>
                            <div className="drag-drop-group">
                              <img
                                src={cdn('/static/img/plus-black.svg')}
                                alt="plus-black.svg"
                              />
                              Drag and drop here
                            </div>
                          </DragDrop>
                        </>
                      )}

                      {showUploadModalImgVideo2 && showisVideo && (
                        <FileUploadModal
                          closeModal={e => setshowUploadModalImgVideo2(e)}
                          onSuccess={onUploadSuccessImgVideo2}
                          isVideo={showisVideo}
                          isImageOrVideo={showUploadModalImgVideo2}
                        />
                      )}

                      {imgOrVideoSrcBlog && (
                        <>
                          {type1 === 'mp4' || type3 === 'mp4' ? (
                            <div className="company-preview-wrap">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setImgOrVideoSrcBlog('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}

                              <video controls>
                                <source
                                  src={imgOrVideoSrcBlog}
                                  type="video/mp4"
                                />
                                <track
                                  src="captions_en.vtt"
                                  kind="captions"
                                  srcLang="en"
                                  label="english_captions"
                                />
                              </video>
                            </div>
                          ) : (
                            <div className="company-preview-wrap img-pre-box">
                              {cmpUser.role === 'admin' && (
                                <button
                                  type="button"
                                  onClick={e => setImgOrVideoSrcBlog('')}
                                  className="delete"
                                >
                                  <img
                                    src={cdn('/static/img/delet-white.png')}
                                    alt="delet-white.png"
                                  />
                                </button>
                              )}
                              <img src={imgOrVideoSrcBlog} alt="Cover" />
                            </div>
                          )}
                        </>
                      )}

                      {previewVideo && (
                        <Wrapper
                          className="embed-video-box"
                          dangerouslySetInnerHTML={createNoembedMarkup()}
                        />
                      )}

                      <WidthFullBlock className="mt-3">
                        <FormWrapperBlock className="form-group">
                          <FormBlock
                            label={t('form.label.title')}
                            className="req-label"
                          >
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="title"
                              size="medium"
                              maxLength="100"
                              value={blogtitle}
                              placeholder={t('form.placeholder.title')}
                              onChange={e => setBlogtitle(e.target.value)}
                            />
                          </FormBlock>
                          <span className="req-error">
                            {blogError && 'Title are required'}
                          </span>
                        </FormWrapperBlock>
                      </WidthFullBlock>
                      <WidthFullBlock className="textarea-div">
                        <span>Company Blog</span>
                        <textarea
                          disabled={cmpUser.role === 'employee'}
                          className="textarea"
                          placeholder="Talk more about it here!"
                          maxLength="1000"
                          value={blogcompanyArtical}
                          onChange={e => {
                            setBlogCharaterCount(e.target.value.length);
                            setBlogcompanyArtical(e.target.value);
                          }}
                        />
                        <TextCount>{blogcharacterCount}/1000</TextCount>
                      </WidthFullBlock>

                      <button
                        disabled={cmpUser.role === 'employee'}
                        type="button"
                        className="update"
                        onClick={onBlogCompanyArtical}
                      >
                        Publish
                      </button>
                    </div>

                    <div className="card" id="SocialFeed">
                      <h3 className="company-common-title">Social Feed</h3>
                      <p>
                        Got an awesome social feed you want to share? <br />
                        Add up to 2 here!
                      </p>
                      <WidthFullBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock label={t('form.label.link')}>
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="link"
                              size="medium"
                              maxLength="250"
                              value={socialLink1}
                              placeholder={t('form.placeholder.link')}
                              onChange={e => setSocialLink1(e.target.value)}
                            />
                          </FormBlock>
                          <span className="req-error">
                            {socialLink1Error && 'Link URL is wrong'}
                          </span>
                        </FormWrapperBlock>
                      </WidthFullBlock>
                      <WidthFullBlock>
                        <FormWrapperBlock className="form-group">
                          <FormBlock label={t('form.label.link')}>
                            <input
                              disabled={cmpUser.role === 'employee'}
                              className="form-control"
                              name="link"
                              size="medium"
                              maxLength="250"
                              value={socialLink2}
                              placeholder={t('form.placeholder.link')}
                              onChange={e => setSocialLink2(e.target.value)}
                            />
                          </FormBlock>
                          <span className="req-error">
                            {socialLink2Error && 'Link URL is wrong'}
                          </span>
                        </FormWrapperBlock>
                      </WidthFullBlock>
                      {/* <a
                          href="/AdminAdvancedCompanyPage-new"
                          className="update"
                        >
                          Publish
                          
                        </a> */}
                      {/* <button
                        type="button"
                        className="update"
                        onClick={onSocialFeed}
                      >
                        Publish
                      </button> */}

                      <Btn
                        disabled={cmpUser.role === 'employee'}
                        label="Publish"
                        type="submit"
                        // variant="outlinePrimary"
                        handleClick={onSocialFeed}
                        loading={loading}
                        className="btn update"
                        rounded="lg"
                      />
                    </div>
                  </div>
                </div>
              </ReftSideMenu>
            </ProfileSectionWrap>
          </Form>
        </BoxFormWrap>
        {/* </Container> */}
      </BoxFormSection>
    </>
  );

  const content = rightContent();

  return (
    <Page
      title="Sign In"
      description="Sign In Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

// SignIn.propTypes = {
//   isVideo: PropTypes.bool,
// };

// SignIn.defaultProps = {
//   isVideo: false,
// };
export default withAuthSync(AdvanceSetting, true);
