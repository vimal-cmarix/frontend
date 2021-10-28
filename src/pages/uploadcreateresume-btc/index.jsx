import React from 'react';
import Link from 'next/link';
import CreateIcon from '@src/assets/images/createicon.svg';
import UploadIconBlue from '@src/assets/images/upload-blue.svg';
import UploadIcon from '@src/assets/images/upload-icon.svg';
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

const UploadCreateResumes = () => {
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
              <div className="resume-action">
                <img src={UploadIcon} alt="uploadicon" />
                <h3>Upload Resume</h3>
                <p>Use a pdf, docx, doc, rtf, or txt</p>
              </div>

              <Small>or</Small>

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
      title="Upload Create Resume"
      description="Upload Create Resume Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default UploadCreateResumes;
