import React from 'react';
import Link from 'next/link';
import CreateIcon from '@src/assets/images/createicon.svg';
import UploadIconBlue from '@src/assets/images/upload-blue.svg';
import Page from '@components/templates/Page';
import {
  UploadCreateResume,
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  PasswordNote,
  FormGroup,
  FormGroupMb8,
  ForgotPasswordLink,
  Small,
} from './style';

const UploadResume = () => {
  const rightContent = () => (
    <BoxFormSection>
      {/* Reset password */}
      <div className="container">
        <BoxFormWrap>
          <form>
            <BoxFormTitle>
              <h2>Add a resume for the employer</h2>
            </BoxFormTitle>
            <UploadCreateResume>
              <div className="resume-action preview">
                <div className="resume-preview">
                  <h4>Resume Preview</h4>
                </div>
                <Link href="/UploadCreateResume">
                  <div className="resume_bottom">
                    <img src={UploadIconBlue} alt="uploadiconblue" />
                    Replace
                  </div>
                </Link>
              </div>

              <Small className="small">or</Small>

              <Link href="/CreateResumeStepOne">
                <div className="resume-action">
                  <img src={CreateIcon} alt="createicon" />
                  <h3>Create online resume</h3>
                  <p>We’ll guide you through it!</p>
                </div>
              </Link>
            </UploadCreateResume>
          </form>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );

  const content = rightContent();
  return (
    <Page
      title="Upload Resume"
      description="Upload Resume Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default UploadResume;
