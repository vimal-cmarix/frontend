import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Page from '@components/templates/Page';
// import logoMain from '@src/assets/images/logo-black.svg';
import { withAuthSync } from '@src/utils/auth';
// import notificationBell from '@src/assets/images/notification.png';
// import loggedinuser from '@src/assets/images/loggedinuser.svg';
// import configure from '@src/assets/images/configure-2.png';
// import PlusiCon from '@src/assets/images/plus-circle.svg';
// import paperClip from '@src/assets/images/paperclip.svg';
import Link from 'next/link';
import { cdn } from '@utils/general';
import { Accordion, Dropdown } from 'react-bootstrap';
import RejectionOrOffer from '@api/services/rejection-offer';
import HeaderB2B from '@components/organisms/headerB2B';
import {
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  FormGroup,
  FileAttBtn,
  TextCount,
  CheckboxField,
  CheckBoxInner,
  BoxProgrssBar,
  ProgressBar,
  ProfileBoxAction,
  AdditionalFeaturesList,
  SecondaryHeader,
  SecondaryWrapper,
  OuterMostWrapper,
} from './style';
import ComingSoon from '../coming-soon';

const ConfigureJobAdditionalFeatures = () => {
  // const [brandColor, setBrandColor] = useState(false);
  // const [meetCompany, setMeetCompany] = useState(false);
  // const [companyCalture, setCompanyCalture] = useState(false);
  // const [blog, setBlog] = useState(false);
  // const [social, setSocial] = useState(false);
  // const loadData = response => {
  //   setBrandColor(response?.brandColors);
  //   setMeetCompany(response?.meetCompanyEmployees);
  //   setCompanyCalture(response?.companyCulture);
  //   setBlog(response?.blogOrFeaturedArticle);
  //   setSocial(response?.socialFeed);
  // };
  // useEffect(() => {
  //   const getRenderData = async () => {
  //     const checkout =
  //       typeof window !== 'undefined'
  //         ? JSON.parse(localStorage.getItem('userDetail'))
  //         : null;
  //     const { companyProfileId } = checkout;
  //     const res = await RejectionOrOffer.getAdditionalFeature(companyProfileId);
  //     const { data } = res;
  //     loadData(data.data);
  //   };
  //   getRenderData();
  // }, []);
  // const onSubmitData = async () => {
  //   const checkout =
  //     typeof window !== 'undefined'
  //       ? JSON.parse(localStorage.getItem('userDetail'))
  //       : null;
  //   const { companyProfileId } = checkout;
  //   const data = {
  //     brandColors: brandColor,
  //     meetCompanyEmployees: meetCompany,
  //     companyCulture: companyCalture,
  //     blogOrFeaturedArticle: blog,
  //     socialFeed: social,
  //   };
  //   const res = await RejectionOrOffer.additionalFeature(
  //     companyProfileId,
  //     data,
  //   );
  //   if (res.status === 201) {
  //     setBrandColor(false);
  //     setMeetCompany(false);
  //     setCompanyCalture(false);
  //     setBlog(false);
  //     setSocial(false);
  //     console.log('__Response', res);
  //   }
  // };
  // const rightContent = () => (
  //   <OuterMostWrapper>
  //     <HeaderB2B />
  //     <ProfileSectionWrap>
  //       <ProfileLeftsideMenu>
  //         <h2>Configure job posting</h2>
  //         <ul>
  //           <li>
  //             <Link href="/company/configure-job-rejection-letter">
  //               <a href="/configure-job-rejection-letter">
  //                 Rejection/Offer Letter
  //                 <svg
  //                   width="8"
  //                   height="14"
  //                   viewBox="0 0 8 14"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     d="M1 13L7 7L1 1"
  //                     stroke="#1D242F"
  //                     strokeWidth="2"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </a>
  //             </Link>
  //           </li>
  //           <li>
  //             <Link href="/company/configure-job-video-content">
  //               <a href="/configure-job-video-content">
  //                 Video Content
  //                 <svg
  //                   width="8"
  //                   height="14"
  //                   viewBox="0 0 8 14"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     d="M1 13L7 7L1 1"
  //                     stroke="#1D242F"
  //                     strokeWidth="2"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </a>
  //             </Link>
  //           </li>
  //           <li className="active">
  //             <Link href="/company/configure-job-additional-features">
  //               <a href="/configure-job-additional-features">
  //                 Additional features
  //                 <svg
  //                   width="8"
  //                   height="14"
  //                   viewBox="0 0 8 14"
  //                   fill="none"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     d="M1 13L7 7L1 1"
  //                     stroke="#1D242F"
  //                     strokeWidth="2"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   />
  //                 </svg>
  //               </a>
  //             </Link>
  //           </li>
  //         </ul>
  //       </ProfileLeftsideMenu>
  //       <ProfileRightPanel>
  //         <ProfileBoxForm>
  //           <ProfileBoxHead>
  //             <h2>Additional features</h2>
  //           </ProfileBoxHead>
  //           <div className="profile-box-form-body">
  //             <BoxFormWrap>
  //               <h4 className="mb-24">
  //                 You will have the option to add parts of your company profile
  //                 to your job posting to make it more enticing and drive better
  //                 applicants!
  //               </h4>
  //               <AdditionalFeaturesList>
  //                 <CheckboxField>
  //                   <CheckBoxInner>
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox"
  //                       checked={brandColor}
  //                       onChange={e => setBrandColor(e.target.checked)}
  //                     />
  //                     <Label>Brand colors</Label>
  //                   </CheckBoxInner>
  //                 </CheckboxField>
  //                 <CheckboxField>
  //                   <CheckBoxInner>
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox"
  //                       checked={meetCompany}
  //                       onChange={e => setMeetCompany(e.target.checked)}
  //                     />
  //                     <Label>Meet company employees</Label>
  //                   </CheckBoxInner>
  //                 </CheckboxField>
  //                 <CheckboxField>
  //                   <CheckBoxInner>
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox"
  //                       checked={companyCalture}
  //                       onChange={e => setCompanyCalture(e.target.checked)}
  //                     />
  //                     <Label>Company culture</Label>
  //                   </CheckBoxInner>
  //                 </CheckboxField>
  //                 <CheckboxField>
  //                   <CheckBoxInner>
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox"
  //                       checked={blog}
  //                       onChange={e => setBlog(e.target.checked)}
  //                     />
  //                     <Label>Blog or featured article</Label>
  //                   </CheckBoxInner>
  //                 </CheckboxField>
  //                 <CheckboxField>
  //                   <CheckBoxInner>
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox"
  //                       checked={social}
  //                       onChange={e => setSocial(e.target.checked)}
  //                     />
  //                     <Label>Social feed</Label>
  //                   </CheckBoxInner>
  //                 </CheckboxField>
  //               </AdditionalFeaturesList>
  //               <ProfileBoxAction>
  //                 <button
  //                   type="submit"
  //                   className="btn action-btn"
  //                   onClick={onSubmitData}
  //                 >
  //                   Update
  //                 </button>
  //               </ProfileBoxAction>
  //             </BoxFormWrap>
  //           </div>
  //         </ProfileBoxForm>
  //       </ProfileRightPanel>
  //     </ProfileSectionWrap>
  //   </OuterMostWrapper>
  // );
  // const content = rightContent();
  return (
    // <div>Coming soon</div>
    <ComingSoon />
    // <Page
    //   title="Configure Job Additional Features"
    //   description="Configure Job Additional Features Page"
    //   nav={{ show: false }}
    //   topbar={{ show: false }}
    //   isVerified
    // >
    //   {content}
    // </Page>
  );
};

export default withAuthSync(ConfigureJobAdditionalFeatures);
