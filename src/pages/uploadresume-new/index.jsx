import React from 'react';
import Link from 'next/link';
import CreateIcon from '@src/assets/images/createicon.svg';
import UploadIconBlue from '@src/assets/images/upload-blue.svg';

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
} from './style';

const UploadResume = () => {
  return (
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

              <span className="small">or</span>

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
};

export default UploadResume;
