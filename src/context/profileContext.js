import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        previewMode: state.previewMode || false,
        ...action.data,
      };

    case 'SET_PAYMENT_DATA':
      return {
        ...state,
        paymentData: action.data,
      };

    case 'SET_PAYMENT_DATA_CUSTOMER':
      return {
        ...state,
        paymentData: {
          client: state.paymentData.client,
          customer: action.data,
        },
      };

    case 'SET_PERSONAL':
      return {
        ...state,
        personalInfo: action.personalInfo,
      };

    case 'SET_INTERESTS':
      return {
        ...state,
        interests: action.interests,
      };

    case 'SET_SOCIAL_CAUSES':
      return {
        ...state,
        socialCauses: action.socialCauses,
      };

    case 'SET_VOLUNTEER_EXPERIENCE':
      return {
        ...state,
        volunteerExperience: action.volunteerExperience,
      };

    case 'SET_EDUCATION':
      return {
        ...state,
        education: action.education,
      };

    case 'EDIT_EDUCATION':
      return {
        ...state,
        education: action.education,
      };

    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(item => item.id !== action.education),
      };

    case 'SET_CERTIFICATES':
      return {
        ...state,
        certificates: action.certificates,
      };

    case 'REMOVE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.filter(
          item => item.id !== action.certificate,
        ),
      };

    case 'SET_EXPERIENCE':
      return {
        ...state,
        experiences: action.experiences,
      };

    case 'EDIT_EXPERIENCE':
      return {
        ...state,
        experiences: action.experiences,
      };

    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.filter(
          item => item.id !== action.experience,
        ),
      };

    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.skills,
      };

    case 'SET_CONTACT':
      return {
        ...state,
        contactInfo: action.contact,
      };

    case 'SET_ABOUT':
      return {
        ...state,
        about: action.about,
      };

    case 'SET_SUMMARY':
      return {
        ...state,
        summary: action.summary,
      };

    case 'SET_PHOTO':
      return {
        ...state,
        photo: action.photo,
      };

    case 'SET_COVER_IMAGE':
      return {
        ...state,
        coverAsset: action.coverAsset,
      };

    case 'SET_RESUME':
      return {
        ...state,
        resume: action.resume,
      };

    case 'SET_DOCUMENT':
      return {
        ...state,
        document: action.document,
      };

    case 'SET_SHARE':
      return {
        ...state,
        share: action.share,
      };

    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.previewMode,
      };

    case 'SET_DIGITAL_PRESENCE':
      return {
        ...state,
        digitalPresences: action.digitalPresences,
      };

    case 'SET_PROFESSIONAL_BUCKET_LIST':
      return {
        ...state,
        professionalBucketList: action.professionalBucketList,
      };

    case 'SET_NON_PROFITS':
      return {
        ...state,
        nonProfits: action.professionalBucketList,
      };

    case 'SET_CONTENTS':
      return {
        ...state,
        contents: action.contents,
      };

    case 'CLEAR_PROFILE':
      return {};

    default:
      return state;
  }
};

const ProfileContext = createContext(initialState);

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider };
export default ProfileContext;
