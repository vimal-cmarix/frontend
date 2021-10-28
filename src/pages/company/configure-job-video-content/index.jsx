import React, { useState, useEffect } from 'react';
import Page from '@components/templates/Page';
import Link from 'next/link';
import { withAuthSync } from '@src/utils/auth';
import Slider from 'react-input-slider';
import RejectionOrOffer from '@api/services/rejection-offer';
import HeaderB2B from '@components/organisms/headerB2B';
import Btn from '@components/molecules/Btn';
import {
  Label,
  ProfileSectionWrap,
  ProfileLeftsideMenu,
  ProfileRightPanel,
  ProfileBoxForm,
  ProfileBoxHead,
  BoxFormWrap,
  CheckboxField,
  CheckBoxInner,
  BoxProgrssBar,
  ProgressBar,
  ProfileBoxAction,
  OuterMostWrapper,
} from './style';

const ConfigureJobVideoContent = () => {
  const [value, setValue] = useState({ x: 30 });
  const [limit, setLimits] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = response => {
    setLimits(response?.setLimit);
    setValue({ x: response?.videoLimit ? response?.videoLimit : 30 });
  };
  useEffect(() => {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    const getRenderData = async () => {
      const res = await RejectionOrOffer.getAdditionalFeature(companyProfileId);
      const { data } = res;
      loadData(data?.data);
    };
    getRenderData();
  }, []);

  async function handleSubmit() {
    const checkout =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null;
    const { companyProfileId } = checkout;
    const data = {
      setLimit: limit,
      videoLimit: value.x,
    };
    const res = await RejectionOrOffer.setVideoLimit(companyProfileId, data);
    if (res.status === 201) {
      setValue({ x: 30 });
      setLimits(false);
      console.log('response__', res);
    }
  }

  const rightContent = () => (
    <OuterMostWrapper>
      <HeaderB2B />

      <ProfileSectionWrap>
        <ProfileLeftsideMenu>
          <h2>Configure job posting</h2>
          <ul>
            <li>
              <Link href="/company/configure-job-rejection-letter">
                <a href="/company/configure-job-rejection-letter">
                  Rejection/Offer Letter
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
              </Link>
            </li>
            <li className="active">
              <Link href="/company/configure-job-video-content">
                <a href="/company/configure-job-video-content">
                  Video Content
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
              </Link>
            </li>
            {/* <li>
              <Link href="/company/configure-job-additional-features">
                <a href="/company/configure-job-additional-features">
                  Additional features
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
              </Link>
            </li> */}
          </ul>
        </ProfileLeftsideMenu>

        <ProfileRightPanel>
          <ProfileBoxForm>
            <ProfileBoxHead>
              <h2>Video Content</h2>
            </ProfileBoxHead>
            <div className="profile-box-form-body">
              <BoxFormWrap>
                <h4 className="mb-24">
                  Set maximum time limit on video content from applicants
                </h4>

                <CheckboxField>
                  <CheckBoxInner>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={limit}
                      onChange={e => setLimits(e.target.checked)}
                    />
                    <Label>Set time limit</Label>
                  </CheckBoxInner>
                </CheckboxField>
                <BoxProgrssBar>
                  <ProgressBar>
                    <Slider
                      //step={10}
                      disabled={!limit}
                      styles={{
                        thumb: {
                          width: 24,
                          height: 24,
                          backgroundColor: '#005E8B',
                        },
                      }}
                      className="daySlider"
                      axis="x"
                      x={value.x ? value.x : 30}
                      xmin={30}
                      xmax={10}
                      value={value.x}
                      onChange={newValue => setValue(newValue)}
                    />
                    <span className="progress-bar-value">
                      {value.x === 30 ? '30 sec' : `${value.x} min`}
                    </span>
                  </ProgressBar>
                </BoxProgrssBar>

                <ProfileBoxAction>
                  {/* <button
                    type="submit"
                    className="btn action-btn"
                    onClick={handleSubmit}
                  >
                    Update
                  </button> */}

                  <Btn
                    label="Update"
                    type="submit"
                    // variant="outlinePrimary"
                    handleClick={handleSubmit}
                    loading={loading}
                    className="btn action-btn"
                    rounded="lg"
                  />
                </ProfileBoxAction>
              </BoxFormWrap>
            </div>
          </ProfileBoxForm>
          {/* <ProfileBoxForm1> */}
          {/* <ProfileBoxHead>
            <h2>Video Content</h2>
          </ProfileBoxHead> */}
          {/* <div className="profile-box-form-body"> */}
          {/* <BoxFormWrap>
              <h4 className="mb-24">
                Set maximum time limit on video content from applicants
              </h4> */}

          {/* <CheckboxField>
                <CheckBoxInner>
                  <input type="checkbox" className="checkbox" checked />
                  <Label>Set time limit</Label>
                </CheckBoxInner>
              </CheckboxField> */}

          {/* <BoxProgrssBar>
                <ProgressBar style={{ width: '7%' }}>
                  <span>1.5 min</span>
                </ProgressBar>
              </BoxProgrssBar> */}
          {/* <BoxProgrssBar>
                <ProgressBar>
                  <Slider
                    styles={{
                      thumb: {
                        width: 30,
                        height: 30,
                        backgroundColor: 'blue',
                      },
                    }}
                    //step={10}
                    axis="x"
                    x={offerValue.x}
                    min={1}
                    max={100}
                    value={offerValue.x}
                    onChange={newValue => handleOfferChange(newValue)}
                  />
                  <span>1.5 min</span>
                </ProgressBar>
              </BoxProgrssBar> */}

          {/* <ProfileBoxAction>
                <button type="submit" className="btn action-btn">
                  Update
                </button>
              </ProfileBoxAction> */}
          {/* </BoxFormWrap> */}
          {/* </div> */}
          {/* </ProfileBoxForm1> */}
        </ProfileRightPanel>
      </ProfileSectionWrap>
    </OuterMostWrapper>
  );

  const content = rightContent();
  return (
    <Page
      title="Configure Job Video Content"
      description="Configure Job Video Content Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default withAuthSync(ConfigureJobVideoContent);
